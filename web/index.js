
function w3Setup() {
    let web3, web3Provider; 
    if (Web3 && Web3.givenProvider) {
        // If a web3 instance is already provided by Meta Mask.
        web3Provider = Web3.givenProvider;
        web3 = new Web3(web3Provider);
    } else {
        // Specify default instance if no web3 instance provided
        web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        web3 = new Web3(web3Provider);
    }
    return {
        web3,
        web3Provider
    };
}

function setupContract(provider) {
    return new Promise((resolve, reject) => {
        fetch("./PiggyBank.json")
            .then(r => r.json())
            .then(contract => {
                let PiggyBank = TruffleContract(contract);
                PiggyBank.setProvider(provider);
                resolve(PiggyBank);
            })
            .catch(err => console.log(err));
    });
}

const { web3, web3Provider } = w3Setup();
let account = null;
const accountElem = document.querySelector(".account");
const balance = document.querySelector(".balance");

// web3.eth.getCoinbase(function(err, _account) {
//     if (err === null) {
//         account = _account;
//         accountElem.innerText = account;
//     }
//   });

  if(window.ethereum){
    // alert("window.ethereum")
    ethereum.enable().then(function(acc){
        account = acc[0];
        accountElem.innerText = account;
    });
}

let instance = null;

async function start() {
    const contract = await setupContract(web3Provider);
    instance = await contract.deployed();
    const deposits = await instance.numberOfDeposits();
    balance.innerText = deposits.toString();

    instance.Deposited().on('data', async () => {
        const deposits = await instance.numberOfDeposits();
        balance.innerText = deposits.toString();
    })

}

async function clickDeposit() {
    await instance.deposit({ from : account  });
}

start();

console.log(Web3.modules)
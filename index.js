
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
const userDepositsElem = document.querySelector(".userDeposits");
const userCoinsElem = document.querySelector(".userCoins");

if (window.ethereum) {
    // alert("window.ethereum")
    ethereum.enable().then(function (acc) {
        account = acc[0];
        accountElem.innerText = account;
    });
}

let instance = null;

async function updateFields() {
    const deposits = await instance.numberOfDeposits();
    const userDeposits = await instance.userDeposits(account);
    const userCoins = await instance.userCoins(account);

    balance.innerText = deposits.toString();
    userDepositsElem.innerText = userDeposits.toString();
    // userCoinsElem.innerText = userCoins.toString();

    const userCoinCount = Number(userCoins.toString());
    for (let i=0;i<userCoinCount;i++){
        userCoinsElem.innerHTML += `<img src="money.png" width="35" alt="coin" class="m-1" >`;
    }

}

async function start() {
    const contract = await setupContract(web3Provider);
    instance = await contract.deployed();

    await updateFields()

    instance.Deposited().on('data', async () => {
        await updateFields();
    });

}

async function clickDeposit() {
    await instance.deposit({ from: account });
}

start();

console.log(Web3.modules)
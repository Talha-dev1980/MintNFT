require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

const contractABI = require('./contract-abi.json')
const contractAddress = "0xE07D851bD501d452976593885751eDAfbc1883F1";
export const mintNFT = async() => {

window.contract = await new web3.eth.Contract(contractABI, contractAddress);

const transactionParameters = {
    to: contractAddress,
    from: window.ethereum.selectedAddress,
    'data': window.contract.methods.safeMint(window.ethereum.selectedAddress).encodeABI()
};


try {
    const txHash = await window.ethereum
        .request({
            method: 'eth_sendTransaction',
            params: [transactionParameters]
        });
    return {
        success: true,
        status: "Success minting" + txHash
    }
} catch (error) {
    return {
        success: false,
        status: "Something went wrong: " + error.message
    }
}
}

import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import { mintNFT } from ".mint.js";

function App() {
  const [walletAddress, setWalletAddress] = useState("0x145645...12312");
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');
  const [balance, setBalance] = useState(null);
  
  const [mintNFT, mintedNFT] = useState('Mint NFT');

  async function check() {
    console.log('Trying to Connect...');
    if (window.ethereum) {
      console.log('Metamask found');
      try {
        await window.ethereum.request({
          method: 'eth_requestAccounts',
        }).then(result => {
          accountChangedHandler(result[0]);
          setConnButtonText('Wallet Connected')
          getAccountBalance(result[0]);
          console.log(result[0])
        })
      } catch (error) {
        console.log('Error while connecting ' + error);
      }
    } else {
      console.log('metamask doest not Exist');
    }
  }
  async function mint(){
    await mintNFT();
    mintedNFT('NFT Minted!')
  }
  const accountChangedHandler = (newAccount) => {
    setWalletAddress(newAccount);
    getAccountBalance(newAccount.toString())
  }
  const getAccountBalance = (account) => {
		window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
		.then(balance => {
			setBalance(ethers.formatEther(balance));
		})
		.catch(error => {
			console.log(error.message);
		});
	};
  window.ethereum.on('accountsChanged', accountChangedHandler);

  /* async function connectWallet() {
      if(typeof window.ethereum !== 'undefined') {
        await check();
  
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        signer.getAddress().then((address) => {
          console.log(address);
          return provider.getBalance(address);
        }).then((balance) => {
          console.log(balance);
        });
      }
    }*/

  return (
    <div className="App">
      <header className="App-header">
        <button
          onClick={check}>{connButtonText}</button>
        <h5>Connected Wallet Adress: {walletAddress}</h5>
        <p>Your Current Balance is: {balance}</p>
        <button
          onClick={mint}>{mintNFT}</button>
      </header>
    </div>
  );
}

export default App;

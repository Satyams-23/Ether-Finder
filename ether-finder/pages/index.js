import { useState, useEffect } from 'react'
import { web3modal } from 'web3modal'
import { ethers } from 'ethers'

const Home = () => {

  const [currentAccount, setCurrentAccount] = useState("")//state to store the current account address of the user and display it on the page 
  const [connect, setConnect] = useState(false)//state to store the connection status of the user
  const [balance, setBalance] = useState(0)//state to store the balance of the user

  const failmeassgae = "Please install metamask and connect your Metamask";
  const successmessage = "Successfully connected to Metamask";

  const INFURA_ID = "260cdf04c6e24ec68b77c808f84416d2";

  const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`);

  const checkifWalletConnected = async () => {
    if (!window.ethereum) return;

    const accounts = await window.ethereum.request({ method: "eth_accounts" })

    if (accounts.length) {
      setCurrentAccount(account[0]);

    } else {
      return failMessage;
    }

    const balance = await provider.getBalance();
  }
  return (
    <div>
      <h1>Home</h1>

    </div>
  )
}

export default Home

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Image from 'next/image';
import profile from '../public/th.jpeg';
import eth from '../public/eth.png';

const Home = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [failMessage, setFailMessage] = useState("Please install Metamask and connect your Metamask");
  const [connect, setConnect] = useState(false);

  const INFURA_ID = `${process.env.NEXT_PUBLIC_INFURA_ID}`;
  const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_ID}`);

  const checkIfWalletConnected = async () => {
    if (!window.ethereum) return;

    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
      setConnect(true);
    } else {
      console.log("No account found");
      setConnect(false);
    }

    const address = `${process.env.NEXT_PUBLIC_ADDRESS}`;
    const balance = await provider.getBalance(address);
    const showBalance = ethers.utils.formatEther(balance);
    setBalance(showBalance);
    console.log("Balance: ", balance);
  };

  const connectWallet = async () => {
    if (!window.ethereum) return console.log(failMessage);

    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

    setCurrentAccount(accounts[0]);
    window.location.reload();
  };

  useEffect(() => {
    checkIfWalletConnected();
  },);

  useEffect(() => {
    async function accountChanged() {
      window.ethereum.on("accountsChanged", async function () {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        if (accounts.length) {
          setCurrentAccount(accounts[0]);
          setConnect(true);
        } else {
          setConnect(false);
          window.location.reload();
        }
      });
    }
    accountChanged();
  }, []);

  return (
    <div>
      <div className="card-container">
        {!currentAccount ? "" : <span className="pro">PRO</span>}
        <Image src={profile} alt="profile" width={80} height={80} />
        <h2>Check Ether</h2>

        {!currentAccount && !connect ? (
          <div>
            <div className="message">
              <p>{failMessage}</p>
            </div>
            <Image src={eth} alt="ether" width={100} height={100} />
            <p>Welcome to ether account balance checker</p>
          </div>
        ) : (
          <div>
            <h4>
              Verified <span className="tick">&#10004;</span>
            </h4>
            <p>
              Ether account and balance checker <br /> Find account details
            </p>
            <div className="buttons">
              <button className="primary ghost" onClick={() => { }}>
                Ether Account Details
              </button>
            </div>
          </div>
        )}

        {!currentAccount && !connect ? (
          <div className="button">
            <button className="primary" onClick={connectWallet}>Connect Wallet</button>
          </div>
        ) : (
          <div className="skills">
            <h6>Your Ether</h6>
            <ul>
              <li>Accounts</li>
              <li>{currentAccount}</li>
              <li>Balance</li>
              <li>{balance}</li>
            </ul>
          </div>
        )}


      </div>
    </div>
  );
};

export default Home;

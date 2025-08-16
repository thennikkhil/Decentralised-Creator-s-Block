"use client"

import React from 'react'
import { ethers } from 'ethers'
import { BrowserProvider } from 'ethers'
import { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Badge } from "@/components/ui/badge"
import { userStore } from '@/store/user'

export default function ConnectButton() {

  const user = userStore((state: any) => state.user)
  const updateAddress = userStore((state: any) => state.updateAddress)

  const [errorMessage, SetErrorMessage] = useState<string>("");
  const [defaultAccount, setDefaultAccount] = useState<string>("");

    useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      if (window.ethereum) {
        const provider = new BrowserProvider(window.ethereum);
        // listAccounts() will return an array of Signer objects
        const accounts = await provider.listAccounts();
        
        // If accounts array is not empty, user is already connected
        if (accounts.length > 0) {
          const signer = accounts[0];
          accountChangeHandler(signer);
        }
      }
    };
    
    checkIfWalletIsConnected();
  }, []); // The empty array ensures this effect runs only once on mount
  
    const connectWalletHandler = () => {
    const provider = new BrowserProvider(window.ethereum)
    
    if (window.ethereum) {
        provider.send("eth_requestAccounts", [])
        .then(async () => {
          const newAccount = await provider.getSigner();
          accountChangeHandler(newAccount);
        })
    } else {
      SetErrorMessage('Please install MetaMask')
    }
  }

  const accountChangeHandler = async (newAccount:any) => {
    const provider = new BrowserProvider(window.ethereum)
    const address = await newAccount.getAddress();
    setDefaultAccount(address);
    updateAddress({
        accountAddress: address
    })
    // await getuserBalance(address);
  }

  console.log(user.accountAddress);

  return (
    <div>
      {defaultAccount ? (
        <div className="hidden md:flex items-center space-x-4">
            <Badge variant="outline" className="px-4 py-2 text-slate-600 border-slate-300">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Connected Account: {`${defaultAccount.substring(0, 6)}...${defaultAccount.substring(defaultAccount.length - 4)}`}
            </Badge>
          </div>
        // <div>
        //   <p>Connected Account: {`${defaultAccount.substring(0, 6)}...${defaultAccount.substring(defaultAccount.length - 4)}`}</p>
        // </div>
      ) : (
        <Button onClick={connectWalletHandler} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300">
          Connect Wallet
        </Button>
      )}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  )
}

import { ethers, Wallet } from 'ethers'
import { addHours, addMinutes, differenceInMinutes } from 'date-fns'

const mnemonic = require('../secret.json').mnemonic

const NODE_URL = 'https://rpc-mainnet.maticvigil.com/v1/df790584a4c2b9e0a1529e1c3e54a59bc84ac54d'

const CONTRACT_ADDRESS = '0x86935F11C86623deC8a25696E1C19a8659CbF95d'

const provider = new ethers.providers.JsonRpcProvider(NODE_URL)

const wallet = Wallet.fromMnemonic(mnemonic).connect(provider)

const petData = '0x22c67519000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000001d1a000000000000000000000000000000000000000000000000000000000000049c'
const tx1 = {
    to: CONTRACT_ADDRESS,
    data: petData,
    gasLimit: 100000,
    gasPrice: 10000000000
}

let nextPet = addHours(Date.now(), 12)

    ; (() => {
        setInterval(async () => {
            if (differenceInMinutes(nextPet, Date.now()) < 1) {
                await wallet.sendTransaction(tx1)

                console.log('Sent transaction!')

                nextPet = addMinutes(addHours(Date.now(), 12), 2)
            }
        }, 10000)
    })()



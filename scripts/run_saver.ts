
import {Contract,BigNumber} from "ethers";
import { ethers } from 'hardhat';
import {getAccount} from "./../helpers/accounts"


export async function save(): Promise<boolean> {

    let babyWizardsAddress = "0x4b1e130AE84c97b931FFBE91eAd6B1da16993D45";

    let DevAddress = "0xC9305cCD1e70621ea58504FEdDc0d131911FC11C";
    let DaoAddress = "0x6EAb2d42FEf9aad0036Bc145b5F451799e3FB3F7";

    let owner = await getAccount(process.env.DEPLOYER_ADDRESS)
    

    console.log(`Dev Address Balance: `, BigNumber.from(await ethers.provider.getBalance(DevAddress)).toString())
    console.log(`DAO Address Balance: `, BigNumber.from(await ethers.provider.getBalance(DaoAddress)).toString())

    console.log(`\n --- CONNECT CONTRACT ---`);
    

    const babyWizards = new Contract(
        babyWizardsAddress,
        [{
            "inputs": [],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }],
        owner
    )
    console.log(`BabyWizards connected at: ${babyWizards.address.toLowerCase()}`);

    let overrides = {
        gasLimit: 800000,
        gasPrice: ethers.utils.parseUnits('150', 'gwei').toString(),
        type: 1,
        accessList: [
          {
            address: '0x6EAb2d42FEf9aad0036Bc145b5F451799e3FB3F7',  // gnosis safe  address
            storageKeys: [
                "0x0000000000000000000000000000000000000000000000000000000000000000"
            ]
          },{
            address: '0xd9Db270c1B5E3Bd161E8c8503c55cEABeE709552',
            storageKeys: [
                "0x0000000000000000000000000000000000000000000000000000000000000000"
            ]
          }
        ]
      }

    await babyWizards.connect(owner).withdraw(overrides);
    console.log(`BabyWizards withdraw successful`);

    console.log(`Dev Address Balance: `, BigNumber.from(await ethers.provider.getBalance(DevAddress)).toString())
    console.log(`DAO Address Balance: `, BigNumber.from(await ethers.provider.getBalance(DaoAddress)).toString())

    return true;
}




save()
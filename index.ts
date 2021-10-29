import { ethers, Contract,BigNumber } from "ethers";
import * as LightContract from "@airswap/light/build/contracts/Light.sol/Light.json";
//@ts-ignore
import * as lightDeploys from "@airswap/light/deploys.js";

let chainId= 4
let APISECRET = process.env.APISECRET;
let APIKEY = process.env.APIKEY;
let ACCOUNT = process.env.ACCOUNT;

//const provider = ethers.getDefaultProvider("homestead");
const _infuraProvider = ethers.providers.InfuraProvider
const provider = new _infuraProvider("rinkeby", APIKEY)

const lightContract = new Contract(
  lightDeploys[4],
  LightContract.abi,
  provider
);

let accountFilter = {
   address: lightDeploys[4].address,
   topics: [
    lightContract.Swap,
    null,
    null
   ],
}
console.log(ACCOUNT)
const lastlookFilter = {
  address: lightDeploys[chainId],
  topics: [
    lightContract.Swap,
    null,
    ethers.utils.hexZeroPad(ACCOUNT!.toString(),32)
  ],
}
const rfqFilter = {
  address: lightDeploys[chainId],
  topics: [
    lightContract.Swap,
    null,
    null
  ],
}
lightContract.on(rfqFilter, async (tx) => {
  console.log("rfqFilter",tx)
})

lightContract.on(lastlookFilter, async (tx) => {
  console.log("lastlookFilter",tx)
});


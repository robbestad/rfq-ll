import { ethers, Contract, BigNumber } from "ethers";
import * as LightContract from "@airswap/light/build/contracts/Light.sol/Light.json";
//@ts-ignore
import * as lightDeploys from "@airswap/light/deploys.js";
import * as WrapContract from "@airswap/wrapper/build/contracts/Wrapper.sol/Wrapper.json";
//@ts-ignore
import * as wrapDeploys from "@airswap/wrapper/deploys.js";

let chainId = 4;
let APISECRET = process.env.APISECRET;
let APIKEY = process.env.APIKEY;
let ACCOUNT = process.env.ACCOUNT;

//const provider = ethers.getDefaultProvider("homestead");
const _infuraProvider = ethers.providers.InfuraProvider;
const provider = new _infuraProvider("rinkeby", APIKEY);

const lightContract = new Contract(
  lightDeploys[4],
  LightContract.abi,
  provider
);
console.log("light contract address",lightDeploys[4])

let accountFilter = {
  address: lightDeploys[4].address,
  topics: [lightContract.Swap, null, null],
};
const rfqFilter = {
  address: lightDeploys[chainId],
  topics: [lightContract.Swap, null, null,    ethers.utils.hexZeroPad(ACCOUNT!.toString(), 32)],
};
lightContract.on(rfqFilter, async (tx) => {
  console.log("rfqFilter");
});

const lastlookFilter = {
  address: lightDeploys[chainId],
  topics: [
    lightContract.Swap,
    null,
    ethers.utils.hexZeroPad(ACCOUNT!.toString(), 32),
  ],
};
lightContract.on(lastlookFilter, async (tx) => {
  console.log("lastlookFilter");
});

const filterAddress = ethers.utils.hexZeroPad(wrapDeploys[chainId], 32)
const transferFilter = {
  address: lightDeploys[chainId],
  topics: [lightContract.Transfer, null, null,filterAddress],
};
lightContract.on(transferFilter, async (tx) => {
  console.log("transferFilter",tx);
});


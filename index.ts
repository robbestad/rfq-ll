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

let accountFilter = {
  address: lightDeploys[4].address,
  topics: [lightContract.Swap, null, null],
};
const contract = "0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea";
const senderWallet = "0x63CF6013aaB710Ca21F1404f71d37111d7F928a8";
const lastlookFilter = {
  address: lightDeploys[chainId],
  topics: [
    lightContract.Swap,
    null,
    ethers.utils.hexZeroPad(ACCOUNT!.toString(), 32),
  ],
};
const rfqFilter = {
  address: lightDeploys[chainId],
  topics: [lightContract.Swap, null, null],
};

lightContract.on(rfqFilter, async (tx) => {
  console.log("rfqFilter");
});

lightContract.on(lastlookFilter, async (tx) => {
  console.log("lastlookFilter");
});

const wrapContract = new Contract(wrapDeploys[4], WrapContract.abi, provider);
const wrapFilter = {
  address: wrapDeploys[chainId],
  topics: [wrapContract.OwnershipTransferred, null],
};
wrapContract.on(wrapFilter, async (tx) => {
  console.log("wrapFilter", tx);
});

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ethers_1 = require("ethers");
var LightContract = __importStar(require("@airswap/light/build/contracts/Light.sol/Light.json"));
//@ts-ignore
var lightDeploys = __importStar(require("@airswap/light/deploys.js"));
//const provider = ethers.getDefaultProvider("homestead");
var _infuraProvider = ethers_1.ethers.providers.InfuraProvider;
var provider = new _infuraProvider("rinkeby", "a6c3c0194f874c62bba8b7bb92c5565d");
var APISECRET = "ec6f7b6b7c694a73859b0e825726ae88";
var lightContract = new ethers_1.Contract(lightDeploys[4], LightContract.abi, provider);
lightContract.on("Swap", function (nonce, timestamp, signerWallet, signerToken, signerAmount, signerFee, senderWallet, senderToken, senderAmount, event) {
    var DTO = {
        timestamp: timestamp.toString(),
        signerWallet: signerWallet.toString(),
        signerToken: signerToken.toString(),
        signerAmount: signerAmount.toString(),
        signerFee: signerFee.toString(),
        senderWallet: senderWallet.toString(),
        senderToken: senderToken.toString(),
        senderAmount: senderAmount.toString(),
    };
    console.log(DTO);
});

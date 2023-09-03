const sdk = require("@defillama/sdk");
import { sumSingleBalance } from "../helper/generalUtil";
import { getTokenBalance as tronGetTokenBalance } from "../helper/tron";
import { getTokenSupply as tronGetTokenSupply } from "../llama-helper/tron";
import {
  ChainBlocks,
  PeggedIssuanceAdapter,
  Balances,
} from "../peggedAsset.type";

const chainContracts = {
    tron: {
        issued: "TK5nB99SemYRws6nnvrFHGa98odVtjCjwu",
    },
};

async function tronMinted() {
return async function (
    _timestamp: number,
    _ethBlock: number,
    _chainBlocks: ChainBlocks
) {
   let balances = {} as Balances;
    for (let issued of chainContracts[chain].issued) {
    const totalSupply = (
      await sdk.api.abi.call({
        abi: "trc20:totalSupply",
        target: chainContracts.tron.issued,
        block: _trxBlock,
        chain: "tron",
      })
          ).output;
      sumSingleBalance(
        balances,
        "peggedUSD",
        totalSupply / 10 ** decimals,
        "issued",
        false
      );
    }
    return balances;
  };
}
const adapter: PeggedIssuanceAdapter = {
  tron: {
    minted: tronMinted("tron", 6),
    unreleased: async () => ({}),
  },
};

export default adapter;

// @ts-nocheck
import {
  AtomIcon,
  BtcIcon,
  EthIcon,
  OraiIcon,
  UsdcIcon,
  UsdtIcon,
} from "@/assets/icons/token";
import {
  AIRI_BSC_CONTRACT,
  AIRI_CONTRACT,
  ATOM_ORAICHAIN_DENOM,
  AtomToken,
  BTC_CONTRACT,
  BridgeAppCurrency,
  ChainIdEnum,
  CustomChainInfo,
  INJECTIVE_CONTRACT,
  INJECTIVE_ORAICHAIN_DENOM,
  InjectiveToken,
  KWTBSC_ORAICHAIN_DENOM,
  KWT_BSC_CONTRACT,
  KWT_CONTRACT,
  KWT_DENOM,
  KWT_SUB_NETWORK_DENOM,
  MILKYBSC_ORAICHAIN_DENOM,
  MILKY_BSC_CONTRACT,
  MILKY_CONTRACT,
  MILKY_DENOM,
  MILKY_ERC_CONTRACT,
  MILKY_SUB_NETWORK_DENOM,
  NEUTARO_ORAICHAIN_DENOM,
  OCH_CONTRACT,
  OCH_ETH_CONTRACT,
  ORAIIBC_INJECTIVE_DENOM,
  ORAIX_CONTRACT,
  ORAIX_ETH_CONTRACT,
  ORAI_BRIDGE_EVM_DENOM_PREFIX,
  ORAI_BRIDGE_EVM_ETH_DENOM_PREFIX,
  ORAI_BRIDGE_EVM_TRON_DENOM_PREFIX,
  ORAI_BSC_CONTRACT,
  ORAI_ETH_CONTRACT,
  OSMOSIS_ORAICHAIN_DENOM,
  OsmoToken,
  SCATOM_CONTRACT,
  SCORAI_CONTRACT,
  TRX_CONTRACT,
  USDC_CONTRACT,
  USDC_ETH_CONTRACT,
  USDT_BSC_CONTRACT,
  USDT_CONTRACT,
  USDT_ETH_CONTRACT,
  USDT_TRON_CONTRACT,
  WETH_CONTRACT,
  WRAP_BNB_CONTRACT,
  WRAP_ETH_CONTRACT,
  WRAP_TRON_TRX_CONTRACT,
  defaultBech32Config,
} from "@oraichain/oraidex-common";

export const OraiToken: BridgeAppCurrency = {
  coinDenom: "ORAI",
  coinMinimalDenom: "orai",
  coinDecimals: 6,
  coinGeckoId: "oraichain-token",
  Icon: OraiIcon,
  IconLight: OraiIcon,
  bridgeTo: ["0x38", "0x01", "injective-1"],
  gasPriceStep: {
    low: 0.003,
    average: 0.005,
    high: 0.007,
  },
};

export const oraichainNetwork: CustomChainInfo = {
  rpc: "https://rpc.orai.io",
  rest: "https://lcd.orai.io",
  chainId: "Oraichain",
  chainName: "Oraichain",
  networkType: "cosmos",
  stakeCurrency: OraiToken,
  bip44: {
    coinType: 118,
  },
  bech32Config: defaultBech32Config("orai"),
  feeCurrencies: [OraiToken],

  Icon: OraiIcon,
  IconLight: OraiIcon,
  features: ["ibc-transfer", "cosmwasm", "wasmd_0.24+"],
  currencies: [
    OraiToken,
    {
      coinDenom: "ATOM",
      coinGeckoId: "cosmos",
      coinMinimalDenom: ATOM_ORAICHAIN_DENOM,
      bridgeTo: ["cosmoshub-4"],
      coinDecimals: 6,
      Icon: AtomIcon,
      IconLight: AtomIcon,
    },
    {
      coinDenom: "NTMPI",
      coinGeckoId: "neutaro",
      coinMinimalDenom: NEUTARO_ORAICHAIN_DENOM,
      bridgeTo: ["Neutaro-1"],
      coinDecimals: 6,
      // Icon: TimpiIcon,
      // IconLight: TimpiIcon
    },
    {
      coinDenom: "AIRI",
      coinGeckoId: "airight",
      coinMinimalDenom: "airi",
      type: "cw20",
      contractAddress: AIRI_CONTRACT,
      bridgeTo: ["0x38"],
      coinDecimals: 6,
      // Icon: AiriIcon
    },
    {
      coinDenom: "USDT",
      coinGeckoId: "tether",
      coinMinimalDenom: "usdt",
      type: "cw20",
      contractAddress: USDT_CONTRACT,
      bridgeTo: ["0x38", "0x2b6653dc", "0x01"],
      coinDecimals: 6,
      Icon: UsdtIcon,
    },
    {
      coinDenom: "USDC",
      coinGeckoId: "usd-coin",
      coinMinimalDenom: "usdc",
      type: "cw20",
      contractAddress: USDC_CONTRACT,
      bridgeTo: ["0x01", "noble-1"],
      coinDecimals: 6,
      Icon: UsdcIcon,
    },
    {
      coinDenom: "OSMO",
      coinMinimalDenom: OSMOSIS_ORAICHAIN_DENOM,
      coinDecimals: 6,
      coinGeckoId: "osmosis",
      bridgeTo: ["osmosis-1"],
      // Icon: OsmoIcon,
      // IconLight: OsmoIcon
    },
    {
      coinDenom: "BEP20 KWT",
      coinGeckoId: "kawaii-islands",
      coinMinimalDenom: KWTBSC_ORAICHAIN_DENOM,
      coinDecimals: 18,
      // Icon: KwtIcon
    },
    {
      coinDenom: "KWT",
      coinGeckoId: "kawaii-islands",
      coinMinimalDenom: "kwt",
      type: "cw20",
      contractAddress: KWT_CONTRACT,
      bridgeTo: ["kawaii_6886-1", "0x38"],
      coinDecimals: 6,
      // Icon: KwtIcon
    },
    {
      coinDenom: "BEP20 MILKY",
      coinGeckoId: "milky-token",
      coinMinimalDenom: MILKYBSC_ORAICHAIN_DENOM,
      coinDecimals: 18,
      // Icon: MilkyIcon
    },
    {
      coinDenom: "MILKY",
      coinGeckoId: "milky-token",
      coinMinimalDenom: "milky",
      type: "cw20",
      contractAddress: MILKY_CONTRACT,
      bridgeTo: ["kawaii_6886-1", "0x38"],
      coinDecimals: 6,
      // Icon: MilkyIcon
    },
    {
      coinDenom: "ORAIX",
      coinMinimalDenom: "oraix",
      type: "cw20",
      contractAddress: ORAIX_CONTRACT,
      coinGeckoId: "oraidex",
      coinDecimals: 6,
      bridgeTo: ["0x01"],
      // Icon: OraixIcon,
      // IconLight: OraixLightIcon
    },
    {
      coinDenom: "scORAI",
      coinMinimalDenom: "scorai",
      type: "cw20",
      contractAddress: SCORAI_CONTRACT,
      coinGeckoId: "scorai",
      coinDecimals: 6,
      // Icon: ScOraiIcon
    },
    {
      coinDenom: "wTRX",
      coinGeckoId: "tron",
      coinMinimalDenom: "trx",
      type: "cw20",
      contractAddress: TRX_CONTRACT,
      bridgeTo: ["0x2b6653dc"],
      coinDecimals: 6,
      // Icon: TronIcon
    },
    {
      coinDenom: "scATOM",
      coinMinimalDenom: "scatom",
      type: "cw20",
      contractAddress: SCATOM_CONTRACT,
      coinGeckoId: "scatom",
      coinDecimals: 6,
      // Icon: ScAtomIcon
    },
    {
      coinDenom: "IBC INJ",
      coinGeckoId: "injective-protocol",
      coinMinimalDenom: INJECTIVE_ORAICHAIN_DENOM,
      coinDecimals: 18,
      // Icon: InjIcon,
      // IconLight: InjIcon
    },
    {
      coinDenom: "INJ",
      coinGeckoId: "injective-protocol",
      coinMinimalDenom: "injective",
      contractAddress: INJECTIVE_CONTRACT,
      bridgeTo: ["injective-1"],
      type: "cw20",
      coinDecimals: 6,
      // Icon: InjIcon,
      // IconLight: InjIcon
    },
    {
      coinDenom: "WETH",
      coinGeckoId: "weth",
      coinMinimalDenom: "weth",
      type: "cw20",
      contractAddress: WETH_CONTRACT,
      bridgeTo: ["0x01"],
      coinDecimals: 6,
      coinImageUrl:
        "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
      Icon: EthIcon,
      IconLight: EthIcon,
    },
    {
      coinDenom: "OCH",
      coinGeckoId: "och",
      coinMinimalDenom: "och",
      type: "cw20",
      contractAddress: OCH_CONTRACT,
      bridgeTo: ["0x01"],
      coinDecimals: 6,
      coinImageUrl:
        "https://assets.coingecko.com/coins/images/34236/standard/orchai_logo_white_copy_4x-8_%281%29.png?1704307670",
      // Icon: OrchaiIcon,
      // IconLight: OrchaiIcon
    },
    {
      coinDenom: "BTC",
      coinGeckoId: "bitcoin",
      coinMinimalDenom: "usat",
      type: "cw20",
      contractAddress: BTC_CONTRACT,
      bridgeTo: ["bitcoin" as any],
      coinDecimals: 6,
      Icon: BtcIcon,
      IconLight: BtcIcon,
      coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
    },
  ],
};

export const OraiBTCBridgeNetwork = {
  chainId: "oraibtc-mainnet-1",
  chainName: "OraiBtc Bridge",
  rpc: "https://btc.rpc.orai.io",
  rest: "https://btc.lcd.orai.io",
  networkType: "cosmos",
  Icon: BtcIcon,
  IconLight: BtcIcon,
  stakeCurrency: {
    coinDenom: "ORAIBTC",
    coinMinimalDenom: "uoraibtc",
    coinDecimals: 6,
    gasPriceStep: {
      low: 0,
      average: 0,
      high: 0,
    },
    coinImageUrl:
      "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
  },
  bip44: {
    coinType: 118,
  },
  coinType: 118,
  bech32Config: defaultBech32Config("oraibtc"),
  currencies: [
    {
      coinDenom: "ORAIBTC",
      coinMinimalDenom: "uoraibtc",
      coinDecimals: 6,
      gasPriceStep: {
        low: 0,
        average: 0,
        high: 0,
      },
      coinImageUrl:
        "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
    },
    {
      coinDenom: "oBTC",
      coinMinimalDenom: "usat",
      coinDecimals: 14,
      gasPriceStep: {
        low: 0,
        average: 0,
        high: 0,
      },
      coinImageUrl:
        "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
    },
  ],

  get feeCurrencies() {
    return this.currencies;
  },
};

export const bitcoinMainnet: CustomChainInfo = {
  rest: "https://blockstream.info/api",
  rpc: "https://blockstream.info/api",
  chainId: ChainIdEnum.Bitcoin,
  chainName: "Bitcoin",
  bip44: {
    coinType: 0,
  },
  coinType: 0,
  Icon: BtcIcon,
  IconLight: BtcIcon,
  stakeCurrency: {
    coinDenom: "BTC",
    coinMinimalDenom: "btc",
    coinDecimals: 8,
    coinGeckoId: "bitcoin",
    coinImageUrl:
      "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
  },
  bech32Config: defaultBech32Config("bc"),
  networkType: "bitcoin",
  currencies: [
    {
      coinDenom: "BTC",
      coinMinimalDenom: "btc",
      coinDecimals: 8,
      bridgeTo: ["Oraichain"],
      prefixToken: "oraibtc",
      Icon: BtcIcon,
      coinGeckoId: "bitcoin",
      coinImageUrl:
        "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
      gasPriceStep: {
        low: 0,
        average: 0,
        high: 0,
      },
    },
  ],
  get feeCurrencies() {
    return this.currencies;
  },

  features: ["isBtc"],
  txExplorer: {
    name: "BlockStream",
    txUrl: "https://blockstream.info/tx/{txHash}",
    accountUrl: "https://blockstream.info/address/{address}",
  },
};

const OraiBToken: BridgeAppCurrency = {
  coinDenom: "ORAIB",
  coinMinimalDenom: "uoraib",
  coinDecimals: 6,
  gasPriceStep: {
    low: 0,
    average: 0,
    high: 0,
  },
};

const OraiBTCToken: BridgeAppCurrency = {
  coinDenom: "ORAIBTC",
  coinMinimalDenom: "uoraibtc",
  coinDecimals: 6,
  gasPriceStep: {
    low: 0,
    average: 0,
    high: 0,
  },
};

const KawaiiToken: BridgeAppCurrency = {
  coinDenom: "ORAIE",
  coinMinimalDenom: "oraie",
  coinDecimals: 18,
  coinGeckoId: "kawaii-islands",
  // Icon: KwtIcon,
  gasPriceStep: {
    low: 0,
    average: 0.000025,
    high: 0.00004,
  },
};

export const chainInfos: CustomChainInfo[] = [
  // networks to add on keplr
  oraichainNetwork,
  bitcoinMainnet,
  {
    rpc: "https://bridge-v2.rpc.orai.io",
    rest: "https://bridge-v2.lcd.orai.io",
    chainId: "oraibridge-subnet-2",
    chainName: "OraiBridge",
    networkType: "cosmos",
    bip44: {
      coinType: 118,
    },
    bech32Config: defaultBech32Config("oraib"),

    features: ["ibc-transfer"],
    stakeCurrency: OraiBToken,
    feeCurrencies: [OraiBToken],
    // not use oraib as currency
    currencies: [
      OraiBToken,
      {
        coinDenom: "ORAI",
        coinMinimalDenom: ORAI_BRIDGE_EVM_DENOM_PREFIX + ORAI_BSC_CONTRACT,
        bridgeNetworkIdentifier: "0x38",
        coinDecimals: 18,
        coinGeckoId: "oraichain-token",
        IconLight: OraiIcon,
        Icon: OraiIcon,
      },
      {
        coinDenom: "ORAI",
        coinMinimalDenom: ORAI_BRIDGE_EVM_ETH_DENOM_PREFIX + ORAI_ETH_CONTRACT,
        bridgeNetworkIdentifier: "0x01",
        coinDecimals: 18,
        coinGeckoId: "oraichain-token",
        IconLight: OraiIcon,
        prefixToken: ORAI_BRIDGE_EVM_ETH_DENOM_PREFIX,
        Icon: OraiIcon,
      },
      {
        coinDenom: "USDC",
        coinMinimalDenom: ORAI_BRIDGE_EVM_ETH_DENOM_PREFIX + USDC_ETH_CONTRACT,
        bridgeNetworkIdentifier: "0x01",
        coinDecimals: 6,
        coinGeckoId: "usd-coin",
        prefixToken: ORAI_BRIDGE_EVM_ETH_DENOM_PREFIX,
        Icon: UsdcIcon,
      },
      {
        coinDenom: "WETH",
        coinMinimalDenom: ORAI_BRIDGE_EVM_ETH_DENOM_PREFIX + WRAP_ETH_CONTRACT,
        bridgeNetworkIdentifier: "0x01",
        coinDecimals: 6,
        coinGeckoId: "weth",
        prefixToken: ORAI_BRIDGE_EVM_ETH_DENOM_PREFIX,
        Icon: EthIcon,
      },
      {
        coinDenom: "AIRI",
        coinMinimalDenom: ORAI_BRIDGE_EVM_DENOM_PREFIX + AIRI_BSC_CONTRACT,
        bridgeNetworkIdentifier: "0x38",
        coinDecimals: 18,
        coinGeckoId: "airight",
        //   Icon: AiriIcon
      },
      {
        coinDenom: "USDT",
        coinMinimalDenom: ORAI_BRIDGE_EVM_ETH_DENOM_PREFIX + USDT_ETH_CONTRACT,
        bridgeNetworkIdentifier: "0x01",
        coinDecimals: 6,
        coinGeckoId: "tether",
        prefixToken: ORAI_BRIDGE_EVM_ETH_DENOM_PREFIX,
        Icon: UsdtIcon,
      },
      {
        coinDenom: "USDT",
        coinMinimalDenom: ORAI_BRIDGE_EVM_DENOM_PREFIX + USDT_BSC_CONTRACT,
        bridgeNetworkIdentifier: "0x38",
        coinDecimals: 18,
        coinGeckoId: "tether",
        Icon: UsdtIcon,
      },
      {
        coinDenom: "USDT",
        coinMinimalDenom:
          ORAI_BRIDGE_EVM_TRON_DENOM_PREFIX + USDT_TRON_CONTRACT,
        bridgeNetworkIdentifier: "0x2b6653dc",
        prefixToken: ORAI_BRIDGE_EVM_TRON_DENOM_PREFIX,
        coinDecimals: 6,
        coinGeckoId: "tether",
        Icon: UsdtIcon,
      },
      {
        coinDenom: "wTRX",
        coinMinimalDenom:
          ORAI_BRIDGE_EVM_TRON_DENOM_PREFIX + WRAP_TRON_TRX_CONTRACT,
        bridgeNetworkIdentifier: "0x2b6653dc",
        coinDecimals: 6,
        coinGeckoId: "tron",
        prefixToken: ORAI_BRIDGE_EVM_TRON_DENOM_PREFIX,
        //   Icon: TronIcon
      },
      {
        coinDenom: "KWT",
        bridgeNetworkIdentifier: "0x38",
        coinMinimalDenom: KWT_DENOM,
        coinDecimals: 18,
        coinGeckoId: "kawaii-islands",
        //   Icon: KwtIcon
      },
      {
        coinDenom: "MILKY",
        bridgeNetworkIdentifier: "0x38",
        coinMinimalDenom: MILKY_DENOM,
        coinDecimals: 18,
        coinGeckoId: "milky-token",
        //   Icon: MilkyIcon
      },
      {
        coinDenom: "OCH",
        coinMinimalDenom: ORAI_BRIDGE_EVM_ETH_DENOM_PREFIX + OCH_ETH_CONTRACT,
        bridgeNetworkIdentifier: "0x01",
        coinDecimals: 18,
        coinGeckoId: "och",
        prefixToken: ORAI_BRIDGE_EVM_ETH_DENOM_PREFIX,
        coinImageUrl:
          "https://assets.coingecko.com/coins/images/34236/standard/orchai_logo_white_copy_4x-8_%281%29.png?1704307670",
      },
      {
        coinDenom: "ORAIX",
        coinMinimalDenom: ORAI_BRIDGE_EVM_ETH_DENOM_PREFIX + ORAIX_ETH_CONTRACT,
        bridgeNetworkIdentifier: "0x01",
        coinDecimals: 18,
        coinGeckoId: "oraidex",
        prefixToken: ORAI_BRIDGE_EVM_ETH_DENOM_PREFIX,
        coinImageUrl: "https://i.ibb.co/VmMJtf7/oraix.png",
      },
    ],
  },

  {
    rpc: "https://tendermint1.kawaii.global",
    rest: "https://cosmos1.kawaii.global",
    chainId: "kawaii_6886-1",
    chainName: "Kawaiiverse",
    networkType: "cosmos",
    stakeCurrency: KawaiiToken,
    bip44: {
      coinType: 60,
    },
    bech32Config: defaultBech32Config("oraie"),
    feeCurrencies: [KawaiiToken],

    // Icon: KwtIcon,
    // features: ['ibc-transfer'],
    features: [
      "ibc-transfer",
      "ibc-go",
      "stargate",
      "eth-address-gen",
      "eth-key-sign",
    ],
    currencies: [
      KawaiiToken,
      {
        coinDenom: "MILKY",
        coinGeckoId: "milky-token",
        coinMinimalDenom: MILKY_SUB_NETWORK_DENOM,
        coinDecimals: 18,
        bridgeTo: ["Oraichain", "kawaii_6886-1"],
        // Icon: MilkyIcon,
      },
      {
        coinDenom: "ERC20 MILKY",
        coinMinimalDenom: "erc20_milky",
        bridgeTo: ["Oraichain", "kawaii_6886-1"],
        contractAddress: MILKY_ERC_CONTRACT,
        coinDecimals: 18,
        coinGeckoId: "milky-token",
        // Icon: MilkyIcon,
      },
      {
        coinDenom: "KWT",
        coinMinimalDenom: KWT_SUB_NETWORK_DENOM,
        coinDecimals: 18,
        bridgeTo: ["Oraichain", "kawaii_6886-1"],
        coinGeckoId: "kawaii-islands",
        // Icon: KwtIcon,
      },
      {
        coinDenom: "ERC20 KWT",
        bridgeTo: ["Oraichain", "kawaii_6886-1"],
        coinMinimalDenom: "erc20_kwt",
        contractAddress: "0x80b5a32E4F032B2a058b4F29EC95EEfEEB87aDcd",
        coinDecimals: 18,
        coinGeckoId: "kawaii-islands",
        // Icon: KwtIcon,
      },
    ],
  },

  /// popular networks already included
  {
    rpc: "https://osmosis.rpc.orai.io/",
    rest: "https://osmosis.lcd.orai.io/",
    chainId: "osmosis-1",
    chainName: "Osmosis",
    networkType: "cosmos",
    bip44: {
      coinType: 118,
    },
    //   Icon: OsmoIcon,
    //   IconLight: OsmoIcon,
    bech32Config: defaultBech32Config("osmo"),
    feeCurrencies: [OsmoToken],
    currencies: [
      {
        coinDenom: "OSMO",
        coinMinimalDenom: "uosmo",
        coinDecimals: 6,
        coinGeckoId: "osmosis",
        bridgeTo: ["Oraichain"],
        //   Icon: OsmoIcon,
        //   IconLight: OsmoIcon
      },
    ],
  },
  {
    rpc: "https://btc.rpc.orai.io",
    rest: "https://btc.lcd.orai.io/",
    chainId: "oraibtc-mainnet-1",
    chainName: "OraiBTC",
    networkType: "cosmos",
    bip44: {
      coinType: 118,
    },
    Icon: BtcIcon,
    IconLight: BtcIcon,
    bech32Config: defaultBech32Config("oraibtc"),
    feeCurrencies: [OraiBTCToken],
    currencies: [
      {
        coinDenom: "BTC",
        coinMinimalDenom: "uoraibtc",
        coinDecimals: 6,
        coinGeckoId: "bitcoin",
        bridgeTo: ["Oraichain"],
        Icon: BtcIcon,
        IconLight: BtcIcon,
      },
    ],
  },
  /// popular networks already included
  {
    rpc: "https://injective.rpc.orai.io",
    rest: "https://injective.lcd.orai.io",
    chainId: "injective-1",
    chainName: "Injective",
    networkType: "cosmos",
    bip44: {
      coinType: 60,
    },
    //   Icon: InjIcon,
    //   IconLight: InjIcon,
    bech32Config: defaultBech32Config("inj"),
    feeCurrencies: [InjectiveToken],
    currencies: [
      {
        coinDenom: "INJ",
        coinMinimalDenom: "inj",
        coinDecimals: 18,
        coinGeckoId: "injective-protocol",
        bridgeTo: ["Oraichain"],
        //   Icon: InjIcon,
        //   IconLight: InjIcon
      },
      {
        coinDenom: "ORAI",
        coinMinimalDenom: ORAIIBC_INJECTIVE_DENOM,
        coinDecimals: 6,
        coinGeckoId: "oraichain-token",
        bridgeTo: ["Oraichain"],
        Icon: OraiIcon,
        IconLight: OraiIcon,
      },
    ],
  },
  {
    rpc: "https://noble-rpc.polkachu.com/",
    rest: "https://noble-api.polkachu.com",
    chainId: "noble-1",
    chainName: "Noble",
    networkType: "cosmos",
    bip44: {
      coinType: 118,
    },
    bech32Config: defaultBech32Config("noble"),
    features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
    //   Icon: NobleIcon,
    //   IconLight: NobleIcon,
    currencies: [
      {
        coinDenom: "USDC",
        coinMinimalDenom: "uusdc",
        coinDecimals: 6,
        coinGeckoId: "usd-coin",
        coinImageUrl:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/noble/images/USDCoin.png",
        gasPriceStep: {
          low: 0,
          average: 0.025,
          high: 0.03,
        },
        bridgeTo: ["Oraichain"],
        Icon: UsdcIcon,
        IconLight: UsdcIcon,
      },
    ],
    feeCurrencies: [
      {
        coinDenom: "USDC",
        coinMinimalDenom: "uusdc",
        coinDecimals: 6,
        coinGeckoId: "usd-coin",
        coinImageUrl:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/noble/images/USDCoin.png",
        gasPriceStep: {
          low: 0,
          average: 0.025,
          high: 0.03,
        },
      },
    ],
    stakeCurrency: {
      coinDecimals: 6,
      coinDenom: "STAKE",
      coinMinimalDenom: "ustake",
      coinImageUrl:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/noble/images/stake.png",
    },
    chainSymbolImageUrl:
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/noble/images/stake.png",
    txExplorer: {
      name: "Mintscan",
      txUrl: "https://www.mintscan.io/noble/txs/{txHash}",
    },
  },
  {
    // rpc: 'http://rpc.neutaro.tech:26657/',
    rpc: "https://neutaro.rpc.orai.io",
    rest: "https://neutaro.lcd.orai.io",
    // rest: 'http://api.neutaro.tech:1317/',
    chainId: "Neutaro-1",
    chainName: "Neutaro",
    networkType: "cosmos",
    bip44: {
      coinType: 118,
    },
    //   Icon: NeutaroIcon,
    //   IconLight: NeutaroIcon,
    bech32Config: defaultBech32Config("neutaro"),
    stakeCurrency: {
      coinDenom: "ntmpi",
      coinMinimalDenom: "uneutaro",
      coinDecimals: 6,
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/Neutaro/chain.png",
    },
    feeCurrencies: [
      {
        coinDenom: "ntmpi",
        coinMinimalDenom: "uneutaro",
        coinDecimals: 6,
        coinImageUrl:
          "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/Neutaro/chain.png",
        gasPriceStep: {
          low: 0.01,
          average: 0.025,
          high: 0.03,
        },
      },
    ],
    currencies: [
      {
        coinDenom: "NTMPI",
        coinMinimalDenom: "uneutaro",
        coinDecimals: 6,
        bridgeTo: ["Oraichain"],
        coinGeckoId: "neutaro",
        //   Icon: TimpiIcon,
        //   IconLight: TimpiIcon
      },
    ],
  },
  {
    rpc: "https://rpc-cosmos.oraidex.io",
    rest: "https://lcd-cosmos.oraidex.io",
    chainId: "cosmoshub-4",
    chainName: "Cosmos Hub",
    networkType: "cosmos",
    bip44: {
      coinType: 118,
    },
    Icon: AtomIcon,
    IconLight: AtomIcon,
    bech32Config: defaultBech32Config("cosmos"),
    feeCurrencies: [AtomToken],
    currencies: [
      {
        coinDenom: "ATOM",
        coinGeckoId: "cosmos",
        coinMinimalDenom: "uatom",
        coinDecimals: 6,
        bridgeTo: ["Oraichain"],
        Icon: AtomIcon,
        IconLight: AtomIcon,
      },
    ],
  },

  /// evm chain info
  {
    rpc: "https://rpc.ankr.com/eth",
    chainId: "0x01",
    chainName: "Ethereum",
    bip44: {
      coinType: 60,
    },
    Icon: EthIcon,
    networkType: "evm",
    currencies: [
      {
        coinDenom: "ORAI",
        coinMinimalDenom: "erc20_orai",
        contractAddress: ORAI_ETH_CONTRACT,
        coinDecimals: 18,
        bridgeTo: ["Oraichain"],
        coinGeckoId: "oraichain-token",
        IconLight: OraiIcon,
        prefixToken: ORAI_BRIDGE_EVM_ETH_DENOM_PREFIX,
        Icon: OraiIcon,
      },
      {
        coinDenom: "USDC",
        coinMinimalDenom: "erc20_usdc",
        contractAddress: USDC_ETH_CONTRACT,
        coinDecimals: 6,
        bridgeTo: ["Oraichain"],
        coinGeckoId: "usd-coin",
        prefixToken: ORAI_BRIDGE_EVM_ETH_DENOM_PREFIX,
        Icon: UsdcIcon,
      },
      {
        coinDenom: "WETH",
        coinMinimalDenom: "erc20_eth",
        contractAddress: WRAP_ETH_CONTRACT,
        coinDecimals: 18,
        bridgeTo: ["Oraichain"],
        coinGeckoId: "weth",
        prefixToken: ORAI_BRIDGE_EVM_ETH_DENOM_PREFIX,
        Icon: EthIcon,
      },
      {
        coinDenom: "ETH",
        coinMinimalDenom: "eth",
        contractAddress: "",
        coinDecimals: 18,
        bridgeTo: ["Oraichain"],
        coinGeckoId: "ethereum",
        Icon: EthIcon,
        prefixToken: ORAI_BRIDGE_EVM_ETH_DENOM_PREFIX,
      },
      {
        coinDenom: "USDT",
        coinMinimalDenom: "erc20_usdt",
        contractAddress: USDT_ETH_CONTRACT,
        coinDecimals: 6,
        bridgeTo: ["Oraichain"],
        coinGeckoId: "tether",
        prefixToken: ORAI_BRIDGE_EVM_ETH_DENOM_PREFIX,
        Icon: UsdtIcon,
      },
      {
        coinDenom: "OCH",
        coinMinimalDenom: "erc20_och",
        contractAddress: OCH_ETH_CONTRACT,
        coinDecimals: 18,
        bridgeTo: ["Oraichain"],
        coinGeckoId: "och",
        prefixToken: ORAI_BRIDGE_EVM_ETH_DENOM_PREFIX,
        coinImageUrl:
          "https://assets.coingecko.com/coins/images/34236/standard/orchai_logo_white_copy_4x-8_%281%29.png?1704307670",
        //   Icon: OrchaiIcon
      },
      {
        coinDenom: "ORAIX",
        coinMinimalDenom: "erc20_oraix",
        contractAddress: ORAIX_ETH_CONTRACT,
        coinDecimals: 18,
        bridgeTo: ["Oraichain"],
        coinGeckoId: "oraidex",
        prefixToken: ORAI_BRIDGE_EVM_ETH_DENOM_PREFIX,
        //   Icon: OraixIcon
      },
    ],
  },
  {
    rpc: "https://api.trongrid.io/jsonrpc",
    rest: "https://api.trongrid.io",
    chainId: "0x2b6653dc",
    networkType: "evm",
    chainName: "Tron Network",
    //   Icon: TronIcon,
    currencies: [
      {
        coinDenom: "USDT",
        coinMinimalDenom: "trx20_usdt",
        contractAddress: USDT_TRON_CONTRACT,
        bridgeTo: ["Oraichain"],
        coinDecimals: 6,
        coinGeckoId: "tether",
        prefixToken: ORAI_BRIDGE_EVM_TRON_DENOM_PREFIX,
        Icon: UsdtIcon,
      },
      {
        coinDenom: "wTRX",
        coinMinimalDenom: "trx20_trx",
        contractAddress: WRAP_TRON_TRX_CONTRACT,
        bridgeTo: ["Oraichain"],
        coinDecimals: 6,
        coinGeckoId: "tron",
        prefixToken: ORAI_BRIDGE_EVM_TRON_DENOM_PREFIX,
        //   Icon: TronIcon
      },
    ],
    bip44: {
      coinType: 195,
    },
  },
  {
    rpc: "https://bsc-dataseed1.binance.org",
    networkType: "evm",
    //   Icon: BnbIcon,
    chainId: "0x38",
    chainName: "BNB Chain",
    bip44: {
      coinType: 60,
    },
    currencies: [
      {
        coinDenom: "ORAI",
        coinMinimalDenom: "bep20_orai",
        contractAddress: ORAI_BSC_CONTRACT,
        bridgeTo: ["Oraichain"],
        coinDecimals: 18,
        coinGeckoId: "oraichain-token",
        prefixToken: ORAI_BRIDGE_EVM_DENOM_PREFIX,
        Icon: OraiIcon,
        //   IconLight: OraiLightIcon
      },
      {
        coinDenom: "AIRI",
        coinMinimalDenom: "bep20_airi",
        contractAddress: AIRI_BSC_CONTRACT,
        bridgeTo: ["Oraichain"],
        coinDecimals: 18,
        coinGeckoId: "airight",
        prefixToken: ORAI_BRIDGE_EVM_DENOM_PREFIX,
        //   Icon: AiriIcon
      },
      {
        coinDenom: "USDT",
        coinMinimalDenom: "bep20_usdt",
        contractAddress: USDT_BSC_CONTRACT,
        bridgeTo: ["Oraichain"],
        coinDecimals: 18,
        coinGeckoId: "tether",
        prefixToken: ORAI_BRIDGE_EVM_DENOM_PREFIX,
        Icon: UsdtIcon,
      },
      {
        coinDenom: "KWT",
        coinMinimalDenom: "bep20_kwt",
        contractAddress: KWT_BSC_CONTRACT,
        bridgeTo: ["Oraichain"],
        coinDecimals: 18,
        coinGeckoId: "kawaii-islands",
        //   Icon: KwtIcon
      },
      {
        coinDenom: "MILKY",
        coinMinimalDenom: "bep20_milky",
        contractAddress: MILKY_BSC_CONTRACT,
        coinDecimals: 18,
        coinGeckoId: "milky-token",
        bridgeTo: ["Oraichain"],
        //   Icon: MilkyIcon
      },
      {
        coinDenom: "WBNB",
        coinMinimalDenom: "bep20_wbnb",
        contractAddress: WRAP_BNB_CONTRACT,
        coinDecimals: 18,
        coinGeckoId: "wbnb",
        bridgeTo: ["Oraichain"],
        //   Icon: BnbIcon
      },
      {
        coinDenom: "BNB",
        coinMinimalDenom: "bnb",
        contractAddress: "",
        coinDecimals: 18,
        coinGeckoId: "binancecoin",
        bridgeTo: ["Oraichain"],
        prefixToken: ORAI_BRIDGE_EVM_DENOM_PREFIX,
        //   Icon: BnbIcon
      },
    ],
  },
  {
    rpc: "https://endpoint1.kawaii.global",
    chainId: "0x1ae6",
    networkType: "evm",
    chainName: "Kawaiiverse EVM",
    //   Icon: KwtIcon,
    bip44: {
      coinType: 60,
    },
    currencies: [
      {
        coinDenom: "ERC20 MILKY",
        coinMinimalDenom: "erc20_milky",
        bridgeTo: ["Oraichain", "kawaii_6886-1"],
        contractAddress: MILKY_ERC_CONTRACT,
        coinDecimals: 18,
        coinGeckoId: "milky-token",
        //   Icon: MilkyIcon
      },
      {
        coinDenom: "ERC20 KWT",
        bridgeTo: ["Oraichain", "kawaii_6886-1"],
        coinMinimalDenom: "erc20_kwt",
        contractAddress: "0x80b5a32E4F032B2a058b4F29EC95EEfEEB87aDcd",
        coinDecimals: 18,
        coinGeckoId: "kawaii-islands",
        //   Icon: KwtIcon
      },
    ],
  },
];

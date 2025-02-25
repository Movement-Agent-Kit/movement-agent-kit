export const MOVE_DECIMALS = 8;

export const MOVEMENT_NETWORK_CONFIG = {
    mainnet: {
        fullnode: 'https://mainnet.movementnetwork.xyz/v1',
        chainId: '126',
        name: 'Movement Mainnet',
        explorerNetwork: 'mainnet',
        explorerUrl: 'https://explorer.movementnetwork.xyz/txn',
        faucetUrl: null
    },
    bardock: {
        fullnode: 'https://aptos.testnet.bardock.movementlabs.xyz/v1',
        chainId: '250',
        name: 'Movement Bardock Testnet',
        explorerNetwork: 'bardock+testnet',
        explorerUrl: 'https://explorer.movementnetwork.xyz/txn',
        faucetUrl: 'https://faucet.bardock.movement.com'
    }
} as const;

export const DEFAULT_NETWORK = 'bardock';
export const MOVEMENT_EXPLORER_URL = 'https://explorer.movementnetwork.xyz/txn';

// DEX Configuration for price fetching
export const MOVEMENT_DEX_CONFIG = {
    moveUsdcPoolAddress: "0xA04d13F092f68F603A193832222898B0d9f52c71",
    dexScreenerUrl: "https://api.dexscreener.com/latest/dex/pairs/ethereum",
    priceRefreshInterval: 300000, // 5 minutes in milliseconds
};

export const HERMES_SERVICE_URL: string = "https://hermes.pyth.network";
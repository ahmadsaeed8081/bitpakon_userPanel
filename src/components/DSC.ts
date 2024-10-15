import { Chain } from 'wagmi'

export const DSC = {
  id: 10523,
  name: 'Du Smartchain',
  network: 'Du Smartchain',
  nativeCurrency: {
    decimals: 18,
    name: 'Du Smartchain',
    symbol: 'DU',
  },
  rpcUrls: {
    default: { http: ['https://mainnet-rpc.dscscan.com/'] },
  },
  blockExplorers: {
    etherscan: { name: 'SnowTrace', url: 'https://dscscan.com/' },
    default: { name: 'SnowTrace', url: 'https://dscscan.com/' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 11_907_934,
    },
  },
} as const satisfies Chain
import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { PortisConnector } from '@web3-react/portis-connector'

import { FortmaticConnector } from './Fortmatic'
import { NetworkConnector } from './NetworkConnector'

// const NETWORK_URL = process.env.REACT_APP_NETWORK_URL
// const FORMATIC_KEY = process.env.REACT_APP_FORTMATIC_KEY
// const PORTIS_ID = process.env.REACT_APP_PORTIS_ID
// const CHAIN_ID = process.env.REACT_APP_CHAIN_ID
const NETWORK_URL = 'https://mainnet.infura.io/v3/0953ace2675d4c0bb5ddf566a9304cb3'
const FORMATIC_KEY = 'pk_live_4B3E8ED01FFAB1C3'
const PORTIS_ID = '6623d27c-8327-4dde-9ff1-714791c6769a'
const CHAIN_ID = '1'

export const NETWORK_CHAIN_ID: number = parseInt(CHAIN_ID ?? '1')

if (typeof NETWORK_URL === 'undefined') {
  throw new Error(`REACT_APP_NETWORK_URL must be a defined environment variable`)
}

export const network = new NetworkConnector({
  urls: { [NETWORK_CHAIN_ID]: NETWORK_URL }
})

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider as any))
}

export const injected = new InjectedConnector({
  // supportedChainIds: [1, 3, 4, 5, 42]
  supportedChainIds: [1, 42]
})

// mainnet only
export const walletconnect = new WalletConnectConnector({
  rpc: { 1: NETWORK_URL },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 15000
})

// mainnet only
export const fortmatic = new FortmaticConnector({
  apiKey: FORMATIC_KEY ?? '',
  chainId: 1
})

// mainnet only
export const portis = new PortisConnector({
  dAppId: PORTIS_ID ?? '',
  networks: [1]
})

// mainnet only
export const walletlink = new WalletLinkConnector({
  url: NETWORK_URL,
  appName: 'DPEX',
  appLogoUrl: 'https://dpex.passive-income.io/static/media/logo_white.805f36fa.svg'
})

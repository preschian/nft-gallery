import { SupportWalletExtension } from '@/utils/config/wallets'
import { BaseDotsamaWallet } from '@/utils/config/wallets/BaseDotsamaWallet'

export class NovaWallet extends BaseDotsamaWallet {
  img = require('@/assets/partners/logo-nova.png')
  extensionName = 'polkadot-js'
  name = 'Nova'
  source = SupportWalletExtension.Nova
  walletUrl = 'https://novawallet.io/'
  guideUrl = 'https://novawallet.io/'
  isBrowserExtension = false
  isMobileApp = true
}

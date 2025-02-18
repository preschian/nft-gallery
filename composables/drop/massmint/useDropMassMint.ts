import type { Prefix } from '@kodadot1/static'
import type { ToMintNft } from '@/components/collection/drop/types'
import { generateIdAssethub, setDyndataUrl } from '@/services/dyndata'

export type MassMintNFT = Omit<ToMintNft, 'priceUSD'> & {
  image: string
  metadata: string
  nft: number // nft id
  sn?: number // serial numbers
}

export default () => {
  const { $i18n } = useNuxtApp()
  const dropStore = useDropStore()
  const { drop, amountToMint, toMintNFTs, loading } = storeToRefs(dropStore)
  const { isSub } = useIsChain(usePrefix().urlPrefix)

  // ensure tokenIds are unique on single user session
  const tokenIds = ref<number[]>([])
  const populateTokenIds = async () => {
    for (const _ of Array.from({ length: amountToMint.value })) {
      const tokenId = Number.parseInt(await generateIdAssethub(parseInt(drop.value.collection), usePrefix().urlPrefix.value as Prefix))
      if (!tokenIds.value.includes(tokenId)) {
        tokenIds.value.push(tokenId)
      }
    }

    if (tokenIds.value.length < amountToMint.value) {
      await populateTokenIds()
    }
  }

  const clearMassMint = () => {
    dropStore.resetMassmint()
    tokenIds.value = []
  }

  const massGenerate = async () => {
    try {
      clearMassMint()
      if (isSub.value) {
        await populateTokenIds()
      }

      toMintNFTs.value = Array.from({ length: amountToMint.value }).map(
        (_, index) => {
          const { image, metadata } = setDyndataUrl({
            chain: drop.value.chain,
            collection: drop.value.collection,
            nft: tokenIds.value[index],
          })

          return {
            name: drop.value.name,
            collectionName: drop.value.collectionName,
            price: drop.value.price?.toString() || '',
            nft: tokenIds.value[index],
            metadata,
            image,
          }
        },
      )

      console.log('[MASSMINT::GENERATE] Generated', toRaw(toMintNFTs.value))
    }
    catch (error) {
      dangerMessage($i18n.t('drops.mintDropError', [error?.toString()]))
      console.log('[MASSMINT::GENERATE] Failed', error)
      loading.value = false
      throw error
    }
  }

  onBeforeUnmount(clearMassMint)

  return {
    massGenerate,
    clearMassMint,
  }
}

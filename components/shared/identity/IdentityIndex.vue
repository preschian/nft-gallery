<template>
  <div
    v-if="
      ((showTwitter && twitter) || !showTwitter) &&
      ((showDiscord && discord) || !showDiscord)
    "
    class="is-flex-wrap-wrap is-flex-grow-1">
    <IdentitySocial
      v-if="(showTwitter && twitter) || (showDiscord && discord)"
      :twitter="twitter"
      :show-twitter="showTwitter"
      :discord="discord"
      :show-discord="showDiscord" />
    <IdentityChain
      v-else
      :show-onchain-identity="showOnchainIdentity"
      :hide-identity-popover="hideIdentityPopover"
      :is-fetching-identity="isFetchingIdentity"
      :identity="identity"
      :address="address"
      :shortened-address="shortenedAddress"
      :name="name" />
  </div>
</template>

<script lang="ts" setup>
import { GenericAccountId } from '@polkadot/types/generic/AccountId'
import useIdentity from './useIdentity'

type Address = string | GenericAccountId | undefined

const IdentitySocial = defineAsyncComponent(
  () => import('@/components/shared/identity/IdentitySocial.vue')
)
const IdentityChain = defineAsyncComponent(
  () => import('@/components/shared/identity/IdentityChain.vue')
)

const props = defineProps<{
  address?: Address
  emit?: boolean
  showTwitter?: boolean
  showDiscord?: boolean
  showOnchainIdentity?: boolean
  hideIdentityPopover?: boolean
  customNameOption?: string
  inline?: boolean
}>()

const {
  identity,
  isFetchingIdentity,
  shortenedAddress,
  twitter,
  discord,
  display,
  name,
} = useIdentity({
  address: props.address,
  customNameOption: props.customNameOption,
})

const totalCreated = ref(0)
const totalCollected = ref(0)
const firstMintDate = ref(new Date())
const lastBoughtDate = ref(new Date())

provide('address', props.address)
provide('shortenedAddress', shortenedAddress.value)
provide('firstMintDate', firstMintDate)
provide('lastBoughtDate', lastBoughtDate)
provide('totalCreated', totalCreated)
provide('totalCollected', totalCollected)
provide(
  'identity',
  computed(() => ({
    address: props.address,
    display: display.value,
    twitter: twitter.value,
  }))
)
</script>

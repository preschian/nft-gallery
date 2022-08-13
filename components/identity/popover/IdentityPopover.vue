<template>
  <v-tippy
    class="tippy-container"
    interactive
    :animate-fill="false"
    placement="bottom"
    :delay="[100, 800]"
    data-cy="identity">
    <template v-slot:trigger>
      <slot name="trigger" />
    </template>

    <div class="popover-content-container p-4 ms-dos-shadow">
      <IdentityPopoverHeader
        :identity="identity"
        :address="shortenedAddress"
        started-minting=""
        last-bought="" />
      <hr style="height: 1px" class="m-0" />
      <!-- <IdentityPopoverFooter /> -->
    </div>
  </v-tippy>
</template>

<script lang="ts" setup>
import { computed, defineProps, onMounted, ref, useNuxtApp } from '#app'
import { isAfter, subHours } from 'date-fns'

import Identicon from '@polkadot/vue-identicon'
import IdentityPopoverFooter from './IdentityPopoverFooter.vue'
import IdentityPopoverHeader from './IdentityPopoverHeader.vue'

import { Interaction } from '@/components/rmrk/service/scheme'
import { MintInfo } from '@/store/identityMint'

import { notificationTypes, showNotification } from '@/utils/notification'
import resolveQueryPath from '@/utils/queryPathResolver'
import shortAddress from '@/utils/shortAddress'
import shouldUpdate from '@/utils/shouldUpdate'

import CreatedAtMixin from '@/utils/mixins/createdAtMixin'
import PrefixMixin from '@/utils/mixins/prefixMixin'
import prefix from '@/utils/hooks/usePrefix'

type Address = string | undefined
type IdentityFields = Record<string, string>

const { $apollo, $store } = useNuxtApp()

const props = defineProps<{
  identity: IdentityFields
}>()

const totalCreated = ref(0)
const totalCollected = ref(0)
const totalSold = ref(0)
const firstMintDate = ref(new Date())
const lastBoughtDate = ref(new Date())

const { client } = prefix()

const shortenedAddress = computed(() => {
  return shortAddress(props.identity.address || '')
})

onMounted(() => {
  fetchLastBought()
  fetchNFTStats()
})

const fetchLastBought = async () => {
  const query = await resolveQueryPath(client.value, 'buyEventByProfile')
  const { data } = await $apollo.query({
    query: query.default,
    client: client.value,
    variables: {
      id: props.identity.address,
    },
  })

  if (data.events.length) {
    lastBoughtDate.value = new Date(data.events[0].timestamp)
  }
}

const fetchNFTStats = async () => {
  try {
    const data = $store.getters['identityMint/getIdentityMintFor'](
      props.identity.address
    )

    console.log({ data })

    // if cache exist and within 12h
    // if (data?.updatedAt && isAfter(data.updatedAt, subHours(Date.now(), 12))) {
    //   await handleResult({ data, type: 'cache' })
    // } else {
    // const query = await resolveQueryPath(client.value, 'userStatsByAccount')

    // $apollo.addSmartQuery('collections', {
    //   query: query.default,
    //   manual: true,
    //   client: client,
    //   loadingKey: 'isLoading',
    //   result: handleResult,
    //   variables: {
    //     account: props.identity.address || '',
    //   },
    //   fetchPolicy: 'cache-and-network',
    // })
    // }
  } catch (e) {
    showNotification(`${e}`, notificationTypes.danger)
    // $consola.warn(e)
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables';

.tippy-container {
  display: inline-block;
}

.popover-content-container {
  border: 2px solid $primary;
  max-width: 350px;
}

.popover-image {
  min-width: 60px;
}

.popover-stats-container {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.break-word {
  overflow-wrap: break-word;
}

.ms-dos-shadow {
  box-shadow: $dropdown-content-shadow;
}
</style>

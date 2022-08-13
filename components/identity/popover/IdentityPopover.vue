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
        :started-minting="startedMinting"
        :last-bought="lastBought"
        :total-collected="totalCollected"
        :total-created="totalCreated" />
      <hr style="height: 1px" class="m-0" />
      <IdentityPopoverFooter
        :total-collected="totalCollected"
        :total-created="totalCreated"
        :total-sold="totalSold" />
    </div>
  </v-tippy>
</template>

<script lang="ts" setup>
import { computed, defineProps, onMounted, ref, useNuxtApp, watch } from '#app'
import { isAfter, subHours } from 'date-fns'

import IdentityPopoverFooter from './IdentityPopoverFooter.vue'
import IdentityPopoverHeader from './IdentityPopoverHeader.vue'

import { Interaction } from '@/components/rmrk/service/scheme'
import { MintInfo } from '@/store/identityMint'

import { notificationTypes, showNotification } from '@/utils/notification'
import { formatToNow } from '@/utils/format/time'
import resolveQueryPath from '@/utils/queryPathResolver'
import shortAddress from '@/utils/shortAddress'

import prefix from '@/utils/hooks/usePrefix'

const { $apollo, $store, $consola } = useNuxtApp()

const props = defineProps<{
  identity: { [key: string]: string }
}>()

const totalCreated = ref(0)
const totalCollected = ref(0)
const totalSold = ref(0)
const firstMintDate = ref(new Date())
const lastBoughtDate = ref(new Date())

const { client } = prefix()

const address = computed(() => {
  return props.identity.address
})

const shortenedAddress = computed(() => {
  return shortAddress(props.identity.address || '')
})

const startedMinting = computed(() => {
  return formatToNow(firstMintDate.value)
})

const lastBought = computed(() => {
  return formatToNow(lastBoughtDate.value)
})

onMounted(() => {
  if (address.value) {
    fetchLastBought()
    fetchNFTStats()
  }
})

const fetchLastBought = async () => {
  const query = await resolveQueryPath(client.value, 'buyEventByProfile')
  const { data } = await $apollo.query<{ events: Interaction[] }>({
    query: query.default,
    client: client.value,
    variables: {
      id: address.value,
    },
  })

  if (data.events.length) {
    lastBoughtDate.value = new Date(data.events[0].timestamp)
  }
}

const handleNFTStats = async ({
  data,
  type,
}: {
  data: MintInfo | any
  type?: 'cache'
}) => {
  if (type === 'cache') {
    totalCreated.value = data.totalCreated
    totalCollected.value = data.totalCollected
    totalSold.value = data.totalSold
    firstMintDate.value = data.firstMintDate
  } else if (data) {
    totalCreated.value = data.created.totalCount
    totalCollected.value = data.collected.totalCount
    totalSold.value = data.sold.totalCount

    if (data?.firstMint?.length > 0) {
      firstMintDate.value = data.firstMint[0].createdAt
    }

    const cacheData = {
      totalCreated: totalCreated.value,
      totalCollected: totalCollected.value,
      totalSold: totalSold.value,
      firstMintDate: firstMintDate.value,
      updatedAt: Date.now(),
    }

    await $store.dispatch('identityMint/setIdentity', {
      address: address.value,
      cacheData,
    })
  }
}

const fetchNFTStats = async () => {
  try {
    const data = $store.getters['identityMint/getIdentityMintFor'](
      address.value
    )

    // if cache exist and within 12h
    if (data?.updatedAt && isAfter(data.updatedAt, subHours(Date.now(), 12))) {
      handleNFTStats({ data, type: 'cache' })
    } else {
      const query = await resolveQueryPath(client.value, 'userStatsByAccount')
      const { data: account } = await $apollo.query({
        query: query.default,
        client: client.value,
        variables: {
          account: address.value,
        },
      })

      handleNFTStats({ data: account })
    }
  } catch (e) {
    showNotification(`${e}`, notificationTypes.danger)
    $consola.warn(e)
  }
}

watch(address, () => {
  if (address) {
    fetchNFTStats()
  }
})
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

.ms-dos-shadow {
  box-shadow: $dropdown-content-shadow;
}
</style>

<template>
  <div class="columns mb-3">
    <div class="column is-one-quarter">
      <Identicon
        :size="60"
        :theme="'polkadot'"
        :value="identity.address"
        class="popover-image avatar mr-5" />
    </div>
    <div class="column is-three-quarters">
      <p class="has-text-weight-bold is-size-5 mb-1 break-word">
        {{ identity.display }}
      </p>
      <a
        :href="`https://twitter.com/${identity.twitter}`"
        class="is-flex is-align-items-center mb-2"
        target="_blank"
        rel="noopener noreferrer"
        v-if="identity.twitter">
        <b-icon
          pack="fab"
          icon="twitter"
          class="is-flex is-justify-content-space-between" />
        <span>
          {{ identity.twitter }}
        </span>
      </a>
      <p class="is-size-7 mb-1">
        {{ address }}
        <b-icon
          icon="copy"
          size="is-small"
          class="copy-icon"
          v-clipboard:copy="identity.address"
          @click.native="toast('Copied to clipboard')"></b-icon>
      </p>
      <!-- <p
        class="is-size-7 is-flex is-align-items-center py-3"
        v-if="totalCreated">
        <b-icon icon="clock" size="is-small" />
        <span class="ml-2">Started minting {{ startedMinting }}</span>
      </p> -->
      <!-- <p
        class="is-size-7 is-flex is-align-items-center py-3"
        v-if="totalCollected && formattedLastBoughtToNow">
        <b-icon icon="clock" size="is-small" />
        <span class="ml-2">Last bought {{ lastBought }}</span>
      </p> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import Identicon from '@polkadot/vue-identicon'
import { useNuxtApp } from '#app'

defineProps<{
  identity: { [key: string]: string }
  address: string
  startedMinting: string
  lastBought: string
}>()

const { $buefy } = useNuxtApp()

const toast = (message: string) => {
  $buefy.toast.open(message)
}
</script>

<style scoped>
.copy-icon {
  cursor: pointer;
}
</style>

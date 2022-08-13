<script lang="ts" setup>
import { isAfter, subHours } from 'date-fns'
import { defineProps } from '#app'

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

type Address = string | undefined
type IdentityFields = Record<string, string>

defineProps<{
  identity: IdentityFields
}>()
</script>

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
      <IdentityPopoverHeader />
      <hr style="height: 1px" class="m-0" />
      <IdentityPopoverFooter />
    </div>
  </v-tippy>
</template>

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

.copy-icon {
  cursor: pointer;
}

.break-word {
  overflow-wrap: break-word;
}

.ms-dos-shadow {
  box-shadow: $dropdown-content-shadow;
}
</style>

<template>
  <o-button
    :class="{
      active: active,
      'is-fixed-width': fixedWidth,
      'no-shadow': noShadow,
      'loading-with-label': loadingWithLabel,
      shiny: shiny,
    }"
    :size="size"
    :icon-right="icon"
    :variant="variant"
    :disabled="disabled"
    :expanded="expanded"
    :icon-pack="iconPack"
    :label="label"
    class="is-neo"
    :rounded="rounded"
    :tag="tag"
    v-bind="$props">
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </o-button>
</template>

<script lang="ts" setup>
import type { ComputedOptions, ConcreteComponent, MethodOptions } from 'vue'
import type { NeoButtonVariant } from '../../types'
import { OButton } from '@oruga-ui/oruga-next'

withDefaults(
  defineProps<{
    size?: 'small' | 'medium' | 'large'
    disabled?: boolean
    expanded?: boolean
    icon?: string
    iconPack?: string
    label?: string
    active?: boolean
    fixedWidth?: boolean
    noShadow?: boolean
    variant?: NeoButtonVariant
    rounded?: boolean
    shiny?: boolean
    tag?:
      | string
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
      | ConcreteComponent<{}, any, any, ComputedOptions, MethodOptions>
    loadingWithLabel?: boolean
  }>(),
  {
    iconPack: 'fasr',
    shiny: false,
  },
)
</script>

<style lang="scss">
@import './NeoButton.scss';
</style>

<template>
  <CollapseWrapper
    :visible="visible"
    :hidden="hidden"
    :default-open="defaultOpen"
  >
    <div
      v-for="(attribute, index) in attributes"
      :key="index"
      :data-testid="`attr-${index}`"
      class="custom-attribute-input my-4"
    >
      <AttributeInput
        v-model:trait_type="attributes[index].trait_type"
        v-model:value="attributes[index].value"
        :index="index"
        @remove="removeAttribute"
      />
    </div>
    <NeoButton
      no-shadow
      class="my-4"
      :disabled="disabled"
      icon-left="plus"
      data-testid="button-add-attribute"
      @click="addAttribute"
    >
      Add Attribute
    </NeoButton>
  </CollapseWrapper>
</template>

<script lang="ts" setup>
import type { OpenSeaAttribute as Attribute } from '@kodadot1/hyperdata'
import { NeoButton } from '@kodadot1/brick'
import AttributeInput from '@/components/create/AttributeInput.vue'

const props = withDefaults(
  defineProps<{
    modelValue?: Attribute[]
    max: number
    visible?: string
    hidden?: string
    defaultOpen?: boolean
  }>(),
  {
    max: 0,
    visible: 'collapse.collection.attributes.show',
    hidden: 'collapse.collection.attributes.hide',
    modelValue: () => [],
    defaultOpen: false,
  },
)

const attributes = useVModel(props, 'modelValue')

const disabled = computed(
  () => props.max > 0 && attributes.value.length === props.max,
)

const addAttribute = () => {
  if (!props.max || attributes.value.length < props.max) {
    attributes.value = [...attributes.value, {
      value: '',
      trait_type: '',
    }]
  }
}

const removeAttribute = (index: number) => attributes.value = attributes.value.filter((_, i) => i !== index)
</script>

<style scoped>
.attribute-label {
  font-size: calc(1rem * 0.75);
}

.collapse-icon {
  vertical-align: sub;
}
</style>

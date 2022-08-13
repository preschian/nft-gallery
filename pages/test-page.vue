<script lang="ts" setup>
import { onMounted, useNuxtApp } from '#app'
import usePrefix from '@/utils/hooks/usePrefix'

const { urlPrefix, client } = usePrefix()
const { $buefy } = useNuxtApp()

onMounted(() => {
  console.log(urlPrefix.value, client.value)
  $buefy.toast.open('asdf')
})
</script>

<template>
  <div>
    <p>urlPrefix: {{ urlPrefix }}</p>
    <p>client: {{ client }}</p>
  </div>
</template>

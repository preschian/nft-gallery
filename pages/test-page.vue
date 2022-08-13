<script lang="ts" setup>
import { onMounted } from '#app'
import usePrefix from '@/utils/hooks/usePrefix'

const { urlPrefix, client } = usePrefix()

onMounted(() => {
  console.log(urlPrefix.value, client.value)
})
</script>

<template>
  <div>
    <p>urlPrefix: {{ urlPrefix }}</p>
    <p>client: {{ client }}</p>
  </div>
</template>

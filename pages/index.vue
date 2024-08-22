<template>
  <div>
    <h1>test: Hello Seattle</h1>
    <ClientOnly>
      <LandingPage />
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'full-width-layout',
})
</script>

<template>
  <div>
    <h1>Hello Seattle</h1>
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

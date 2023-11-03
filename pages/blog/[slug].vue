<template>
  <BlogPost />
</template>

<script setup lang="ts">
const route = useRoute()
const id = route.params.slug

useServerSeoMeta({
  title: 'My Amazing Site',
  ogTitle: `Blog - ${id}`,
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage:
    'https://images.unsplash.com/photo-1680253987970-b08eaabe8527?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80',
  twitterCard: 'summary_large_image',
})
</script>

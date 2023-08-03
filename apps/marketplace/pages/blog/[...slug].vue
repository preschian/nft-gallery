<script setup>
const route = useRoute()

useServerSeoMeta({
  ogType: 'article',
  ogUrl: `https://preschian.xyz${route.fullPath}`,
})
</script>

<template>
  <main class="article m-8 lg:mx-auto">
    <ContentDoc v-slot="{ doc }">
      <div class="flex justify-between text-gray-500 text-xl">
        <span>{{ doc.category }}</span>
        <span>{{ doc.date }}</span>
      </div>
      <h1>{{ doc.title }}</h1>
      <h2>{{ doc.subtitle }}</h2>
      <img :src="doc.image" :alt="doc.title" />

      <ContentRenderer :value="doc" />
    </ContentDoc>
  </main>
</template>

<style>
.article {
  max-width: 40rem;
}

.article h1 {
  font-size: 3rem;
  font-weight: 700;
  margin: 1rem 0;
}

.article h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.article img {
  margin-bottom: 1rem;
}

.article p {
  margin-bottom: 1rem;
}
</style>

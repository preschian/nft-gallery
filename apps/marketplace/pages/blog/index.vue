<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'

const query: QueryBuilderParams = {
  path: '/blog',
  limit: 9,
  sort: [{ date: -1 }],
  skip: 1,
}

const featuredArticle: QueryBuilderParams = {
  path: '/blog',
  limit: 1,
  sort: [{ date: -1 }],
}

// truncate text to 20 words
const truncate = (text: string) => {
  const words = text.split(' ')
  if (words.length > 20) {
    return words.slice(0, 20).join(' ') + '...'
  }
  return text
}
</script>

<template>
  <main class="content m-8 lg:mx-auto lg:my-16">
    <h1 class="font-bold text-4xl lg:text-5xl text-center">KodaDot Blog</h1>
    <p class="font-medium text-xl lg:text-2xl text-center mt-4 mb-8 lg:mb-16">
      Let’s explore the NFT universe
    </p>

    <ContentList :query="featuredArticle" v-slot="{ list }">
      <a
        :href="article._path"
        v-for="article in list"
        :key="article._path"
        class="border flex flex-col lg:flex-row mb-8">
        <div>
          <img class="aspect-video" :src="article.image" :alt="article.title" />
        </div>
        <div
          class="p-6 lg:p-8 w-full min-w-[20rem] flex flex-col justify-between">
          <p class="font-bold text-xl lg:text-3xl">{{ article.title }}</p>
          <p class="my-4">{{ truncate(article.description) }}</p>

          <div>
            <div class="border inline-block px-4 rounded-3xl">View Article</div>
          </div>
        </div>
      </a>
    </ContentList>

    <h2>Latest Blog</h2>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <ContentList :query="query" v-slot="{ list }">
        <a
          :href="article._path"
          v-for="article in list"
          :key="article._path"
          class="border">
          <img class="aspect-video" :src="article.image" :alt="article.title" />
          <div class="p-4">
            <p class="font-bold">{{ article.title }}</p>
            <p class="truncate">{{ article.description }}</p>
          </div>
        </a>
      </ContentList>
    </div>
  </main>
</template>

<style>
.content {
  max-width: 60rem;
}

.content h1 {
  color: #fff;
  text-shadow:
    1px 1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    -1px -1px 0 #000,
    1px 0 0 #000,
    0 1px 0 #000,
    -1px 0 0 #000,
    0 -1px 0 #000,
    4px 4px #000;
}

.content h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
</style>

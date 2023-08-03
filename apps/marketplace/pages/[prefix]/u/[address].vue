<template>
  <div class="p-10">
    <p>get data from routes</p>
    <p>prefix: {{ route.params.prefix }}</p>
    <p>address: {{ route.params.address }}</p>

    <h1 class="mt-4 font-bold">
      Collected NFTs from {{ route.params.address }}
    </h1>
    <div class="grid grid-cols-5 gap-4">
      <a
        v-for="item in data.data.items"
        :key="item.id"
        :href="galleryDetailUrl(item.id)"
        class="hover:p-4">
        <div class="truncate">{{ item.name }}</div>
        <img
          v-if="item.meta.image"
          :src="ipfsGateway(item.meta.image)"
          :alt="item.name"
          class="w-full aspect-square"
          width="100%"
          height="100%" />
        <img v-else src="https://kodadot.xyz/k_card.png" :alt="item.name" />
      </a>
    </div>
  </div>
</template>

<script setup>
import { getUrl } from '@kodadot1/uniquery'

const route = useRoute()
const address = route.params.address
const prefix = route.params.prefix

const url = getUrl(prefix)
// const client = getClient(prefix)

// const query = client.itemListByOwner(address)

const { data } = await useFetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: `
      {
        items: nftEntities(where: {currentOwner_eq: "${address}", burned_eq: false}, limit: 100) {
          id
          createdAt
          name
          metadata
          currentOwner
          issuer
          meta {
            id
            image
          }
        }
      }
    `,
  }),
})

const ipfsGateway = (ipfs) => {
  if (!ipfs) {
    return ipfs
  }

  return ipfs.replace('ipfs://ipfs/', 'https://image.preschian.xyz/ipfs/')
}

const ogImage = (name, price, image) => {
  return `https://og-image-green-seven.vercel.app/${name}?price=${price}&image=${image}`
}

const galleryDetailUrl = (id) => {
  return `/${prefix}/gallery/${id}`
}

useServerSeoMeta({
  ogType: 'website',
  ogDescription: `${address} Collections`,
  ogTitle: 'NFT Artist Profile on KodaDot | KodaDot - NFT Market Explorer',
  ogImage: ogImage(
    address,
    'Collected: ' + data.value.data.items.length,
    ipfsGateway(data.value.data.items[0]?.meta.image)
  ),
  ogUrl: `https://preschian.xyz${route.fullPath}`,
  twitterCard: 'summary_large_image',
  twitterSite: '@KodaDot',
})

onMounted(() => {
  console.clear()
  console.log(data.value.data.items)
})
</script>

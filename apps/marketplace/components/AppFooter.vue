<template>
  <div class="p-10 border-t border-black bg-white">
    <div
      class="flex flex-col lg:flex-row gap-8 items-start font-bold text-center lg:text-left">
      <!-- <div class="flex-1">
        <p class="font-bold text-xl mb-2">Get The Latest KodaDot Updates</p>
      </div> -->
      <div class="flex-1 w-full" v-for="footer in menuExternal">
        <p class="font-bold text-xl mb-2">{{ footer.name }}</p>
        <div>
          <a
            v-for="menu in footer.menus"
            :href="menu.url"
            class="flex flex-col capitalize font-normal"
            :key="menu.url">
            <div>
              <span>{{ menu.name }}</span
              >&nbsp;
              <i
                class="fas fa-arrow-up-right text-gray-500"
                aria-hidden="true"></i>
            </div>
          </a>
        </div>
      </div>
      <div class="flex-1 w-full">
        <p class="font-bold text-xl mb-2">Join Our Community</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const menuIncentives = [
  {
    name: 'ambassador program',
    url: 'https://hello.kodadot.xyz/be-part-of-kodadot/kodadots-programs/ambassador-program',
  },
  {
    name: 'artist ambassador',
    url: 'https://hello.kodadot.xyz/be-part-of-kodadot/kodadots-programs/artist-ambassador-program',
  },

  {
    name: 'referralProgram',
    url: 'https://hello.kodadot.xyz/be-part-of-kodadot/kodadots-programs/artist-referral-program',
  },
]

const menuMarketplace = [
  {
    name: 'developers',
    url: 'https://developers.kodadot.xyz',
  },
  {
    name: 'FAQ',
    url: 'https://hello.kodadot.xyz/ecosystem/faq',
  },
  {
    name: 'tutorial',
    url: 'https://hello.kodadot.xyz/tutorial/',
  },
]

const menuKodadot = [
  {
    name: 'about',
    url: 'https://hello.kodadot.xyz/about-us/who-are-we',
  },
  {
    name: 'careers',
    url: 'https://hello.kodadot.xyz/be-part-of-kodadot/join-as-a-developer/hiring',
  },
  {
    name: 'merchshop',
    url: 'https://shop.kodadot.xyz',
  },

  {
    name: 'press kit',
    url: 'https://github.com/kodadot/kodadot-presskit/tree/main/v3',
  },
]

const menuExternal = [
  {
    name: 'Incentives',
    menus: menuIncentives,
  },
  {
    name: 'Marketplace',
    menus: menuMarketplace,
  },
  {
    name: 'KodaDot',
    menus: menuKodadot,
  },
]
</script>

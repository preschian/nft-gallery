<template>
  <div class="flex flex-col md:flex-row md:justify-around gap-3 mb-6">
    <div class="flex-1 md:flex-0 md:w-5/12">
      <div class="flex flex-col justify-between h-full">
        <div>
          <div class="migrate-title">
            <img
              src="~/assets/svg/migrate/title-arrow.svg"
              alt="Migrate Your Art"
            >
            <h1 class="title">
              {{ $t('migrate.heading') }}
            </h1>
          </div>
          <p>{{ $t('migrate.subHeading') }}</p>
        </div>

        <div class="network">
          <div class="relative">
            <p class="text-destination text-k-grey">
              {{ $t('migrate.source') }}
            </p>
            <NeoDropdown
              v-model="sourceSelected"
              aria-role="list"
            >
              <template #trigger="{ active }">
                <NeoButton
                  rounded
                  no-shadow
                  variant="pill"
                  :active="active"
                  class="chain-selector"
                >
                  <div class="flex">
                    <img
                      :src="sourceSelected?.icon"
                      :alt="sourceSelected?.text"
                      class="mr-2"
                      width="20"
                    >
                    <span class="mr-2">{{ sourceSelected?.text }}</span>
                  </div>
                  <NeoIcon :icon="active ? 'chevron-up' : 'chevron-down'" />
                </NeoButton>
              </template>

              <NeoDropdownItem
                v-for="item in source"
                :key="item.value"
                aria-role="listitem"
                :value="item"
                :active="item.value === sourceSelected?.value"
              >
                <div class="flex">
                  <img
                    :src="item.icon"
                    :alt="item.text"
                    class="mr-2"
                    width="20"
                  >
                  <div>{{ item.text }}</div>
                </div>
              </NeoDropdownItem>
            </NeoDropdown>
          </div>
          <div class="mx-4">
            <svg
              width="33"
              height="16"
              viewBox="0 0 33 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="svg-arrow"
            >
              <line
                y1="5"
                x2="29"
                y2="5"
              />
              <line
                y1="11"
                x2="29"
                y2="11"
              />
              <line
                x1="24.3536"
                y1="0.646447"
                x2="32.3536"
                y2="8.64645"
              />
              <line
                x1="32.3293"
                y1="8.37629"
                x2="24.3293"
                y2="15.3763"
              />
            </svg>
          </div>
          <div class="relative">
            <p class="text-destination text-k-grey">
              {{ $t('migrate.destination') }}
            </p>
            <NeoDropdown
              v-model="destinationSelected"
              aria-role="list"
            >
              <template #trigger="{ active }">
                <NeoButton
                  rounded
                  no-shadow
                  variant="pill"
                  :active="active"
                  class="chain-selector"
                >
                  <div class="flex">
                    <img
                      :src="destinationSelected?.icon"
                      :alt="destinationSelected?.text"
                      class="mr-2"
                      width="20"
                    >
                    <span class="mr-2">{{ destinationSelected?.text }}</span>
                  </div>
                  <NeoIcon :icon="active ? 'chevron-up' : 'chevron-down'" />
                </NeoButton>
              </template>

              <NeoDropdownItem
                v-for="item in destination"
                :key="item.value"
                aria-role="listitem"
                :value="item"
                :active="item.value === destinationSelected?.value"
                :disabled="sourceSelected?.value === item.value"
              >
                <div class="flex">
                  <img
                    :src="item.icon"
                    :alt="item.text"
                    class="mr-2"
                    width="20"
                  >
                  <div>{{ item.text }}</div>
                </div>
              </NeoDropdownItem>
            </NeoDropdown>
          </div>
        </div>
      </div>
    </div>

    <!-- spacing -->
    <div class="w-1/12" />

    <div class="flex-1 md:flex-0 md:w-5/12">
      <MigrateLandingHeaderFaq />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  NeoButton,
  NeoDropdown,
  NeoDropdownItem,
  NeoIcon,
} from '@kodadot1/brick'

const { source, sourceSelected, destination, destinationSelected }
  = useMigrate()
</script>

<style lang="scss" scoped>
.network {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-direction: column;
  margin-top: 2rem;

  .text-destination {
    position: absolute;
    top: -100%;
  }

  .text-destination {
    @apply bulma-mobile:static bulma-mobile:top-auto;
  }

  @apply bulma-mobile:flex-row bulma-mobile:mt-1;
}

.svg-arrow {
  stroke: var(--text-color);
}

.migrate-title {
  position: relative;
  margin-bottom: 1rem;

  img {
    position: absolute;
    top: -26px;
    left: -26px;
  }

  h1 {
    margin-left: 4.5rem;
  }
}

.chain-selector {
  width: 15rem;
}
</style>

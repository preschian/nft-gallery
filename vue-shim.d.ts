declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

import { ApolloClientMethods } from 'vue-apollo/types/vue-apollo'
import { BuefyNamespace } from 'buefy'

declare module '#app' {
  interface NuxtAppCompat {
    $apollo: ApolloClientMethods
    $buefy: BuefyNamespace
  }
}

export {}

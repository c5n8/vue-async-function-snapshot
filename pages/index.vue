<template>
  <div>
    <div v-if="generation.isStandby">
      <div>Generate number 1-1000</div>
      <button @click="generate()">Start</button>
    </div>
    <div v-else-if="generation.isPending">Generating...</div>
    <div v-else-if="generation.isSettled">
      <div v-if="generation.isFulfilled">
        {{ generation.result }}
      </div>
      <div v-else-if="generation.isRejected">
        {{ generation.error }}
      </div>

      <button @click="generate()">Retry</button>
    </div>
  </div>
</template>

<script>
import vue from 'vue'
import compositionApi from '@vue/composition-api'
import { useAsyncFunctionSnapshot } from '~/src'

vue.use(compositionApi)

export default {
  setup() {
    const generation = useAsyncFunctionSnapshot(async (min, max) => {
      await new Promise((resolve) => setTimeout(resolve, random(200, 2000)))

      if (random(0, 1)) {
        throw new Error('Failed to generate')
      }

      return random(min, max)
    })

    async function generate() {
      try {
        await generation.start(1, 1000)
      } catch (error) {
        //
      }
    }

    return {
      generation,
      generate,
    }
  },
}

function random(min, max) {
  return Math.floor(Math.random() * Math.floor(max - min + 1)) + min
}
</script>

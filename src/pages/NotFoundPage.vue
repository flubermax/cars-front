<template>
  <div class="fullscreen bg-gray-dark text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 20vh">404</div>

      <div class="text-h2" style="opacity: 0.4">Страница не найдена</div>

      <q-btn class="q-mt-xl" color="white" text-color="gray" unelevated label="Назад" no-caps @click="router.go(-1)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

defineOptions({
  name: 'NotFoundPage',
})

const router = useRouter()
</script>

<style lang="scss">
@import '@/assets/scss/_vars';
</style>

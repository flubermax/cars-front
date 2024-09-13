<template>
  <q-layout class="">
    <q-header class="">
      <AppHeader />
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="">
      <AppFooter />
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
import AppHeader from '@/components/header/Header.vue'
import AppFooter from '@/components/Footer.vue'

defineOptions({
  name: 'MainLayout',
})
</script>

<style lang="scss">
.main-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main {
  padding-top: 20px;
  flex-grow: 1;
}
</style>

<template>
  <q-layout class="main-wrapper">
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
import { onBeforeMount } from 'vue'
import { useUserStore } from '@/stores/user'
import Api from '@/utils/api'
import AppHeader from '@/components/header/Header.vue'
import AppFooter from '@/components/Footer.vue'

defineOptions({
  name: 'MainLayout',
})

const userStore = useUserStore()
const { updateUserData } = userStore

async function authUser(storageToken: string): Promise<void> {
  const { success, token, user } = await Api.get('user/auth', {
    headers: { Authorization: `Bearer ${storageToken}` },
  })
  if (success) {
    updateUserData(user)
    localStorage.setItem('quasarCarsToken', JSON.stringify(token))
  } else {
    localStorage.removeItem('quasarCarsToken')
  }
}

onBeforeMount(async () => {
  const token = localStorage.getItem('quasarCarsToken')
  if (token) {
    await authUser(JSON.parse(token))
  }
})
</script>

<style lang="scss"></style>

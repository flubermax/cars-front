<template>
  <div>
    <h4>Избранное</h4>
  </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
import { useRoute } from 'vue-router';
// import { autoMock } from '@/mock'
// import {CarItem} from '@/types'
// import { useRouter, useRoute } from 'vue-router'

// const router = useRouter()
const route = useRoute();
console.log(route);
// const guid = route.params.id
// const item = autoMock.find((el:CarItem) => el.guid === guid)

// console.log(guid);
</script>

<style lang="scss"></style>

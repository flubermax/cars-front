<template>
  <div class="footer">
    <div class="container footer-inner">
      <slot name="custom-slot"> кастом </slot>
      <slot :testData="testData">
        {{ testData }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'AppFooter',
})

const testData = ref('тестовая дата для огр вид-сти подвала')
</script>

<style lang="scss">
@import '@/assets/scss/_vars';
.footer {
  background-color: $color-gray-dark;
  padding: 0.7rem;
  &-inner {
    text-align: center;
  }
}
</style>

<template>
  <q-dialog v-model="showModal">
    <q-card class="modal-phone">
      <q-card-section class="row q-pa-none">
        <q-space />
        <q-btn icon="close" flat round dense @focus="closeModal" />
      </q-card-section>
      <q-card-section class="modal-phone-body">
        <div class="text-gray q-mb-xs">Телефон:</div>
        <div class="modal-phone-number"><q-btn icon="call" flat round dense /> {{ phone }}</div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'PhoneModal',
})

type Props = {
  showModal: boolean
  phone: string
}

type Emits = {
  (event: 'update:showModal', value: Props['showModal']): void
}

const emit = defineEmits<Emits>()

const props = defineProps<Props>()
const showModal = computed(() => props.showModal)

function closeModal() {
  emit('update:showModal', false)
}
</script>

<style lang="scss">
@import '@/assets/scss/_vars';
.modal-phone {
  width: 350px;
  padding: 0.5rem;
  &-body {
    padding: 1rem;
    font-size: 1.2rem;
  }
  &-number {
    display: flex;
    align-items: center;
  }
}
</style>

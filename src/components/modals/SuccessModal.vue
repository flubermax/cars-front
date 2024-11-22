<template>
  <q-dialog v-model="showModal">
    <q-card class="modal-success">
      <q-card-section class="modal-login-body">
        <div class="modal-success-message">
          {{ message }}
        </div>
        <q-btn color="primary" @click="closeModal">ОК</q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
// import { storeToRefs } from 'pinia'

defineOptions({
  name: 'SuccessModal',
})

type Props = {
  showModal: boolean
  message: string
}

type Emits = {
  (event: 'update:showModal', value: Props['showModal']): void
}

const emit = defineEmits<Emits>()

const props = defineProps<Props>()
const showModal = computed(() => props.showModal)
const message = computed(() => props.message)

function closeModal() {
  emit('update:showModal', false)
}
</script>

<style lang="scss">
@import '@/assets/scss/_vars';

.modal-success {
  &-message {
    font-size: 1.25rem;
    padding: 1rem 0 1.25rem;
  }
}
</style>

<template>
  <q-dialog v-model="showModal">
    <q-card class="modal-info">
      <q-card-section class="modal-info-body">
        <div class="modal-info-icon q-my-xs">
          <q-icon :name="modalType.icon" class="" size="45px" :color="modalType.color" />
        </div>
        <div class="modal-info-message">
          {{ message }}
        </div>
        <q-btn color="primary" @click="closeModal">ОК</q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'InfoModal',
})

type modalStyle = 'info' | 'error' | 'success'

const showModal = ref(false)
const message = ref('')
const modalType = ref({
  icon: 'warning',
  color: 'amber',
})

function openModal(msg: string, style: modalStyle) {
  message.value = msg
  switch (style) {
    case 'success':
      modalType.value.icon = 'check_circle'
      modalType.value.color = 'green'
      break
    case 'error':
      modalType.value.icon = 'error_outline'
      modalType.value.color = 'red'
      break
    case 'info':
      modalType.value.icon = 'warning'
      modalType.value.color = 'amber'
      break
  }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  message.value = ''
}
defineExpose({ openModal })
</script>

<style lang="scss">
@import '@/assets/scss/_vars';

.modal-info {
  width: 500px;
  padding: 0;
  &-body {
    text-align: center;
    padding: 1.35rem 1.5rem 1.45rem;
  }
  &-message {
    font-size: 1.1rem;
    line-height: 1.45rem;
    padding: 0.85rem 0 1.35rem;
  }
}
</style>

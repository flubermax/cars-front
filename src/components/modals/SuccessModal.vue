<template>
  <q-dialog ref="dialogRef" persistent @hide="onDialogHide">
    <q-card class="modal-info">
      <q-card-section class="modal-info-body">
        <div class="modal-info-icon q-my-xs">
          <q-icon :name="modalType.icon" class="" size="45px" :color="modalType.color" />
        </div>
        <div class="modal-info-message">
          {{ message }}
        </div>
        <q-btn color="primary" @click="onDialogOK">ОК</q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
import { computed } from 'vue'

defineOptions({
  name: 'SuccessModal',
})
defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()

type modalStyle = 'info' | 'error' | 'success'
type Props = {
  style: modalStyle
  message: string
}
const props = defineProps<Props>()
const { message, style } = props

const types = {
  success: {
    icon: 'check_circle',
    color: 'green',
  },
  error: {
    icon: 'error_outline',
    color: 'red',
  },
  info: {
    icon: 'warning',
    color: 'amber',
  },
}
const modalType = computed(() => types[style])
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

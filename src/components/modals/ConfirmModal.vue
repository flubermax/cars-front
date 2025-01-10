<template>
  <q-dialog ref="dialogRef" :persistent="persistent" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section class="custom-modal-body">
        <div class="custom-modal-icon q-my-xs">
          <q-icon name="warning" class="" size="45px" color="amber" />
        </div>
        <div class="custom-modal-message">
          {{ message }}
        </div>
      </q-card-section>
      <q-card-actions align="right" class="custom-modal-actions">
        <q-btn color="primary" :label="okText" no-caps @click="onOKClick" />
        <q-btn :label="cancelText" no-caps @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'

defineOptions({
  name: 'ConfirmModal',
})

type Props = {
  message: string
  okText: string
  cancelText: string
  cancel: boolean
  persistent: boolean
}
const props = defineProps<Props>()
const { message, okText, cancelText, persistent } = props

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

function onOKClick() {
  onDialogOK()
}
</script>

<style lang="scss">
@import '@/assets/scss/_vars';

.custom-modal {
  width: 600px;
  padding: 1rem 0 0;
  &-body {
    text-align: center;
    padding: 0.75rem 1.5rem 0;
  }
  &-message {
    font-size: 1.1rem;
    line-height: 1.45rem;
    padding: 1rem 0 1.25rem;
  }
  &-actions {
    padding: 0.1rem 0.75rem 0.75rem !important;
    .q-btn {
      font-weight: 600;
      letter-spacing: 0.05rem;
    }
  }
}
</style>

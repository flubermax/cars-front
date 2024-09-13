<template>
  <div class="form-control">
    <span v-if="label" class="form-control-label">{{ label }}</span>
    <q-input v-model="value" v-bind="$attrs" :placeholder="placeholder" :dense="true" square outlined></q-input>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, onMounted, computed } from 'vue'

type Props = {
  modelValue: string | number | null
  label?: string
  placeholder?: string
  disabled?: boolean
}

type Emits = {
  (event: 'update:modelValue', value: Props['modelValue']): void
  // (event: 'setAddress', value: Address): void;
}

const props = defineProps<Props>()

const inputVal = ref<string | number | null>('')
const emit = defineEmits<Emits>()

watch(inputVal, (newVal) => {
  emit('update:modelValue', newVal)
})

const value = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  },
})

onMounted(() => {
  inputVal.value = props.modelValue
})
</script>

<style lang="scss"></style>

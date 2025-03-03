<template>
  <div class="form-control">
    <span v-if="label" class="form-control-label">{{ label }} <span v-if="label && isRequired" class="text-red">*</span></span>
    <q-input v-model="value" v-bind="$attrs" :placeholder="placeholder" :dense="true" square outlined>
      <template v-slot:append>
        <slot name="append"></slot>
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, onMounted, computed } from 'vue'

defineOptions({
  name: 'MyInput',
})

type Props = {
  modelValue?: string | number | null
  label?: string
  placeholder?: string
  disabled?: boolean
  isRequired?: boolean
}

type Emits = {
  (event: 'update:modelValue', value: Props['modelValue']): void
}

const props = withDefaults(defineProps<Props>(), {
  isRequired: false,
})

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
  if (props.modelValue !== undefined) {
    inputVal.value = props.modelValue
  }
})
</script>

<style lang="scss"></style>

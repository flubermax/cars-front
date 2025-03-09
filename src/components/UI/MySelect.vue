<template>
  <div class="form-control">
    <span v-if="label" class="form-control-label">{{ label }} <span v-if="label && isRequired" class="text-red">*</span></span>
    <q-select
      v-model="value"
      v-bind="$attrs"
      :options="options"
      :placeholder="placeholder"
      :clearable="true"
      :disable="disable"
      :dense="true"
      square
      outlined
    >
      <!-- <template #selected="">
        <div :class="{ 'text-grey-6': !value }">
          {{ value ? modelValue : props.selectedLabel }}
        </div>
      </template> -->
      <template #no-option="">
        <q-item class="">
          <span class="q-pt-xs">Опции отсутствуют</span>
        </q-item>
      </template>
      <div v-if="!value" class="my-select-placeholder text-grey-6">
        {{ props.selectedLabel }}
      </div>
    </q-select>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CarOption } from '@/models'

defineOptions({
  name: 'MySelect',
})

type Props = {
  modelValue: unknown
  options: string[] | number[] | CarOption[]
  label?: string
  placeholder?: string
  disable?: boolean
  isRequired?: boolean
  selectedLabel: string
}

const props = withDefaults(defineProps<Props>(), {
  isRequired: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', newVal: unknown): void
}>()

const value = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  },
})

// const attrs = useAttrs()

// function getSelectedLabel(opt: Props['modelValue']) {
//   if (opt) {
//     return typeof opt === 'object' && attrs['map-options'] !== 'undefined' ? opt.name : opt
//   } else {
//     return props.selectedLabel
//   }
// }
</script>

<style lang="scss">
.my-select-placeholder {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}
</style>

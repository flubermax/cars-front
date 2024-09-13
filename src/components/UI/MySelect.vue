<template>
  <div class="form-control">
    <span v-if="label" class="form-control-label">{{ label }}</span>
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
      <template #selected="">
        <div :class="{ 'text-grey-6': !value }">
          {{ getSelectedLabel(value) }}
        </div>
      </template>
      <!-- <template #selected-item="scope">
        <div :class="{ 'text-grey-6': !value }">
          {{ getSelectedLabel(scope.opt) }}
        </div>
      </template> -->
      <template #option="option">
        <q-item v-bind="option.itemProps">
          <span>{{ getSelectedLabel(option.opt) }}</span>
        </q-item>
      </template>
      <template #no-option="">
        <q-item class="">
          <span class="q-pt-xs">Опции отсутствуют</span>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ListItem } from '@/components/models';

type Props = {
  modelValue: string | ListItem | null;
  options: string[] | ListItem[];
  label?: string;
  placeholder?: string;
  disable?: boolean;
  changeAnyType?: boolean;
};

// const props = defineProps<Props>();

const props = withDefaults(defineProps<Props>(), {
  changeAnyType: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', newVal: string | ListItem | null): void;
}>();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit('update:modelValue', newValue);
  },
});

function getSelectedLabel(opt: Props['modelValue']) {
  if (opt) {
    return typeof opt === 'object' ? opt.name : opt;
  } else {
    return props.changeAnyType ? 'Любая' : 'Любой';
  }
}

// watch(inputVal, (newVal) => {
//   console.log(`newVal ===`,newVal)
//   emit(`update:modelValue`, newVal)
// })

// onMounted(() => {
//   inputVal.value = props.modelValue
// })

// function onLanguageChange(): void {
//   console.log('MySelect changed');
// }
</script>

<style lang="scss"></style>

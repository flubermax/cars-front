<template>
  <q-dialog v-model="showModal">
    <q-card class="modal-login">
      <q-card-section class="row q-py-none">
        <q-space />
        <q-btn icon="close" flat round dense @focus="closeModal" />
      </q-card-section>
      <q-card-section class="modal-login-body">
        <h4 class="q-mb-lg">Регистрация</h4>
        <my-input v-model="login" :class="['q-mb-md', v$.login.$errors.length ? 'input--error' : '']" placeholder="Логин"> </my-input>
        <my-input
          v-model="password"
          :class="['q-mb-md', v$.password.$errors.length ? 'input--error' : '']"
          filled
          :type="showPassword ? 'password' : 'text'"
          placeholder="Пароль"
        >
          <template v-slot:append>
            <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="showPassword = !showPassword" /> </template
        ></my-input>
        <my-input
          v-model="passwordRepeat"
          :class="['q-mb-md', v$.passwordRepeat.$errors.length ? 'input--error' : '']"
          filled
          :type="showPasswordRepeat ? 'password' : 'text'"
          placeholder="Пароль ещё раз"
        >
          <template v-slot:append>
            <q-icon
              :name="showPasswordRepeat ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="showPasswordRepeat = !showPasswordRepeat"
            />
          </template>
        </my-input>
        <q-btn color="primary" :disable="v$.login.$errors.length > 0" @click="closeModal">Зарегистрироваться</q-btn>
        <div v-if="v$.login.$errors.length" class="text-danger q-mt-xs">Неверный логин или пароль</div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import MyInput from '@/components/UI/MyInput.vue'

type Props = {
  showModal: boolean
}

type Emits = {
  (event: 'update:showModal', value: Props['showModal']): void
}
const emit = defineEmits<Emits>()

const props = defineProps<Props>()
const showModal = computed(() => props.showModal)

const showPassword = ref(false)
const showPasswordRepeat = ref(false)

const login = ref('')
const password = ref('')
const passwordRepeat = ref('')

const rules = {
  login: { required },
  password: { required },
  passwordRepeat: { required },
}

const v$ = useVuelidate(rules, { login, password, passwordRepeat })

function closeModal() {
  emit('update:showModal', false)
}
</script>

<style lang="scss">
@import '@/assets/scss/_vars';
</style>

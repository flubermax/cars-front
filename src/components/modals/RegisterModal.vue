<template>
  <q-dialog v-model="showModal">
    <q-card class="modal-login">
      <q-card-section class="row q-py-none">
        <q-space />
        <q-btn icon="close" flat round dense @focus="closeModal" />
      </q-card-section>
      <q-card-section class="modal-login-body">
        <h4 class="q-mb-lg">Регистрация</h4>
        <div class="q-mb-md">
          <my-input
            v-model="login"
            :class="['q-mb-md', v$.login.$errors.length || (registerResult && registerResult.type === 'login') ? 'input--error' : '']"
            placeholder="Логин"
          >
          </my-input>
          <div v-if="registerResult && registerResult.type === 'login'" class="text-danger q-mt-xs">{{ registerResult.message }}</div>
        </div>
        <div class="q-mb-md">
          <my-input
            v-model="password"
            :class="['q-mb-md', v$.password.$errors.length || (registerResult && registerResult.type === 'password') ? 'input--error' : '']"
            :type="showPassword ? 'password' : 'text'"
            placeholder="Пароль"
          >
            <template v-slot:append>
              <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="showPassword = !showPassword" />
            </template>
          </my-input>
        </div>
        <div class="q-mb-md">
          <my-input
            v-model="passwordRepeat"
            :class="['q-mb-md', v$.passwordRepeat.$errors.length || (registerResult && registerResult.type === 'password') ? 'input--error' : '']"
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
          <div v-if="registerResult && registerResult.type === 'password'" class="text-danger q-mt-xs">{{ registerResult.message }}</div>
        </div>
        <q-btn color="primary" :disable="v$.login.$errors.length > 0" @click="registerHandler">Зарегистрироваться</q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import MyInput from '@/components/UI/MyInput.vue'
import { useUserStore } from '@/stores/user'
import { ServerResult } from '@/components/models'
// import { storeToRefs } from 'pinia'

defineOptions({
  name: 'RegisterModal',
})

type Props = {
  showModal: boolean
}

type Emits = {
  (event: 'update:showModal', value: Props['showModal']): void
  (event: 'openSuccessModal'): void
}
const emit = defineEmits<Emits>()

const props = defineProps<Props>()
const showModal = computed(() => props.showModal)

const userStore = useUserStore()
const { registerUser } = userStore

const showPassword = ref(true)
const showPasswordRepeat = ref(true)

const registerResult = ref<ServerResult | null>(null)

const login = ref('')
const password = ref('')
const passwordRepeat = ref('')

const rules = {
  login: { required },
  password: { required },
  passwordRepeat: { required },
}

const v$ = useVuelidate(rules, { login, password, passwordRepeat })

async function registerHandler() {
  registerResult.value = null
  v$.value.$touch()
  const res = registerUser({ login: login.value, password: password.value, passwordRepeat: passwordRepeat.value })
  await nextTick()
  if (res.success) {
    closeModal()
    emit('openSuccessModal')
  } else {
    registerResult.value = res
  }
}

function resetForm() {
  login.value = ''
  password.value = ''
  passwordRepeat.value = ''
  v$.value.$reset()
}

function closeModal() {
  emit('update:showModal', false)
  resetForm()
}
</script>

<style lang="scss">
@import '@/assets/scss/_vars';
</style>

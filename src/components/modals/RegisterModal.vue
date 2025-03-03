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
          <my-input v-model="login" :class="['q-mb-xs', v$.login.$errors.length ? 'input--error' : '']" placeholder="Логин"> </my-input>
          <div v-if="v$.login.$errors.length" class="text-danger q-mt-xs">Введите логин</div>
        </div>
        <div class="q-mb-md">
          <my-input
            v-model="password"
            :class="['q-mb-xs', v$.password.$errors.length ? 'input--error' : '']"
            :type="showPassword ? 'password' : 'text'"
            placeholder="Пароль"
          >
            <template v-slot:append>
              <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="showPassword = !showPassword" />
            </template>
          </my-input>
          <div v-if="v$.password.$errors.length" class="text-danger q-mt-xs">Введите пароль</div>
        </div>
        <div class="q-mb-md">
          <my-input
            v-model="passwordRepeat"
            :class="['q-mb-xs', v$.passwordRepeat.$errors.length ? 'input--error' : '']"
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
          <div v-if="v$.passwordRepeat.$errors.length && v$.passwordRepeat.required.$invalid" class="text-danger q-mt-xs">Введите пароль</div>
          <div v-if="password.length && passwordRepeat.length && v$.passwordRepeat.$errors.length" class="text-danger q-mt-xs">
            Пароли не совпадают. Проверьте правильность введённых данных
          </div>
        </div>
        <q-btn color="primary" :disabled="!isFormEdited || v$.login.$errors.length > 0" @click="registerHandler">Зарегистрироваться</q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import Api from '@/utils/api'
import { ref, computed, nextTick, onMounted, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, sameAs } from '@vuelidate/validators'
import MyInput from '@/components/UI/MyInput.vue'
import { useUserStore } from '@/stores/user'
import { User } from '@/components/models'
// import { storeToRefs } from 'pinia'

defineOptions({
  name: 'RegisterModal',
})

type Props = {
  showModal: boolean
}

type Emits = {
  (event: 'update:showModal', value: Props['showModal']): void
  (event: 'openInfoModal', message: string, type: string): void
}
const emit = defineEmits<Emits>()

const props = defineProps<Props>()
const showModal = computed(() => props.showModal)

const userStore = useUserStore()
const { loginUser } = userStore

const showPassword = ref(true)
const showPasswordRepeat = ref(true)

const login = ref('')
const password = ref('')
const passwordRepeat = ref('')
const isFormEdited = ref(false)

const rules = {
  login: { required },
  password: { required },
  passwordRepeat: { required, sameAs: sameAs(computed(() => password.value)) },
}

const v$ = useVuelidate(rules, { login, password, passwordRepeat })

async function registerHandler() {
  v$.value.$touch()
  if (v$.value.$errors.length) return

  const userDto: User = {
    idf: '',
    login: login.value,
    password: password.value,
    name: '',
    location: '',
    phone: '',
    avatar: '',
    favorites: [],
    roles: [],
  }

  try {
    const res = await Api.post('user/register', userDto)
    if (res.success) {
      const loginRes = await loginUser(login.value, password.value)
      await nextTick()
      if (loginRes.success) {
        closeModal()
        emit('openInfoModal', res.message, 'success')
      } else {
        emit('openInfoModal', loginRes.message, 'info')
      }
    } else {
      emit('openInfoModal', res.message, 'error')
    }
    // closeModal()
  } catch (error) {
    console.log(error)
  }
}

function resetForm() {
  login.value = ''
  password.value = ''
  passwordRepeat.value = ''
  v$.value.$reset()
  isFormEdited.value = false
}

function closeModal() {
  emit('update:showModal', false)
  resetForm()
}

onMounted(() => {
  watch(
    [login, password, passwordRepeat],
    async () => {
      v$.value.$reset()
      isFormEdited.value = true
    },
    { deep: true }
  )
})
</script>

<style lang="scss">
@import '@/assets/scss/_vars';
</style>

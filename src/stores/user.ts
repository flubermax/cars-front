import { CarItem } from '@/types'
import { defineStore, storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useCarsStore } from '@/stores/cars'
import { ServerResult, User } from '@/components/models'

type NewUser = {
  login: string
  password: string
  passwordRepeat: string
}

export const useUserStore = defineStore('userStore', () => {
  const carsStore = useCarsStore()
  const { items } = storeToRefs(carsStore)

  const usersList = ref<User[]>([
    {
      login: 'admin',
      password: 'qwe123',
      name: 'Max',
      location: 'Омск',
      avatar: '',
      phone: '+7 (921) 121 21 21',
      favorites: [],
    },
    {
      login: 'lolka',
      password: '123',
      name: 'Egor',
      location: 'Москва',
      avatar: '',
      phone: '+7 (950) 489 42 15',
      favorites: [...items.value],
    },
    {
      login: 'kek228',
      password: '123123',
      name: 'Valera',
      location: 'Мурманск',
      avatar: '',
      phone: '+7 (911) 900 75 85',
      favorites: [],
    },
  ])

  const currentUser = ref<User | null>(null)

  const isAuth = computed(() => currentUser.value !== null)

  const loginUpperCase = computed(() => (currentUser.value ? currentUser.value.login.toUpperCase() : ''))

  const favoritesCars = computed(() => (currentUser.value ? currentUser.value.favorites : []))

  function updateUserData(login: User['login'], user: User) {
    const targetIndex = usersList.value.findIndex((item) => item.login === login)
    if (targetIndex) {
      usersList.value[targetIndex] = { ...user }
      currentUser.value = { ...user }
    }
  }

  function updateUserPassword(login: User['login'], newPassword: User['password']) {
    const targetIndex = usersList.value.findIndex((item) => item.login === login)
    if (targetIndex) {
      const user = usersList.value[targetIndex]
      usersList.value[targetIndex] = { ...user, password: newPassword }
      currentUser.value = { ...user, password: newPassword }
    }
  }

  function loginUser(login: string, password: string): User | null {
    const user = usersList.value.find((item) => item.login === login)
    const isPassChecked = user && user.password === password
    if (isPassChecked) {
      currentUser.value = user.password === password ? user : null
      localStorage.setItem('quasarCarsUser', JSON.stringify(user))
      return currentUser.value
    } else {
      return null
    }
  }

  function logoutUser(): void {
    localStorage.removeItem('quasarCarsUser')
    currentUser.value = null
  }

  function registerUser(newUser: NewUser): ServerResult {
    const { login, password, passwordRepeat } = newUser
    const user = usersList.value.find((item) => item.login === login)
    if (user) {
      return {
        success: false,
        type: 'login',
        message: 'Пользователь с таким логином уже существует',
      }
    }

    if (password !== passwordRepeat) {
      return {
        success: false,
        type: 'password',
        message: 'Введённые пароли не совпадают',
      }
    }

    usersList.value.push({
      login,
      password,
      name: '',
      location: '',
      avatar: '',
      phone: '',
      favorites: [],
    })

    loginUser(login, password)

    return {
      success: true,
      type: '',
      message: 'Вы успешно зарегистрировались',
    }
  }

  function addToFav(item: CarItem) {
    currentUser.value?.favorites.push(item)
  }

  function removeFromFav(item: CarItem) {
    if (currentUser.value !== null) {
      currentUser.value.favorites = currentUser.value?.favorites.filter((car) => car.guid !== item.guid)
    }
  }

  return {
    usersList,
    currentUser,
    updateUserData,
    updateUserPassword,
    loginUpperCase,
    registerUser,
    loginUser,
    logoutUser,
    isAuth,
    favoritesCars,
    addToFav,
    removeFromFav,
  }
})

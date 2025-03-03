import { RouteRecordRaw, NavigationGuardWithThis } from 'vue-router'
import MainPage from '@/pages/MainPage.vue'
import AddItemPage from '@/pages/AddItemPage.vue'
import ItemPage from '@/pages/ItemPage.vue'
import FavoritesPage from '@/pages/FavoritesPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import UserCarsPage from '@/pages/UserCarsPage.vue'
import EditItemPage from '@/pages/EditItemPage.vue'
// import Messenger from '@/components/profile/Messenger.vue'
// import Services from '@/components/services/Services.vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

type CheckIfAuthorized = NavigationGuardWithThis<undefined> | NavigationGuardWithThis<undefined>[]

const isLocalStorageHasUserCredentials = () => {
  const token = localStorage.getItem('quasarCarsToken')

  return !!token
}

const checkIfAuthorized: CheckIfAuthorized = (to, from, next) => {
  const userStore = useUserStore()
  const { isAuth } = storeToRefs(userStore)
  if (isAuth.value || isLocalStorageHasUserCredentials()) {
    next()
  } else {
    next('/')
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: { path: '/main' },
    children: [
      {
        path: '/main',
        name: 'MainPage',
        component: MainPage,
      },
      {
        path: '/auto/:id',
        name: 'ItemPage',
        component: ItemPage,
      },
      {
        path: '/additem',
        name: 'AddItemPage',
        component: AddItemPage,
        beforeEnter: checkIfAuthorized,
      },
      {
        path: '/edititem/:id',
        name: 'EditItemPage',
        component: EditItemPage,
        beforeEnter: checkIfAuthorized,
      },
      {
        path: '/favorites',
        name: 'FavoritesPage',
        component: FavoritesPage,
        beforeEnter: checkIfAuthorized,
      },
      {
        path: '/profile',
        name: 'ProfilePage',
        component: ProfilePage,
        beforeEnter: checkIfAuthorized,
      },
      {
        path: '/user-cars',
        name: 'UserCarsPage',
        component: UserCarsPage,
        beforeEnter: checkIfAuthorized,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/NotFoundPage.vue'),
  },
]

export default routes

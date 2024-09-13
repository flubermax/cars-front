import { RouteRecordRaw } from 'vue-router'
// import Profile from '@/components/profile/Profile.vue'
// import Messenger from '@/components/profile/Messenger.vue'
import MainList from '@/pages/MainList.vue'
import AddItemPage from '@/pages/AddItemPage.vue'
import ItemPage from '@/pages/ItemPage.vue'
import FavoritesPage from '@/pages/FavoritesPage.vue'
// import Auto from '@/components/auto/Auto.vue'
// import Services from '@/components/services/Services.vue'
// import Favourites from '@/components/favourites/Favourites.vue'
// import Realty from '@/components/realty/Realty.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: '/main',
    children: [
      {
        path: '/main',
        name: 'MainList',
        component: MainList,
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
      },
      {
        path: '/favorites',
        name: 'FavoritesPage',
        component: FavoritesPage,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes

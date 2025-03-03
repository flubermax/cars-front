<template>
  <div class="top-nav">
    <div class="container top-nav-inner">
      <div class="top-nav-logo" @click="router.push('/')">
        <img src="@/assets/img/topnav-icon2.png" alt="logo" />
      </div>
      <div class="top-nav-panel">
        <div v-if="currentUser" class="">
          <div class="row">
            <div class="nav-link q-mr-lg" @click="$router.push('/favorites')">
              <q-icon name="favorite" />
            </div>
            <div class="nav-link q-mr-lg" @click="$router.push('/messenger')">
              <q-icon name="chat_bubble" />
            </div>
            <div>
              <div class="top-nav-user">
                <div class="top-nav-avatar">
                  <img v-if="currentUser.avatar" :src="getImgSrc(currentUser.avatar)" alt="avatar" />
                  <span v-else>{{ getFirstLetter(currentUser) }}</span>
                </div>
                <div class="d-flex align-center">
                  {{ getUserName() }}
                  <q-icon name="expand_more" />
                </div>
              </div>

              <q-menu auto-close>
                <q-list>
                  <q-item clickable @click="router.push({ path: `/profile` })">
                    <q-item-section>Профиль</q-item-section>
                  </q-item>
                  <q-item clickable @click="router.push({ path: `/user-cars` })">
                    <q-item-section>Мои объявления</q-item-section>
                  </q-item>
                  <q-item clickable @click="router.push({ path: `/favorites` })">
                    <q-item-section>Избранное</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Сообщения</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable @click="logoutHandler">
                    <q-item-section>Выйти</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </div>
          </div>
        </div>
        <div v-else class="nav-link" @click="showLoginModal = true">Вход / регистрация</div>
        <q-btn color="primary" @click="addItemHandler">Разместить объявление</q-btn>
      </div>
    </div>

    <LoginModal v-model:showModal="showLoginModal" @openRegisterModal="showRegisterModal = true" />

    <RegisterModal v-model:showModal="showRegisterModal" @openInfoModal="openInfoModal" />

    <InfoModal ref="infoModal" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import LoginModal from '@/components/modals/LoginModal.vue'
import RegisterModal from '@/components/modals/RegisterModal.vue'
import InfoModal from '@/components/modals/InfoModal.vue'
import { getImgSrc } from '@/utils/commons'
import { User } from '@/components/models'

defineOptions({
  name: 'AppHeader',
})

const userStore = useUserStore()
const { currentUser, isAuth } = storeToRefs(userStore)
const { logoutUser } = userStore

const router = useRouter()
const showLoginModal = ref(false)
const showRegisterModal = ref(false)
const infoModal = ref()

function getFirstLetter(user: User) {
  const data = user.name ? user.name : user.login
  return data.split('')[0]
}

function getUserName() {
  if (currentUser.value) return currentUser.value.name.length ? currentUser.value.name : currentUser.value.login
}

function addItemHandler() {
  isAuth.value ? router.push('/additem') : (showLoginModal.value = true)
}

function logoutHandler() {
  logoutUser()
  router.push('/')
}

function openInfoModal(msg: string, type: string) {
  infoModal.value?.openModal(msg, type)
}
</script>

<style lang="scss">
@import '@/assets/scss/_vars';

.top-nav {
  padding: 0.25rem 0;
  color: #fff;
  background-color: $color-gray-dark;
  &-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &-logo {
    display: flex;
    align-content: center;
    cursor: pointer;
    transition: all 0.15s ease;
    &:hover {
      opacity: 0.7;
    }
    img {
      width: 50px;
    }
  }
  &-panel {
    display: flex;
    align-items: center;
    > * {
      margin: 0 0 0 15px;
    }
  }
  &-user {
    display: flex;
    align-items: center;
    padding: 0.25rem;
    margin-right: 1.25rem;
    cursor: pointer;
  }
  &-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #fff;
    width: 40px;
    height: 40px;
    font-size: 1.15rem;
    color: #000;
    margin-right: 0.45rem;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  &-menu {
    background-color: #fff;
    border: 1px solid $color-border;
    border-radius: 8px;
    padding: 0.5rem 0;
    &-item {
      padding: 0.325rem 0.75rem;
      cursor: pointer;
      &:hover {
        background-color: $color-hover;
      }
    }
  }
}

.top-nav-user:hover {
  color: $color-yellow;
  .top-nav-letter {
    background-color: $color-yellow;
  }
}
.nav-link {
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.15s ease;
  &:hover {
    color: $color-yellow;
  }
}

.modal-login {
  width: 400px;
  padding: 1rem 0 0;
  &-body {
    padding-top: 0;
    padding: 1rem 2rem 2rem;
  }
  &-footer {
    background-color: rgba($color-gray-light, 0.4);
    padding: 2rem;
  }
}

.form-control.input--error .q-field__control::before {
  border-color: $color-red;
}
</style>

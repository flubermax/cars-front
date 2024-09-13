<template>
  <div class="top-nav">
    <div class="container top-nav-inner">
      <div class="top-nav-logo" @click="router.push('/')">
        <img src="@/assets/img/topnav-icon2.png" alt="logo" />
      </div>
      <div class="top-nav-panel">
        <div class="nav-link" @click="$router.push('/favourites')">
          <v-icon icon="mdi-cards-heart"></v-icon>
        </div>
        <div class="nav-link" @click="$router.push('/messenger')">
          <v-icon icon="mdi-chat"></v-icon>
        </div>
        <div v-if="currentUser" class="">
          <div>
            <div class="top-nav-user">
              <div class="top-nav-letter">
                {{ getFirstLetter(currentUser.name) }}
              </div>
              <div class="d-flex align-center">
                {{ currentUser.name }}
                <q-icon name="expand_more" />
              </div>
            </div>

            <q-menu auto-close>
              <q-list>
                <q-item clickable>
                  <q-item-section>Избранное</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Сообщения</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable @click="logout">
                  <q-item-section>Выйти</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </div>
        </div>
        <div v-else class="nav-link" @click="showLoginModal = true">Вход / регистрация</div>
        <q-btn color="primary" @click="$router.push('/additem')">Разместить объявление</q-btn>
      </div>
    </div>

    <LoginModal v-model:showModal="showLoginModal" @openRegisterModal="showRegisterModal = true" />

    <RegisterModal v-model:showModal="showRegisterModal" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import LoginModal from '../modals/LoginModal.vue'
import RegisterModal from '../modals/RegisterModal.vue'

defineOptions({
  name: 'AppHeader',
})

const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)
const { logout } = userStore

const router = useRouter()
const showLoginModal = ref(false)
const showRegisterModal = ref(false)

function getFirstLetter(word: string) {
  return word.split('')[0]
}

onMounted(() => {
  // console.log('userStore === ', currentUser?.age)
})
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
  &-letter {
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

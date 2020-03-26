<template>
  <v-app>
    <v-app-bar
      app
      color="green accent-4"
      dark
      elevate-on-scroll
    >

      <v-app-bar-nav-icon>
        <img src="favicon.ico" style="width: 40px;" alt="">
      </v-app-bar-nav-icon>

      <v-toolbar-title>
        ITT - Residencias
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn to="/home" v-if="isLogged && this.$route.name !== 'Dashboard'" text color="white">
        <v-icon>fas fa-arrow-left</v-icon>
      </v-btn>
      <v-btn @click="logout()" v-show="isLogged" text color="white">
        Salir
        <v-icon right small>fas fa-sign-out-alt</v-icon>
      </v-btn>

    </v-app-bar>

    <v-content>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </v-content>
    <notifications group="foo" position="bottom left" />
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    isLogged: false,
  }),
  beforeUpdate() {
    if (localStorage.getItem('isLogged') === 'true') {
      this.isLogged = true;
      return;
    }
    this.isLogged = false;
  },
  methods: {
    async logout() {
      await this.$store.dispatch('usersModule/logout');
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .20s;
}

.fade-enter-active {
  transition-delay: .20s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>

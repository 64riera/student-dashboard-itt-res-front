<template>
  <v-app>
    <v-app-bar app :color="primaryColor" dark elevate-on-scroll>
      <v-app-bar-nav-icon v-if="this.$route.name === 'Dashboard'">
        <img src="favicon.ico" style="width: 40px;" alt />
      </v-app-bar-nav-icon>

      <v-toolbar-title v-if="this.$route.name === 'Dashboard'">ITT - Residencias</v-toolbar-title>

      <v-btn to="/home" v-if="isLogged && this.$route.name !== 'Dashboard'" text color="white">
        <v-icon>fas fa-arrow-left</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn @click="logout()" v-show="isLogged" text color="white">
        Salir
        <v-icon right small>fas fa-sign-out-alt</v-icon>
      </v-btn>
      <template v-if="this.$route.name === 'Login'">
        <v-btn :color="secondaryColor" dark absolute bottom right fab>
          <v-icon>fas fa-user-tie</v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <v-content>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </v-content>
    <notifications group="foo" position="bottom left" />
    <template class="animated fadeIn">
      <v-footer dark padless>
        <v-card class="flex" flat tile>
          <v-card-title class="grey accent-3" v-if="this.$route.name !== 'Dashboard'">
            <strong class="subheading"
              >Tienes en mente un proyecto o alguna pregunta sobre programación? Contáctame en
              :</strong
            >

            <v-spacer></v-spacer>

            <v-btn
              v-for="icon in icons"
              :key="icon.iconImage"
              class="mx-4"
              dark
              icon
              target="_blank"
              :href="icon.link"
            >
              <v-icon size="24px">{{ icon.iconImage }}</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text class="py-2 white--text text-center">
            {{ new Date().getFullYear() }} —
            <strong>Desarrollado por © Sergio Rivera con &hearts;</strong>
          </v-card-text>
        </v-card>
      </v-footer>
    </template>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    isLogged: false,
    icons: [
      {
        iconImage: 'fab fa-twitter',
        link: 'https://twitter.com/networkchetos',
      },
      {
        iconImage: 'fab fa-linkedin',
        link: 'https://www.linkedin.com/in/sergio-rivera-9b4b47179',
      },
    ],
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
  computed: {
    primaryColor() {
      return this.$store.state.UI.primaryColor;
    },
    secondaryColor() {
      return this.$store.state.UI.secondaryColor;
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.2s;
}

.fade-enter-active {
  transition-delay: 0.2s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>

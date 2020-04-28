<template>
  <v-app>
    <v-app-bar
      app
      v-if="this.$route.fullPath"
      :color="this.$route.fullPath.includes('admin') ? primaryColorAdmin : primaryColor"
      dark
      elevate-on-scroll
    >

      <v-app-bar-nav-icon v-if="this.$route.name === 'Dashboard'">
        <img src="favicon.ico" style="width: 40px;" alt />
      </v-app-bar-nav-icon>

      <v-app-bar-nav-icon @click="changeDrawerState()"></v-app-bar-nav-icon>

      <v-app-bar-nav-icon v-if="this.$route.fullPath.includes('admin')">
        <v-icon>fas fa-chalkboard-teacher</v-icon>
      </v-app-bar-nav-icon>

      <v-toolbar-title v-if="this.$route.name === 'Dashboard'">ITT - Residencias</v-toolbar-title>

      <v-btn
        to="/home"
        v-if="isLogged &&
              this.$route.name !== 'Dashboard' &&
              !this.$route.fullPath.includes('admin')"
        text
        color="white"
      >
        <v-icon>fas fa-arrow-left</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn @click="logout()" v-show="isLogged" text color="white">
        Salir
        <v-icon right small>fas fa-sign-out-alt</v-icon>
      </v-btn>
      <template v-if="this.$route.name === 'Login'">
        <v-btn to="/admin/dashboard" :color="secondaryColor" dark absolute bottom right fab>
          <v-icon>fas fa-user-tie</v-icon>
        </v-btn>
      </template>
      <template v-if="this.$route.name === 'Admin login'">
        <v-btn to="/" :color="secondaryColorAdmin" dark absolute bottom right fab>
          <v-icon>fas fa-user</v-icon>
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
        <v-card class="flex dark" flat tile>
          <v-card-text
            v-if="!this.$route.fullPath.includes('login')"
            class="py-2 white--text text-center"
          >
            {{ new Date().getFullYear() }} —
            <strong>Desarrollado por © Sergio Rivera con &hearts;</strong>
          </v-card-text>
          <v-card-title
            class="grey accent-3"
            v-if="this.$route.name !== 'Dashboard' && this.$route.name !== 'Admin dashboard'"
          >
            <strong class="subheading">
              Tienes en mente un proyecto o alguna pregunta sobre programación? Contáctame en
              :
            </strong>

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
    adminDrawer: false,
    items: [
      { title: 'Inicio', icon: 'mdi-home-city' },
      { title: 'My Account', icon: 'mdi-account' },
      { title: 'Users', icon: 'mdi-account-group-outline' },
    ],
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
      if (this.$route.fullPath.includes('admin')) {
        this.$router.push({ name: 'Admin login' });
      } else {
        this.$router.push({ name: 'Login' });
      }
    },
    changeDrawerState() {
      this.$store.dispatch('UI/changeDrawer', !this.drawerState);
    },
  },
  computed: {
    primaryColor() {
      return this.$store.state.UI.primaryColor;
    },
    secondaryColor() {
      return this.$store.state.UI.secondaryColor;
    },
    primaryColorAdmin() {
      return this.$store.state.UI.primaryColorAdmin;
    },
    secondaryColorAdmin() {
      return this.$store.state.UI.secondaryColorAdmin;
    },
    drawerState: {
      get() {
        return this.$store.state.UI.adminDrawer;
      },
      set(newDrawer) {
        this.$store.dispatch('UI/changeDrawer', newDrawer);
      },
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

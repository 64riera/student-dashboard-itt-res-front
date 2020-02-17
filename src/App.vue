<template>
  <v-app>
    <v-app-bar
      app
      color="green darken-2"
      dark
    >
      <div class="d-flex align-center">
        <h3 class="font-weight-light">
          ITT - Módulo de Residencias
        </h3>
      </div>

      <v-spacer></v-spacer>

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
    //
  }),
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

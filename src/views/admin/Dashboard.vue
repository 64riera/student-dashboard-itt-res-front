<template>
  <div>
    <v-container v-if="userData">
      <v-row>
        <v-col cols="12" xs="1" md="3" lg="2" xl="2">
          <template>
            <v-navigation-drawer absolute left v-model="drawerState" clipped
            :permanent="!this.$vuetify.breakpoint.xs && !this.$vuetify.breakpoint.sm">
              <template v-slot:prepend>
                <v-list-item two-line>
                  <v-list-item-avatar>
                    <img src="https://randomuser.me/api/portraits/men/81.jpg" />
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{ userName }}</v-list-item-title>
                    <v-list-item-subtitle>{{ userData.email }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item v-for="item in items" :key="item.title">
                  <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-navigation-drawer>
          </template>
        </v-col>
        <v-col cols="12" xs="11" md="9" lg="10" xl="10">
          <v-container class="py-0">
            <h1 class="font-weight-light mb-2">Historial de residentes</h1>
          <template>
            <v-data-table
              :headers="headers"
              :items="desserts"
              height="55vh"
              class="elevation-1"
            >
              <template v-slot:item.calories="{ item }">
                <v-chip :color="getColor(item.calories)" dark>{{ item.calories }}</v-chip>
              </template>
            </v-data-table>
          </template>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    userName: '',
    userId: '',
    userControlNumber: '',
    items: [
      { title: 'Inicio', icon: 'mdi-home-city' },
      { title: 'My Account', icon: 'mdi-account' },
      { title: 'Users', icon: 'mdi-account-group-outline' },
    ],
    headers: [
      {
        text: 'Dessert (100g serving)',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Calories', value: 'calories' },
      { text: 'Fat (g)', value: 'fat' },
      { text: 'Carbs (g)', value: 'carbs' },
      { text: 'Protein (g)', value: 'protein' },
      { text: 'Iron (%)', value: 'iron' },
    ],
    desserts: [
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: '1%',
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: '1%',
      },
      {
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: '7%',
      },
      {
        name: 'Cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        iron: '8%',
      },
      {
        name: 'Gingerbread',
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: '16%',
      },
      {
        name: 'Jelly bean',
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        iron: '0%',
      },
      {
        name: 'Lollipop',
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: '2%',
      },
      {
        name: 'Honeycomb',
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: '45%',
      },
      {
        name: 'Donut',
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: '22%',
      },
      {
        name: 'KitKat',
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: '6%',
      },
    ],
  }),
  computed: {
    userData() {
      return this.$store.state.usersModule.user;
    },
    primaryColor() {
      return this.$store.state.UI.primaryColor;
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
  async created() {
    await this.assignUserData();
    await this.getUserData();
  },
  methods: {
    assignUserData() {
      const userData = JSON.parse(localStorage.getItem('currentToken'));
      this.userName = userData.name;
      this.userId = userData.id;
      this.userControlNumber = userData.controlNum;
    },
    async getUserData() {
      await this.$store.dispatch('usersModule/getUserData', this.userControlNumber);
    },
    getColor(calories) {
      if (calories > 400) return 'red';
      if (calories > 200) return 'orange';
      return 'green';
    },
  },
};
</script>

<style></style>

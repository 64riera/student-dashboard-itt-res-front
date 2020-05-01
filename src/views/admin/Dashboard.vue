<template>
  <div>
    <v-container v-if="userData">
      <v-row>
        <v-col cols="12" xs="1" md="3" lg="2" xl="2">
          <template>
            <v-navigation-drawer
              absolute
              left
              v-model="drawerState"
              clipped
              :permanent="!this.$vuetify.breakpoint.xs && !this.$vuetify.breakpoint.sm"
              class="animated fadeIn slow"
            >
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
        <v-col class="animated fadeInLeft" cols="12" xs="11" md="9" lg="10" xl="10">
          <v-container class="py-0">
            <v-card flat>
              <v-card-title>
                <h1
                  class="font-weight-light display-1 mb-3"
                  v-if="!this.$vuetify.breakpoint.xs && !this.$vuetify.breakpoint.sm"
                >
                  Historial de residentes
                </h1>
                <h1
                  class="font-weight-light headline mb-3"
                  v-if="this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm"
                >
                  Historial de residentes
                </h1>
                <v-spacer></v-spacer>
                <v-btn
                  @click="exportAll2Excel()"
                  class="float-right"
                  depressed
                  dark
                  color="green"
                  small
                >
                  Exportar tabla a excel
                  <v-icon x-small right>
                    fas fa-download
                  </v-icon>
                </v-btn>
              </v-card-title>
              <template>
                <v-data-table
                  v-if="studentsData"
                  :headers="headers"
                  :items="studentsData"
                  :loading="loadingStudentsData"
                  height="55vh"
                  class="elevation-0"
                >
                  <template v-slot:item.progress="{ item }">
                    <v-chip small :color="getColor(item.residenceData.length)" dark>
                      {{ ((item.residenceData.length * 100) / 8).toFixed(0) + "%" }}
                    </v-chip>
                  </template>
                  <template v-slot:item.actions="{ item }">
                    <v-btn
                      small
                      depressed
                      color="blue"
                      text
                      dark
                      v-if="item"
                      :to="`/admin/details/${item.controlNum}`"
                    >
                      Ver detalles
                    </v-btn>
                    <v-btn @click="exportToXls(item.controlNum)" text color="green">
                      <v-icon>fas fa-file-excel</v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
              </template>
            </v-card>
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
    items: [{ title: 'Inicio', icon: 'mdi-home-city' }],
    headers: [
      {
        text: 'Nombre',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Email', value: 'email' },
      { text: '# Control', value: 'controlNum' },
      { text: 'Carrera', value: 'career' },
      { text: 'Semestre', value: 'semester' },
      { text: 'Progreso (%)', value: 'progress' },
      { text: '', value: 'actions' },
    ],
    dataToExport: [
      {
        name: 'Jorge',
        occupation: 'Best Admin',
      },
      {
        name: 'Héctor',
        occupation: 'Worst Admin',
      },
      {
        name: 'gmq',
        occupation: ':shrug:',
      },
    ],
  }),
  computed: {
    userData() {
      return this.$store.state.usersModule.user;
    },
    studentsData() {
      return this.$store.state.usersModule.studentsData;
    },
    loadingStudentsData() {
      return this.$store.state.usersModule.loadingStudentsData;
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
    await this.getStudentsData();
  },
  methods: {
    assignUserData() {
      const userData = JSON.parse(localStorage.getItem('currentToken'));
      this.userName = userData.name;
      this.userId = userData.id;
      this.userControlNumber = userData.controlNum;
    },
    async exportToXls(controlNum) {
      await this.$store.dispatch('usersModule/getUserData2Excel', controlNum);
    },
    async exportAll2Excel() {
      await this.$store.dispatch('usersModule/getAllData2Excel');
    },
    async getUserData() {
      await this.$store.dispatch('usersModule/getUserData', this.userControlNumber);
    },
    async getStudentsData() {
      this.$store.dispatch('usersModule/getStudentsData');
    },
    getColor(steps) {
      if (steps < 3) return 'red';
      if (steps < 6) return 'orange';
      return 'green';
    },
  },
};
</script>

<style></style>

<template>
  <div>
    <v-container v-if="userData">
      <v-row>
        <v-col cols="12" xs="1" md="3" lg="2" xl="2">
          <template>
            <v-navigation-drawer absolute left v-model="drawerState" clipped
            :permanent="!this.$vuetify.breakpoint.xs && !this.$vuetify.breakpoint.sm"
            class="animated fadeIn slow">
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
            <h1 class="font-weight-light mb-2">Historial de residentes</h1>
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
                  {{ ((item.residenceData.length * 100) / 8).toFixed(0) + '%' }}
                </v-chip>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn small depressed color="blue" text dark v-if="item"
                       :to="`/admin/details/${item.controlNum}`">
                  Ver detalles
                </v-btn>
                <v-btn @click="exportToXls()" text color="green">
                  <v-icon>fas fa-file-excel</v-icon>
                </v-btn>
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

import XLSX from 'xlsx';

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
    exportToXls() {
      const data = XLSX.utils.json_to_sheet(this.studentsData[0].residenceData);
      const workbook = XLSX.utils.book_new();
      const filename = 'devschile-admins';
      XLSX.utils.book_append_sheet(workbook, data, filename);
      XLSX.writeFile(workbook, `${filename}.xlsx`);
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

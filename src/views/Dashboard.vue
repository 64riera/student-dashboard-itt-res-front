<template>
    <v-container class="my-8 mx-4">
        <h1 class="display-1">Bienvenido {{ userName }}</h1>
    </v-container>
</template>


<script>
export default {
  data: () => ({
    userName: '',
    userId: '',
    userControlNumber: '',
  }),
  created() {
    this.assignUserData();
  },
  methods: {
    assignUserData() {
      const userData = JSON.parse(localStorage.getItem('currentToken'));
      this.userName = userData.name;
      this.userId = userData.id;
      this.userControlNumber = userData.controlNumber;
    },
  },
};
</script>

<style>

</style>

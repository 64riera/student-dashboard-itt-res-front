<template>
  <v-container v-if="userData" class="my-2 mx-4">
    <v-row>
      <v-col class="mb-2" cols="12" sm="12" md="12" lg="12" xl="12">
        <h1 class="display-1 font-weight-light">
          Bienvenido {{ userData.name }} {{ userData.lastName }}
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" xs="12" sm="6" md="4" lg="4" xl="4">
        <template v-if="currentStep === 0">
          <v-card class="mx-auto" max-width="400" min-height="400">
            <v-img
              class="white--text align-end"
              height="200px"
              gradient="to top right, rgba(0,0,0,.43), rgba(0,0,0,.7)"
              src="https://microjurisar.files.wordpress.com/2018/01/untitled-design-59.jpg?w=1024"
            >
              <v-card-title>Paso 1A :</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0">Formato de Solicitd de Residencias</v-card-subtitle>

            <v-card-text class="text--primary">
              <div>Descarga del formato</div>

              <div>Llena la solicitud con los datos solicitados</div>
            </v-card-text>

            <v-card-actions>
              <v-btn href="http://www.ittorreon.edu.mx/documentos/ARCHIVO%207%20Solicitud%20de%20residencias.doc" color="orange" text>
                Descargar
              </v-btn>

              <!-- <v-btn color="orange" text>
                Explore
              </v-btn> -->
            </v-card-actions>
          </v-card>
        </template>
      </v-col>
      <v-col cols="12" xs="12" sm="6" md="4" lg="4" xl="4">
        <template v-if="currentStep === 0">
          <v-card class="mx-auto" max-width="400" min-height="400">
            <v-img
              class="white--text align-end"
              height="200px"
              gradient="to top right, rgba(0,0,0,.43), rgba(0,0,0,.7)"
              src="https://franciscoperezyoma.com/wp-content/uploads/2019/01/francisco-perez-yoma-9-diferencias-empresario-hombre-negocios.jpg"
            >
              <v-card-title>Paso 1B :</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0">Subir Solicitud en formato PDF</v-card-subtitle>

            <v-card-text class="text--primary">
              <div>Del paso 1A...</div>

              <div>Sube el documento escaneado en formato PDF</div>
            </v-card-text>

            <v-card-actions>
              <v-file-input label="Seleccionar archivo..." outlined dense></v-file-input>

              <!-- <v-btn color="orange" text>
                Explore
              </v-btn> -->
            </v-card-actions>
          </v-card>
        </template>
      </v-col>
      <v-col cols="12" xs="12" sm="6" md="4" lg="4" xl="4">
        <template v-if="currentStep === 0">
          <v-card class="mx-auto" max-width="400" min-height="400">
            <v-img
              class="white--text align-end"
              height="200px"
              gradient="to top right, rgba(0,0,0,.43), rgba(0,0,0,.7)"
              src="https://franciscoperezyoma.com/wp-content/uploads/2019/01/francisco-perez-yoma-9-diferencias-empresario-hombre-negocios.jpg"
            >
              <v-card-title>Paso 1C :</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0">
              Registro de proyecto de residencias profesionales
            </v-card-subtitle>

            <v-card-text class="text--primary">
              <div>Envía tu solicitud aquí</div>

              <div>Llena los datos solicitados</div>
            </v-card-text>

            <v-card-actions>
              <v-btn to="/residence/request" text color="orange">Ok, comenzar ahora...</v-btn>

              <!-- <v-btn color="orange" text>
                Explore
              </v-btn> -->
            </v-card-actions>
          </v-card>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    userName: '',
    userId: '',
    userControlNumber: '',
    percentOfAdvance: 0,
    currentStep: 0,
  }),
  computed: {
    userData() {
      return this.$store.state.usersModule.user;
    },
  },
  async created() {
    await this.assignUserData();
    await this.getUserData();
    await this.verifyStateOfSteps();
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
    verifyStateOfSteps() {
      if (this.userData.residenceData.length === 0) return true;
      return true;
    },
  },
};
</script>

<style></style>

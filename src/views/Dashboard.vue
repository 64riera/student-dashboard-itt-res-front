<template>
  <v-container v-if="userData" class="">
    <v-row>
      <v-col class="mb-2" cols="12" sm="12" md="12" lg="12" xl="12">
        <template>
          <v-card elevation="24">
            <v-tabs
              v-model="dashboardTab"
              background-color="green accent-4"
              centered
              class="mt-4"
              dark
              icons-and-text
            >
              <v-tabs-slider></v-tabs-slider>

              <v-tab href="#tab-1">
                Hagámoslo
                <v-icon>mdi-check</v-icon>
              </v-tab>

              <v-tab :class="dashboardTab === 'tab-1' ? 'animated infinite pulse' : false"
                href="#tab-2">
                Pasos a seguir
                <v-icon>mdi-calendar</v-icon>
              </v-tab>

            </v-tabs>

            <v-tabs-items v-model="dashboardTab">
              <v-tab-item value="tab-1">
                  <v-container>
                    <h2 class="text-center mx-8 font-weight-light">
                      Bienvenido {{ userData.name }} {{ userData.lastName }}
                    </h2>
                    <v-row>
                      <v-col cols="12" xs="12" sm="6" md="4" lg="4" xl="4">
                        <template v-if="currentStep === 0">
                          <v-card elevation="1" class="mx-auto" max-width="300" min-height="400">
                            <v-img
                              class="white--text align-end"
                              height="200px"
                              gradient="to top right, rgba(0,0,0,.43), rgba(0,0,0,.7)"
                              src="https://microjurisar.files.wordpress.com/2018/01/untitled-design-59.jpg?w=1024"
                            >
                              <v-card-title>Paso 1A :</v-card-title>
                            </v-img>

                            <v-card-subtitle class="pb-0"
                              >Formato de Solicitd de Residencias</v-card-subtitle
                            >

                            <v-card-text class="text--primary">
                              <div>Descarga del formato</div>

                              <div>Llena la solicitud con los datos solicitados</div>
                            </v-card-text>

                            <v-card-actions>
                              <v-btn
                                href="http://www.ittorreon.edu.mx/documentos/ARCHIVO%207%20Solicitud%20de%20residencias.doc"
                                color="orange accent-4"
                                text
                              >
                                Descargar
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </template>
                      </v-col>
                      <v-col cols="12" xs="12" sm="6" md="4" lg="4" xl="4">
                        <template v-if="currentStep === 0">
                          <v-card elevation="1" class="mx-auto" max-width="300" min-height="400">
                            <v-img
                              class="white--text align-end"
                              height="200px"
                              gradient="to top right, rgba(0,0,0,.43), rgba(0,0,0,.7)"
                              src="https://franciscoperezyoma.com/wp-content/uploads/2019/01/francisco-perez-yoma-9-diferencias-empresario-hombre-negocios.jpg"
                            >
                              <v-card-title>Paso 1B :</v-card-title>
                            </v-img>

                            <v-card-subtitle class="pb-0"
                              >Subir Solicitud en formato PDF</v-card-subtitle
                            >

                            <v-card-text class="text--primary">
                              <div>Del paso 1A...</div>

                              <div>Sube el documento escaneado en formato PDF</div>
                            </v-card-text>

                            <v-card-actions>
                              <v-file-input
                                label="Seleccionar archivo..."
                                outlined
                                dense
                                color="orange accent-4"
                              ></v-file-input>
                            </v-card-actions>
                          </v-card>
                        </template>
                      </v-col>
                      <v-col cols="12" xs="12" sm="6" md="4" lg="4" xl="4" v-if="!step1cCompleted">
                        <template>
                          <v-card elevation="1" class="mx-auto" max-width="300" min-height="400">
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
                              <v-btn to="/residence/request" text color="orange accent-4"
                                >Ok, comenzar ahora...</v-btn
                              >
                            </v-card-actions>
                          </v-card>
                        </template>
                      </v-col>
                    </v-row>
                  </v-container>
              </v-tab-item>
              <v-tab-item value="tab-2">
                <v-container>
                  <v-row class="px-5">
                    <v-col cols="12" xs="12" sm="12" md="12" xl="12">
                      <template>
                        <v-timeline>
                          <v-timeline-item
                            v-for="(step, i) in steps"
                            :key="i"
                            :color="step.color"
                            small
                          >
                            <template v-slot:opposite>
                              <span
                                :class="`headline font-weight-bold ${step.color}--text`"
                                v-text="step.step"
                              ></span>
                            </template>
                            <div class="py-4">
                              <h2 :class="`headline font-weight-light mb-4 ${step.color}--text`">
                                {{ step.title }}
                              </h2>
                              <div>
                                {{ step.msg }}
                              </div>
                            </div>
                          </v-timeline-item>
                        </v-timeline>
                      </template>
                    </v-col>
                  </v-row>
                </v-container>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dashboardTab: null,
    userName: '',
    userId: '',
    userControlNumber: '',
    percentOfAdvance: 0,
    currentStep: 0,
    step1cCompleted: false,
    steps: [
      {
        color: 'cyan',
        step: 'Paso 1A',
        title: 'Formato de Solicitd de Residencias',
        msg: 'Descarga del formato, llena la solicitud con los datos solicitados',
      },
      {
        color: 'green',
        step: 'Paso 1B',
        title: 'Subir Solicitud en formato PDF',
        msg: 'Del paso 1A... sube el documento escaneado en formato PDF',
      },
      {
        color: 'pink',
        step: 'Paso 1C',
        title: 'Registro de proyecto de residencias profesionales',
        msg: 'Envía tu solicitud aquí, llena los datos solicitados',
      },
      {
        color: 'amber',
        step: 'Paso 2A',
        title: 'Reporte preliminar validado (link)',
        msg:
          'Los asesores interno y externo supervisan el reporte preliminar mediante el formato electrónico que elabora el estudiante. ',
      },
      {
        color: 'orange',
        step: 'Paso 2B',
        title: 'Subir Reporte Preliminar en formato PDF',
        msg: 'Escanea el reporte elaborado, posteriormente súbelo aquí',
      },
      {
        color: 'cyan',
        step: 'Paso 1A',
        title: 'Formato de Solicitd de Residencias',
        msg: 'Descarga del formato, llena la solicitud con los datos solicitados',
      },
      {
        color: 'green',
        step: 'Paso 1B',
        title: 'Subir Solicitud en formato PDF',
        msg: 'Del paso 1A... sube el documento escaneado en formato PDF',
      },
      {
        color: 'pink',
        step: 'Paso 1C',
        title: 'Registro de proyecto de residencias profesionales',
        msg: 'Envía tu solicitud aquí, llena los datos solicitados',
      },
      {
        color: 'amber',
        step: 'Paso 2A',
        title: 'Reporte preliminar validado (link)',
        msg:
          'Los asesores interno y externo supervisan el reporte preliminar mediante el formato electrónico que elabora el estudiante. ',
      },
      {
        color: 'orange',
        step: 'Paso 2B',
        title: 'Subir Reporte Preliminar en formato PDF',
        msg: 'Escanea el reporte elaborado, posteriormente súbelo aquí',
      },
    ],
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

      this.userData.residenceData.forEach((step) => {
        switch (step.stepId) {
          case '1-C':
            this.step1cCompleted = true;
            break;
          default:
            return true;
        }
        return true;
      });

      return true;
    },
  },
};
</script>

<style></style>

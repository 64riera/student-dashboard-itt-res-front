<template>
  <v-container v-if="userData" class>
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

              <v-tab
                :class="dashboardTab === 'tab-1' ? 'animated infinite pulse' : false"
                href="#tab-2"
              >
                Mi progreso
                <v-icon>mdi-calendar</v-icon>
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="dashboardTab">
              <v-tab-item value="tab-1">
                <v-container class="px-4 py-5">
                  <h2 class="text-center mx-8 my-2 font-weight-light">
                    Bienvenid@ {{ userData.name }} {{ userData.lastName }}
                  </h2>

                  <!-- Step 1 Start -->

                  <v-row v-if="!step1bCompleted || !step1cCompleted">
                    <v-col cols="12" xs="12" sm="6" md="4" lg="4" xl="4" v-if="!step1bCompleted">
                      <template v-if="currentStep === 0">
                        <v-card outlined class="mx-auto" max-width="300" min-height="400">
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
                              >Descargar</v-btn
                            >
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-col>
                    <v-col cols="12" xs="12" sm="6" md="4" lg="4" xl="4" v-if="!step1bCompleted">
                      <template v-if="currentStep === 0">
                        <v-card outlined class="mx-auto" max-width="300" min-height="400">
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
                              :disabled="disabledAndLoading"
                              :loading="disabledAndLoading"
                              accept=".pdf, .doc, .docx"
                              dense
                              v-model="myFile"
                              type="file"
                              @change="onChangeFile('1-B')"
                              color="orange accent-4"
                            ></v-file-input>
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-col>
                    <v-col cols="12" xs="12" sm="6" md="4" lg="4" xl="4"
                           v-if="!step1cCompleted">
                      <template>
                        <v-card outlined class="mx-auto" max-width="300" min-height="400">
                          <v-img
                            class="white--text align-end"
                            height="200px"
                            gradient="to top right, rgba(0,0,0,.43), rgba(0,0,0,.7)"
                            src="https://franciscoperezyoma.com/wp-content/uploads/2019/01/francisco-perez-yoma-9-diferencias-empresario-hombre-negocios.jpg"
                          >
                            <v-card-title>Paso 1C :</v-card-title>
                          </v-img>

                          <v-card-subtitle class="pb-0"
                            >Registro de proyecto de residencias profesionales</v-card-subtitle
                          >

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

                  <!-- Step 1 ends -->

                  <!-- Step 2 Starts -->

                  <v-row v-if="step1cCompleted && !step2bCompleted">
                    <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="6">
                      <template>
                        <v-card outlined class="mx-auto" max-width="300" min-height="400">
                          <v-img
                            class="white--text align-end"
                            height="200px"
                            gradient="to top right, rgba(0,0,0,.43), rgba(0,0,0,.7)"
                            src="https://microjurisar.files.wordpress.com/2018/01/untitled-design-59.jpg?w=1024"
                          >
                            <v-card-title>Paso 2A :</v-card-title>
                          </v-img>

                          <v-card-subtitle class="pb-0"
                            >Formato de Reporte Preliminar Validado</v-card-subtitle
                          >

                          <v-card-text class="text--primary">
                            <div>Descarga del formato</div>

                            <div>Llena el formato con los datos solicitados</div>
                          </v-card-text>

                          <v-card-actions>
                            <v-btn
                              href="http://www.ittorreon.edu.mx/documentos/ARCHIVO%208%20Guion%20de%20Reporte%20preliminar%20validado.pdf"
                              color="orange accent-4"
                              text
                              >Descargar</v-btn
                            >
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-col>
                    <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="6">
                      <template>
                        <v-card outlined class="mx-auto" max-width="300" min-height="400">
                          <v-img
                            class="white--text align-end"
                            height="200px"
                            gradient="to top right, rgba(0,0,0,.43), rgba(0,0,0,.7)"
                            src="https://franciscoperezyoma.com/wp-content/uploads/2019/01/francisco-perez-yoma-9-diferencias-empresario-hombre-negocios.jpg"
                          >
                            <v-card-title>Paso 2B :</v-card-title>
                          </v-img>

                          <v-card-subtitle class="pb-0"
                            >Subir Reporte Preliminar en formato PDF</v-card-subtitle
                          >

                          <v-card-text class="text--primary">
                            <div>Del paso 2A...</div>

                            <div>Sube el documento escaneado en formato PDF</div>
                          </v-card-text>

                          <v-card-actions>
                            <v-file-input
                              label="Seleccionar archivo..."
                              outlined
                              :disabled="disabledAndLoading"
                              :loading="disabledAndLoading"
                              accept=".pdf, .doc, .docx"
                              dense
                              v-model="myFile"
                              type="file"
                              @change="onChangeFile('2-B')"
                              color="orange accent-4"
                            ></v-file-input>
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-col>
                  </v-row>

                  <!-- Step 2 ends -->

                  <!-- Step 3 Starts -->

                  <v-row v-if="step2bCompleted && !step3aCompleted">
                    <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                      <template>
                        <v-card outlined class="mx-auto" max-width="300" min-height="400">
                          <v-img
                            class="white--text align-end"
                            height="200px"
                            gradient="to top right, rgba(0,0,0,.43), rgba(0,0,0,.7)"
                            src="https://franciscoperezyoma.com/wp-content/uploads/2019/01/francisco-perez-yoma-9-diferencias-empresario-hombre-negocios.jpg"
                          >
                            <v-card-title>Paso 3A :</v-card-title>
                          </v-img>

                          <v-card-subtitle class="pb-0"
                            >Subir carta de presentación (PDF)</v-card-subtitle
                          >

                          <v-card-text class="text--primary">
                            <div>Sube el documento escaneado en formato PDF</div>
                          </v-card-text>

                          <v-card-actions>
                            <v-file-input
                              label="Seleccionar archivo..."
                              outlined
                              :disabled="disabledAndLoading"
                              :loading="disabledAndLoading"
                              accept=".pdf, .doc, .docx"
                              dense
                              v-model="myFile"
                              type="file"
                              @change="onChangeFile('3-A')"
                              color="orange accent-4"
                            ></v-file-input>
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-col>
                  </v-row>

                  <!-- Step 3 ends -->

                  <!-- Step 4 Starts -->

                  <v-row v-if="step3aCompleted && !step4aCompleted">
                    <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                      <template>
                        <v-card outlined class="mx-auto" max-width="300" min-height="400">
                          <v-img
                            class="white--text align-end"
                            height="200px"
                            gradient="to top right, rgba(0,0,0,.43), rgba(0,0,0,.7)"
                            src="https://franciscoperezyoma.com/wp-content/uploads/2019/01/francisco-perez-yoma-9-diferencias-empresario-hombre-negocios.jpg"
                          >
                            <v-card-title>Paso 4A :</v-card-title>
                          </v-img>

                          <v-card-subtitle class="pb-0"
                            >Subir carta de aceptación (PDF)</v-card-subtitle
                          >

                          <v-card-text class="text--primary">
                            <div>Sube el documento escaneado en formato PDF</div>
                          </v-card-text>

                          <v-card-actions>
                            <v-file-input
                              label="Seleccionar archivo..."
                              outlined
                              :disabled="disabledAndLoading"
                              :loading="disabledAndLoading"
                              accept=".pdf, .doc, .docx"
                              dense
                              v-model="myFile"
                              type="file"
                              @change="onChangeFile('4-A')"
                              color="orange accent-4"
                            ></v-file-input>
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-col>
                  </v-row>

                  <!-- Step 4 ends -->

                  <!-- Step 5, 6, 7, 8 Starts -->

                  <v-row v-if="step4aCompleted && !step9aCompleted">
                    <v-col cols="12" xs="12" sm="3" md="3" lg="3" xl="3">
                      <template>
                        <v-card outlined class="mx-auto" max-width="300" min-height="400">
                          <v-img
                            class="white--text align-end"
                            height="200px"
                            gradient="to top right, rgba(0,0,0,.43), rgba(0,0,0,.7)"
                            src="https://microjurisar.files.wordpress.com/2018/01/untitled-design-59.jpg?w=1024"
                          >
                            <v-card-title>Paso 5A :</v-card-title>
                          </v-img>

                          <v-card-subtitle class="pb-0"
                            >Dictamen (calendario de protocolo)</v-card-subtitle
                          >

                          <v-card-text class="text--primary">
                            <div>Descarga del formato</div>
                          </v-card-text>

                          <v-card-actions>
                            <v-btn href="#" color="orange accent-4" text>Descargar</v-btn>
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-col>
                    <v-col cols="12" xs="12" sm="3" md="3" lg="3" xl="3">
                      <template>
                        <v-card outlined class="mx-auto" max-width="300" min-height="400">
                          <v-img
                            class="white--text align-end"
                            height="200px"
                            gradient="to top right, rgba(0,0,0,.43), rgba(0,0,0,.7)"
                            src="https://microjurisar.files.wordpress.com/2018/01/untitled-design-59.jpg?w=1024"
                          >
                            <v-card-title>Paso 6A :</v-card-title>
                          </v-img>

                          <v-card-subtitle class="pb-0"
                            >Formato de registro de asesorias y evaluación de
                            residencias</v-card-subtitle
                          >

                          <v-card-text class="text--primary">
                            <div>Descarga del formato</div>
                          </v-card-text>

                          <v-card-actions>
                            <v-btn
                              href="http://www.ittorreon.edu.mx/documentos/ARCHIVO%2010%20Registro%20de%20asesor%C3%ADas%20de%20residencias.doc"
                              color="orange accent-4"
                              text
                              >Descargar</v-btn
                            >
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-col>
                    <v-col cols="12" xs="12" sm="3" md="3" lg="3" xl="3">
                      <template>
                        <v-card outlined class="mx-auto" max-width="300" min-height="400">
                          <v-img
                            class="white--text align-end"
                            height="200px"
                            gradient="to top right, rgba(0,0,0,.43), rgba(0,0,0,.7)"
                            src="https://microjurisar.files.wordpress.com/2018/01/untitled-design-59.jpg?w=1024"
                          >
                            <v-card-title>Paso 7A :</v-card-title>
                          </v-img>

                          <v-card-subtitle class="pb-0"
                            >Formato de evaluación y seguimiento de residencias</v-card-subtitle
                          >

                          <v-card-text class="text--primary">
                            <div>Descarga del formato</div>
                          </v-card-text>

                          <v-card-actions>
                            <v-btn
                              href="http://www.ittorreon.edu.mx/documentos/ARCHIVO%2011%20Evaluaci%C3%B3n%20y%20seguimiento%20de%20residencias.doc"
                              color="orange accent-4"
                              text
                              >Descargar</v-btn
                            >
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-col>
                    <v-col cols="12" xs="12" sm="3" md="3" lg="3" xl="3">
                      <template>
                        <v-card outlined class="mx-auto" max-width="300" min-height="400">
                          <v-img
                            class="white--text align-end"
                            height="200px"
                            gradient="to top right, rgba(0,0,0,.43), rgba(0,0,0,.7)"
                            src="https://microjurisar.files.wordpress.com/2018/01/untitled-design-59.jpg?w=1024"
                          >
                            <v-card-title>Paso 8A :</v-card-title>
                          </v-img>

                          <v-card-subtitle class="pb-0"
                            >Formato de evaluación de reporte de residencias</v-card-subtitle
                          >

                          <v-card-text class="text--primary">
                            <div>Descarga del formato</div>
                          </v-card-text>

                          <v-card-actions>
                            <v-btn
                              href="http://www.ittorreon.edu.mx/documentos/ARCHIVO%2012%20Formato%20de%20evaluaci%C3%B3n%20de%20reporte%20de%20residencias.doc"
                              color="orange accent-4"
                              text
                              >Descargar</v-btn
                            >
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-col>
                  </v-row>

                  <!-- Step 5, 6, 7, 8 ends -->

                  <!-- Step 9 starts -->

                  <v-row v-if="step4aCompleted && !step9aCompleted">
                    <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                      <template>
                        <v-card outlined class="mx-auto" max-width="300" min-height="400">
                          <v-img
                            class="white--text align-end"
                            height="200px"
                            gradient="to top right, rgba(0,0,0,.43), rgba(0,0,0,.7)"
                            src="https://franciscoperezyoma.com/wp-content/uploads/2019/01/francisco-perez-yoma-9-diferencias-empresario-hombre-negocios.jpg"
                          >
                            <v-card-title>Paso 9A :</v-card-title>
                          </v-img>

                          <v-card-subtitle class="pb-0"
                            >Subir carta de término de residencias profesionales
                            (PDF)</v-card-subtitle
                          >

                          <v-card-text class="text--primary">
                            <div>Sube el documento escaneado en formato PDF</div>
                          </v-card-text>

                          <v-card-actions>
                            <v-file-input
                              label="Seleccionar archivo..."
                              outlined
                              :disabled="disabledAndLoading"
                              :loading="disabledAndLoading"
                              accept=".pdf, .doc, .docx"
                              dense
                              v-model="myFile"
                              type="file"
                              @change="onChangeFile('9-A')"
                              color="orange accent-4"
                            ></v-file-input>
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-col>
                  </v-row>

                  <!-- Step 9 ends -->

                  <!-- Step 10 starts -->

                  <v-row v-if="step9aCompleted && !step10aCompleted">
                    <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                      <template>
                        <v-card outlined class="mx-auto" max-width="300" min-height="400">
                          <v-img
                            class="white--text align-end"
                            height="200px"
                            gradient="to top right, rgba(0,0,0,.43), rgba(0,0,0,.7)"
                            src="https://franciscoperezyoma.com/wp-content/uploads/2019/01/francisco-perez-yoma-9-diferencias-empresario-hombre-negocios.jpg"
                          >
                            <v-card-title>Paso 10A :</v-card-title>
                          </v-img>

                          <v-card-subtitle class="pb-0"
                            >Subir reporte de residencias profesionales (PDF)</v-card-subtitle
                          >

                          <v-card-text class="text--primary">
                            <div>Sube el documento escaneado en formato PDF</div>
                          </v-card-text>

                          <v-card-actions>
                            <v-file-input
                              label="Seleccionar archivo..."
                              outlined
                              :disabled="disabledAndLoading"
                              :loading="disabledAndLoading"
                              accept=".pdf, .doc, .docx"
                              dense
                              v-model="myFile"
                              type="file"
                              @change="onChangeFile('10-A')"
                              color="orange accent-4"
                            ></v-file-input>
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-col>
                  </v-row>

                  <!-- Step 10 ends -->

                  <!-- Step 11 starts -->

                  <v-row v-if="step10aCompleted && !step11aCompleted">
                    <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                      <template>
                        <v-card outlined class="mx-auto" max-width="300" min-height="400">
                          <v-img
                            class="white--text align-end"
                            height="200px"
                            gradient="to top right, rgba(0,0,0,.43), rgba(0,0,0,.7)"
                            src="https://franciscoperezyoma.com/wp-content/uploads/2019/01/francisco-perez-yoma-9-diferencias-empresario-hombre-negocios.jpg"
                          >
                            <v-card-title>Paso 11A :</v-card-title>
                          </v-img>

                          <v-card-subtitle class="pb-0"
                            >Subir acta de calificaciones de residencias (PDF)</v-card-subtitle
                          >

                          <v-card-text class="text--primary">
                            <div>Sube el documento escaneado en formato PDF</div>
                          </v-card-text>

                          <v-card-actions>
                            <v-file-input
                              label="Seleccionar archivo..."
                              outlined
                              :disabled="disabledAndLoading"
                              :loading="disabledAndLoading"
                              accept=".pdf, .doc, .docx"
                              dense
                              v-model="myFile"
                              type="file"
                              @change="onChangeFile('11-A')"
                              color="orange accent-4"
                            ></v-file-input>
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-col>
                  </v-row>

                  <!-- Step 11 ends -->
                </v-container>
              </v-tab-item>
              <v-tab-item value="tab-2">
                <v-container>
                  <v-row class="px-5">
                    <v-col cols="12" xs="12" sm="12" md="4" xl="6">
                      <v-card class="text-center pa-1 mt-4 animated fadeIn" outlined>
                        <v-card-title class>
                          <h4 class="font-weight-light">Tu avance actual, {{ userData.name }}</h4>
                        </v-card-title>
                        <v-card-text>
                          <v-progress-circular
                            class="animated infinite pulse slow"
                            :rotate="90"
                            :size="100"
                            :width="15"
                            color="red accent-3"
                            :value="actualProgress"
                            >{{ actualProgress }} %</v-progress-circular
                          >
                          <p class="mt-4">Completado, Vamos!</p>
                          <v-btn dark depressed rounded small color="orange accent-4"
                            >Tienes dudas? Presiona aquí</v-btn
                          >
                        </v-card-text>
                      </v-card>
                      <v-card class="text-center pa-1 mt-4 animated fadeIn" outlined>
                        <v-card-text>
                          <h4 class="font-weight-light">Más secciones proximamente...</h4>
                        </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xs="12" sm="12" md="8" xl="6">
                      <template>
                        <v-timeline dense class="animated fadeInUp">
                          <v-timeline-item
                            fill-dot
                            v-for="(step, i) in steps"
                            :icon="step.completed ? 'mdi-check' : ''"
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
                              <div>{{ step.msg }}</div>
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
    myFile: null,
    totalSteps: 8,
    currentProgress: 0,
    step1bCompleted: false,
    step1cCompleted: false,
    step2bCompleted: false,
    step3aCompleted: false,
    step4aCompleted: false,
    step9aCompleted: false,
    step10aCompleted: false,
    step11aCompleted: false,
    steps: [],
  }),
  computed: {
    userData() {
      return this.$store.state.usersModule.user;
    },
    actualProgress() {
      if (!this.userData.residenceData) return false;
      return ((this.userData.residenceData.length * 100) / this.totalSteps).toFixed(0);
    },
    disabledAndLoading() {
      return this.$store.state.usersModule.disabledAndLoading;
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
      this.userData.residenceData.forEach((step) => {
        switch (step.stepId) {
          case '1-B':
            this.step1bCompleted = true;
            break;
          case '1-C':
            this.step1cCompleted = true;
            break;
          case '2-B':
            this.step2bCompleted = true;
            break;
          case '3-A':
            this.step3aCompleted = true;
            break;
          case '4-A':
            this.step4aCompleted = true;
            break;
          case '9-A':
            this.step9aCompleted = true;
            break;
          case '10-A':
            this.step10aCompleted = true;
            break;
          case '11-A':
            this.step11aCompleted = true;
            break;
          default:
            return true;
        }
        return true;
      });

      this.steps = [
        {
          color: 'cyan',
          step: 'Paso 1A',
          title: 'Formato de Solicitd de Residencias',
          msg: 'Descarga del formato, llena la solicitud con los datos solicitados',
          completed: !!this.step1bCompleted,
        },
        {
          color: 'green',
          step: 'Paso 1B',
          title: 'Subir Solicitud en formato PDF',
          msg: 'Del paso 1A... sube el documento escaneado en formato PDF',
          completed: !!this.step1bCompleted,
        },
        {
          color: 'pink',
          step: 'Paso 1C',
          title: 'Registro de proyecto de residencias profesionales',
          msg: 'Envía tu solicitud aquí, llena los datos solicitados',
          completed: !!this.step1cCompleted,
        },
        {
          color: 'amber',
          step: 'Paso 2A',
          title: 'Reporte preliminar validado (link)',
          msg:
            'Los asesores interno y externo supervisan el reporte preliminar mediante el formato electrónico que elabora el estudiante. ',
          completed: !!this.step2bCompleted,
        },
        {
          color: 'orange',
          step: 'Paso 2B',
          title: 'Subir Reporte Preliminar en formato PDF',
          msg: 'Escanea el reporte elaborado, posteriormente súbelo aquí',
          completed: !!this.step2bCompleted,
        },
        {
          color: 'cyan',
          step: 'Paso 3A',
          title: 'Subir carta de presentación (PDF)',
          msg: 'Sube el documento en formato PDF',
          completed: !!this.step3aCompleted,
        },
        {
          color: 'green',
          step: 'Paso 4A',
          title: 'Subir carta de aceptación (PDF)',
          msg: 'Sube el documento en formato PDF',
          completed: !!this.step4aCompleted,
        },
        {
          color: 'pink',
          step: 'Paso 5A',
          title: 'Dictamen (calendario de protocolo)',
          msg: 'Descarga del formato',
          completed: !!this.step9aCompleted,
        },
        {
          color: 'amber',
          step: 'Paso 6A',
          title: 'Formato de registro de asesorias y evaluación de residencias',
          msg: 'Descarga del formato',
          completed: !!this.step9aCompleted,
        },
        {
          color: 'orange',
          step: 'Paso 7A',
          title: 'Formato de evaluación y seguimiento de residencias',
          msg: 'Descarga del formato',
          completed: !!this.step9aCompleted,
        },
        {
          color: 'cyan',
          step: 'Paso 8A',
          title: 'Formato de evaluación de reporte de residencias',
          msg: 'Descarga del formato',
          completed: !!this.step9aCompleted,
        },
        {
          color: 'green',
          step: 'Paso 9A',
          title: 'Subir carta de término de residencias profesionales (PDF)',
          msg: 'Sube el documento en formato PDF',
          completed: !!this.step9aCompleted,
        },
        {
          color: 'pink',
          step: 'Paso 10A',
          title: 'Subir reporte de residencias profesionales (PDF)',
          msg: 'Sube el documento en formato PDF',
          completed: !!this.step10aCompleted,
        },
        {
          color: 'amber',
          step: 'Paso 11A',
          title: 'Subir acta de calificaciones de residencias (PDF)',
          msg: 'Sube el documento en formato PDF',
          completed: !!this.step11aCompleted,
        },
      ];

      return true;
    },
    onChangeFile(stepIdParameter) {
      const extension = this.myFile.name.split('.').pop();
      const generatedFileName = `${Date.now()}.${extension}`;

      // eslint-disable-next-line no-alert
      if (extension !== 'pdf' && extension !== 'doc' && extension !== 'docx') return alert('Selecciona un archivo con extensión pdf, doc ó docx');

      const payload = {
        fileName: generatedFileName,
        fileRoute: `/ResidenceStudentsFiles/${generatedFileName}`,
        fileFormat: extension,
        file: this.myFile,
        stepId: stepIdParameter,
        stepState: 'Submited',
        controlNum: this.userControlNumber,
      };

      this.$store.dispatch('usersModule/uploadFileStep', payload);

      return true;
    },
  },
};
</script>

<style></style>

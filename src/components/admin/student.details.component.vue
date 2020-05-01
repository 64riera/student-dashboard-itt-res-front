<template>
  <v-container v-if="studentData">
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="12" lg="6" xl="6" class="justify-content">
        <template>
          <v-card class="mx-auto mt-2" max-width="434" raised>
            <v-img height="100%" src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg">
              <v-row align="end" class="fill-height">
                <v-col align-self="start" class="pa-0" cols="12">
                  <v-avatar class="profile" color="light-blue" size="164" tile>
                    <span class="white--text headline">
                      {{ studentData.name[0] }}{{ studentData.lastName[0] }}
                    </span>
                  </v-avatar>
                </v-col>
                <v-col class="py-0">
                  <v-list-item color="rgba(0, 0, 0, .4)" dark>
                    <v-list-item-content>
                      <v-list-item-title class="title">
                        {{ studentData.name }} {{ studentData.lastName }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        Estudiante de {{ studentData.career }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
            </v-img>
          </v-card>
        </template>
        <v-form class="mt-6">
          <v-text-field outlined readonly label="Edad" v-model="studentData.age"> </v-text-field>
          <v-text-field outlined readonly label="# de control" v-model="studentData.controlNum">
          </v-text-field>
          <v-text-field outlined readonly label="Email" v-model="studentData.email"> </v-text-field>
          <v-text-field outlined readonly label="Periodo" v-model="studentData.period">
          </v-text-field>
          <v-text-field outlined readonly label="Semestre" v-model="studentData.semester">
          </v-text-field>
          <v-text-field outlined readonly label="Fecha de registro" v-model="studentData.createdAt">
          </v-text-field>
        </v-form>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="12" lg="6" xl="6">
        <v-row class="px-3">
          <v-col cols="12" xs="12" sm="12" md="12" xl="12">
            <v-card class="text-center pa-1 animated fadeIn" outlined>
              <v-card-title class>
                <h4 class="font-weight-light">Avance actual de {{ studentData.name }}</h4>
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
                <p class="mt-4"></p>
                <v-btn dark depressed rounded small color="red accent-3">Completado</v-btn>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" xs="12" sm="12" md="12" xl="12">
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
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
    step1bData: {
      completed: false,
      fileData: {
        name: '',
        route: '',
        format: '',
      },
    },
    step1cData: {
      completed: false,
      fileData: {
        name: '',
        route: '',
        format: '',
      },
    },
    step2bData: {
      completed: false,
      fileData: {
        name: '',
        route: '',
        format: '',
      },
    },
    step3aData: {
      completed: false,
      fileData: {
        name: '',
        route: '',
        format: '',
      },
    },
    step4aData: {
      completed: false,
      fileData: {
        name: '',
        route: '',
        format: '',
      },
    },
    step9aData: {
      completed: false,
      fileData: {
        name: '',
        route: '',
        format: '',
      },
    },
    step10aData: {
      completed: false,
      fileData: {
        name: '',
        route: '',
        format: '',
      },
    },
    step11aData: {
      completed: false,
      fileData: {
        name: '',
        route: '',
        format: '',
      },
    },
    steps: [],
  }),
  computed: {
    studentData() {
      return this.$store.state.usersModule.user;
    },
    actualProgress() {
      if (!this.studentData.residenceData) return false;
      return ((this.studentData.residenceData.length * 100) / this.totalSteps).toFixed(0);
    },
  },
  async created() {
    await this.getStudentData();
    await this.verifyStateOfSteps();
  },
  methods: {
    async getStudentData() {
      const { controlNum } = this.$route.params;
      await this.$store.dispatch('usersModule/getUserData', controlNum);
    },
    verifyStateOfSteps() {
      this.studentData.residenceData.forEach((step) => {
        console.log(step);
        switch (step.stepId) {
          case '1-B':
            this.step1bData.completed = true;
            this.step1bData.fileData.name = step.fileData[0].fileName !== '' ? step.fileData[0].fileName : '';
            this.step1bData.fileData.route = step.fileData[0].fileRoute !== '' ? step.fileData[0].fileRoute : '';
            this.step1bData.fileData.format = step.fileData[0].fileFormat !== '' ? step.fileData[0].fileRoute : '';
            break;
          case '1-C':
            this.step1cData.completed = true;
            this.step1cData.fileData.name = step.fileData[0].fileName !== '' ? step.fileData[0].fileName : '';
            this.step1cData.fileData.route = step.fileData[0].fileRoute !== '' ? step.fileData[0].fileRoute : '';
            this.step1cData.fileData.format = step.fileData[0].fileFormat !== '' ? step.fileData[0].fileRoute : '';
            break;
          case '2-B':
            this.step2bData.completed = true;
            this.step2bData.fileData.name = step.fileData[0].fileName !== '' ? step.fileData[0].fileName : '';
            this.step2bData.fileData.route = step.fileData[0].fileRoute !== '' ? step.fileData[0].fileRoute : '';
            this.step2bData.fileData.format = step.fileData[0].fileFormat !== '' ? step.fileData[0].fileRoute : '';
            break;
          case '3-A':
            this.step3aData.completed = true;
            this.step3aData.fileData.name = step.fileData[0].fileName !== '' ? step.fileData[0].fileName : '';
            this.step3aData.fileData.route = step.fileData[0].fileRoute !== '' ? step.fileData[0].fileRoute : '';
            this.step3aData.fileData.format = step.fileData[0].fileFormat !== '' ? step.fileData[0].fileRoute : '';
            break;
          case '4-A':
            this.step4aData.completed = true;
            this.step4aData.fileData.name = step.fileData[0].fileName !== '' ? step.fileData[0].fileName : '';
            this.step4aData.fileData.route = step.fileData[0].fileRoute !== '' ? step.fileData[0].fileRoute : '';
            this.step4aData.fileData.format = step.fileData[0].fileFormat !== '' ? step.fileData[0].fileRoute : '';
            break;
          case '9-A':
            this.step9aData.completed = true;
            this.step9aData.fileData.name = step.fileData[0].fileName !== '' ? step.fileData[0].fileName : '';
            this.step9aData.fileData.route = step.fileData[0].fileRoute !== '' ? step.fileData[0].fileRoute : '';
            this.step9aData.fileData.format = step.fileData[0].fileFormat !== '' ? step.fileData[0].fileRoute : '';
            break;
          case '10-A':
            this.step10aData.completed = true;
            this.step10aData.fileData.name = step.fileData[0].fileName !== '' ? step.fileData[0].fileName : '';
            this.step10aData.fileData.route = step.fileData[0].fileRoute !== '' ? step.fileData[0].fileRoute : '';
            this.step10aData.fileData.format = step.fileData[0].fileFormat !== '' ? step.fileData[0].fileRoute : '';
            break;
          case '11-A':
            this.step11aData.completed = true;
            this.step11aData.fileData.name = step.fileData[0].fileName !== '' ? step.fileData[0].fileName : '';
            this.step11aData.fileData.route = step.fileData[0].fileRoute !== '' ? step.fileData[0].fileRoute : '';
            this.step11aData.fileData.format = step.fileData[0].fileFormat !== '' ? step.fileData[0].fileRoute : '';
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
          completed: !!this.step1bData.completed,
        },
        {
          color: 'green',
          step: 'Paso 1B',
          title: 'Subir Solicitud en formato PDF',
          msg: 'Del paso 1A... sube el documento escaneado en formato PDF',
          completed: !!this.step1bData.completed,
          fileName: this.step1bData.fileData.name,
          fileRoute: this.step1bData.fileData.route,
          fileFormat: this.step1bData.fileData.format,
        },
        {
          color: 'pink',
          step: 'Paso 1C',
          title: 'Registro de proyecto de residencias profesionales',
          msg: 'Envía tu solicitud aquí, llena los datos solicitados',
          completed: !!this.step1cData.completed,
        },
        {
          color: 'amber',
          step: 'Paso 2A',
          title: 'Reporte preliminar validado (link)',
          msg:
            'Los asesores interno y externo supervisan el reporte preliminar mediante el formato electrónico que elabora el estudiante. ',
          completed: !!this.step2bData.completed,
        },
        {
          color: 'orange',
          step: 'Paso 2B',
          title: 'Subir Reporte Preliminar en formato PDF',
          msg: 'Escanea el reporte elaborado, posteriormente súbelo aquí',
          completed: !!this.step2bData.completed,
          fileName: this.step2bData.fileData.name,
          fileRoute: this.step2bData.fileData.route,
          fileFormat: this.step2bData.fileData.format,
        },
        {
          color: 'cyan',
          step: 'Paso 3A',
          title: 'Subir carta de presentación (PDF)',
          msg: 'Sube el documento en formato PDF',
          completed: !!this.step3aData.completed,
          fileName: this.step3aData.fileData.name,
          fileRoute: this.step3aData.fileData.route,
          fileFormat: this.step3aData.fileData.format,
        },
        {
          color: 'green',
          step: 'Paso 4A',
          title: 'Subir carta de aceptación (PDF)',
          msg: 'Sube el documento en formato PDF',
          completed: !!this.step4aData.completed,
          fileName: this.step4aData.fileData.name,
          fileRoute: this.step4aData.fileData.route,
          fileFormat: this.step4aData.fileData.format,
        },
        {
          color: 'pink',
          step: 'Paso 5A',
          title: 'Dictamen (calendario de protocolo)',
          msg: 'Descarga del formato',
          completed: !!this.step9aData.completed,
        },
        {
          color: 'amber',
          step: 'Paso 6A',
          title: 'Formato de registro de asesorias y evaluación de residencias',
          msg: 'Descarga del formato',
          completed: !!this.step9aData.completed,
        },
        {
          color: 'orange',
          step: 'Paso 7A',
          title: 'Formato de evaluación y seguimiento de residencias',
          msg: 'Descarga del formato',
          completed: !!this.step9aData.completed,
        },
        {
          color: 'cyan',
          step: 'Paso 8A',
          title: 'Formato de evaluación de reporte de residencias',
          msg: 'Descarga del formato',
          completed: !!this.step9aData.completed,
        },
        {
          color: 'green',
          step: 'Paso 9A',
          title: 'Subir carta de término de residencias profesionales (PDF)',
          msg: 'Sube el documento en formato PDF',
          completed: !!this.step9aData.completed,
          fileName: this.step9aData.fileData.name,
          fileRoute: this.step9aData.fileData.route,
          fileFormat: this.step9aData.fileData.format,
        },
        {
          color: 'pink',
          step: 'Paso 10A',
          title: 'Subir reporte de residencias profesionales (PDF)',
          msg: 'Sube el documento en formato PDF',
          completed: !!this.step10aData.completed,
          fileName: this.step10aData.fileData.name,
          fileRoute: this.step10aData.fileData.route,
          fileFormat: this.step10aData.fileData.format,
        },
        {
          color: 'amber',
          step: 'Paso 11A',
          title: 'Subir acta de calificaciones de residencias (PDF)',
          msg: 'Sube el documento en formato PDF',
          completed: !!this.step11aData.completed,
          fileName: this.step11aData.fileData.name,
          fileRoute: this.step11aData.fileData.route,
          fileFormat: this.step11aData.fileData.format,
        },
      ];

      return true;
    },
  },
};
</script>

<style></style>

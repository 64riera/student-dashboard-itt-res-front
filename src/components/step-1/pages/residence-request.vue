<template>
  <v-container class="my-4">
    <v-row class="mx-4">
      <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
        <h1 class="display-1 font-weight-light">Solicitud de Residencias</h1>
      </v-col>
    </v-row>
    <v-form class="mx-4" ref="generalForm">
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            outlined
            type="email"
            required
            label="Dirección de correo electrónico"
            color="green accent-4"
          ></v-text-field>
          <v-text-field
            v-model="schoolName"
            :rules="schoolNameRules"
            outlined
            label="Nombre de la escuela"
            color="green accent-4"
          ></v-text-field>
          <v-text-field
            v-model="schoolCity"
            :rules="schoolCityRules"
            outlined
            label="Ciudad o población a la que pertenece la escuela"
            color="green accent-4"
          ></v-text-field>
          <v-text-field
            v-model="requestDate"
            outlined
            type="date"
            min="2018-01-01" max="2100-12-31"
            label="Fecha de la solicitud"
            color="green accent-4"
          ></v-text-field>
          <v-text-field
            v-model="bossNameDivisionOfStudies"
            :rules="bossNameDivisionOfStudiesRules"
            outlined
            label="Nombre del jefe de división de estudios"
            color="green accent-4"
          ></v-text-field>
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <v-text-field
            v-model="studentCareerNameCoordinator"
            :rules="studentCareerNameCoordinatorRules"
            outlined
            label="Nombre del coordinador de la
                               carrera a la que pertenece el estudiante"
            color="green accent-4"
          ></v-text-field>
          <v-text-field
            v-model="projectName"
            :rules="projectNameRules"
            outlined
            label="Nombre del proyecto que se presenta"
            color="green accent-4"
          ></v-text-field>
          <v-label>Origen del proyecto</v-label>
          <v-radio-group v-model="projectOrigin" row>
            <v-radio
              color="green accent-4"
              label="Banco de proyectos"
              value="Banco de proyectos"
            ></v-radio>
            <v-radio
              color="green accent-4"
              label="Propuesta propia"
              value="Propuesta propia"
            ></v-radio>
            <v-radio color="green accent-4" label="Trabajador" value="Trabajador"></v-radio>
          </v-radio-group>
          <v-text-field
            v-model="estimatedPeriod"
            :rules="estimatedPeriodRules"
            outlined
            label="Periodo proyectado"
            color="green accent-4"
          ></v-text-field>
          <v-text-field
            v-model="residentsNumber"
            :rules="residentsNumberRules"
            outlined
            type="number"
            onkeypress='return event.charCode >= 48 && event.charCode <= 57'
            min="1"
            max="20"
            maxlength="2"
            oninput="if(this.value.length > this.maxLength)
            this.value = this.value.slice(0, this.maxLength);"
            label="Número de residentes"
            color="green accent-4"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
    <v-form class="mx-4" ref="companyForm">
      <h2 class="display-1 font-weight-light">Datos de la empresa</h2>
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <v-text-field
            v-model="companyName"
            :rules="companyNameRules"
            outlined
            required
            label="Nombre de la empresa"
            color="green accent-4"
          ></v-text-field>
          <v-text-field
            v-model="companyBranch"
            outlined
            label="Giro, ramo o sector de la empresa(Industrial, servicios, público, privado, otra)"
            color="green accent-4"
          ></v-text-field>
          <v-text-field
            v-model="rfc"
            :rules="rfcRules"
            outlined
            label="R.F.C"
            color="green accent-4"
          ></v-text-field>
          <v-text-field
            v-model="companyAdress"
            :rules="companyAdressRules"
            outlined
            label="Domicilio de la empresa"
            color="green accent-4"
          ></v-text-field>
          <v-text-field
            v-model="suburb"
            :rules="suburbRules"
            outlined
            label="Colonia"
            color="green accent-4"
          ></v-text-field>
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <v-text-field
            v-model="postalCode"
            :rules="postalCodeRules"
            outlined
            label="Código postal"
            color="green accent-4"
          ></v-text-field>
          <v-text-field
            v-model="fax"
            outlined
            label="FAX"
            color="green accent-4"
          ></v-text-field>
          <v-text-field
            v-model="city"
            :rules="cityRules"
            outlined
            label="Ciudad"
            color="green accent-4"
          ></v-text-field>
          <v-text-field
            v-model="phone"
            :rules="phoneRules"
            outlined
            label="Teléfono(no celular)"
            color="green accent-4"
          ></v-text-field>
          <v-text-field
            v-model="companyMision"
            :rules="companyMisionRules"
            outlined
            label="Misión de la empresa"
            color="green accent-4"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
    <v-form class="mx-4" ref="companyForm2">
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <v-text-field
            v-model="companyOwner"
            :rules="companyOwnerRules"
            outlined
            required
            label="Nombre del titular de la empresa"
            color="green accent-4"
          ></v-text-field>
          <v-text-field
            v-model="companyOwnerPosition"
            :rules="companyOwnerPositionRules"
            outlined
            label="Puesto del titular de la empresa"
            color="green accent-4"
          ></v-text-field>
          <v-text-field
            v-model="externalAdvisorName"
            :rules="externalAdvisorNameRules"
            outlined
            label="Nombre del (la) asesor(a) externo(a)"
            color="green accent-4"
          ></v-text-field>
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <v-text-field
            v-model="advisorPosition"
            :rules="advisorPositionRules"
            outlined
            label="Puesto del asesor(a)"
            color="green accent-4"
          ></v-text-field>
          <v-text-field
            v-model="personWhoSignsAgree"
            :rules="personWhoSignsAgreeRules"
            outlined
            label="Nombre de la persona que firmará el
                   acuerdo de trabajo. Estudiante- Escuela-Empresa"
            color="green accent-4"
          ></v-text-field>
          <v-text-field
            v-model="personWhoSignPosition"
            :rules="personWhoSignPositionRules"
            outlined
            label="Puesto de la persona que firmará"
            color="green accent-4"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
    <v-form class="mx-4" ref="residentForm">
      <h2 class="display-1 font-weight-light">Datos del residente</h2>
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <v-text-field
            v-model="residentName"
            :rules="residentNameRules"
            outlined
            required
            label="Nombre del residente"
            color="green accent-4"
          ></v-text-field>
          <v-text-field
            v-model="residentCareer"
            :rules="residentCareerRules"
            outlined
            label="Carrera del residente"
            color="green accent-4"
          ></v-text-field>
          <v-text-field
            v-model="residentControlNumber"
            :rules="residentControlNumberRules"
            outlined
            label="No. de control"
            color="green accent-4"
          ></v-text-field>
          <v-text-field
            v-model="residentAddress"
            :rules="residentAddressRules"
            outlined
            label="Domicilio del residente"
            color="green accent-4"
          ></v-text-field>
          <v-text-field
            v-model="residentEmail"
            :rules="residentEmailRules"
            outlined
            label="Email del residente"
            color="green accent-4"
          ></v-text-field>
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <v-text-field
            v-model="residentSocialSecurity"
            outlined
            label="Seleccione su institución de seguridad social"
            color="green accent-4"
          ></v-text-field>
          <v-text-field
            v-model="residentSecurityNumber"
            outlined
            label="Número de Seguro"
            color="green accent-4"
          ></v-text-field>
          <v-text-field
            v-model="residentCity"
            :rules="residentCityRules"
            outlined
            label="Ciudad del residente"
            color="green accent-4"
          ></v-text-field>
          <v-text-field
            v-model="residentPhone"
            :rules="residentPhoneRules"
            outlined
            label="Teléfono del residente(no celular)"
            color="green accent-4"
          ></v-text-field>
          <div class="float-right">
            <v-btn to="/" class="mr-2 mb-3" outlined color="green accent-4">
                <v-icon small left>fas fa-arrow-left</v-icon>
                Regresar
            </v-btn>
            <v-btn @click="onConfirmSaveRequ()" class="mb-3" color="green accent-4" dark>
                Listo, Enviar
                <v-icon small right>fas fa-share-square</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-form>
    <v-dialog
      v-model="confirmSaveResidenceReq"
      max-width="490"
    >
      <v-card>
        <v-card-title class="headline">Confirmar envío</v-card-title>

        <v-card-text>
          ¿ Está seguro de enviar la solicitud ? Los cambios no se podrán deshacer
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green accent-4"
            outlined
            @click="confirmSaveResidenceReq = false"
          >
            <v-icon small left>fas fa-arrow-left</v-icon>
            Atrás
          </v-btn>

          <v-btn
            color="green accent-4"
            dark
            @click="saveResidenceRequest()"
          >
            Si, enviar solicitud
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    email: '',
    emailRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 6) || 'Ingrese un email válido',
    ],
    schoolName: '',
    schoolNameRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 6) || 'Ingrese un nombre válido',
    ],
    schoolCity: '',
    schoolCityRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 4) || 'Ingrese una ciudad válida',
    ],
    requestDate: '',
    bossNameDivisionOfStudies: '',
    bossNameDivisionOfStudiesRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 4) || 'Ingrese un nombre válido',
    ],
    studentCareerNameCoordinator: '',
    studentCareerNameCoordinatorRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 4) || 'Ingrese un nombre válido',
    ],
    projectName: '',
    projectNameRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 4) || 'Ingrese un nombre válido',
    ],
    projectOrigin: '',
    estimatedPeriod: '',
    estimatedPeriodRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 4) || 'Ingrese un periodo válido',
    ],
    residentsNumber: '',
    residentsNumberRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 0) || 'Ingrese un número válido',
    ],
    companyName: '',
    companyNameRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 4) || 'Ingrese un nombre válido',
    ],
    companyBranch: '',
    rfc: '',
    rfcRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 4) || 'Ingrese un RFC válido',
    ],
    companyAdress: '',
    companyAdressRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 4) || 'Ingrese una dirección válida',
    ],
    suburb: '',
    suburbRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 4) || 'Ingrese una colonia válida',
    ],
    postalCode: '',
    postalCodeRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 2) || 'Ingrese un código postal válido',
    ],
    fax: '',
    city: '',
    cityRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 4) || 'Ingrese una ciudad válida',
    ],
    phone: '',
    phoneRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 4) || 'Ingrese un teléfono válida',
    ],
    companyMision: '',
    companyMisionRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 4) || 'Ingrese una misión válida',
    ],
    companyOwner: '',
    companyOwnerRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 4) || 'Ingrese un nombre válido',
    ],
    companyOwnerPosition: '',
    companyOwnerPositionRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 4) || 'Ingrese una posición válida',
    ],
    externalAdvisorName: '',
    externalAdvisorNameRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 4) || 'Ingrese un nombre válido',
    ],
    advisorPosition: '',
    advisorPositionRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 4) || 'Ingrese una posición válida',
    ],
    personWhoSignsAgree: '',
    personWhoSignsAgreeRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 4) || 'Ingrese un nombre válido',
    ],
    personWhoSignPosition: '',
    personWhoSignPositionRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 4) || 'Ingrese una posición válida',
    ],
    residentName: '',
    residentNameRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 4) || 'Ingrese un nombre válido',
    ],
    residentCareer: '',
    residentCareerRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 4) || 'Ingrese un nombre válido',
    ],
    residentControlNumber: '',
    residentControlNumberRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 4) || 'Ingrese un nombre válido',
    ],
    residentAddress: '',
    residentAddressRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 4) || 'Ingrese una dirección válida',
    ],
    residentEmail: '',
    residentEmailRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 4) || 'Ingrese un correo válido',
    ],
    residentSocialSecurity: '',
    residentSecurityNumber: '',
    residentCity: '',
    residentCityRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 4) || 'Ingrese una ciudad válida',
    ],
    residentPhone: '',
    residentPhoneRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 4) || 'Ingrese un teléfono válido',
    ],
    confirmSaveResidenceReq: false,
  }),
  computed: {
    userData() {
      return this.$store.state.usersModule.user;
    },
  },
  methods: {
    async saveResidenceRequest() {
      if (
        this.$refs.generalForm.validate()
        || this.$refs.companyForm.validate()
        || this.$refs.companyForm2.validate()
        || this.$refs.residentForm.validate()
      ) {
        const resRequest = {
          controlNum: this.userData.controlNum,
          email: this.userData.email,
          schoolName: this.schoolName,
          schoolCity: this.schoolCity,
          requestDate: this.requestDate,
          bossNameDivisionOfStudies: this.bossNameDivisionOfStudies,
          studentCareerNameCoordinator: this.studentCareerNameCoordinator,
          projectName: this.projectName,
          projectOrigin: this.projectOrigin,
          estimatedPeriod: this.estimatedPeriod,
          residentsNumber: this.residentsNumber,
          companyName: this.companyName,
          companyBranch: this.companyBranch,
          rfc: this.rfc,
          companyAdress: this.companyAdress,
          suburb: this.suburb,
          postalCode: this.postalCode,
          fax: this.fax,
          city: this.city,
          phone: this.phone,
          companyMision: this.companyMision,
          companyOwner: this.companyOwner,
          companyOwnerPosition: this.companyOwnerPosition,
          externalAdvisorName: this.externalAdvisorName,
          advisorPosition: this.advisorPosition,
          personWhoSignsAgree: this.personWhoSignsAgree,
          personWhoSignPosition: this.personWhoSignPosition,
          residentName: this.residentName,
          residentCareer: this.residentCareer,
          residentControlNumber: this.residentControlNumber,
          residentAddress: this.residentAddress,
          residentEmail: this.residentEmail,
          residentSocialSecurity: this.residentSocialSecurity,
          residentSecurityNumber: this.residentSecurityNumber,
          residentCity: this.residentCity,
          residentPhone: this.residentPhone,
        };

        await this.$store.dispatch('usersModule/saveResidenceRequest', resRequest);
        return this.$router.push({ name: 'Dashboard' });
      }

      this.confirmSaveResidenceReq = false;
      return false;
    },
    onConfirmSaveRequ() {
      this.confirmSaveResidenceReq = true;
    },
  },
};
</script>

<style></style>

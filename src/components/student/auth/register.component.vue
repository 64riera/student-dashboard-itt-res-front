<template>
  <v-container class="my-8">
    <v-form class="mx-4" ref="registerForm">
      <h3 class="display-1 font-weight-light mb-4">Registro de usuario</h3>
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="6" xl="6">
          <v-text-field
            :color="primaryColor"
            outlined
            label="Nombre(s)"
            v-model="name"
            :rules="nameRules"
          ></v-text-field>
          <v-text-field
            :color="primaryColor"
            outlined
            label="Apellidos"
            v-model="lastName"
            :rules="lastNameRules"
          ></v-text-field>
          <v-text-field
            :color="primaryColor"
            outlined
            type="number"
            label="Edad"
            onkeypress='return event.charCode >= 48 && event.charCode <= 57'
            min="17"
            max="78"
            maxlength="2"
            oninput="if(this.value.length > this.maxLength)
            this.value = this.value.slice(0, this.maxLength);"
            v-model="age"
            :rules="ageRules"
          ></v-text-field>
          <v-text-field
            :color="primaryColor"
            outlined
            label="Correo electrónico"
            v-model="email"
            :rules="emailRules"
          ></v-text-field>
          <v-text-field
            :color="primaryColor"
            outlined
            label="Contraseña"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPass = !showPass"
            :type="showPass ? 'text' : 'password'"
            v-model="password"
            :rules="passwordRules"
          ></v-text-field>
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="6" xl="6">
          <v-text-field
            :color="primaryColor"
            outlined
            label="Número de control"
            v-model="controlNum"
            :rules="controlNumRules"
          ></v-text-field>
          <v-text-field
            :color="primaryColor"
            outlined
            v-model="period"
            :rules="periodRules"
            label="Periódo"
          ></v-text-field>
          <v-text-field
            :color="primaryColor"
            outlined
            type="number"
            onkeypress='return event.charCode >= 48 && event.charCode <= 57'
            min="1"
            max="20"
            maxlength="2"
            oninput="if(this.value.length > this.maxLength)
            this.value = this.value.slice(0, this.maxLength);"
            v-model="semester"
            :rules="semesterRules"
            label="Semestre"
          ></v-text-field>
          <v-text-field
            :color="primaryColor"
            outlined
            v-model="career"
            :rules="careerRules"
            label="Carrera en curso"
          ></v-text-field>
          <div class="float-right">
            <v-btn outlined class="mr-2 mb-2" :color="primaryColor" to="/">
              <v-icon left small>fas fa-arrow-left</v-icon>Regresar
            </v-btn>
            <v-btn @click="saveUser()" dark class="mb-2" :color="primaryColor">
              Listo, registrarme
              <v-icon right small>far fa-check-circle</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    name: '',
    nameRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 2) || 'Ingrese un nombre válido',
    ],
    lastName: '',
    lastNameRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 5) || 'Ingrese apellidos válidos',
    ],
    age: '',
    ageRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 1) || 'Ingrese una edad válida',
    ],
    email: '',
    emailRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 6) || 'Ingrese un email válido',
    ],
    controlNum: '',
    controlNumRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 5) || 'Ingrese un número de control válido',
    ],
    period: `ENE-JUN${new Date().getFullYear()}`,
    periodRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 5) || 'Ingrese un periodo válido',
    ],
    semester: '7',
    semesterRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 1) || 'Ingrese un semestre válido',
    ],
    career: '',
    careerRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 5) || 'Ingrese una carrera válido',
    ],
    password: '',
    passwordRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 5) || 'Ingrese una contraseña válida, mayor a 5 caracteres',
    ],
    showPass: false,
  }),
  methods: {
    async saveUser() {
      if (!this.$refs.registerForm.validate()) return false;
      const newUser = {
        name: this.name,
        lastName: this.lastName,
        age: this.age,
        email: this.email,
        controlNum: this.controlNum,
        period: this.period,
        semester: this.semester,
        career: this.career,
        password: this.password,
        isActive: true,
      };

      await this.$store.dispatch('usersModule/saveNewUser', newUser);
      this.$notify({
        group: 'foo',
        title: 'Registro completado',
        text: 'Ahora puede iniciar sesión con su email y clave',
        duration: 4500,
        type: 'success',
      });
      return this.$router.push('/');
    },
  },
  computed: {
    primaryColor() {
      return this.$store.state.UI.primaryColor;
    },
  },
};
</script>

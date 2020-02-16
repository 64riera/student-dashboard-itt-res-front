<template>
    <v-container class="my-8">
        <v-form class="mx-8">
            <h3 class="display-1 font-weight-light mb-4">Registro de usuario</h3>
            <v-row>
                <v-col cols="12" xs="12" sm="12" md="6" xl="6">
                    <v-text-field color="green darken-2"
                                  outlined
                                  label="Nombre(s)"
                                  v-model="name"
                                  :rules="nameRules"
                    ></v-text-field>
                    <v-text-field color="green darken-2"
                                  outlined
                                  label="Apellidos"
                                  v-model="lastName"
                                  :rules="lastNameRules"
                    ></v-text-field>
                    <v-text-field color="green darken-2"
                                  outlined
                                  label="Edad"
                                  v-model="age"
                                  :rules="ageRules"
                    ></v-text-field>
                    <v-text-field color="green darken-2"
                                  outlined
                                  label="Correo electrónico"
                                  v-model="email"
                                  :rules="emailRules"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="6" xl="6">
                    <v-text-field color="green darken-2"
                                  outlined
                                  label="Número de control"
                                  v-model="controlNum"
                                  :rules="controlNumRules"
                    ></v-text-field>
                    <v-text-field color="green darken-2"
                                  outlined
                                  label="Periódo"
                    ></v-text-field>
                    <v-text-field color="green darken-2"
                                  outlined
                                  label="Semestre"
                    ></v-text-field>
                    <v-text-field color="green darken-2"
                                  outlined
                                  label="Carrera en curso"
                    ></v-text-field>
                    <div class="float-right">
                        <v-btn
                            outlined class="mr-2"
                            color="green darken-2"
                            to="/">
                            <v-icon left small>
                                fas fa-arrow-left
                            </v-icon>
                            Regresar
                        </v-btn>
                        <v-btn
                            dark class="float-right"
                            color="green darken-2">
                            Listo, registrarme
                            <v-icon right small>
                                far fa-check-circle
                            </v-icon>
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
  }),
};
</script>

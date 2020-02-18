<template>
<v-container
        class="fill-height mx-2"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            xs="8"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="green darken-2"
                dark
                flat
              >
                <v-toolbar-title>
                  Iniciar sesión
                </v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form class="mx-2" ref="loginForm">
                  <v-text-field
                    color="green darken-2"
                    label="Correo electrónico"
                    v-model="email"
                    :rules="emailRules"
                    prepend-icon="fas fa-user"
                    type="text"
                  />

                  <v-text-field
                    color="green darken-2"
                    id="password"
                    label="Contraseña"
                    v-model="password"
                    :rules="passwordRules"
                    prepend-icon="fas fa-lock"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-row class="mx-1">
                  <v-col cols="12" md="12">
                    <v-btn x-small color="green darken-2"
                      to="/register" link text>
                      No tienes cuenta? Registrate aquí
                    </v-btn>
                    <v-spacer />
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-btn @click="login()" dark color="green darken-2">
                      Ingresar
                      <v-icon right small>fas fa-arrow-circle-right</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
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
    password: '',
    passwordRules: [
      (v) => !!v || 'Campo obligatorio',
      (v) => (v && v.length >= 5) || 'Ingrese una contraseña válida',
    ],
  }),
  created() {

  },
  methods: {
    async login() {
      if (!this.$refs.loginForm.validate()) return false;
      const userLogin = {
        email: this.email,
        password: this.password,
      };
      await this.$store.dispatch('usersModule/loginUser', userLogin);
      if (!this.$store.state.usersModule.isLogged) {
        this.$notify({
          group: 'foo',
          title: 'Credenciales incorrectas',
          text: 'Ingrese sus datos correctamente para continuar',
          duration: 4500,
          type: 'error',
        });
        return false;
      }
      return this.$router.push('/home');
    },
  },
};
</script>

<style scoped>

</style>

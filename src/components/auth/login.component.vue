<template>
<v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
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
                <v-form>
                  <v-text-field
                    color="green darken-2"
                    label="Correo electrónico"
                    prepend-icon="fas fa-user"
                    type="text"
                  />

                  <v-text-field
                    color="green darken-2"
                    id="password"
                    label="Contraseña"
                    prepend-icon="fas fa-lock"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn x-small color="green darken-2"
                      to="/register" link text>
                      No tienes cuenta? Registrate aquí
                </v-btn>
                <v-spacer />
                <v-btn dark color="green darken-2">
                  Ingresar
                  <v-icon right small>fas fa-arrow-circle-right</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
export default {
};
</script>

<style scoped>

</style>

<template>
  <v-app>
    <v-main class="height-full">
      <v-container class="fill-height justify-center flex-column pa-0" fluid>
        <div class="form-login">
          <div class="form-login-wrapper">
            <v-form v-model="forms.login.is_valid">
              <v-row dense class="mb-4" align="center">
                <v-col class="mr-10" cols="auto">
                  <div class="employer-logo">
                    <!-- img src="~assets/client-logo.png" alt="" -->
                  </div>
                </v-col>
                <v-col>
                  <h3 class="font-weight-black">ООО "ПРОМТЕХНОСФЕРА"</h3>
                  <span class="font-weight-medium grey--text text--darken-1"
                    >Система дистанционного обучения</span
                  >
                </v-col>
              </v-row>

              <v-row dense>
                <v-col>
                  <v-text-field
                    v-model="forms.login.fields.login"
                    :rules="[$rules.notEmpty]"
                    label="Логин"
                  >
                    <template #prepend-inner>
                      <v-icon class="mr-4">mdi-account</v-icon>
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row dense>
                <v-col>
                  <v-text-field
                    v-model="forms.login.fields.password"
                    :rules="[$rules.notEmpty]"
                    label="Пароль"
                    type="password"
                  >
                    <template #prepend-inner>
                      <v-icon class="mr-4">mdi-lock</v-icon>
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>

              <v-scroll-y-transition mode="out-in">
                <v-row v-if="error.display" dense>
                  <v-col>
                    <v-alert
                      v-model="error.display"
                      text
                      type="error"
                      icon="mdi-account-alert"
                      dismissible
                    >
                      {{ error.text }}
                    </v-alert>
                  </v-col>
                </v-row>
              </v-scroll-y-transition>

              <v-row dense>
                <v-spacer></v-spacer>
                <v-col cols="auto">
                  <v-spacer></v-spacer>
                  <v-btn class="mr-4" color="primary" text
                    >Заявка на обучение</v-btn
                  >
                  <v-btn
                    color="primary"
                    :disabled="!canLogin"
                    :loading="forms.login.loading"
                    :elevation="0"
                    @click="login"
                    >Войти</v-btn
                  >
                </v-col>
              </v-row>
            </v-form>
          </div>

          <v-divider></v-divider>

          <div class="form-login-wrapper">
            <v-row dense>
              <v-col>
                <small class="grey--text text--darken-1 font-weight-medium">
                  Нажимая кнопку «<span class="font-weight-bold primary--text"
                    >Войти</span
                  >», Вы соглашаетесь с
                  <span class="font-weight-bold primary--text"
                    >политикой конфиденциальности</span
                  >
                  и условиями
                  <span class="font-weight-bold primary--text"
                    >обработкой персональных данных</span
                  >.
                </small>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "login-page",
  layout: "login",

  data: () => ({
    // ----------
    forms: {
      login: {
        is_valid: false,
        loading: false,
        fields: {
          login: "demo",
          password: "demo",
        },
      },
    },
    // ----------
    error: {
      display: false,
      text: null,
    },
    // ----------
  }),

  head: () => ({
    title: "Вход",
  }),

  computed: {
    // ----------
    canLogin() {
      return this.forms.login.is_valid && !this.forms.login.loading
    },
    // ----------
  },

  mounted() {
    // ----------
    this.getInitialSettings()
    // ----------
  },

  methods: {
    // ----------
    getInitialSettings() {
      /*
      this.$responseToast(this.$axios.get('/initial_settings'), (data) => {
        this.dataUC = data
        console.log(this.dataUC.data)
      })
      */
    },
    // ----------
    async login() {
      this.error.display = false
      this.forms.login.loading = true

      if (process.env.prod) {
        // Для сервера когда билдить надо

        await this.$auth
          .loginWith("laravelSanctum", {
            data: this.forms.login.fields,
          })
          .then(async (response) => {
            if (response?.status === 204 && this.$auth.loggedIn) {
              const user = await this.$api.users.current()
              if (user && user.data && user.data.permissions) {
                const permissions = user.data.permissions
                await this.$auth.setUser(user.data)
                await this.$gates.setPermissions(
                  Object.keys(permissions).map((f) => permissions[f].name)
                )
              }
              await this.$router.push({ path: "/admin/institution" })
            } else {
              this.error.display = true
              this.error.text = response.data.message
            }
          })
          .catch((error) => {
            this.error.display = true
            this.error.text = error.response
              ? error.response.data.message
              : "Не удаётся установить соединение с сервером"
          })
      } else {
        await this.$axios
          .get("/user")
          .then((response) => {
            /*
          if ( response.data.permissions ) {
            const permissions = []
            for ( const permission of response.data.permissions ) {
              permissions.push( permission.name )
            }
            this.$gates.setPermissions( permissions )
          }
          */
            this.$auth.setUser({ ...response.data })
            // this.$auth.$storage.setLocalStorage( 'userData', this.$auth.$storage.state.user )
            this.$router.push("/") // тут будет редирект на первую страницу из permissions
          })
          .catch((error) => {
            this.error.display = true
            this.error.text = error.response
              ? error.response.data.message
              : "Не удаётся установить соединение с сервером"
          })
      }

      this.forms.login.loading = false
    },
    // ----------
  },
}
</script>

<style>
.form-login {
  width: calc(100% - 50px);
  max-width: 600px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: rgba(0, 0, 0, 0.1) 0 10px 50px;
}

.form-login-wrapper {
  padding: 20px 30px;
}

.employer-logo {
  border: 1px solid transparent;
  position: relative;
  height: 130px;
  width: 130px;
  transition: 0.4s;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 130px;
}

.employer-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

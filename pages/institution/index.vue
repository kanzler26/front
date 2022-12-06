<template>
  <v-container elevation="5">
    <v-toolbar-title> Данные учебного заведения </v-toolbar-title>
    <v-card-text>
      <v-row>
        <v-col cols="lg-3">
          <v-sheet color="grey lighten-3">
            <v-card>
              <v-card-text>
                <v-img
                  v-bind:src="'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjUwIiBoZWlnaHQ9IjY1MCIgdmlld0JveD0iMCAwIDY1MCA2NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2NTAiIGhlaWdodD0iNjUwIiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB4PSI0MS4zNTU0IiB5PSIyNzAuODc5IiB3aWR0aD0iNDY1IiBoZWlnaHQ9IjM0MyIgdHJhbnNmb3JtPSJyb3RhdGUoLTI1LjY4MjYgNDEuMzU1NCAyNzAuODc5KSIgZmlsbD0iI0VBRUFFQSIgc3Ryb2tlPSIjQkVCRUJFIiBzdHJva2Utd2lkdGg9IjM1Ii8+CjxyZWN0IHg9IjEzNS41IiB5PSIxOTguNSIgd2lkdGg9IjQ2NSIgaGVpZ2h0PSIzNDMiIGZpbGw9IiNFQUVBRUEiIHN0cm9rZT0iI0JFQkVCRSIgc3Ryb2tlLXdpZHRoPSIzNSIvPgo8cGF0aCBkPSJNNDQyLjUgMzQ5TDU1Ny4yNDggNTA1SDMyNy43NTJMNDQyLjUgMzQ5WiIgZmlsbD0iI0JFQkVCRSIvPgo8ZWxsaXBzZSBjeD0iMjE0LjU2NyIgY3k9IjI2OSIgcng9IjM2LjU2NzIiIHJ5PSIzNSIgZmlsbD0iI0M0QzRDNCIvPgo8cGF0aCBkPSJNMzE1LjUgMzEzTDQ1Mi43NjUgNTA1SDE3OC4yMzVMMzE1LjUgMzEzWiIgZmlsbD0iI0M0QzRDNCIvPgo8L3N2Zz4K'"
                >
                  <v-responsive></v-responsive>
                </v-img>
              </v-card-text>
              <v-card-text>
                <v-btn color="light">
                  изменить <br />
                  логотип
                </v-btn>
              </v-card-text>
            </v-card>
          </v-sheet>
        </v-col>
        <v-col cols="lg">
          <v-card>
            <v-container>
              <v-row>
                <v-col v-for="(value, item) in ucInfo" :key="item" cols="lg-4">
                  <h3>
                    {{ item }}
                    <v-menu :close-on-content-click="false" offset-x>
                      <template #activator="{ on, attrs }">
                        <v-btn color="white" class="ma-2"  x-small v-bind="attrs" v-on="on" @click="show">
                          <v-icon>mdi-pencil-outline</v-icon>
                        </v-btn>
                      </template>

                      <instInp
                        :show="dialog"
                        :uc-item-info="{ val: ucInfo[item], key: item }"
                        @onSave="Save"
                      />
                    </v-menu>
                  </h3>
                  {{ value }}
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-container>
</template>

<script>
import instInp from "@/components/institution/instInp.vue"
export default {
  name: "institution-page",
  components: {
    instInp,
  },
  layout: "admin",
  data: () => ({
    dialog: false,
    instInpVal: "",
    menu: false,
    changedInfo: {},
    ucInfo: {
      shortNameUC: "Название учебного центра",
      legalPerson: "Иванов Иван Иванович",
      factStreet: "улица Фактовая 44, 12",
      postAddress: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      director: "Стрелков Венедикт Давидович",
      zamDir: "Стрелков Венедикт Давидович",
      mainSecretar: "Стрелков Венедикт Давидович",
      mainBugalter: "Стрелков Венедикт Давидович",
      licenseUC: "Лицензия 89-31 от 01.01.1998 г",
      phonesUC: "4113-1313-31/ivan@mail.ru, 513-667-31/dima@mail.ru",
      dopInfo: "4141414/55232332, 444fsfjsfjsjfsj",
      bankUC: "Банк, БИК, Кор. счет Банк БИК Кор. счет2",
    },
  }),
  methods: {
    show() {
      this.dialog = !this.dialog
    },
    Save(fields) {
      // console.log(this.ucInfo[fields.key])
      this.ucInfo[fields.key] = fields.val
    },
  },
}
</script>



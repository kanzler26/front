<template>
  <div class="grey lighten-4">
    <ui-wrapper class="px-3">
      <portal to="app-main-toolbar">
        <ui-toolbar back-to="/counterparties" title="Информация о контрагенте" divider>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </ui-toolbar>
      </portal>

      <template v-if="!loading">
        <v-expansion-panels :value="[0]" multiple accordion flat>
          <v-expansion-panel class="rounded-b-0 elevation-0">
            <v-expansion-panel-header class="">Основное</v-expansion-panel-header>
            <v-expansion-panel-content >
                <v-form class="rounded-b-0">
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="counterpart.fullName"

                        label="Наименование контрагента"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="counterpart.shortName"

                        label="Краткое наименование контрагента"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row >
                    <v-col class="text-subtitle-1 font-weight-600">
                      Данные для связи
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="counterpart.phone"
                        label="Телефон"
                      >
                      </v-text-field>
                    </v-col>

                    <v-col>
                      <v-text-field
                        v-model="counterpart.email"
                        label="Почта"
                      ></v-text-field>
                    </v-col>

                    <v-col>
                      <v-text-field
                        v-model="counterpart.emailIndex"
                        label="Почт. индекс"
                      ></v-text-field>
                    </v-col>

                    <v-col>
                      <v-text-field
                        v-model="counterpart.city"
                        label="Город"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="counterpart.legalAddress"
                        label="Юридический адресс"
                      >

                      </v-text-field>
                    </v-col>

                    <v-col>
                      <v-text-field
                        v-model="counterpart.emailAddress"
                        label="Почтовый адресс"
                      >

                      </v-text-field>
                    </v-col>

                    <v-col>
                      <v-text-field
                        v-model="counterpart.address"
                        label="Фактический адресс"
                      >

                      </v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col class="text-subtitle-1 font-weight-600">
                      Ответственное(ыe) лицо(а)
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="counterpart.manager"
                        label="Фио директора"
                      >

                      </v-text-field>
                    </v-col>

                    <v-col>
                      <inputs-position
                        v-model="counterpart.position"
                        label="Должность"
                      />
                    </v-col>

                    <v-col>
                      <inputs-manager
                        v-model="counterpart.manager"
                        label="Менеджер"
                      />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col class="text-subtitle-1 font-weight-600">
                      Инн / Огрн / Окпо / Окато и т.п.
                    </v-col>
                  </v-row>

                  <v-row >
                    <v-col>
                      <inputs-inn v-model="counterpart.inn"/>
                    </v-col>

                    <v-col>
                      <v-text-field
                        v-model="counterpart.ogrn"
                        label="ОГРН"
                      ></v-text-field>
                    </v-col>

                    <v-col>
                      <v-text-field
                        v-model="counterpart.okpo"
                        label="ОКПО"
                      ></v-text-field>
                    </v-col>

                    <v-col>
                      <v-text-field
                        v-model="counterpart.okato"
                        label="ОКАТО"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="counterpart.oktmo"
                        label="ОКТМО"
                      >

                      </v-text-field>
                    </v-col>

                    <v-col>
                      <v-text-field
                        v-model="counterpart.okogy"
                        label="ОКОГУ"
                      >

                      </v-text-field>
                    </v-col>

                    <v-col>
                      <v-text-field
                        v-model="counterpart.okopf"
                        label="ОКОПФ"
                      ></v-text-field>
                    </v-col>

                    <v-col>
                      <v-text-field
                        v-model="counterpart.kpp"
                        label="КПП"
                      ></v-text-field>
                    </v-col>

                    <v-col>
                      <v-text-field
                        v-model="counterpart.okved"
                        label="ОКВЭД"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row r>
                    <v-spacer></v-spacer>
                    <v-col cols="auto">
                      <v-btn
                        text
                        color="primary"
                      >
                        Сохранить
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <ui-switched-tabs :tabs="tabs" @change="tab => currentTab = tab"/>
        <v-divider></v-divider>

        <template v-if="currentTab.name === 'Основное'">
          <v-expansion-panels :value="[0]" multiple accordion flat>
            <v-expansion-panel>
              <v-expansion-panel-header class="">Банковские реквизиты</v-expansion-panel-header>
              <v-expansion-panel-content>
                <ui-banks :init-banks="banks"/>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </template>
      </template>
    </ui-wrapper>
  </div>
</template>

<script  lang="ts">
import Vue from "vue";
import {
  IFullInfoListener,
} from "~/plugins/api/users/users.types";
import {ISwitchedTab} from "~/components/not-approved/ui/switched-tabs.vue";
import {IBank} from "~/plugins/api/banks.types";
import {IGenericResponseData} from "~/types/default.types";

export default Vue.extend({
  name: "listeners-info",
  layout: 'admin',
  data:() => ({
    loading: true as boolean,
    error: false as boolean,
    info: {} as IFullInfoListener,
    counterpart: {
      fullName: "Общество с ограниченной ответственностью «Весна»",
      shortName: 'ООО «Весна»',
      legalAddress: '123456, г. Москва, ул. Подвойского, д. 14, стр. 7',
      emailAddress: '123456, г. Москва, ул. Подвойского, д. 14, стр. 7',
      address: '123456, г. Москва, ул. Подвойского, д. 14, стр. 7',
      emailIndex: '392014',
      city: 'Москва',
      fax: '',
      inn: '7712345678',
      kpp: '779101001',
      bik: '044521234',
      okpo: '12345678',
      okato: '87654321000',
      okved: '18.15',
      oktmo: '68701000001',
      okogy: '',
      okopf: '12300',
      ogrn: '1047712345678',
      gm: 'Петров Сергей Петрович',
      email: 'info@vesna.ru',
      phone: '+749512345678',
      site: 'www.vesna.ru',
      position: 'Директор',
      manager: 'Бесправный Антон Петрович',
    },
    banks: [] as Array<IBank>,
    submittedDocuments: false,
    panels: [0],
    tabs: [
      {name: 'Основное', component: ''},
    ] as Array<ISwitchedTab>,
    currentTab: {} as ISwitchedTab,
  }),

  async mounted () {
    // const userId = this.$route.params.id;
    // this.info = await this.$api.users.readOne(Number(userId));
    this.currentTab = this.tabs[0]
    const bankList: IGenericResponseData<Array<IBank>> = await this.$axios.get('employer/banks');
    if(bankList.data.length) {
      this.banks = bankList.data;
    }
    this.loading = false
  }
})
</script>

<template>
  <wrappers-modal-content hide-footer>
    <template #header>
      <v-toolbar-title>Добавление реквизита</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click="close"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>

    <template #body>
      <v-form>
        <v-row class="text-subtitle-1 font-weight-600 mx-0 mb-4" dense>
          Введите БИК для поиска в dadata
        </v-row>

        <v-responsive>
          <inputs-dadata
            v-model="bikForSearch"
            label="Бик"
            type="bik"
            :rules="[$rules.bik(bikForSearch.length)]"
            @change="(searchedValue) => bank = searchedValue"
            @exist="(boolean) => exist = boolean"
            @loading="(boolean) => loading = boolean"
            @pressed="(boolean) => pressed = boolean"
          />
        </v-responsive>

        <template v-if="pressed">

          <v-row v-if="exist" class="text-subtitle-1 font-weight-600 green--text mb-4" dense>
            Данные найденные в системе:
          </v-row>

          <v-row v-else class="text-subtitle-1 font-weight-600 error--text mb-4" dense>
            Данных не было найдено, добавьте реквизиты вручную:
          </v-row>

          <forms-bank-edit v-model="bank" :readonly="exist">
            <template #footer>
              <v-btn
                text
                color="error"
                @click="close"
              >
                Закрыть
              </v-btn>

              <v-btn
                text
                color="primary"
                @click="submit"
              >
                Добавить
              </v-btn>
            </template>
          </forms-bank-edit>
        </template>
      </v-form>
    </template>
  </wrappers-modal-content>
</template>

<script lang="ts">
import Vue, {PropOptions} from "vue";
import { modalMixin } from "~/mixins";
import {IBank} from "~/plugins/api/banks.types";

// todo: подправить строки 25-29

export default Vue.extend({
  name: 'modals-banks-create',
  mixins: [modalMixin],
  props: {
    initBank: {
      type: Object,
      default: () => {},
    } as PropOptions<IBank>
  },

  data () {
    return {
      bank: {
        actuality_date: "",
        address: "",
        bik: "",
        city: "",
        inn: "",
        kpp: "",
        name: "",
        correspondent_account: ""
      } as IBank,
      bikForSearch: '',
      loading: false as boolean,
      exist: null,
      pressed: false,
    }
  },
  methods: {
    submit () {

    }
  },
})
</script>

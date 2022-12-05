<template>
  <v-row dense>
    <v-col>
      <v-text-field
        v-model="v_model"
        :rules="[$rules.inn]"
        dense
        label="ИНН"
        class="pt-2 pb-2"
        append-icon="mdi-magnify"
      >
        <template #append>
          <v-tooltip left>
            <template #activator="{ on, attrs }">
              <v-btn
                height="24"
                width="24"
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </template>
            <span>Загрузить данные из <b>dadata.ru</b></span>
          </v-tooltip>
        </template>
      </v-text-field>
    </v-col>
<!--    <v-col cols="auto">-->
<!--      <v-tooltip left>-->
<!--        <template #activator="{ on, attrs }">-->
<!--          <v-btn-->
<!--            icon-->
<!--            v-bind="attrs"-->
<!--            v-on="on"-->
<!--          >-->
<!--            <v-icon>mdi-magnify</v-icon>-->
<!--          </v-btn>-->
<!--        </template>-->
<!--        <span>Загрузить данные из <b>dadata.ru</b></span>-->
<!--      </v-tooltip>-->
<!--    </v-col>-->
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import VModel from "~/mixins/v-model";

export default Vue.extend({
  name: "form-select-inn",
  mixins: [VModel]
})
</script>

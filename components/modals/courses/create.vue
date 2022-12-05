<template>
  <wrappers-modal-content hide-footer :loading="loading">

    <template #header>
      <v-toolbar-title>
        Новый курс
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>

    <template #body>
      <v-form v-model="forms.course.valid">

        <v-row>
          <v-col>
            <v-textarea
              v-model="forms.course.fields.name"
              :rules="[ $rules.notEmpty, $rules.length.max( 255 ) ]"
              dense
              label="Наименование"
              rows="1"
              auto-grow
            ></v-textarea>
          </v-col>
        </v-row>

        <v-row v-if="isCourse">
          <v-col>
            <v-text-field
              v-model="forms.course.fields.hours"
              :rules="[ $rules.onlyNumber, $rules.notZero ]"
              dense
              label="Часы"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="forms.course.fields.recertification"
              :rules="[ $rules.onlyNumber, $rules.zeroOrMore ]"
              dense
              label="Месяц переатестации"
              placeholder="0"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row v-if="isCourse">
          <v-col>
            <v-text-field
              v-model="forms.course.fields.code"
              dense
              label="Код"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="forms.course.fields.price"
              :rules="[ $rules.onlyNumber, $rules.zeroOrMore ]"
              dense
              label="Цена (руб)"
              placeholder="0"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col>
            <remember-checkbox
              v-model="next"
              label="Продолжить редактирование"
              name="continue-edit-after-create-course"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-spacer/>
          <v-col cols="auto">
            <v-btn
              :loading="forms.course.loading"
              color="primary"
              text
              @click="createCourse"
            >Создать</v-btn>
          </v-col>
        </v-row>

      </v-form>
    </template>

  </wrappers-modal-content>
</template>

<script lang="ts">
import Vue from "vue"
import {
  modalMixin
} from "~/mixins"

export default Vue.extend({
  name: "course-create-modal",
  mixins: [
    modalMixin
  ],
  props: {
    isCourse: {
      type: Boolean,
      default: () => true
    },
    parentId: {
      type: Number,
      default: () => 0
    }
  },
  data: () => ({
    next: false,
    loading: false,
    forms: {
      course: {
        valid: false,
        loading: false,
        fields: {}
      }
    }
  }),
  methods: {
    async createCourse () {
      this.forms.course.loading = true
      const { valid, data } = await this.$api.courses.create({
        is_course: this.isCourse,
        parent_id: this.parentId,
        ...this.forms.course.fields
      })
      if ( valid ) {
        this.$emit( 'oncreate', data )
      }
      this.forms.course.loading = false
    }
  }
})
</script>

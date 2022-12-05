<template>
  <wrappers-modal-content :loading="loading">
    <template #header>
      <v-toolbar-title>
        Блок вопросов
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
    <template #body>
      <v-form v-model="forms.question_block.valid" class="pt-4">
        <v-row dense>
          <v-col>
            <v-textarea
              v-model="forms.question_block.fields.name"
              label="Наименование" dense
              rows="1" auto-grow
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-textarea
              v-model="forms.question_block.fields.description"
              label="Описание"
              rows="1" auto-grow
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <remember-checkbox
              v-model="hide"
              label="Скрыть после сохранения"
              name="hide-modal-after-save-question-block"
            />
          </v-col>
        </v-row>
      </v-form>
    </template>
    <template #footer>
      <v-spacer/>
      <v-btn
        color="primary" text
        :loading="forms.question_block.loading"
        :disabled="!forms.question_block.valid"
        @click="saveQuestionBlock"
      >Сохранить</v-btn>
    </template>
  </wrappers-modal-content>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue, { PropOptions } from "vue"
import mixins from "vue-typed-mixins"
import {
  modalMixin,
  formMixin
} from "~/mixins"
import {
  QuestionBlocksApiPayload
} from "~/plugins/api/question-blocks/question-blocks.type"

export default mixins( modalMixin, formMixin ).extend({
  name: "modals-question-blocks-edit",
  props: {
    questionBlockId: {
      type: Number,
      default: () => 0
    } as PropOptions<number>,
    courseId: {
      type: Number,
      default: () => 0
    } as PropOptions<number>,
    // ...
  },
  data: () => ({
    hide: false,
    valid: false,
    forms: {
      question_block: {
        valid: false as boolean,
        loading: false as boolean,
        fields: {} as QuestionBlocksApiPayload
      }
    },
  }),
  computed: {
    // ...
  },
  async mounted () {
    if ( this.questionBlockId ) {
      this.loading = true
      const { valid, data } = await this.$api.questionBlocks.findOne( this.questionBlockId )
      if ( valid && data?.id ) {
        this.forms.question_block.fields = data
      }
      this.loading = false
    }
  },
  methods: {
    async saveQuestionBlock () {
      this.forms.question_block.loading = true
      const { id, name, description } = this.forms.question_block.fields
      if ( id ) {
        const { valid } = await this.$api.questionBlocks.update( id, {
          name, description
        })
        if ( valid ) {
          this.$toast.global.update()
          this.$emit( 'onupdate', { id, name, description })
        }
      } else {
        const { valid, data } = await this.$api.questionBlocks.create({
          course_id: this.courseId,
          name, description
        })
        if ( valid && data?.id ) {
          this.forms.question_block.fields.id = data.id
          this.$toast.global.create()
          this.$emit( 'oncreate', data )
        }
      }
      this.forms.question_block.loading = false
    }
  }
})
</script>

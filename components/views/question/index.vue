<template>
  <div>

    <div v-if="!questionId && !type">
      <v-btn
        color="primary" text
        @click="type = 'one'"
      >one</v-btn>
      <v-btn
        color="primary" text
        @click="type = 'multiple'"
      >multiple</v-btn>
      <v-btn
        color="primary" text
        @click="type = 'true_false'"
      >true_false</v-btn>
    </div>

    <div v-else>

      <div v-if="types.includes( type )">
        <views-question-one
          :type="type"
          :data-question="question"
          @onupdate="setQuestion"
          @oncreate="setQuestion"
        ></views-question-one>
      </div>

      <div v-else>
        Неверный тип вопроса
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue"
import { QuestionsApiPayload, QuestionType } from "~/plugins/api/questions/questions.type"

export default Vue.extend({
  name: "views-question",
  props: {
    questionId: {
      type: Number,
      default: () => 0,
    } as PropOptions<number>,
    questionBlockId: {
      type: Number,
      default: () => 0,
    } as PropOptions<number>,
  },
  data: () => ({
    panels: [ 0, 1 ] as number[],
    type: null as QuestionType | null,
    question: null as QuestionsApiPayload | null,
    types: [
      'one',
      'multiple',
      'conformity',
      'sequence',
      'true_false'
    ] as QuestionType[],
  }),
  async mounted () {
    if ( this.questionId ) {
      const { valid, data } = await this.$api.questions.readOne( this.questionId )
      if ( valid && data?.id ) {
        this.question = {
          ...data,
          answers: data?.answers?.sort( ( previous, next ) => {
            // сортировку можно сделать на бэке
            return Number( previous?.order ) - Number( next?.order )
          })
        }
        if ( data?.type ) {
          this.type = data.type
        }
      }
    }
  },
  methods: {
    setQuestion ( question: QuestionsApiPayload ) {
      this.question = question
    },
  },
})
</script>

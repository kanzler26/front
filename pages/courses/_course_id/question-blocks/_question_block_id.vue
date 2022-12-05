<template>
  <ui-container>

    <portal to="app-main-toolbar">
      <ui-toolbar :back-to="`/courses/${course_id}`" title="Список вопросов" divider>
        <v-spacer></v-spacer>
        <v-btn icon color="primary" @click="showEditQuestionModal()">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </ui-toolbar>
    </portal>

    <v-data-table

      v-model="datatables.questions.selected"
      :loading="datatables.questions.loading"
      :search="datatables.questions.search"
      :headers="datatables.questions.headers"
      :items="questions"

      item-key="id"
      checkbox-color="primary"
      show-select
      class="elevation-2"

    >

      <template #item.type="{ item }">
        {{ item?.type | questionType }}
      </template>

      <template #item.actions="{ item }">

        <v-menu offset-y>
          <template #activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item @click="showEditQuestionModal( item.id )">
              <v-list-item-icon><v-icon>mdi-pencil-outline</v-icon></v-list-item-icon>
              <v-list-item-title>Редактировать</v-list-item-title>
            </v-list-item>
            <v-list-item @click="removeQuestion( item.id )">
              <v-list-item-icon><v-icon>mdi-trash-can-outline</v-icon></v-list-item-icon>
              <v-list-item-title>Удалить</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>

    </v-data-table>

    <wrappers-modal-overlay v-model="modals.question.display" :width="800">
      <template #default="props">
        <modals-question-edit
          :question-id="modals.question.props.question_id"
          :question-block-id="question_block_id"
          v-bind="props"
        />
      </template>
    </wrappers-modal-overlay>

  </ui-container>
</template>

<script lang="ts">
import Vue from "vue"
import {
  mapActions,
  mapGetters
} from 'vuex'

export default Vue.extend({
  name: "course-question-block-index",
  layout: "admin",
  data: () => ({
    panels: [ 0, 1 ],
    types: [ 'one', 'multiple', 'true_false', 'sequence', 'conformity' ],
    modals: {
      question: {
        display: false,
        props: {
          question_id: null as number | null,
          question_block_id: null as number | null
        }
      }
    },
    datatables: {
      questions: {
        search: '',
        loading: false,
        selected: [],
        headers: [
          { text: 'Текст вопроса', sortable: false, value: 'text' },
          { text: 'Тип вопроса', sortable: false, value: 'type' },
          { text: 'Действия', sortable: false, value: 'actions', align: 'center', width: 100 }
        ]
      }
    }
  }),
  computed: {
    ...mapGetters({
      questions: "questions/questions"
    }),
    course_id (): number {
      return Number( this.$route.params?.course_id )
    },
    question_block_id (): number {
      return Number( this.$route.params?.question_block_id )
    }
  },
  async mounted () {
    const { data } = await this.$api.questionBlocks.findOne( this.question_block_id )
    if ( data?.questions ) {
      this.setQuestions( data.questions )
    }
  },
  methods: {
    ...mapActions({
      setQuestions: "questions/set_questions",
      removeQuestions: "questions/remove_questions"
    }),
    showEditQuestionModal ( question_id?: number ) {
      this.modals.question.display = true
      this.modals.question.props.question_id = question_id || null
    },
    async removeQuestion ( question_id: number ) {
      const confirm = await this.$confirmModal( 'Вы действительно хотите это удалить ?' )
      if ( confirm ) {
        const { valid, data } = await this.$api.questions.delete([ question_id ])
        if ( valid ) {
          this.removeQuestions( data )
        }
      }
    }
  }
})

</script>

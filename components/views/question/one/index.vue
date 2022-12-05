<!-- todo: компонент получился довольно большим, его нужно разбить на части -->
<template>
  <div v-if="question">
    <v-expansion-panels v-model="panels" multiple>

      <v-expansion-panel>
        <v-expansion-panel-header class="font-weight-bold">
          Текст и описание вопроса ({{ type }})
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-form>
            <v-row>
              <v-col>
                <v-textarea
                  v-model="question.text"
                  :rules="[]"
                  label="Текст вопроса"
                  dense hide-details
                  rows="1" auto-grow
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea
                  v-model="question.comment"
                  :rules="[]"
                  label="Сообщение при неправильном ответе"
                  dense hide-details
                  rows="1" auto-grow
                />
              </v-col>
            </v-row>
            <v-row>
              <v-spacer/>
              <v-col cols="auto">
                <v-btn
                  color="primary" text
                  :disabled="!canSaveQuestion"
                  @click="saveQuestion">Сохранить</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel :disabled="!question?.id">
        <v-expansion-panel-header class="font-weight-bold">
          Ответы вопроса
        </v-expansion-panel-header>
        <v-expansion-panel-content>

          <div v-if="question.answers.length">
            <v-radio-group
              v-if="type === 'true_false'"
              v-model="question.correct"
              hide-details class="pa-0 ma-0"
            >
              <v-radio label="Верно" name="correct" :value="1"></v-radio>
              <v-radio label="Не верно" name="correct" :value="0"></v-radio>
            </v-radio-group>

            <draggable
              v-else
              v-model="question.answers"
              v-bind="dragOptions"
              @end="setOrder"
            >
              <v-row
                v-for="answer of question.answers"
                :key="answer.id"
                class="align-center"
                dense
              >

                <v-col cols="auto">
                  <v-btn class="question-answer-drag" icon :disabled="!answer.id">
                    <v-icon small>mdi-sort</v-icon>
                  </v-btn>
                </v-col>

                <v-col v-if="[ 'multiple' ].includes( question.type )" cols="auto">
                  <v-checkbox
                    v-model="checkbox"
                    :value="answer.id"
                    hide-details
                    class="pa-0 ma-0"
                    :disabled="!answer.id"
                    @change="setCorrectMultiple"
                  />
                </v-col>

                <v-col v-if="[ 'one' ].includes( question.type )" cols="auto">
                  <v-radio-group v-model="radio" hide-details class="pa-0 ma-0">
                    <v-radio
                      name="correct"
                      :value="answer.id"
                      :disabled="!answer.id"
                      @change="setCorrectOne( answer.id )"
                    />
                  </v-radio-group>
                </v-col>

                <v-col v-if="[ 'one', 'multiple', 'sequence' ].includes( question.type )" class="py-2">
                  <v-text-field
                    v-model="answer.text"
                    :rules="[]"
                    _label="Текст ответа"
                    placeholder="Текст ответа"
                    hide-details outlined dense
                    class="ml-2 mr-2"
                    @input="answer.changed = true"
                  ></v-text-field>
                </v-col>

                <v-col v-if="[ 'conformity' ].includes( question.type )" class="py-2">
                  <v-text-field
                    v-model="answer._l"
                    :rules="[]"
                    label="Вариант"
                    hide-details outlined dense
                    class="ml-2"
                    @input="answer.changed = true"
                  ></v-text-field>
                </v-col>

                <v-col v-if="[ 'conformity' ].includes( question.type )" class="py-2">
                  <v-text-field
                    v-model="answer._r"
                    :rules="[]"
                    label="Соответствие"
                    hide-details outlined dense
                    class="mr-2"
                    @input="answer.changed = true"
                  ></v-text-field>
                </v-col>

                <v-col cols="auto">
                  <v-btn
                    icon
                    :disabled="!answer.changed || !answer.text"
                    @click="saveAnswer( answer )"
                  >
                    <v-icon>mdi-check</v-icon>
                  </v-btn>
                </v-col>

                <v-col cols="auto">
                  <v-menu offset-y>
                    <template #activator="{ on, attrs }">
                      <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-dots-horizontal</v-icon>
                      </v-btn>
                    </template>
                    <v-list dense>
                      <v-list-item @click="deleteAnswer( answer )">
                        <v-list-item-icon>
                          <v-icon>mdi-trash-can-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Удалить</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-col>

              </v-row>
            </draggable>
          </div>

          <div v-else>
            Отлично, начните добавлять ответы.
          </div>



          <v-row v-if="type !== 'true_false'" class="mt-4">
            <v-spacer/>
            <v-col cols="auto">
              <v-btn
                color="primary" text
                :disabled="!canSaveAnswer"
                @click="addAnswer"
              >Добавить ответ</v-btn>
            </v-col>
          </v-row>

        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header class="font-weight-bold">
          Рекомендации
        </v-expansion-panel-header>
        <v-expansion-panel-content>

          <div>
            <v-icon v-if="questionTextIsFilled" class="mr-4" color="success">mdi-check</v-icon>
            <v-icon v-else class="mr-4" color="error">mdi-close</v-icon>
            Текст вопроса записан
          </div>

          <div v-if="[ 'one', 'multiple', 'conformity', 'sequence' ].includes( question.type )">
            <v-icon v-if="enoughFilledAnswers" class="mr-4" color="success">mdi-check</v-icon>
            <v-icon v-else class="mr-4" color="error">mdi-close</v-icon>
            Вопрос имеет минимум три ответа
          </div>

          <div v-if="[ 'one', 'multiple' ].includes( question.type )">
            <v-icon v-if="enoughCorrectAnswers" class="mr-4" color="success">mdi-check</v-icon>
            <v-icon v-else class="mr-4" color="error">mdi-close</v-icon>
            Должен быть выбран один правильный ответ
          </div>

          <div v-if="[ 'true_false' ].includes( question.type )">
            <v-icon v-if="enoughCorrectAnswers" class="mr-4" color="success">mdi-check</v-icon>
            <v-icon v-else class="mr-4" color="error">mdi-close</v-icon>
            Выбран правильный ответ
          </div>

        </v-expansion-panel-content>
      </v-expansion-panel>

    </v-expansion-panels>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue"

// @ts-ignore
import draggable from 'vuedraggable'
import {
  mapActions
} from "vuex"
import {
  QuestionsApiPayload, QuestionType
} from "~/plugins/api/questions/questions.type"
import {
  AnswersApiPayload
} from "~/plugins/api/answers/answers.type"

export default Vue.extend({
  name: "views-question-one",
  components: {
    draggable
  },
  props: {
    type: {
      type: String,
      default: () => null
    } as PropOptions<QuestionType>,
    dataQuestion: {
      type: Object,
      default: () => null
    } as PropOptions<QuestionsApiPayload>
  },
  data: () => ({
    question: null as QuestionsApiPayload | null,
    panels: [ 0, 2 ],
    radio: 0,
    checkbox: [] as number[]
  }),
  computed: {
    canSaveQuestion () {
      return !!this.question?.text
    },
    canSaveAnswer () {
      if ( this.question?.answers ) {
        // return !this.question.answers.find( answer => !answer.id )
      }
      return true
    },
    dragOptions: () => ({
      animation: 200,
      group: "answers",
      handle: ".question-answer-drag",
      disabled: false,
      ghostClass: "dnd-deals-card-ghost"
    }),
    questionTextIsFilled () {
      return !!this.question?.text
    },
    enoughFilledAnswers () {
      if ( this.question?.answers ) {
        return this.question.answers.filter( ( item: any ) => item.id ).length > 2
      }
      return null
    },
    enoughCorrectAnswers () {
      return !!this.question?.correct
    },
  },
  watch: {
    checkbox () {
      // this.setCorrect( this.checkbox )
    },
    radio () {
      // this.setCorrect([ this.radio ])
    }
  },
  mounted () {
    if ( this.dataQuestion?.id ) {
      this.question = this.dataQuestion
      if ( this.question?.id ) {
        this.panels.push( 1 )
      }
      if ( this.question?.answers ) {
        const find = this.question.answers.find( ({ correct }) => !!correct )
        if ( find?.id ) {
          this.radio = find.id
        }
        // @ts-ignore
        this.checkbox = this.question.answers.filter( ({ id, correct }) => !!id && !!correct )
      }
    }
  },
  methods: {
    ...mapActions({
      updateQuestion: "questions/update_question",
      addQuestion: "questions/add_question",
    }),
    addAnswer () {
      if ( this.question) {
        this.question = {
          ...this.question,
          answers: this.question?.answers || []
        }
        this.question?.answers?.push( {} )
      }
    },
    async saveQuestion () {
      if ( this.question ) {
        const { id, text, comment, correct }: QuestionsApiPayload = this.question
        if ( id ) {
          const { valid } = await this.$api.questions.update( id, {
            text, comment, correct
          })
          if ( valid ) {
            // @ts-ignore
            this.updateQuestion( this.question )
            this.$toast.global.update()
            this.$emit( 'onupdate', this.question )
          }
        } else {
          const { valid, data } = await this.$api.questions.create( {
            // @ts-ignore
            text, comment, type: this.type, question_block_id: 15, correct
          })
          if ( valid ) {
            // @ts-ignore
            this.addQuestion( data )
            this.panels.push( 1 )
            this.$toast.global.create()
            this.$emit( 'oncreate', data )
          }
        }
      }
    },
    async setOrder () {
      if ( this.question ) {
        const { id, answers } = this.question
        if ( id && answers ) {
          // @ts-ignore
          const order: number[] = answers.filter( ({ id }) => !!id ).map( ({ id }) => id )
          console.log( order )
          const { valid } = await this.$api.answers.setOrder( id, order )
          if ( valid ) {
            this.$toast.global.save()
          }
        }
      }
    },
    async setCorrect ( answer_ids: number[] ) {
      if ( this.question ) {
        const { id } = this.question
        if ( id ) {
          const { valid } = await this.$api.answers.setCorrect( id, answer_ids )
          if ( valid ) {
            this.$toast.global.saved()
          }
        }
      }
    },
    setCorrectOne ( id: number ) {
      // @ts-ignore
      this.setCorrect([ id ])
    },
    setCorrectMultiple () {
      // @ts-ignore
      this.setCorrect( this.checkbox )
    },
    async saveAnswer ( answer: AnswersApiPayload ) {
      if ( this.question?.answers ) {
        if ( answer?.id ) {
          const { valid } = await this.$api.answers.update( answer.id, {
            ...answer, question_id: this.question.id
          })
          if ( valid ) {
            this.question.answers.splice( this.question.answers.indexOf( answer ), 1, {
              // @ts-ignore
              ...answer, changed: false
            })
          }
        } else {
          const { valid, data } = await this.$api.answers.create({
            ...answer, question_id: this.question.id
          })
          if ( valid ) {
            this.question.answers.splice( this.question.answers.indexOf( answer ), 1, data )
          }
        }
      }
    },
    async deleteAnswer ( answer: AnswersApiPayload ) {
      if ( this.question?.answers && answer.id ) {
        const { valid } = await this.$api.answers.delete([ answer.id ])
        if ( valid ) {
          this.question.answers = [
            ...this.question.answers.filter( ({ id }) => answer.id !== id )
          ]
        }
      }

    }
  }
})
</script>

<style>
.dnd-deals-card-ghost {
  opacity: 0.5;
}
</style>

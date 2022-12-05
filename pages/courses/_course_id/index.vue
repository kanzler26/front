<template>
  <ui-container>

    <template #toolbar>
      <ui-toolbar back-to="/courses" title="Курс" divider>
        <v-spacer></v-spacer>
        <v-btn icon color="error" @click="removeCourse">
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </ui-toolbar>
    </template>

    <v-row>
      <v-col>
        <inputs-education-doc-name/>
      </v-col>
    </v-row>

    <v-expansion-panels v-model="panels" multiple>

      <v-expansion-panel>
        <v-expansion-panel-header class="font-weight-bold">
          Общие данные
        </v-expansion-panel-header>
        <v-expansion-panel-content>

          <v-form v-model="forms.course.valid">

            <v-row>
              <v-col cols="auto">

                <v-row dense>
                  <v-col>
                    <v-img class="cursor-pointer course-avatar"></v-img>
                  </v-col>
                </v-row>

              </v-col>
              <v-col>

                <v-row class="pt-2">
                  <v-col>
                    <v-textarea
                      v-model="forms.course.fields.name"
                      :rules="[ $rules.notEmpty, $rules.length.max( 255 ) ]"
                      label="Наименование"
                      rows="1" auto-grow
                      dense
                    ></v-textarea>
                  </v-col>
                </v-row>

                <v-row v-if="isCourse">
                  <v-col cols="2">
                    <v-text-field
                      v-model="forms.course.fields.hours"
                      :rules="[ $rules.onlyNumber, $rules.notZero ]"
                      label="Часы"
                      placeholder="0"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="forms.course.fields.code"
                      label="Код"
                      placeholder="0"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="forms.course.fields.recertification"
                      :rules="[ $rules.onlyNumber, $rules.zeroOrMore ]"
                      label="Месяц переатестации"
                      placeholder="0"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field
                      v-model="forms.course.fields.price"
                      :rules="[ $rules.onlyNumber, $rules.zeroOrMore ]"
                      label="Цена (руб)"
                      placeholder="0"
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row v-if="isCourse" dense>
                  <v-col>
                    <v-radio-group
                      v-model="forms.course.fields.training_mode"
                      mandatory row
                      disabled
                    >
                      <v-radio
                        label="легко"
                        value="easy"
                      ></v-radio>
                      <v-radio
                        label="нормально"
                        value="medium"
                      ></v-radio>
                      <v-radio
                        label="сложно"
                        value="hard"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>

                <v-row>
                  <v-spacer></v-spacer>
                  <v-col cols="auto">
                    <v-btn
                      text color="primary"
                      :loading="forms.course.loading"
                      :disabled="!canSaveCourseForm"
                      @click="saveCourse"
                    >Сохранить</v-btn>
                  </v-col>
                </v-row>

              </v-col>
            </v-row>

          </v-form>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel disabled>
        <v-expansion-panel-header class="font-weight-bold">
          Шаблоны документов
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          В разработке
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel disabled>
        <v-expansion-panel-header class="font-weight-bold">
          Нумерация документов
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          В разработке
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header class="font-weight-bold">
          Блоки обучающего материала
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col>
              <v-treeview
                v-model="treeviews.learning_blocks.selected"
                :items="learningBlocks"
                :search="treeviews.learning_blocks.search"
                :open="treeviews.learning_blocks.opened"
                item-key="key"
                item-text="name"
                expand-icon="mdi-chevron-down"
                open-on-click
              >
                <template #prepend="{ item, open }">
                  <v-icon v-if="item.file">mdi-file-document-outline</v-icon>
                  <v-icon v-else>{{ open ? 'mdi-folder-open-outline' : 'mdi-folder-outline' }}</v-icon>
                </template>
                <template #append="{ item }">
                  <v-menu v-if="item.block" offset-y>
                    <template #activator="{ on, attrs }">
                      <v-btn small icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <v-list dense>
                      <v-list-item @click="log( item )">
                        <v-list-item-icon>
                          <v-icon>mdi-pencil</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Редактировать блок</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="log( item )">
                        <v-list-item-icon>
                          <v-icon>mdi-trash-can-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Удалить блок</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                  <v-menu v-if="item.collection" offset-y>
                    <template #activator="{ on, attrs }">
                      <v-btn small icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-cloud-upload-outline</v-icon>
                      </v-btn>
                    </template>
                    <v-card class="pa-4">
                      Тут будет загрузка файлов
                    </v-card>
                  </v-menu>
                  <v-menu v-if="item.file" offset-y>
                    <template #activator="{ on, attrs }">
                      <v-btn small icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <v-list dense>
                      <v-list-item disabled>
                        <v-list-item-icon>
                          <v-icon>mdi-pencil</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Редактировать файл</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="log( item )">
                        <v-list-item-icon>
                          <v-icon>mdi-cloud-download-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Скачать файл</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="log( item )">
                        <v-list-item-icon>
                          <v-icon>mdi-trash-can-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Удалить файл</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </template>
              </v-treeview>
            </v-col>
          </v-row>
          <v-row>
            <v-spacer/>
            <v-col cols="auto">
              <v-btn
                color="primary" text
                @click="testLearningBlocks"
              >Добавить блок</v-btn>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header class="font-weight-bold">
          Блоки вопросов
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col>
              <v-list>
                <v-list-item
                  v-for="questionBlock in lists.question_blocks.items"
                  :key="questionBlock.id"
                  @click="$router.push( `/courses/${course_id}/question-blocks/${questionBlock.id}` )"
                >
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-medium" v-text="questionBlock.name"></v-list-item-title>
                    <v-list-item-subtitle v-if="questionBlock.description">{{ questionBlock.description }}</v-list-item-subtitle>
                    <v-list-item-subtitle v-else>(описание отсутствует)</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-menu offset-y>
                      <template #activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                          <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                      </template>
                      <v-list dense>
                        <v-list-item @click="showQuestionBlocksEditModal( questionBlock.id )">
                          <v-list-item-icon><v-icon>mdi-pencil</v-icon></v-list-item-icon>
                          <v-list-item-title>Редактировать</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="removeQuestionBlock( questionBlock )">
                          <v-list-item-icon><v-icon>mdi-trash-can-outline</v-icon></v-list-item-icon>
                          <v-list-item-title>Удалить</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
          <v-row>
            <v-spacer/>
            <v-col cols="auto">
              <v-btn
                color="primary" text
                @click="showQuestionBlocksEditModal()"
              >Добавить блок</v-btn>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header class="font-weight-bold">
          Экзамены
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col>
              <v-list>
                <v-list-item
                  v-for="exam in lists.exams.items"
                  :key="exam.id"
                >
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-medium" v-text="exam.name"></v-list-item-title>
                    <v-list-item-subtitle>{{ exam.mode | examType }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-menu offset-y>
                      <template #activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                          <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                      </template>
                      <v-list dense>
                        <v-list-item @click="log( exam )">
                          <v-list-item-icon><v-icon>mdi-pencil</v-icon></v-list-item-icon>
                          <v-list-item-title>Редактировать</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="log( exam )">
                          <v-list-item-icon><v-icon>mdi-trash-can-outline</v-icon></v-list-item-icon>
                          <v-list-item-title>Удалить</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
          <v-row>
            <v-spacer/>
            <v-col cols="auto">
              <v-btn
                color="primary" text
                @click="createExam"
              >Добавить экзамен</v-btn>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

    </v-expansion-panels>


    <wrappers-modal-overlay v-model="modals.questionBlock.display" :width="500">
      <template #default="props">
        <modals-question-blocks-edit
          :course-id="modals.questionBlock.props.course_id"
          :question-block-id="modals.questionBlock.props.id"
          v-bind="props"
          @oncreate="onCreateQuestionBlock"
          @onupdate="onUpdateQuestionBlock"
        />
      </template>
    </wrappers-modal-overlay>

    <wrappers-modal-overlay v-model="modals.exam.display" :width="600">
      <template #default="props">
        <modals-exams-edit
          v-model="test"
          v-bind="props"
          @oncreate="onCreateQuestionBlock"
          @onupdate="onUpdateQuestionBlock"
        />
      </template>
    </wrappers-modal-overlay>


  </ui-container>
</template>

<script lang="ts">
import Vue from "vue"
import {
  CoursesApiPayload
} from "~/plugins/api/courses/courses.type"
import {
  QuestionBlocksApiPayload
} from "~/plugins/api/question-blocks/question-blocks.type"
import { LearningBlocksApiPayload } from "~/plugins/api/learning-blocks/learning-blocks.type"
import { FileTypes, FilesApiPayload } from "~/types/api/files"

interface ModalQuestionBlockProps {
  id: number | null,
  course_id: number | null
}

export default Vue.extend({
  name: "edit-course-page",
  layout: "admin",
  data: () => ({
    test: {
      name: 'test'
    },
    display: true,
    panels: [ 4 ],
    course: {} as CoursesApiPayload,
    forms: {
      course: {
        valid: false,
        loading: false,
        fields: {} as CoursesApiPayload
      }
    },
    modals: {
      questionBlock: {
        display: false,
        props: {} as ModalQuestionBlockProps
      },
      exam: {
        display: false
      }
    },
    treeviews: {
      learning_blocks: {
        search: null,
        selected: [],
        items: [],
        opened: [],
        file: {},
        target: null
      }
    },
    lists: {
      learning_blocks: {
        items: [] as LearningBlocksApiPayload[]
      },
      question_blocks: {
        items: [] as QuestionBlocksApiPayload[]
      },
      exams: {
        items: []
      }
    }
  }),
  computed: {
    course_id (): number {
      return Number( this.forms.course.fields?.id || 0 )
    },
    isCourse () {
      return this.forms.course.fields?.is_course
    },
    canSaveCourseForm () {
      return this.forms.course.valid
    },
    learningBlocks () {
      const blocks = this.lists.learning_blocks.items
      const prepare = ( files: FilesApiPayload[] | undefined, type: FileTypes ) => {
        if ( !files?.length ) {
          return []
        }
        return files
          .filter( ({ collection }) => collection === type )
          .map( ({ id, name, url, size, created_at }) => ({
            id, name, url, size, created_at,
            file: true
          }) )
      }
      return blocks.map( ({ id, name, files }) => {
        return {
          id,
          name,
          block: true,
          children: [
            {
              collection: true,
              name: 'Лекции',
              children: prepare( files, 'lectures' )
            },
            {
              collection: true,
              name: 'Аудио-лекции',
              children: prepare( files, 'audio_lectures' )
            },
            {
              collection: true,
              name: 'Видео-лекции',
              children: prepare( files, 'video_lectures' )
            },
            {
              collection: true,
              name: 'Методические материалы',
              children: prepare( files, 'methodological_materials' )
            }
          ],
        }
      })
    }
  },
  async mounted () {
    const { course_id } = this.$route.params
    if ( course_id ) {
      const { data } = await this.$api.courses.readOne( Number( course_id ) )
      if ( data?.id ) {
        const { learning_blocks, question_blocks, exams, ...props } = data
        this.lists.learning_blocks.items = learning_blocks
        this.lists.question_blocks.items = question_blocks
        this.lists.exams.items = exams
        this.forms.course.fields = props
      }
    }
  },
  methods: {
    // ~~~ course
    async saveCourse () {
      this.forms.course.loading = true
      const { valid } = await this.$api.courses.update( this.course_id, this.forms.course.fields )
      if ( valid ) {
        this.$toast.global.update()
      }
      this.forms.course.loading = false
    },
    async removeCourse () {
      if ( await this.$confirmModal( 'Вы действительно хотите удалить курс ?' ) ) {
        console.log( 'удалено' )
      }
    },
    // ~~~ question blocks
    async removeQuestionBlock ( question_block: QuestionBlocksApiPayload ) {
      const confirm = await this.$confirmModal( 'Вы действительно хотите это удалить ?' )
      if ( confirm && question_block.id ) {
        const { valid } = await this.$api.questionBlocks.remove( question_block.id )
        if ( valid ) {
          const index = this.lists.question_blocks.items.indexOf( question_block )
          this.lists.question_blocks.items.splice( index,1 )
          this.$toast.global.remove()
        }
      }
    },
    onCreateQuestionBlock ( question_block: QuestionBlocksApiPayload ) {
      this.lists.question_blocks.items.push( question_block )
    },
    onUpdateQuestionBlock ( question_block: QuestionBlocksApiPayload ) {
      const index = this.lists.question_blocks.items.findIndex( ({ id }) => id === question_block.id )
      this.lists.question_blocks.items.splice( index,1 , question_block )
    },
    showQuestionBlocksEditModal ( id?: number ) {
      this.modals.questionBlock.display = true
      this.modals.questionBlock.props.id = id || null
      this.modals.questionBlock.props.course_id = this.course_id || null
    },
    // ~~~ exams
    createExam () {
      this.modals.exam.display = true
    },
    // ~~~ tests
    testLearningBlocks () {
      this.lists.learning_blocks.items.push({
        name: 'qw',
        files: [
          {
            collection: 'video_lectures',
            name: 'teeeeest',
            id: 1,
            url: 'wef',
            size: 0
          }
        ]
      })
    },
    log ( ...props: any ) {
      console.log( 'log:', ...props )
    }
  }
})
</script>

<style scoped>

.course-avatar {
  min-width: 150px;
  min-height: 150px;
  background: rgba( 240, 240, 240, 1 );
  border: 1px solid rgba(94, 86, 86, 0.2);
  border-radius: 10px;
}

</style>

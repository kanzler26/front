<template>
  <ui-container>
    <template #toolbar>
      <ui-toolbar title="Курсы" divider>
        <v-spacer></v-spacer>
        <v-menu offset-y>
          <template #activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item disabled>
              <v-list-item-icon>
                <v-icon disabled>mdi-file-upload-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Импорт структуры</v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item :disabled="!canCreateSubdirectory" @click="showModalCreateCourse( false )">
              <v-list-item-icon>
                <v-icon :disabled="!canCreateSubdirectory">mdi-folder-plus-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                Добавить {{ createCourseConfigs ? 'подраздел' : 'раздел' }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item :disabled="!canCreateCourse" @click="showModalCreateCourse( true )">
              <v-list-item-icon>
                <v-icon :disabled="!canCreateCourse">mdi-folder-multiple-plus-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Добавить курс</v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item :disabled="!createCourseConfigs" @click="test">
              <v-list-item-icon>
                <v-icon :disabled="!createCourseConfigs">mdi-trash-can-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                Удалить {{ createCourseConfigs?.is_course ? 'курс' : activeCourseDepth ? 'подраздел' : 'раздел' }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn icon to="/settings/courses">
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </ui-toolbar>
    </template>

    <v-treeview
      v-model="treeviews.courses.selected"
      :search="treeviews.courses.search"
      :items="treeviews.courses.items"
      :open.sync="treeviews.courses.opened"
      :active.sync="treeviews.courses.active"
      hoverable
      open-on-click
      expand-icon="mdi-chevron-down"
      item-key="id"
      item-text="name"
      return-object
    >
      <template #prepend="{ item: { is_course }, open }">
        <v-icon v-if="is_course">mdi-folder-star-multiple-outline</v-icon>
        <v-icon v-else>{{ open ? 'mdi-folder-open-outline' : 'mdi-folder-outline' }}</v-icon>
      </template>
      <template #label="{ item: { id, name } }">
        <nuxt-link :to="`/courses/${id}`" class="pl-2">{{ name }}</nuxt-link>
      </template>
    </v-treeview>

    <wrappers-modal-overlay v-model="modals.course.display" :width="500">
      <template #default="props">
        <modals-courses-create
          v-bind="props"
          :is-course="modals.course.props.is_course"
          :parent-id="modals.course.props.parent_id"
          @oncreate="onCreateCourse"
        />
      </template>
    </wrappers-modal-overlay>

  </ui-container>
</template>

<script lang="ts">
import Vue from "vue"
import { CoursesApiPayload } from "~/plugins/api/courses/courses.type"

export default Vue.extend({
  name: "courses-page",
  layout: "admin",
  data: () => ({
    form: {
      name: "мое имя"
    },
    modals: {
      course: {
        display: false,
        props: {
          is_course: false,
          parent_id: 0
        }
      }
    },
    treeviews: {
      courses: {
        search: null,
        selected: [],
        active: [],
        items: [] as CoursesApiPayload[],
        opened: [],
        // filter: ( item, search, textKey ) => !item.deleted,
        // говнокод
        target: null, // ссылка куда запушить созданный обьект
      }
    }
  }),
  computed: {
    canCreateCourse (): any {
      return this.createCourseConfigs && ( !this.activeCourseDepth || this.activeCourseDepth < 2 )
    },
    canCreateSubdirectory (): any {
      return !this.activeCourseDepth || this.activeCourseDepth < 1
    },
    createCourseConfigs () {
      const [ course ] = this.treeviews.courses.active
      if ( course ) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { children, ...props }: any = course
        return props
      }
      return null
    },
    activeCourseDepth (): any {
      return this.createCourseConfigs?.depth
    }
  },
  async mounted () {
    const { data } = await this.$api.courses.read({ tree: 1 })
    this.treeviews.courses.items = data
  },
  methods: {
    onCreateCourse ( course: CoursesApiPayload ) {
      console.log( course )
      const [ target ] = this.treeviews.courses.active
      if ( target ) {
        // @ts-ignore
        target?.children.push( course )
      } else {
        this.treeviews.courses.items.push( course )
      }
    },
    showModalCreateCourse ( is_course: boolean ) {
      this.modals.course.props.parent_id = this.createCourseConfigs?.id || 0
      this.modals.course.props.is_course = is_course
      this.modals.course.display = true
    },
    test () {
      console.log( this.createCourseConfigs )
    },
  }
})
</script>

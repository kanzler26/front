<template>
  <div>
    <v-col
      ref="table"
      :class="{'pb-4': search | modal, 'pt-0': modal, 'px-3': modal, 'px-4': !modal}"
    >
      <v-row
        class="align-center mx-0"
        :class="{'mb-2': search !== null}"
        style="height: 48px"
      >
        <template v-if="!selectable.length && tableData.meta">
          <h4>Всего: {{tableData.meta.total || 0}}</h4>
          <v-spacer></v-spacer>
        </template>

        <template v-if="selectable.length">
          <h4>Выбрано: {{selectable.length}}</h4>
          <v-spacer></v-spacer>
          <ui-drop-menu
            v-if="selected.dropMenu"
            v-model="selected.dropMenu.display"
            :elements="selected.dropMenu.elements"
          />
        </template>

        <slot name="actions"></slot>
      </v-row>

<!--      <v-row>-->
<!--        <ui-search-->
<!--          v-if="search !== null"-->
<!--          v-model="searchText"-->
<!--          key-code="Enter"-->
<!--          responsive-->
<!--          @submit="() => getData(routes.search, searchParams)"-->
<!--        />-->

<!--      </v-row>-->

    </v-col>
    <v-data-table
      v-model="selectable"
      :headers="headers"
      :items="tableData.data"
      :show-select="showSelect"
      :no-data-text="noDataText"
      :no-results-text="noResultsText"
      :loading-text="loadingText"
      :item-key="itemKey"
      :checkbox-color="checkboxColor"
      :items-per-page="perPage"
      :server-items-length="0"
      :single-line="singleLine"
      :hide-details="hideDetails"
      :page.sync="page"
      @update:items-per-page="(number) => itemsPerPage = number"
      @pagination="(pagination) => changePagination(pagination)"
    >
      <template
        v-for="(_, scopedSlotName) in $scopedSlots"
        #[scopedSlotName]="slotData"
      >
        <slot :name="scopedSlotName" v-bind="slotData"/>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import Vue, {PropOptions} from "vue";
import {ITableHeaderItem} from "~/components/not-approved/views/users/tables/listeners.vue";
import {IDropMenuInit} from "~/components/not-approved/ui/drop-menu.vue";
import {IGenericResponseData} from "~/types/default.types";

export interface ITableAction {
  icon: string,
  action: () => void
}

export interface ITableSelected {
  value: Array<any>,
  dropMenu: IDropMenuInit,
}

export interface IDefaultCustomSlot {
  name: string,
  template: any,
}

export interface ITableSearch {
  value: string,
  params: {
    [key: string]: typeof key;
  }
}

export interface ITableCreate {
  headers: Array<ITableHeaderItem> | [],
  items: Array<any> | [],
  search: {
    init: boolean,
    text: "",
  },
  selected: {
    init: boolean,
    checkboxColor: string
  },
  loading: {
    status: boolean,
    previewText: string
  } | {},
  noDataText: {
    status: boolean,
    previewText: string,
  },
  noResultsText: {
    status: boolean,
    previewText: string
  },
  singleLine: boolean
  hideDetails: boolean
}

export default Vue.extend({
  name: "ui-table",
  props: {
    headers: {
      type: Array,
      required: true,
      default: () => []
    } as PropOptions<Array<ITableHeaderItem>>,
    modal: {
      type: Boolean,
      default: () => false
    } as PropOptions<boolean>,
    items: {
      type: Array,
      required: false,
      default: () => [],
    } as PropOptions<Array<any>>,
    loadingText: {
      type: String,
      default: () => "Загрузка данных"
    } as PropOptions<string>,
    search: {
      type: Object,
      default: () => {}
    } as PropOptions<ITableSearch>,
    selected: {
      type: Object,
      default: () => {},
    } as PropOptions<ITableSelected>,
    noDataText: {
      type: String,
      default: () => "Данные не добавлены"
    } as PropOptions<string>,
    noResultsText: {
      type: String,
      default: () => "Данные не найдены"
    } as PropOptions<string>,
    itemKey: {
      type: String,
      default: () => 'id'
    } as PropOptions<string>,
    checkboxColor: {
      type: String,
      default: () => 'primary'
    } as PropOptions<string>,
    singleLine: {
      type: Boolean,
      default: () => false
    } as PropOptions<boolean>,
    hideDetails: {
      type: Boolean,
      default: () => false
    } as PropOptions<boolean>,
    actions: {
      type: Array,
      default: () => [],
    } as PropOptions<Array<ITableAction>>,
    baseUrl: {
      type: String,
      default: () => '',
    } as PropOptions<string>,
    perPage: {
      type: Number,
      default: () => 20
    } as PropOptions<number>
  },

  data () {
    return {
      modals: {
        select: false
      },
      selectable: [],
      tableData: [] as IGenericResponseData<Array<any>> | [],
      showSelect: !this.selected.value.length,
      tableSlots: [] as Array<IDefaultCustomSlot>,
      page: 1,
      itemsPerPage: this.perPage,
      url: this.baseUrl,
      searchText: "" as string
    }
  },

  computed: {
    routes (): {search: string, default: string} {
      return {
        search: this.url + '/search',
        default: this.url
      }
    },

    searchParams (): string {
      return this.createParamsString(this.search.params).join('');
    }
  },

  async mounted () {
    await this.getData(this.routes.default, `?page=${this.page}&perPage=${this.itemsPerPage}`);
  },

  methods: {
    async getData (route: string, params: string = '') {
      const data = await this.$axios.get(`${route}${params}`);

      this.tableData = data.data;

      return false
    },
    //
    changePagination () {
      // @ts-ignore
      const scrollToElement: HTMLElement = this.$refs.table;

      if(scrollToElement) {
        // @ts-ignore
        scrollToElement.scrollIntoView({behavior: 'smooth', block: 'center'},)
      }

      this.getData(this.routes.default)
    },

    createParamsString (params: object) {
      const readyString: Array<string> = [];

      Object.entries(params).forEach(([key], index) => {
        if(index === 0) {
          readyString.push(`?${key}=${this.searchText}`);
        } else {
          readyString.push(`&${key}=${this.searchText}`);
        }
      });

      return readyString
    }
  },
})
</script>

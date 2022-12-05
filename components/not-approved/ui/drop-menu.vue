<template>
  <v-menu
    v-model="$attrs.value"
    :min-width="minWidth"
    :max-width="maxWidth"
    :max-height="maxHeight"
    :min-height="minHeight"
    :left="left"
    :right="right"
    :bottom="bottom"
    :top="top"
    :offset-y="offsetY"
    :offset-x="offsetX"
    :close-on-content-click="closeOnContentClick"
    :nudge-bottom="nudgeBottom"
    :nudge-left="nudgeLeft"
    :nudge-top="nudgeTop"
    :nudge-right="nudgeLeft"
    rounded="0"
    :content-class="contentClass"
  >

    <template #activator="{ on, attrs }">

      <slot
        name="activator"
        :on="on"
        :attrs="attrs"
      >

      </slot>

      <v-btn
        v-if="!$scopedSlots.activator"
        icon
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <slot name="list"></slot>

    <v-list v-if="elements.length" dense>
      <v-list-item
        v-for="element in elements"
        :key="element.text"
        @click="element.action"
      >
        <v-list-item-icon link><v-icon :color="element.icon.color">{{element.icon.icon}}</v-icon></v-list-item-icon>
        <v-list-item-content>{{element.text}}</v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue, {PropOptions, PropType} from "vue";

export interface IDropMenuItem {
  icon: {
    icon: string,
    color?: string
  },
  text: string,
  action: Function
}

export interface IDropMenuInit {
  display: boolean,
  elements: Array<IDropMenuItem>
}

export default Vue.extend({
  name: "drop-menu",
  props: {
    elements: {
      type: Array as PropType<Array<IDropMenuItem>>,
      default: () => [],
    },
    location: {
      type: String,
      default: () => "end"
    } as PropOptions<string>,
    top: {
      type: Boolean,
      default: () => false
    } as PropOptions<boolean>,
    left: {
      type: Boolean,
      default: () => true
    } as PropOptions<boolean>,
    right: {
      type: Boolean,
      default: () => false
    } as PropOptions<boolean>,
    bottom: {
      type: Boolean,
      default: () => false
    } as PropOptions<boolean>,
    closeOnContentClick: {
      type: Boolean,
      default: () => false
    } as PropOptions<boolean>,
    nudgeBottom: {
      type: [Number, String],
      default: () => 48
    } as PropOptions<string | number>,
    nudgeTop: {
      type: [Number, String],
      default: () => 0
    } as PropOptions<string | number>,
    nudgeRight: {
      type: [Number, String],
      default: () => 0
    } as PropOptions<string | number>,
    nudgeLeft: {
      type: [Number, String],
      default: () => 0
    } as PropOptions<string | number>,
    maxWidth: {
      type: String,
      default: () => '100%'
    },
    minWidth: {
      type: String,
      default: () => '200'
    },
    maxHeight: {
      type: String,
      default: () => '100%'
    },
    minHeight: {
      type: String,
      default: () => '200'
    },
    offsetX: {
      type: Boolean,
      default: () => false
    },
    offsetY: {
      type: Boolean,
      default: () => false
    },
    contentClass: {
      type: String,
      default: () => "",
    } as PropOptions<string>
  },
  data: () => ({
    isHover: false as boolean
  }),
})
</script>


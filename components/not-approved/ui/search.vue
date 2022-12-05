<template>
  <div class="search-wrapper active" :class="{'responsive': responsive}">
    <input
      ref="search"
      name="search"
      placeholder="Поиск"
      class="search-input font-weight-400"
      @input.е="inputHadler"
    />
    <v-btn icon height="38" width="38">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "custom-search",
  props: {
    keyCode: {
      type: String,
      default: "Period"
    },
    label: {
      type: String,
      default: "Поиск (нажмите .)"
    },
    placeholder: {
      type: String,
      default: "Поиск по таблице"
    },
    responsive: {
      type: Boolean,
      default:false,
    },
    icon: {
      type: String,
      default: () => "mdi-magnify"
    },
    submitWhenTyping: {
      type: Boolean,
      default: () => false
    },
  },
  data: () => ({
    isActive: false
  }),

  // При инициализации добавляем слушатель события
  mounted () {
    document.addEventListener('keypress', this.keyAddEventListener)
  },

  methods: {
    keyAddEventListener (event: KeyboardEvent) {

      const { code } = event;

      if(code === this.keyCode) {
        this.$emit('submit')
      }
    },

    inputHadler (event: any): void {
      this.$emit('input', event.target.value);

      if(this.submitWhenTyping) {
        this.$emit('submit');
      }
    },

    // При демонтировании убираем слушатель события
    unmounted () {
      document.addEventListener('keypress', this.keyAddEventListener)
    },
  }
})
</script>

<style>
.search {
  border-radius: 50px;
  padding: 16px 12px;
  box-shadow: none;
  opacity: 1;
  transition: 0.5s ease all;
}

.search-wrapper {
  width: min-content;
  display: flex;
  justify-content: flex-end;
  border-radius: 50px;
  padding-left: 0;
  background: transparent;
  transition: all ease 1s;
}

.search-wrapper.active {
  width: 250px;
  padding-left: 12px;
  background: #f3f3f3;
}

.search-wrapper.active.responsive {
  width: 100%;
}

.search-input {
  width: 100%;
  outline: none;
  border: none;
  font-size: 14px;
}
</style>

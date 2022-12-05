<template>
  <div>Аналитика</div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "analytics-page",
  layout: "admin",
  data: () => ({
    selected: [],
    items: [{id: 1, name: "test"}],
    isSelected: false,
    search: "",
    modals: {
      adding: false,
      filters: false,
      select: {
        display: false,
        elements: [
          {
            icon: "mdi-list-status",
            text: "Отправить доступы",
            action: () => console.log("test")
          },
          {
            icon: "mdi-list-status",
            text: "В группу",
            action: () => console.log("test")
          },
          {
            icon: "mdi-trash-can-outline",
            text: `Удалить выбранные`,
            action: () => console.log("test")
          }
        ]
      },
    },
  })
})
</script>

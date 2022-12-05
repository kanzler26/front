<template>
  <v-list dense nav>
    <!-- todo: add v-permission="item.permission" to each navigation menu item for vue gates -->
    <v-list-item v-for="item in items" :key="item.title" :to="item.link">
      <v-list-item-icon>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title class="font-weight-bold">
          {{ item.title }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
export default {
  name: "ui-navigation-menu",
  data: () => ({
    items: {
      analytics: {
        link: "/analytics",
        title: "Аналитика",
        icon: "mdi-home",
        permission: "analytics.show_page",
      },
      calendar: {
        link: "/calendar",
        title: "Календарь",
        icon: "mdi-calendar",
        permission: "calendar.show_page",
      },
      deals: {
        link: "/deals",
        title: "Сделки",
        icon: "mdi-pen",
        permission: "deals.show_page",
      },
      knowledgebase: {
        link: "/knowledgebase",
        title: "База знаний",
        icon: "mdi-school",
        permission: "knowledgebase.show_page",
      },
      courses: {
        link: "/courses",
        title: "Курсы",
        icon: "mdi-book-open-variant",
        permission: "courses.show_page",
      },
      counterparties: {
        link: "/counterparties",
        title: "Контрагенты",
        icon: "mdi-copyright",
        permission: "counterparties.show_page",
      },
      users: {
        link: "/users",
        title: "Пользователи",
        icon: "mdi-account-multiple",
        permission: "users.show_page",
      },
      groups: {
        link: "/groups",
        title: "Группы",
        icon: "mdi-shape-outline",
        permission: "groups.show_page",
      },
      webinars: {
        link: "/webinars",
        title: "Вебинары",
        icon: "mdi-video-switch",
        permission: "webinars.show_page",
      },
      news: {
        link: "/news",
        title: "Новости",
        icon: "mdi-newspaper",
        permission: "news.show_page",
      },
      showcase: {
        link: "/showcase",
        title: "Витрина",
        icon: "mdi-percent",
        permission: "showcase.show_page",
      },
      institution: {
        link: "/institution",
        title: "Данные УЦ",
        icon: "mdi-office-building",
        permission: "institution.show_page",
      },
      conferences: {
        link: "/conferences",
        title: "Конференции",
        icon: "mdi-whistle",
        permission: "conferences.show_page",
      },
      // telephony
      // mailing
    },
  }),
}
</script>

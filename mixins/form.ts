import Vue from "vue"

export default Vue.extend({

  props: {
    // ...
  },

  data: () => ({
    // ...
  }),

  methods: {
    formExist ( token: string ) {
      // @ts-ignore
      const forms = this?.forms || {}
      return !!forms[ token ]

    },
    formLoading ( token: string, status: boolean ) {
      if ( this.formExist( token ) ) {
        // @ts-ignore
        this.forms[ token ].loading = status
      }
    }
  }

})

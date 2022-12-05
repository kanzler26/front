import { Context } from "@nuxt/types"
import { Inject } from "@nuxt/types/app"

import Vue from "vue"
import modal from './modal.vue'

interface ConfirmModal {
  icon?: string
  header?: string
}

declare module "vue/types/vue" {
  interface Vue {
    $confirmModal ( message: string, options?: ConfirmModal ): Promise<boolean>
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (context: Context, inject: Inject) => {

  const confirmModal = ( message: string, options?: ConfirmModal ) => {
    return new Promise( resolve => {

      const { $vuetify }: any = context

      const instance = new (Vue.extend( modal ))({
        propsData: {
          message,
          ...options
        }
      })

      // @ts-ignore
      instance.$vuetify = $vuetify

      document.body.appendChild( instance.$mount().$el )

      instance.$on( 'close', function ( value: boolean ) {
        instance.$destroy()
        instance.$el.remove()
        resolve( value )
      })

    })
  }

  inject( 'confirmModal', confirmModal )

}

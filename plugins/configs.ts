import { Context } from "@nuxt/types"
import { Inject } from "@nuxt/types/app"

const configs = () => ({

  datatables: {
    footerProps: {
      itemsPerPageOptions: [
        20, 40, 60, 80, 100
      ],
      showCurrentPage: true,
    }
  }

})

declare module "vue/types/vue" {
  interface Vue {
    $configs: ReturnType<typeof configs>
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (context: Context, inject: Inject) => {

  inject( 'configs', configs() )

}

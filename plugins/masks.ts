import { Context } from "@nuxt/types"
import { Inject } from "@nuxt/types/app"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (context: Context, inject: Inject) => {

  const masks = {
    time: `##:##`,
    date: '##.##.##',
    snils: `###-###-### ##`
  }

  inject("masks", masks)
}

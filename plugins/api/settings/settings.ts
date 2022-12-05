// eslint-disable-next-line import/named
import { NuxtAxiosInstance } from "@nuxtjs/axios"
import { Api } from "~/utils/api"

export class SettingsApi extends Api {

  // eslint-disable-next-line no-useless-constructor
  constructor(axios: NuxtAxiosInstance) {
    super( axios )
  }

  public readonly endpoints = {
    readInitial: {
      route: () => '/settings/initial',
      statuses: [200]
    },
    readMain: {
      route: () => '/employer/settings/main',
      statuses: [200]
    },
  }

  readInitial () {
    const { route, statuses } = this.endpoints.readInitial
    return this.executeGet({
      url: { route: route() },
      validate: { statuses }
    })
  }

  readMain () {
    const { route, statuses } = this.endpoints.readMain
    return this.executeGet({
      url: { route: route() },
      validate: { statuses }
    })
  }

}

// eslint-disable-next-line import/named
import { NuxtAxiosInstance } from "@nuxtjs/axios"
import { Api } from "~/utils/api"

export class PermissionsApi extends Api {

  // eslint-disable-next-line no-useless-constructor
  constructor(axios: NuxtAxiosInstance) {
    super( axios )
  }

  public readonly route = "/permissions"
  public readonly endpoints = {
    read: {
      route: () => this.route,
      statuses: [200]
    },
  }

  read () {
    const { route, statuses } = this.endpoints.read
    return this.executeGet({
      url: { route: route() },
      validate: { statuses }
    })
  }

}

// eslint-disable-next-line import/named
import { NuxtAxiosInstance } from "@nuxtjs/axios"
import { Api, ApiResponse } from "~/utils/api"
import { BanksApiQueryParams } from "~/plugins/api/banks/banks.type"

export class BanksApi extends Api {

  // eslint-disable-next-line no-useless-constructor
  constructor(axios: NuxtAxiosInstance) {
    super( axios )
  }

  public readonly route = "/employer/banks"
  public readonly endpoints = {
    read: {
      route: () => this.route,
      statuses: [200]
    },
    search: {
      route: () => `${this.route}/search`,
      statuses: [200]
    }
  }

  read (): Promise<ApiResponse<any>> {
    const { route, statuses } = this.endpoints.read
    return this.executeGet({
      url: { route: route() }, validate: { statuses }
    })
  }

  search ( query: BanksApiQueryParams ): Promise<ApiResponse<any>> {
    const { route, statuses } = this.endpoints.search
    return this.executeGet({
      url: { route: route(), query },
      validate: { statuses }
    })
  }



}

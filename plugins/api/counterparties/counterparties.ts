// eslint-disable-next-line import/named
import { NuxtAxiosInstance } from "@nuxtjs/axios"
import { Api, ApiResponse } from "~/utils/api"
import {
  CounterpartiesApiPayload,
  CounterpartiesApiQueryParams,
  CounterpartiesApiSearchDaDataQueryParams,
  CounterpartiesApiSearchQueryParams
} from "~/plugins/api/counterparties/counterparties.type"
import { QuestionsApiPayload } from "~/plugins/api/questions/questions.type"

export class CounterpartiesApi extends Api {

  // eslint-disable-next-line no-useless-constructor
  constructor(axios: NuxtAxiosInstance) {
    super( axios )
  }

  public readonly route = "/employer/counterparties"

  public readonly endpoints = {
    create: {
      route: () => this.route,
      statuses: [201]
    },
    read: {
      route: () => this.route,
      statuses: [200]
    },
    update: {
      route: ( id: number ) => `${this.route}/${id}`,
      statuses: [204]
    },
    delete: {
      route: () => this.route,
      statuses: [200]
    },
    readOne: {
      route: (id: number) => `${this.route}/${id}`,
      statuses: [200]
    },
    search: {
      route: () => `${this.route}/search`,
      statuses: [200]
    },
    restore: {
      route: ( counterparty_id: number ) => `${this.route}/${counterparty_id}/restore`,
      statuses: [200]
    },
    searchDaData: {
      route: () => `${this.route}/search_dadata`,
      statuses: [200]
    }
  }

  create ( payload: CounterpartiesApiPayload ) {
    const { route, statuses } = this.endpoints.create
    return this.executePost({
      url: { route: route() },
      validate: { statuses },
      data: { payload }
    })
  }

  read ( query?: CounterpartiesApiQueryParams ) {
    const { route, statuses } = this.endpoints.read
    return this.executeGet({
      url: { route: route(), query },
      validate: { statuses }
    })
  }

  update ( id: number, payload: QuestionsApiPayload ) {
    const { route, statuses } = this.endpoints.update
    return this.executePut({
      url: { route: route( id ) },
      validate: { statuses },
      data: { payload }
    })
  }

  delete ( ids: number[] ): Promise<ApiResponse<number[]>>  {
    const { route, statuses } = this.endpoints.delete
    return this.executeDelete({
      url: { route: route() },
      validate: { statuses },
      data: {
        payload: { ids }
      }
    })
  }

  readOne ( id: number ) {
    const { route, statuses } = this.endpoints.readOne
    return this.executeGet({
      url: { route: route( id ) },
      validate: { statuses }
    })
  }

  restore ( counterparty_id: number ) {
    const { route, statuses } = this.endpoints.restore
    return this.executeGet({
      url: { route: route( counterparty_id ) },
      validate: { statuses }
    })
  }

  search ( query?: CounterpartiesApiSearchQueryParams ) {
    const { route, statuses } = this.endpoints.search
    return this.executeGet({
      url: { route: route(), query },
      validate: { statuses }
    })
  }

  searchDaData ( query?: CounterpartiesApiSearchDaDataQueryParams ) {
    const { route, statuses } = this.endpoints.searchDaData
    return this.executeGet({
      url: { route: route(), query },
      validate: { statuses }
    })
  }


}

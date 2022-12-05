// eslint-disable-next-line import/named
import { NuxtAxiosInstance } from "@nuxtjs/axios"
import { Api, ApiResponse } from "~/utils/api"
import {
  CounterpartiesApiPayload,
  CounterpartiesApiQueryParams
} from "~/plugins/api/counterparties/counterparties.type"
import { QuestionsApiPayload } from "~/plugins/api/questions/questions.type"

export class SettlementAccountsApi extends Api {

  // eslint-disable-next-line no-useless-constructor
  constructor(axios: NuxtAxiosInstance) {
    super( axios )
  }

  public readonly route = "/employer/settlementAccounts"

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

}

// eslint-disable-next-line import/named
import { NuxtAxiosInstance } from "@nuxtjs/axios"
import { Api } from "~/utils/api"
import {
  PositionsApiPayload,
  PositionsApiQueryParams,
  PositionsApiSearchQueryParams
} from "~/plugins/api/positions/positions.type"

export class PositionsApi extends Api {

  // eslint-disable-next-line no-useless-constructor
  constructor(axios: NuxtAxiosInstance) {
    super( axios )
  }

  public readonly route = "/employer/positions"

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
      route: (id: number) => `${this.route}/${id}`,
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
    }
  }

  create ( payload: PositionsApiPayload ) {
    const { route, statuses } = this.endpoints.create
    return this.executePost({
      url: { route: route() },
      validate: { statuses },
      data: { payload }
    })
  }

  read ( query?: PositionsApiQueryParams ) {
    const { route, statuses } = this.endpoints.read
    return this.executeGet({
      url: { route: route(), query },
      validate: { statuses }
    })
  }

  update ( id: number, payload: PositionsApiPayload ) {
    const { route, statuses } = this.endpoints.update
    return this.executePut({
      url: { route: route( id ) },
      validate: { statuses },
      data: { payload }
    })
  }

  delete ( ids: number[] ) {
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

  search ( query?: PositionsApiSearchQueryParams ) {
    const { route, statuses } = this.endpoints.search
    return this.executeGet({
      url: { route: route(), query },
      validate: { statuses }
    })
  }

}

// eslint-disable-next-line import/named
import { NuxtAxiosInstance } from "@nuxtjs/axios"
import { Api } from "~/utils/api"
import {
  ExamsApiCreatePayload,
  ExamsApiUpdatePayload
} from "~/plugins/api/exams/exams.type"

export class ExamsApi extends Api {

  // eslint-disable-next-line no-useless-constructor
  constructor(axios: NuxtAxiosInstance) {
    super( axios )
  }

  public readonly route = "/employer/exams"
  public readonly endpoints = {
    create: {
      route: () => this.route,
      statuses: [201]
    },
    update: {
      route: (id: number) => `${this.route}/${id}`,
      statuses: [204]
    },
    delete: {
      route: ( id: number ) => `${this.route}/${id}`,
      statuses: [204]
    },
  }

  create ( payload: ExamsApiCreatePayload ) {
    const { route, statuses } = this.endpoints.create
    return this.executePost({
      url: { route: route() },
      validate: { statuses },
      data: { payload }
    })
  }

  update ( id: number, payload: ExamsApiUpdatePayload ) {
    const { route, statuses } = this.endpoints.update
    return this.executePut({
      url: { route: route( id ) },
      validate: { statuses },
      data: { payload }
    })
  }

  delete ( id: number ) {
    const { route, statuses } = this.endpoints.delete
    return this.executeDelete({
      url: { route: route( id ) },
      validate: { statuses }
    })
  }

}

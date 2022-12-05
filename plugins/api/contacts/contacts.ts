// eslint-disable-next-line import/named
import { NuxtAxiosInstance } from "@nuxtjs/axios"
import { Api, ApiResponse } from "~/utils/api"
import {
  ContactsApiPayload
} from "~/plugins/api/contacts/contacts.type"

export class ContactsApi extends Api {

  // eslint-disable-next-line no-useless-constructor
  constructor(axios: NuxtAxiosInstance) {
    super( axios )
  }

  public readonly route = "/employer/contacts"
  public readonly endpoints = {
    create: {
      route: () => this.route,
      statuses: [200]
    },
    read: {
      route: () => this.route,
      statuses: [200]
    },
    update: {
      route: ( id: number ) => `${this.route}/${id}`,
      statuses: [200]
    },
    delete: {
      route: ( id: number ) => `${this.route}/${id}`,
      statuses: [200]
    },
    readOne: {
      route: ( id: number ) => `${this.route}/${id}`,
      statuses: [200]
    }
  }

  create ( payload: ContactsApiPayload ) {
    const { route, statuses } = this.endpoints.create
    return this.executePost({
      url: { route: route() },
      validate: { statuses },
      data: { payload }
    })
  }

  read () {
    const { route, statuses } = this.endpoints.read
    return this.executeGet({
      url: { route: route() },
      validate: { statuses }
    })
  }


  update ( id: number, payload: ContactsApiPayload ) {
    const { route, statuses } = this.endpoints.update
    return this.executePut({
      url: { route: route( id ) },
      validate: { statuses },
      data: { payload }
    })
  }

  delete ( id: number ): Promise<ApiResponse<number[]>>  {
    const { route, statuses } = this.endpoints.delete
    return this.executeDelete({
      url: { route: route( id ) },
      validate: { statuses },
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

// eslint-disable-next-line import/named
import { NuxtAxiosInstance } from "@nuxtjs/axios"
import { Api, ApiResponse } from "~/utils/api"
import {
  EducationDocNamesApiPayload,
  EducationDocNamesApiQueryParams
} from "~/plugins/api/education-doc-names/education-doc-names.type"

export class EducationDocNamesApi extends Api {

  // eslint-disable-next-line no-useless-constructor
  constructor(axios: NuxtAxiosInstance) {
    super( axios )
  }

  public readonly route = "/employer/education_doc_names"

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
  }

  create ( payload: EducationDocNamesApiPayload ) {
    const { route, statuses } = this.endpoints.create
    return this.executePost({
      url: { route: route() },
      validate: { statuses },
      data: { payload }
    })
  }

  read ( query?: EducationDocNamesApiQueryParams ): Promise<ApiResponse<any>> {
    const { route, statuses } = this.endpoints.read
    return this.executeGet({
      url: { route: route(), query },
      validate: { statuses }
    })
  }


  update ( id: number, payload: EducationDocNamesApiPayload ) {
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

}

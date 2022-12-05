// eslint-disable-next-line import/named
import { NuxtAxiosInstance } from "@nuxtjs/axios"
import { Api, ApiResponse } from "~/utils/api"
import {
  QuestionBlocksApiPayload
} from "~/plugins/api/question-blocks/question-blocks.type"

export class QuestionBlocksApi extends Api {

  // eslint-disable-next-line no-useless-constructor
  constructor(axios: NuxtAxiosInstance) {
    super( axios )
  }

  public readonly route = "/employer/question_blocks"

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
    readOne: {
      route: (id: number) => `${this.route}/${id}`,
      statuses: [200]
    },
  }

  create ( payload: QuestionBlocksApiPayload ): Promise<ApiResponse<QuestionBlocksApiPayload>> {
    const { route, statuses } = this.endpoints.create
    return this.executePost({
      url: { route: route() },
      validate: { statuses },
      data: { payload }
    })
  }

  update ( id: number, payload: QuestionBlocksApiPayload ): Promise<ApiResponse<null>> {
    const { route, statuses } = this.endpoints.update
    return this.executePut({
      url: { route: route( id ) },
      validate: { statuses },
      data: { payload }
    })
  }

  remove ( id: number ): Promise<ApiResponse<null>> {
    const { route, statuses } = this.endpoints.delete
    return this.executeDelete({
      url: { route: route( id ) },
      validate: { statuses }
    })
  }

  findOne ( id: number ): Promise<ApiResponse<QuestionBlocksApiPayload>> {
    const { route, statuses } = this.endpoints.readOne
    return this.executeGet({
      url: { route: route( id ) },
      validate: { statuses }
    })
  }

}

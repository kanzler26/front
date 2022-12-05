// eslint-disable-next-line import/named
import { NuxtAxiosInstance } from "@nuxtjs/axios"
import { Api, ApiResponse } from "~/utils/api"
import {
  AnswersApiPayload
} from "~/plugins/api/answers/answers.type"


export class AnswersApi extends Api {

  // eslint-disable-next-line no-useless-constructor
  constructor(axios: NuxtAxiosInstance) {
    super( axios )
  }

  public readonly route = "/employer/answers"

  public readonly endpoints = {
    create: {
      route: () => this.route,
      statuses: [201]
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
      route: ( id: number ) => `${this.route}/${id}`,
      statuses: [200]
    },
    setOrder: {
      route: () => `${this.route}/order`,
      statuses: [204]
    },
    setCorrect: {
      route: () => `${this.route}/correct`,
      statuses: [204]
    }
  }

  create ( payload: AnswersApiPayload ) {
    const { route, statuses } = this.endpoints.create
    return this.executePost({
      url: { route: route() },
      validate: { statuses },
      data: { payload }
    })
  }

  update ( id: number, payload: AnswersApiPayload ) {
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

  setOrder ( question_id: number, answer_ids: number[] ): Promise<ApiResponse<any>> {
    const { route, statuses } = this.endpoints.setOrder
    return this.executePost({
      url: { route: route() },
      validate: { statuses },
      data: {
        payload: { question_id, ids: answer_ids }
      }
    })
  }

  setCorrect ( question_id: number, answer_ids: number[] ): Promise<ApiResponse<any>> {
    const { route, statuses } = this.endpoints.setCorrect
    return this.executePost({
      url: { route: route() },
      validate: { statuses },
      data: {
        payload: { question_id, ids: answer_ids }
      }
    })
  }

}

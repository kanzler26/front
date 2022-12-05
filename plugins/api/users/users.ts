// eslint-disable-next-line import/named
import { NuxtAxiosInstance } from "@nuxtjs/axios"
import { Api, ApiResponse } from "~/utils/api"
import {
  StudentApiUpdateEducationPayload,
  StudentApiUpdateFieldPayload,
  UsersApiPayload,
  UsersApiQueryParams
} from "~/plugins/api/users/users.type"
import { QuestionsApiPayload } from "~/plugins/api/questions/questions.type"

export class UsersApi extends Api {

  // eslint-disable-next-line no-useless-constructor
  constructor(axios: NuxtAxiosInstance) {
    super( axios )
  }

  public readonly route = "/employer/users"

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
    readEmployers: {
      route: () => `${this.route}/employers`,
      statuses: [200]
    },
    updateStudentEducation: {
      route: ( id: number ) => `${this.route}/${id}/education`,
      statuses: [ 200 ]
    },
    updateStudentFields: {
      route: ( id: number ) => `${this.route}/${id}/fields`,
      statuses: [ 200 ]
    }
  }

  create ( payload: UsersApiPayload ) {
    const { route, statuses } = this.endpoints.create
    return this.executePost({
      url: { route: route() },
      validate: { statuses },
      data: { payload }
    })
  }

  read ( query?: UsersApiQueryParams ) {
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

  readEmployers () {
    const { route, statuses } = this.endpoints.readEmployers
    return this.executeGet({
      url: { route: route() },
      validate: { statuses }
    })
  }

  current () {
    return this.executeGet({
      url: { route: '/user' }
    })
  }

  // setPermissions

  updateStudentEducation ( user_id: number, payload: StudentApiUpdateEducationPayload ) {
    const { route, statuses } = this.endpoints.updateStudentEducation
    return this.executePut({
      url: { route: route( user_id ) },
      validate: { statuses },
      data: { payload }
    })
  }

  updateStudentFields ( user_id: number, payload: StudentApiUpdateFieldPayload[] ) {
    const { route, statuses } = this.endpoints.updateStudentFields
    return this.executePut({
      url: { route: route( user_id ) },
      validate: { statuses },
      data: { payload }
    })
  }

}

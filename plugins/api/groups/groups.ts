// eslint-disable-next-line import/named
import { NuxtAxiosInstance } from "@nuxtjs/axios"
import { Api, ApiResponse } from "~/utils/api"
import {
  AttachUserToGroupCoursesApiPayload,
  BindUsersToCourseApiPayload,
  GroupsApiPayload,
  GroupsApiQueryParams
} from "~/plugins/api/groups/groups.type"


export class GroupsApi extends Api {

  // eslint-disable-next-line no-useless-constructor
  constructor(axios: NuxtAxiosInstance) {
    super( axios )
  }

  public readonly route = "/employer/groups"

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
    courses: {
      route: () => `${this.route}/courses`,
      statuses: [200]
    },
    readOne: {
      route: (id: number) => `${this.route}/${id}`,
      statuses: [200]
    },
    attachUserToGroupCourses: {
      route: ( user_id: number ) => `${this.route}/courses/users/${user_id}`,
      statuses: [200]
    },
    detachUsers: {
      route: ( group_id: number, user_id: number ) => `${this.route}/${group_id}/users/${user_id}`,
      statuses: [200]
    },
    detachCourse: {
      route: ( group_id: number, course_id: number ) => `${this.route}/${group_id}/courses/${course_id}`,
      statuses: [200]
    },
    bindUsersToCourse: {
      route: ( group_id: number ) => `${this.route}/${group_id}/users`,
      statuses: [200]
    },
  }

  create ( payload: GroupsApiPayload ) {
    const { route, statuses } = this.endpoints.create
    return this.executePost({
      url: { route: route() },
      validate: { statuses },
      data: { payload }
    })
  }

  read ( query?: GroupsApiQueryParams ) {
    const { route, statuses } = this.endpoints.read
    return this.executeGet({
      url: { route: route(), query },
      validate: { statuses }
    })
  }

  update ( id: number, payload: GroupsApiPayload ) {
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

  courses ( group_ids: number[] ) {
    const { route, statuses } = this.endpoints.courses
    return this.executeGet({
      url: {
        route: route(),
        query: {
          groups: group_ids.join( `,` )
        }
      },
      validate: { statuses }
    })
  }

  attachUserToGroupCourses ( user_id: number, payload: AttachUserToGroupCoursesApiPayload[] ) {
    const { route, statuses } = this.endpoints.attachUserToGroupCourses
    return this.executePost({
      url: { route: route( user_id ) },
      validate: { statuses },
      data: { payload }
    })
  }

  detachUsers ( group_id: number, user_id: number ) {
    const { route, statuses } = this.endpoints.detachUsers
    return this.executeDelete({
      url: { route: route( group_id, user_id ) },
      validate: { statuses }
    })
  }

  detachCourse ( group_id: number, course_id: number ) {
    const { route, statuses } = this.endpoints.detachCourse
    return this.executeDelete({
      url: { route: route( group_id, course_id ) },
      validate: { statuses }
    })
  }

  bindUsersToCourse ( group_id: number, payload: BindUsersToCourseApiPayload[] ) {
    const { route, statuses } = this.endpoints.bindUsersToCourse
    return this.executePost({
      url: { route: route( group_id ) },
      validate: { statuses },
      data: { payload }
    })
  }

}

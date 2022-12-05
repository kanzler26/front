/*

import {IDefault} from "~/default.types";
import {ICourse} from "~/plugins/api/courses/courses.types";

*/
export type GroupType = "заочная" | "очная"


export interface GroupsApiPayload {
  id?: number
  type: GroupType,
  name: string,
  start: Date,
  end: Date,
  exam_start: Date,
  exam_end: Date,
  access_to: Date,
  // users_count: number,
  // courses: Array<ICourse>
}

export interface GroupsApiQueryParams {
  [ key: string ]: any
}

export interface GroupCoursesApiQueryParams {

}


export interface AttachUserToGroupCoursesApiPayload {
  group_id: number
  courses: number[]
}

export interface BindUsersToCourseApiPayload {
  course_id: number
  users: number[]
}

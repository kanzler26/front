/*
export type ISex = "female" | "man"
export type IListenerFieldType = "data" | "string"

export type IUserRoleType = string | "student" | "manager"
export interface IUserRole extends IDefault {
  name: IUserRoleType
}
export interface IUserPermission extends IDefault {
  name: string
}

export interface IFile extends IDefault  {
  collection: "photo"
  created_at: string
  md5_optimized?: string
  md5_original: string,
  mime_type: string,
  name: string,
  order?: any,
  size: number,
  size_optimized?: number,
  url: string
}

export interface IDefaultUser extends IDefault {
  email: string
  login: string
  name: string
  sex: ISex
}

export interface IStudent {
  passport_series: string | null,
  passport_number: string,
  passport_place_issue: string | null,
  passport_date_issue: string | null,
  snils: string,
  birthplace: string,
  birthdate: string,
  personal_data_agreement: boolean,
  counterparty: any,
  position_rank: any
}

export interface IDocName extends IDefault {
  name: string
}
export interface IEducationName extends IDefault {
  name: string
}

export interface IEducation {
  date_issue: Date | null,
  doc_name: IDocName
  name: IEducationName,
  number: number | null,
  place_issue: string | null,
  series: number | null,
  user_name:string | null
}

export interface IPosition extends IDefault {
  code: number,
  name: string,
  type: string,
  check_number: number,
  okz: number,
  category?: any,
  etks: string,
  range_ranks: string
}

export interface IListenerField extends IDefault {
  name: string,
  type: IListenerFieldType,
  value: string
}

export interface IFullInfoListener extends IDefaultUser {
  education: IEducation,
  student: IStudent,
  fields: Array<IListenerField> | [],
  files: Array<IFile> | [],
  groups: Array<IGroup> | [],
  permissions: Array<IUserPermission> | []
  position: IPosition | null
  roles: Array<IUserRole>
}


export interface IRole extends IDefault {
  name: string
}
*/

export type UserRole = string | "student" | "manager"

export type UserSex = "male" | "female"

export interface UsersApiQueryParams {
  role?: UserRole
  page?: number
  perPage?: number
}

export interface StudentApiUpdateEducationPayload {
  education_name_id: number
  education_doc_name_id: number
  series: string
  number: number
  place_issue: string
  date_issue: string
  user_name: string
}

export interface StudentApiUpdateFieldPayload {
  id: number
  value: string
}

export interface UsersApiPayload {
  name: string
  sex: UserSex
  email?: string
  position_id: number
  role: UserRole
}

export interface StudentsApiPayload extends UsersApiPayload {
  student?: {
    counterparty_id?: number
    position_rank_id?: number
    personal_data_agreement?: boolean
    passport_series?: string
    passport_number?: string
    passport_place_issue?: string
    passport_date_issue?: string
    snils?: string
    birthplace?: string
    birthdate?: string
  }
}

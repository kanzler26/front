
type StudentFieldType = "date" | "string"

export interface StudentFieldsApiQueryParams {
  type?: StudentFieldType
}

export interface StudentFieldsApiPayload {
  id?: number
  name?: string
  type: StudentFieldType
}

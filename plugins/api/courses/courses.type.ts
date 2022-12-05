
export interface CourseAncestor {
  name: string,
  is_course: boolean
}

export interface CoursesApiQueryParams {
  tree?: number
}

export interface CoursesApiPayload {
  id?: number
  name?: string
  parent_id?: number
  is_course: boolean
  code?: string
  hours?: number
  price?: number
  recertification?: number
  training_mode?: "easy" | "medium" | "hard"
  ancestors?: CourseAncestor[]
}

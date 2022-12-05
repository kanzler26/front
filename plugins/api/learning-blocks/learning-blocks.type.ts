import { FilesApiPayload } from "~/types/api/files"

export interface LearningBlocksApiPayload {
  id?: number
  course_id?: number
  name: string
  description?: string
  order?: number
  files?: FilesApiPayload[]
}

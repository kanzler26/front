import { QuestionsApiPayload } from "~/plugins/api/questions/questions.type"

export interface QuestionBlocksApiPayload {
  id?: number
  course_id?: number
  name?: string
  description?: string
  order?: number
  questions?: QuestionsApiPayload[]
}

import { AnswersApiPayload } from "~/plugins/api/answers/answers.type"

export type QuestionType = "one" | "multiple" | "true_false" | "sequence" | "conformity" // "list" | "words"

export interface QuestionsApiPayload {
  id?: number
  text: string
  comment?: string
  correct?: 0 | 1
  question_block_id?: number
  type?: QuestionType
  answers?: AnswersApiPayload[]
}

export interface QuestionsApiQueryParams {

}

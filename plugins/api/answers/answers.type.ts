
export interface AnswersApiPayload {
  id?: number
  question_id?: number
  text?: string
  _l?: string
  _r?: string
  correct?: boolean | 0 | 1
  order?: number
}


export type ExamType = "test" | "ticket"

interface ExamsApiPayload {
  // course_id
  name?: string
  mode?: ExamType
  learning_block_id?: number
  test_to_ticket?: boolean
  questions_per_exam?: number
  minutes?: number
  min_percent?: number
  attempts_per_day?: number
  max_attempts?: number
  question_blocks?: number[]
}

export interface ExamsApiCreatePayload extends ExamsApiPayload {
  course_id: number
  name: string
  mode: ExamType
}

export interface ExamsApiUpdatePayload extends ExamsApiPayload {}



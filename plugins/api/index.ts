/* eslint-disable @typescript-eslint/no-unused-vars */

import { UsersApi } from "~/plugins/api/users/users"
import { CoursesApi } from "~/plugins/api/courses/courses"
import { PositionsApi } from "~/plugins/api/positions/positions"
import { EducationNamesApi } from "~/plugins/api/education-names/education-names"
import { EducationDocNamesApi } from "~/plugins/api/education-doc-names/education-doc-names"
import { StudentFieldsApi } from "~/plugins/api/student-fields/student-fields"
import { CounterpartiesApi } from "~/plugins/api/counterparties/counterparties"
import { PositionRanksApi } from "~/plugins/api/position-ranks/position-ranks"
import { QuestionBlocksApi } from "~/plugins/api/question-blocks/question-blocks"
import { QuestionsApi } from "~/plugins/api/questions/questions"
import { AnswersApi } from "~/plugins/api/answers/answers"

declare module "vue/types/vue" {
  interface Vue {
    $api: {
      users: UsersApi,
      courses: CoursesApi,
      educationNames: EducationNamesApi,
      educationDocNames: EducationDocNamesApi,
      positions: PositionsApi,
      studentFields: StudentFieldsApi,
      counterparties: CounterpartiesApi,
      positionRanks: PositionRanksApi,
      questionBlocks: QuestionBlocksApi,
      questions: QuestionsApi,
      answers: AnswersApi,
    }
  }
}


// todo: minify api methods

export default ({ $axios }: any, inject: any) => {

  const api = {

    // ~~~

    users: new UsersApi($axios),
    courses: new CoursesApi($axios),
    educationNames: new EducationNamesApi($axios),
    educationDocNames: new EducationDocNamesApi($axios),
    positions: new PositionsApi($axios),
    studentFields: new StudentFieldsApi($axios),
    counterparties: new CounterpartiesApi($axios),
    positionRanks: new PositionRanksApi($axios),
    questionBlocks: new QuestionBlocksApi($axios),
    questions: new QuestionsApi($axios),
    answers: new AnswersApi($axios),

    // ~~~

    collections: () => $axios.get(`/admin/file_collections`),

  }


  inject("api", api)

}
/* eslint-disable @typescript-eslint/no-unused-vars */

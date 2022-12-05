import {
  GetterTree,
  ActionTree,
  MutationTree
} from 'vuex'
import { QuestionsApiPayload } from "~/plugins/api/questions/questions.type"

import { clone } from "~/utils/object"

interface QuestionsState {
  questions: QuestionsApiPayload[]
}

export const state = (): QuestionsState => ({
  questions: [],
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  questions: ( state ): QuestionsApiPayload[] => state.questions
}

export const mutations: MutationTree<RootState> = {
  SET_QUESTIONS: ( state, questions: QuestionsApiPayload[] ): void => {
    state.questions = [ ...questions ]
  },
  CLEAR_QUESTIONS: ( state ): void => {
    state.questions = []
  },
  ADD_QUESTION: ( state, question: QuestionsApiPayload ): void => {
    state.questions = [ question, ...state.questions ]
  },
  REMOVE_QUESTION: ( state, question_id: number ): void => {
    state.questions = [ ...state.questions.filter( ({ id }) => id !== question_id ) ]
  },
  UPDATE_QUESTION: ( state, question: QuestionsApiPayload ): void => {
    state.questions = [
      ...state.questions.map( ( item: QuestionsApiPayload ) => item?.id === question?.id ? question : item )
    ]
  },
}

export const actions: ActionTree<RootState, RootState> = {
  set_questions ( { commit }, questions: QuestionsApiPayload[] ): void {
    commit( 'SET_QUESTIONS', clone( questions ) )
  },
  clear_questions ( { commit } ): void {
    commit( 'CLEAR_QUESTIONS' )
  },
  add_question ( { commit }, question: QuestionsApiPayload ): void {
    if ( question?.id ) {
      commit( 'ADD_QUESTION', clone( question ) )
    }
  },
  remove_questions ( { commit }, ids: number[] ): void {
    if ( ids?.length ) {
      ids.forEach( id => commit( 'REMOVE_QUESTION', id ) )
    }
  },
  update_question ( { commit }, question: QuestionsApiPayload ): void {
    if ( question?.id ) {
      commit( 'UPDATE_QUESTION', clone( question ) )
    }
  }
}

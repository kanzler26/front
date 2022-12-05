import { getterTree, mutationTree, actionTree } from 'typed-vuex'

export const state = () => ({
  email: '',
  password: ''
})

export const getters = getterTree(state, {
  email: state => state.email,
  password: state => state.password
})

export const mutations = mutationTree(state, {
  SET_EMAIL: (state, value: string): void => {
    state.email = value
  },
  SET_PASSWORD: (state, value: string): void => {
    state.password = value
  }
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    SET_EMAIL ({ commit }, value: string): void {
      commit('SET_EMAIL', value)
    },
    SET_PASSWORD ({ commit }, value: string): void {
      commit('SET_PASSWORD', value)
    }
  }
)


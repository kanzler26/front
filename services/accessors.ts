import { getAccessorType } from 'typed-vuex'
import * as test from '@/store/test'

const initialStore = () => ({
  modules: {
    test
  }
})

export const accessorType = getAccessorType(initialStore())

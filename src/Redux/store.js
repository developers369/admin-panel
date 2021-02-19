import {createStore} from 'redux'
import {adminReducer} from './adminReducer'

const store = createStore(adminReducer)

export default store
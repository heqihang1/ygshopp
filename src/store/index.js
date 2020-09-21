// 1. 引入创建仓库的方法
import {createStore} from 'redux'
//2.引入 reducer
import reducer from './reducers'
//3. 导出整个仓库
export default createStore(reducer)
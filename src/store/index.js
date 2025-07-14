import { createStore} from 'vuex'

const store = createStore({
    state(){
        return {
            isCollapsed:false,
            count:0,
            user:null
        }
    }
})

export default store 
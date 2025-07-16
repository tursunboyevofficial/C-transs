import { createStore} from 'vuex'

const store = createStore({
    state(){
        return {
            isCollapsed:true,
            count:0,
            user:null
        }
    }
})

export default store 
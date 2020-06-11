import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
    listInfo:[]
}

const mutations = {
    saveListInfo(state, params){
        state.listInfo = params
    }
}

const actions = {
    getListInfo(context,params){
        console.log('axios',axios);
        axios.get('/data/List.json').then((result)=>{
            console.log('result:',result)
            let data = result.data.result
            context.commit('saveListInfo', data)
        })
    }
}

const store = new Vuex.Store({
    state,
    mutations,
    actions
})

export default store;



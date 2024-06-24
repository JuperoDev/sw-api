import { defineStore } from "pinia";

export const useCounterStore = defineStore({
id: 'counter',

state: () =>({

contador: 0

}),

getters:{
dobleContar: (state) => state.contador*2
},


actions:{
incrementar(){
    this.contador++
},

decrementar(){
    this.contador--
}
}

})
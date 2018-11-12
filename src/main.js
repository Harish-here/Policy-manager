// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

Vue.use(Vuex)

Vue.config.productionTip = false


const store = new Vuex.Store({
  state: {
    alt : false,
    label:"something happened",
    class:''
  },
  mutations: {
    showAlert(state,str){
      var data = str.split('|');
      // state.label = data[1];
      // (data[0] === 's') ? state.class = 'bg-green' : (data[0] === 'd') ? state.class = 'bg-red' : state.class = 'bg-orange' ;
      // state.alt = true;
      // setTimeout(function(){
      //   state.alt = false;
      //   state.label = "";
      //   state.class='bg-green';
      // },2000);
      switch(data[0]){
        case 's': alertify.success(data[1]);break;
        case 'd': alertify.error(data[1]);break;
        default : alert(data[1]);break;

      }
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

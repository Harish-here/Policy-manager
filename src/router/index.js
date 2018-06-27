import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '@/components/NotFound'
import Edit from '@/components/Edit'

Vue.use(Router)

export default new Router({
  mode : 'history',
  routes: [
    { path: '/:foo(.*?)/',
      name:'Edit', 
      component: Edit 
    },
      { path: '*',
      name:'NotFound', 
      component: NotFound 
    }
  ]
})

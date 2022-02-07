import Vue from 'vue'
import VueRouter from 'vue-router'
import Front from '../views/Front.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Front',
    component: Front,
    meta: {
      title: 'goodjob外包網'
    },
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
        meta: {
          login: true,
          admin: true,
          title: 'goodjob | 首頁'
        }
      },
      {
        path: 'portfoliosList',
        name: 'PortfoliosList',
        component: () => import(/* webpackChunkName: "userlogin" */ '../views/PortfoliosList.vue'),
        meta: {
          login: true,
          admin: true,
          title: 'goodjob | 找專業'
        }
      },
      {
        path: 'caseList',
        name: 'CaseList',
        component: () => import(/* webpackChunkName: "ownerlogin" */ '../views/CaseList.vue'),
        meta: {
          login: true,
          admin: true,
          title: 'goodjob | 找案件'
        }
      },
      {
        path: 'news',
        name: 'News',
        component: () => import(/* webpackChunkName: "news" */ '../views/News.vue'),
        meta: {
          login: true,
          admin: true,
          title: 'goodjob | 知識庫'
        }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import(/* webpackChunkName: "user" */ '../views/User.vue'),
        meta: {
          login: true,
          admin: true,
          title: 'goodjob | 會員專區'
        },
        children: [
          {
            path: 'userfile',
            name: 'Userfile',
            component: () => import(/* webpackChunkName: "userfile" */ '../views/Userfile.vue'),
            meta: {
              login: true,
              admin: true,
              title: 'goodjob | 我的作品'
            }
          }
        ]
      }
    ]
  }
  // {
  //   path: '/register',
  //   name: 'Register',
  //   component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
  //   meta: {
  //     title: '註冊 | goodjob'
  //   }
  // }
]

const router = new VueRouter({
  routes
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router

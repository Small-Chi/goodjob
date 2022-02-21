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
          title: 'goodjob | 首頁'
        }
      },
      {
        path: 'portfoliosList',
        name: 'PortfoliosList',
        component: () => import(/* webpackChunkName: "userlogin" */ '../views/PortfoliosList.vue'),
        meta: {
          login: true,
          title: 'goodjob | 找專業'
        }
      },
      {
        path: 'caseList',
        name: 'CaseList',
        component: () => import(/* webpackChunkName: "ownerlogin" */ '../views/CaseList.vue'),
        meta: {
          login: true,
          title: 'goodjob | 找案件'
        }
      },
      {
        path: 'news',
        name: 'News',
        component: () => import(/* webpackChunkName: "news" */ '../views/News.vue'),
        meta: {
          login: true,
          title: 'goodjob | 知識庫'
        }
      },
      {
        path: 'user/:id',
        name: 'User',
        component: () => import(/* webpackChunkName: "user" */ '../views/User.vue'),
        meta: {
          login: true,
          title: 'goodjob | 會員專區'
        },
        children: [
          {
            path: 'userself',
            name: 'Userself',
            component: () => import(/* webpackChunkName: "userself" */ '../views/Userself.vue'),
            meta: {
              login: true,
              title: 'goodjob | 會員資料'
            }
          },
          {
            path: 'portfolios',
            name: 'Portfolios',
            component: () => import(/* webpackChunkName: "portfolios" */ '../views/Portfolios.vue'),
            meta: {
              login: true,
              title: 'goodjob | 我的作品'
            }
          },
          {
            path: 'portfolioPage/:pid',
            name: 'PortfolioPage',
            component: () => import(/* webpackChunkName: "portfolioPage" */ '../views/PortfolioPage.vue'),
            meta: {
              login: true,
              title: 'goodjob | 指定作品'
            }
          },
          {
            path: 'userfavorite',
            name: 'Userfavorite',
            component: () => import(/* webpackChunkName: "userfavorite" */ '../views/Userfavorite.vue'),
            meta: {
              login: true,
              title: 'goodjob | 收藏案件'
            }
          },
          {
            path: 'userworking',
            name: 'UserWorking',
            component: () => import(/* webpackChunkName: "userworking" */ '../views/UserWorking.vue'),
            meta: {
              login: true,
              title: 'goodjob | 案件進行中'
            }
          },
          {
            path: 'userchats',
            name: 'UserChats',
            component: () => import(/* webpackChunkName: "userchats" */ '../views/UserChats.vue'),
            meta: {
              login: true,
              title: 'goodjob | 訊息'
            }
          }
        ]
      },
      {
        path: 'owner/:id',
        name: 'Owner',
        component: () => import(/* webpackChunkName: "owner" */ '../views/Owner.vue'),
        meta: {
          login: true,
          title: 'goodjob | 會員專區'
        },
        children: [
          {
            path: 'ownerself',
            name: 'Ownerself',
            component: () => import(/* webpackChunkName: "ownerself" */ '../views/Ownerself.vue'),
            meta: {
              login: true,
              title: 'goodjob | 會員資料'
            }
          },
          {
            path: 'cases',
            name: 'Cases',
            component: () => import(/* webpackChunkName: "cases" */ '../views/Cases.vue'),
            meta: {
              login: true,
              title: 'goodjob | 我的案件'
            }
          },
          {
            path: 'casePage/:cid',
            name: 'CasePage',
            component: () => import(/* webpackChunkName: "casePage" */ '../views/CasePage.vue'),
            meta: {
              login: true,
              title: 'goodjob | 指定案件'
            }
          },
          {
            path: 'ownerfavorite',
            name: 'Ownerfavorite',
            component: () => import(/* webpackChunkName: "ownerfavorite" */ '../views/Ownerfavorite.vue'),
            meta: {
              login: true,
              title: 'goodjob | 收藏作品'
            }
          },
          {
            path: 'ownerchats',
            name: 'OwnerChats',
            component: () => import(/* webpackChunkName: "ownerchats" */ '../views/OwnerChats.vue'),
            meta: {
              login: true,
              title: 'goodjob | 訊息'
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

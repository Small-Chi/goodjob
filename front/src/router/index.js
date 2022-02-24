import Vue from 'vue'
import VueRouter from 'vue-router'
import Front from '../views/Front.vue'
// import store from '../store/'

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
        component: () => import(/* webpackChunkName: "PortfoliosList" */ '../views/PortfoliosList.vue'),
        meta: {
          login: true,
          title: 'goodjob | 找專業'
        }
      },
      {
        path: 'caseList',
        name: 'CaseList',
        component: () => import(/* webpackChunkName: "CaseList" */ '../views/CaseList.vue'),
        meta: {
          login: true,
          title: 'goodjob | 找案件'
        }
      },
      {
        path: 'news',
        name: 'News',
        component: () => import(/* webpackChunkName: "News" */ '../views/News.vue'),
        meta: {
          login: true,
          title: 'goodjob | 知識庫'
        }
      },
      {
        path: 'user/:id',
        name: 'User',
        component: () => import(/* webpackChunkName: "User" */ '../views/User.vue'),
        meta: {
          login: true,
          title: 'goodjob | 會員專區'
        },
        children: [
          {
            path: 'userself',
            name: 'Userself',
            component: () => import(/* webpackChunkName: "Userself" */ '../views/Userself.vue'),
            meta: {
              login: true,
              title: 'goodjob | 會員資料'
            }
          },
          {
            path: 'portfolios',
            name: 'Portfolios',
            component: () => import(/* webpackChunkName: "Portfolios" */ '../views/Portfolios.vue'),
            meta: {
              login: true,
              title: 'goodjob | 我的作品'
            }
          },
          {
            path: 'portfolioPage/:pid',
            name: 'PortfolioPage',
            component: () => import(/* webpackChunkName: "PortfolioPage" */ '../views/PortfolioPage.vue'),
            meta: {
              login: true,
              title: 'goodjob | 指定作品'
            }
          },
          {
            path: 'userfavorite',
            name: 'Userfavorite',
            component: () => import(/* webpackChunkName: "Userfavorite" */ '../views/Userfavorite.vue'),
            meta: {
              login: true,
              title: 'goodjob | 收藏案件'
            }
          },
          {
            path: 'userwantdo',
            name: 'Userwantdo',
            component: () => import(/* webpackChunkName: "Userwantdo" */ '../views/Userwantdo.vue'),
            meta: {
              login: true,
              title: 'goodjob | 進行中的案件'
            }
          },
          {
            path: 'userdeal',
            name: 'Userdeal',
            component: () => import(/* webpackChunkName: "Userdeal" */ '../views/Userdeal.vue'),
            meta: {
              login: true,
              title: 'goodjob | 案件狀態'
            }
          },
          {
            path: 'userchats',
            name: 'UserChats',
            component: () => import(/* webpackChunkName: "UserChats" */ '../views/UserChats.vue'),
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
        component: () => import(/* webpackChunkName: "Owner" */ '../views/Owner.vue'),
        meta: {
          login: true,
          title: 'goodjob | 會員專區'
        },
        children: [
          {
            path: 'ownerself',
            name: 'Ownerself',
            component: () => import(/* webpackChunkName: "Ownerself" */ '../views/Ownerself.vue'),
            meta: {
              login: true,
              title: 'goodjob | 會員資料'
            }
          },
          {
            path: 'cases',
            name: 'Cases',
            component: () => import(/* webpackChunkName: "Cases" */ '../views/Cases.vue'),
            meta: {
              login: true,
              title: 'goodjob | 我的案件'
            }
          },
          {
            path: 'casePage/:cid',
            name: 'CasePage',
            component: () => import(/* webpackChunkName: "CasePage" */ '../views/CasePage.vue'),
            meta: {
              login: true,
              title: 'goodjob | 指定案件'
            }
          },
          {
            path: 'ownerfavorite',
            name: 'Ownerfavorite',
            component: () => import(/* webpackChunkName: "Ownerfavorite" */ '../views/Ownerfavorite.vue'),
            meta: {
              login: true,
              title: 'goodjob | 收藏作品'
            }
          },
          {
            path: 'ownercheck',
            name: 'Ownercheck',
            component: () => import(/* webpackChunkName: "Ownercheck" */ '../views/Ownercheck.vue'),
            meta: {
              login: true,
              title: 'goodjob | 進行中的案件'
            }
          },
          {
            path: 'ownerdeal',
            name: 'Ownerdeal',
            component: () => import(/* webpackChunkName: "Ownerdeal" */ '../views/Ownerdeal.vue'),
            meta: {
              login: true,
              title: 'goodjob | 案件狀態'
            }
          },
          {
            path: 'ownerchats',
            name: 'OwnerChats',
            component: () => import(/* webpackChunkName: "OwnerChats" */ '../views/OwnerChats.vue'),
            meta: {
              login: true,
              title: 'goodjob | 訊息'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "Admin" */ '../views/Admin.vue'),
    meta: {
      login: true,
      admin: true,
      title: 'goodjob外包網 | 管理系統'
    },
    children: [
      {
        path: 'adminUser',
        name: 'AdminUser',
        component: () => import(/* webpackChunkName: "AdminUser" */ '../views/AdminUser.vue'),
        meta: {
          login: true,
          admin: true,
          title: '管理系統 | 會員管理'
        }
      },
      {
        path: 'adminOwner',
        name: 'AdminOwner',
        component: () => import(/* webpackChunkName: "AdminOwner" */ '../views/AdminOwner.vue'),
        meta: {
          login: true,
          admin: true,
          title: '管理系統 | 業主管理'
        }
      },
      {
        path: 'adminWork',
        name: 'AdminWork',
        component: () => import(/* webpackChunkName: "AdminWork" */ '../views/AdminWork.vue'),
        meta: {
          login: true,
          admin: true,
          title: '管理系統 | 網頁維護'
        }
      },
      {
        path: 'adminChats',
        name: 'AdminChats',
        component: () => import(/* webpackChunkName: "AdminChats" */ '../views/AdminChats.vue'),
        meta: {
          login: true,
          admin: true,
          title: '管理系統 | 訊息'
        }
      },
      {
        path: 'adminChatsO',
        name: 'AdminChatsO',
        component: () => import(/* webpackChunkName: "AdminChatsO" */ '../views/AdminChatsO.vue'),
        meta: {
          login: true,
          admin: true,
          title: '管理系統 | 訊息'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// // 路由守衛

// router.beforeEach((to, from, next) => {
//   const user = store.getters['user/user']
//   // 如果要去的那頁需要登入，並且使用者沒有登錄
//   if (to.meta.login && !user.isLogin) {
//     next('/login')
//     // 如果要去的那頁需要管理員身分，並且使用者沒有權限
//   } else if (to.meta.admin && !user.isAdmin) {
//     // 回首頁
//     next('/')
//   } else {
//     next()
//   }
// })

router.afterEach((to, from) => {
  document.title = to.meta.title
  window.scrollTo({ top: 0 })
})

export default router

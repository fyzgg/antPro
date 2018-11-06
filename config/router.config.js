export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
      { component: '404', }
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      { path: '/', redirect: '/base/dashboard/analysis' },
      {
        path: '/base',
        name: 'base',
        Routes: ['src/pages/Authorized'],
        authority: ['admin', 'user'],
        routes: [
          { path: '/base', redirect: '/base/dashboard/analysis' },
          {
            path: '/base/dashboard',
            name: 'dashboard',
            icon: 'dashboard',
            routes: [
              {
                path: '/base/dashboard/analysis',
                name: 'analysis',
                component: './Dashboard/Analysis',
              },
              {
                path: '/base/dashboard/monitor',
                name: 'monitor',
                component: './Dashboard/Monitor',
              },
              {
                path: '/base/dashboard/workplace',
                name: 'workplace',
                component: './Dashboard/Workplace',
              },
              {
                component: '404',
              }
            ],
          },
          // forms
          {
            path: '/base/form',
            icon: 'form',
            name: 'form',
            routes: [
              {
                path: '/base/form/basic-form',
                name: 'basicform',
                component: './Forms/BasicForm',
              },
              {
                path: '/base/form/step-form',
                name: 'stepform',
                component: './Forms/StepForm',
                hideChildrenInMenu: true,
                routes: [
                  {
                    path: '/base/form/step-form',
                    redirect: '/base/form/step-form/info',
                  },
                  {
                    path: '/base/form/step-form/info',
                    name: 'info',
                    component: './Forms/StepForm/Step1',
                  },
                  {
                    path: '/base/form/step-form/confirm',
                    name: 'confirm',
                    component: './Forms/StepForm/Step2',
                  },
                  {
                    path: '/base/form/step-form/result',
                    name: 'result',
                    component: './Forms/StepForm/Step3',
                  },
                  {
                    component: '404',
                  }
                ],
              },
              {
                path: '/base/form/advanced-form',
                name: 'advancedform',
                authority: ['admin'],
                component: './Forms/AdvancedForm',
              },
              {
                component: '404',
              }
            ],
          },
          // list
          {
            path: '/base/list',
            icon: 'table',
            name: 'list',
            routes: [
              {
                path: '/base/list/table-list',
                name: 'searchtable',
                component: './List/TableList',
              },
              {
                path: '/base/list/basic-list',
                name: 'basiclist',
                component: './List/BasicList',
              },
              {
                path: '/base/list/card-list',
                name: 'cardlist',
                component: './List/CardList',
              },
              {
                path: '/base/list/search',
                name: 'searchlist',
                component: './List/List',
                routes: [
                  {
                    path: '/base/list/search',
                    redirect: '/base/list/search/articles',
                  },
                  {
                    path: '/base/list/search/articles',
                    name: 'articles',
                    component: './List/Articles',
                  },
                  {
                    path: '/base/list/search/projects',
                    name: 'projects',
                    component: './List/Projects',
                  },
                  {
                    path: '/base/list/search/applications',
                    name: 'applications',
                    component: './List/Applications',
                  },
                  {
                    component: '404',
                  }
                ],
              },
              {
                component: '404',
              }
            ],
          },
          {
            path: '/base/profile',
            name: 'profile',
            icon: 'profile',
            routes: [
              // profile
              {
                path: '/base/profile/basic',
                name: 'basic',
                component: './Profile/BasicProfile',
              },
              {
                path: '/base/profile/advanced',
                name: 'advanced',
                authority: ['admin'],
                component: './Profile/AdvancedProfile',
              },
              {
                component: '404',
              }
            ],
          },
          
          {
            name: 'account',
            icon: 'user',
            path: '/base/account',
            routes: [
              {
                path: '/base/account/center',
                name: 'center',
                component: './Account/Center/Center',
                routes: [
                  {
                    path: '/base/account/center',
                    redirect: '/base/account/center/articles',
                  },
                  {
                    path: '/base/account/center/articles',
                    component: './Account/Center/Articles',
                  },
                  {
                    path: '/base/account/center/applications',
                    component: './Account/Center/Applications',
                  },
                  {
                    path: '/base/account/center/projects',
                    component: './Account/Center/Projects',
                  },
                ],
              },
              {
                path: '/base/account/settings',
                name: 'settings',
                component: './Account/Settings/Info',
                routes: [
                  {
                    path: '/base/account/settings',
                    redirect: '/base/account/settings/base',
                  },
                  {
                    path: '/base/account/settings/base',
                    component: './Account/Settings/BaseView',
                  },
                  {
                    path: '/base/account/settings/security',
                    component: './Account/Settings/SecurityView',
                  },
                  {
                    path: '/base/account/settings/binding',
                    component: './Account/Settings/BindingView',
                  },
                  {
                    path: '/base/account/settings/notification',
                    component: './Account/Settings/NotificationView',
                  },
                ],
              },
              {
                component: '404',
              }
            ],
          },
          {
            path: '/base/users',
            name: 'users',
            icon: 'team',
            authority: ['admin'],
            routes: [
              {
                path: '/base/users/usersList',
                name: 'usersList',
                component: './Users/UsersList',
              },
              {
                component: '404',
              }
            ],
          },
          {
            component: '404',
          }
        ],
      },
      {
        path: '/other',
        name: 'other',
        routes: [
          // dashboard
          { path: '/other', redirect: '/other/result/success' },
          {
            name: 'result',
            icon: 'check-circle-o',
            path: '/other/result',
            routes: [
              // result
              {
                path: '/other/result/success',
                name: 'success',
                component: './Result/Success',
              },
              { path: '/other/result/fail', name: 'fail', component: './Result/Error' },
            ],
          },
          {
            name: 'exception',
            icon: 'warning',
            path: '/other/exception',
            routes: [
              // exception
              {
                path: '/other/exception/403',
                name: 'not-permission',
                component: './Exception/403',
              },
              {
                path: '/other/exception/404',
                name: 'not-find',
                component: './Exception/404',
              },
              {
                path: '/other/exception/500',
                name: 'server-error',
                component: './Exception/500',
              },
              {
                path: '/other/exception/trigger',
                name: 'trigger',
                hideInMenu: true,
                component: './Exception/TriggerException',
              },
            ],
          },
        ]
      },  
    ],
  },
  {
    component: '404',
  },
];

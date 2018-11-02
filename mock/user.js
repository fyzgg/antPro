// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    name: 'Serati Ma',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email: 'antdesign@alipay.com',
    signature: '海纳百川，有容乃大',
    title: '交互专家',
    group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
    tags: [
      {
        key: '0',
        label: '很有想法的',
      },
      {
        key: '1',
        label: '专注设计',
      },
      {
        key: '2',
        label: '辣~',
      },
      {
        key: '3',
        label: '大长腿',
      },
      {
        key: '4',
        label: '川妹子',
      },
      {
        key: '5',
        label: '海纳百川',
      },
    ],
    notifyCount: 12,
    country: 'China',
    geographic: {
      province: {
        label: '浙江省',
        key: '330000',
      },
      city: {
        label: '杭州市',
        key: '330100',
      },
    },
    address: '西湖区工专路 77 号',
    phone: '0752-268888888',
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/login/account': (req, res) => {
    const { password, userName, type } = req.body;
    if (password === '888888' && userName === 'admin') {
      res.cookie('auth','["admin"]');
      res.cookie('token','94A08DA1FECBB6E8B46990538C7B50B2');
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }
    if (password === '888888' && userName === 'user') {
      res.cookie('auth','["admin","user"]');
      res.cookie('token','94A08DA1FECBB6E8B46990538C7B50B2');
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      return;
    }
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'POST /api/login/logout': (req, res) => {
    res.cookie('auth','');
    res.cookie('token','');
    res.send({
      status: false,
      currentAuthority: 'guest',
    });
  },
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: (new Date()).getTime(),
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/menuData': (req,res) => {
    const json = {
      success:true,
      data: [
            // dashboard
            { path: '/', redirect: '/dashboard/analysis' },
            {
              path: '/dashboard',
              name: 'dashboard',
              icon: 'dashboard',
              routes: [
                {
                  path: '/dashboard/analysis',
                  name: 'analysis',
                  component: './Dashboard/Analysis',
                },
                {
                  path: '/dashboard/monitor',
                  name: 'monitor',
                  component: './Dashboard/Monitor',
                },
                {
                  path: '/dashboard/workplace',
                  name: 'workplace',
                  component: './Dashboard/Workplace',
                },
              ],
            },
            // forms
            {
              path: '/form',
              icon: 'form',
              name: 'form',
              routes: [
                {
                  path: '/form/basic-form',
                  name: 'basicform',
                  component: './Forms/BasicForm',
                },
                {
                  path: '/form/step-form',
                  name: 'stepform',
                  component: './Forms/StepForm',
                  hideChildrenInMenu: true,
                  routes: [
                    {
                      path: '/form/step-form',
                      redirect: '/form/step-form/info',
                    },
                    {
                      path: '/form/step-form/info',
                      name: 'info',
                      component: './Forms/StepForm/Step1',
                    },
                    {
                      path: '/form/step-form/confirm',
                      name: 'confirm',
                      component: './Forms/StepForm/Step2',
                    },
                    {
                      path: '/form/step-form/result',
                      name: 'result',
                      component: './Forms/StepForm/Step3',
                    },
                  ],
                },
                {
                  path: '/form/advanced-form',
                  name: 'advancedform',
                  authority: ['admin'],
                  component: './Forms/AdvancedForm',
                },
              ],
            },
            // list
            {
              path: '/list',
              icon: 'table',
              name: 'list',
              routes: [
                {
                  path: '/list/table-list',
                  name: 'searchtable',
                  component: './List/TableList',
                },
                {
                  path: '/list/basic-list',
                  name: 'basiclist',
                  component: './List/BasicList',
                },
                {
                  path: '/list/card-list',
                  name: 'cardlist',
                  component: './List/CardList',
                },
                {
                  path: '/list/search',
                  name: 'searchlist',
                  component: './List/List',
                  routes: [
                    {
                      path: '/list/search',
                      redirect: '/list/search/articles',
                    },
                    {
                      path: '/list/search/articles',
                      name: 'articles',
                      component: './List/Articles',
                    },
                    {
                      path: '/list/search/projects',
                      name: 'projects',
                      component: './List/Projects',
                    },
                    {
                      path: '/list/search/applications',
                      name: 'applications',
                      component: './List/Applications',
                    },
                  ],
                },
              ],
            },
            {
              path: '/profile',
              name: 'profile',
              icon: 'profile',
              routes: [
                // profile
                {
                  path: '/profile/basic',
                  name: 'basic',
                  component: './Profile/BasicProfile',
                },
                {
                  path: '/profile/advanced',
                  name: 'advanced',
                  authority: ['admin'],
                  component: './Profile/AdvancedProfile',
                },
              ],
            },
            {
              name: 'result',
              icon: 'check-circle-o',
              path: '/result',
              routes: [
                // result
                {
                  path: '/result/success',
                  name: 'success',
                  component: './Result/Success',
                },
                { path: '/result/fail', name: 'fail', component: './Result/Error' },
              ],
            },
            {
              name: 'exception',
              icon: 'warning',
              path: '/exception',
              routes: [
                // exception
                {
                  path: '/exception/403',
                  name: 'not-permission',
                  component: './Exception/403',
                },
                {
                  path: '/exception/404',
                  name: 'not-find',
                  component: './Exception/404',
                },
                {
                  path: '/exception/500',
                  name: 'server-error',
                  component: './Exception/500',
                },
                {
                  path: '/exception/trigger',
                  name: 'trigger',
                  hideInMenu: true,
                  component: './Exception/TriggerException',
                },
              ],
            },
            {
              name: 'account',
              icon: 'user',
              path: '/account',
              routes: [
                {
                  path: '/account/center',
                  name: 'center',
                  component: './Account/Center/Center',
                  routes: [
                    {
                      path: '/account/center',
                      redirect: '/account/center/articles',
                    },
                    {
                      path: '/account/center/articles',
                      component: './Account/Center/Articles',
                    },
                    {
                      path: '/account/center/applications',
                      component: './Account/Center/Applications',
                    },
                    {
                      path: '/account/center/projects',
                      component: './Account/Center/Projects',
                    },
                  ],
                },
                {
                  path: '/account/settings',
                  name: 'settings',
                  component: './Account/Settings/Info',
                  routes: [
                    {
                      path: '/account/settings',
                      redirect: '/account/settings/base',
                    },
                    {
                      path: '/account/settings/base',
                      component: './Account/Settings/BaseView',
                    },
                    {
                      path: '/account/settings/security',
                      component: './Account/Settings/SecurityView',
                    },
                    {
                      path: '/account/settings/binding',
                      component: './Account/Settings/BindingView',
                    },
                    {
                      path: '/account/settings/notification',
                      component: './Account/Settings/NotificationView',
                    },
                  ],
                },
              ],
            },
            {
              path: '/users',
              name: 'Users',
              icon: 'team',
              routes: [
                {
                  path: '/users/usersList',
                  name: 'usersList',
                  component: './Users/UsersList',
                },
              ],
            },
            {
              path: '/weather',
              name: 'weather',
              icon: 'team', 
              routes: [
                {
                  path: '/weather/weatherinfo',
                  name: 'Weatherinfo',
                  component: './Weather/Weather'
                }
              ]
            },
            {
              component: '404',
            },
          ]
      };
    res.send(json)
  }
};

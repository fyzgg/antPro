import Mock from 'mockjs';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'POST /api/users': (req, res) => {
    const { page, status, dept, identity, org, username, name } = req.body;
    const Random = Mock.Random;
    Random.extend({
      dept: function(date) {
        if (!!dept) return dept;
        const depts = ['语文教研组', '数学教研组', '区管理组', '校管理组'];
        return this.pick(depts);
      },
      identity: function(date) {
        if (!!identity) return identity;
        const identitys = ['教职工', '校管理员', '区管理员', '教研人员'];
        return this.pick(identitys);
      },
      org: function(date) {
        if (!!org) {
          return org;
        } else {
          const orgs = ['XXX实验小学', 'XX进修学校', 'XXXX小学', 'XXX实验中学'];
          return this.pick(orgs);
        }
      },
      status: function(date) {
        if (status) {
          if (typeof status === 'object') {
            if (status.length > 0) {
              return status[0];
            } else {
              return this.natural(1, 2);
            }
          } else {
            return status;
          }
        }
        return this.natural(1, 2);
      },
      username: function(date) {
        if (username) return username;
        return this.last();
      },
      realname: function(date) {
        if (name) return name;
        return this.cname();
      },
      total: function(date) {
        if (username || name) return 1;
        if (dept || identity || org) return this.natural(30, 50);
        return 100;
      },
    });
    const json = Mock.mock({
      success: true,
      total: '@total',
      current: page,
      'list|10': [
        {
          id: '@sentence(3)',
          username: '@username',
          name: '@realname',
          org: '@org',
          dept: '@dept',
          identity: '@identity',
          status: '@status',
        },
      ],
    });
    setTimeout(() => {
      res.send(json);
    }, 500);
  },
  // GET POST 可省略
  'POST /api/users/remove': (req, res) => {
    const { id } = req.body;
    if (!id) {
      setTimeout(() => {
        res.send({
          status: true,
          success: false,
          message: '删除操作失败，请稍后重试！',
        });
      }, 100);

      return;
    }
    setTimeout(() => {
      res.send({
        status: true,
        success: true,
        message: '删除成功！',
      });
    }, 100);
  },
  'POST /api/users/removeByBatch': (req, res) => {
    const { ids } = req.body;
    if (!ids && ids.length > 0) {
      setTimeout(() => {
        res.send({
          status: true,
          success: false,
          message: '删除操作失败，请稍后重试！',
        });
      }, 100);

      return;
    }
    setTimeout(() => {
      res.send({
        status: true,
        success: true,
        message: '删除成功！',
      });
    }, 100);
  },
  'GET /api/getDept': {
    residences: [
      {
        value: 'XXX实验小学',
        label: 'XXX实验小学',
        children: [
          {
            value: '校管理组',
            label: '校管理组',
          },
          {
            value: '语文教研组',
            label: '语文教研组',
          },
          {
            value: '数学教研组',
            label: '数学教研组',
          },
          {
            value: '区管理组',
            label: '区管理组',
          },
        ],
      },
      {
        value: 'XX进修学校',
        label: 'XX进修学校',
        children: [
          {
            value: '校管理组',
            label: '校管理组',
          },
          {
            value: '语文教研组',
            label: '语文教研组',
          },
          {
            value: '数学教研组',
            label: '数学教研组',
          },
          {
            value: '区管理组',
            label: '区管理组',
          },
        ],
      },
      {
        value: 'XXXX小学',
        label: 'XXXX小学',
        children: [
          {
            value: '校管理组',
            label: '校管理组',
          },
          {
            value: '语文教研组',
            label: '语文教研组',
          },
          {
            value: '数学教研组',
            label: '数学教研组',
          },
          {
            value: '区管理组',
            label: '区管理组',
          },
        ],
      },
      {
        value: 'XXX实验中学',
        label: 'XXX实验中学',
        children: [
          {
            value: '校管理组',
            label: '校管理组',
          },
          {
            value: '语文教研组',
            label: '语文教研组',
          },
          {
            value: '数学教研组',
            label: '数学教研组',
          },
          {
            value: '区管理组',
            label: '区管理组',
          },
        ],
      },
    ],
    status: true,
  },
  'POST /api/users/create': (req, res) => {
    const { dept, identity, name } = req.body;
    if (!!dept && !!identity && !!name) {
      setTimeout(() => {
        res.send({
          success: true,
          message: '修改成功！',
        });
      }, 500);
      return;
    }
    res.send({
      success: false,
      message: '操作失败！' + dept + identity + name,
    });
  },
  'POST /api/users/update': (req, res) => {
    const { dept, identity, name, id } = req.body;
    if (!!dept && !!identity && !!name && !!id) {
      res.send({
        success: true,
        message: '修改成功！',
      });
      return;
    }
    res.send({
      success: false,
      message: '操作失败！',
    });
  },
};

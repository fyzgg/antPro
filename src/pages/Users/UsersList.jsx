import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Table,
  Form,
  Popconfirm,
  List,
  Card,
  Button,
  Pagination,
  Modal,
  Divider,
  message,
  Row,
  Col,
  Input,
  Select,
  Icon,
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Result from '@/components/Result';
import UsersModal from './UsersModal';
import styles from './UsersList.less';

const FormItem = Form.Item;
const Option = Select.Option;
@connect(({ users, loading }) => {
  return {
    ...users,
    loading: loading.models.users,
  };
})
@Form.create()
class UsersList extends PureComponent {
  state = {
    visible: false,
    done: false,
    selectedRowKeys: [],
    filters: {},
    expandForm: false,
    formValues: {},
    deptDisabled: true,
  };
  componentDidMount() {
    const { dispatch } = this.props;
    const filters = { ...this.state.filters, ...this.state.formValues };
    dispatch({
      type: 'users/fetch',
      payload: { page: 1, filters },
    });
    dispatch({
      type: 'users/getDept',
      payload: { page: 1, filters },
    });
  }
  deleteHandler = ({ id }) => {
    const filters = { ...this.state.filters, ...this.state.formValues };
    this.props.dispatch({
      type: 'users/remove',
      payload: { id, filters },
    });
  };
  pageChangeHandler = page => {
    const filters = { ...this.state.filters, ...this.state.formValues };
    this.props.dispatch({
      type: 'users/fetch',
      payload: { page, filters },
    });
  };
  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };
  confirmDeleteHandler = () => {
    Modal.confirm({
      title: '删除用户',
      content: '确定删除选中的用户吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: this.deleteItems,
    });
  };
  deleteItems = () => {
    const ids = this.state.selectedRowKeys;
    const filters = { ...this.state.filters, ...this.state.formValues };
    this.props.dispatch({
      type: 'users/removeByBatch',
      payload: { ids, filters },
      callback: () => {
        this.setState({
          selectedRowKeys: [],
        });
      },
    });
  };
  beforeOpenHandler = () => {
    this.props.dispatch({
      type: 'users/getDept',
    });
  };
  handleTableChange = (pagination, filters, sorter) => {
    const page = pagination.current;
    this.setState({ filters: filters });
    filters = { ...filters, ...this.state.formValues };
    this.props.dispatch({
      type: 'users/fetch',
      payload: { page, filters },
    });
  };
  updateHandler = ({ fieldsValue, id }) => {
    const data = { ...fieldsValue, id };
    const filters = { ...this.state.filters, ...this.state.formValues };
    this.props.dispatch({
      type: 'users/update',
      payload: { data, filters },
      callback: function(response) {
        if (response.success) {
          message.success('您已成功修改用户数据！');
        } else {
          message.error(response.message);
        }
      },
    });
  };
  createHandler = ({ fieldsValue }) => {
    const filters = { ...this.state.filters, ...this.state.formValues };
    this.props.dispatch({
      type: 'users/create',
      payload: { data: fieldsValue, filters },
      callback: function(response) {
        if (response.success) {
          message.success('您已成功新建用户！');
        } else {
          message.error(response.message);
        }
      },
    });
  };
  searchHandler = () => {
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({ formValues: fieldsValue });
      const filters = { ...this.state.filters, ...fieldsValue };
      dispatch({
        type: 'users/fetch',
        payload: { page: 1, filters },
      });
    });
  };
  formResetHandler = () => {
    const { dispatch, form } = this.props;
    form.resetFields();
    this.setState({ formValues: {}, deptDisabled: true });
    const filters = this.state.filters;
    dispatch({
      type: 'users/fetch',
      payload: { page: 1, filters },
    });
  };
  toggleFormHandler = () => {
    const { expandForm } = this.state;
    this.setState({ expandForm: !expandForm });
  };
  orgChangeHandler = () => {
    this.setState({ deptDisabled: false });
  };
  renderSimpleForm = () => {
    const { getFieldDecorator } = this.props.form;
    const formLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 13 },
    };
    return (
      <Form layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem {...formLayout} label="用户名">
              {getFieldDecorator('username')(<Input placeholder="请输入" style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem {...formLayout} label="用户身分">
              {getFieldDecorator('identity')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="教职工">教职工</Option>
                  <Option value="校管理员">校管理员</Option>
                  <Option value="区管理员">区管理员</Option>
                  <Option value="教研人员">教研人员</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" onClick={this.searchHandler}>
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.formResetHandler}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleFormHandler}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  };
  renderAdvancedForm = () => {
    const { getFieldDecorator } = this.props.form;
    const formLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    return (
      <Form>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem {...formLayout} label="用&nbsp;&nbsp;户&nbsp;&nbsp;名">
              {getFieldDecorator('username')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem {...formLayout} label="用户身分">
              {getFieldDecorator('identity')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="教职工">教职工</Option>
                  <Option value="校管理员">校管理员</Option>
                  <Option value="区管理员">区管理员</Option>
                  <Option value="教研人员">教研人员</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem {...formLayout} label="真实姓名">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem {...formLayout} label="所属组织">
              {getFieldDecorator('org')(
                <Select
                  placeholder="请选择"
                  style={{ width: '100%' }}
                  onChange={this.orgChangeHandler}
                >
                  <Option value="XXXX小学">XXXX小学</Option>
                  <Option value="XX进修学校">XX进修学校</Option>
                  <Option value="XXX实验小学">XXX实验小学</Option>
                  <Option value="XXX实验中学">XXX实验中学</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem {...formLayout} label="所属部门">
              {getFieldDecorator('dept')(
                <Select
                  placeholder="请选择"
                  style={{ width: '100%' }}
                  disabled={this.state.deptDisabled}
                >
                  <Option value="语文教研组">语文教研组</Option>
                  <Option value="数学教研组">数学教研组</Option>
                  <Option value="区管理组">区管理组</Option>
                  <Option value="校管理组">校管理组</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden', marginBottom: 24, clear: 'both' }}>
          <span className={styles.submitButtons} style={{ float: 'right' }}>
            <Button type="primary" onClick={this.searchHandler}>
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.formResetHandler}>
              重置
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleFormHandler}>
              收起 <Icon type="up" />
            </a>
          </span>
        </div>
      </Form>
    );
  };
  renderForm = () => {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  };
  render() {
    const { list, loading, total, current, residences } = this.props;
    const { visible, done, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const pagination = { total, showQuickJumper: true, current };
    pagination.showTotal = total => `总共 ${total} 条`;
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
        render: (text, record, index) => {
          return index + (current - 1) * 10;
        },
      },
      { title: '用户名', dataIndex: 'username' },
      { title: '真实姓名', dataIndex: 'name' },
      { title: '所属组织', dataIndex: 'org' },
      { title: '所属部门', dataIndex: 'dept' },
      { title: '身份', dataIndex: 'identity' },
      {
        title: '状态',
        dataIndex: 'status',
        render: text => {
          if (text == '1') return <font color="green">开启</font>;
          else return <font color="grey">关闭</font>;
        },
        filters: [
          {
            text: '开启',
            value: 1,
          },
          {
            text: '关闭',
            value: 2,
          },
        ],
        filterMultiple: false,
      },
      {
        title: '操作',
        render: record => (
          <Fragment>
            <UsersModal
              title="编辑用户"
              record={record}
              residences={residences}
              onOk={this.updateHandler}
            >
              <a href="javascript:;">编辑</a>
            </UsersModal>
            <Divider type="vertical" />
            <Popconfirm
              title="确定要删除吗?"
              onConfirm={this.deleteHandler.bind(null, { id: record.id })}
            >
              <a href="javascript:;">删除</a>
            </Popconfirm>
          </Fragment>
        ),
      },
    ];
    return (
      <PageHeaderWrapper title="用户列表">
        <Card
          bordered={false}
          style={{ marginTop: 24 }}
          bodyStyle={{ padding: '32px 32px 40px 32px' }}
        >
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div style={{ marginBottom: 16 }}>
              <UsersModal
                record={{}}
                title="新增用户"
                residences={residences}
                onOk={this.createHandler}
              >
                <Button icon="plus" type="primary">
                  新增
                </Button>
              </UsersModal>
              {hasSelected && (
                <span style={{ marginLeft: 8 }}>
                  <Button type="danger" onClick={this.confirmDeleteHandler}>
                    批量删除
                  </Button>
                  <span style={{ marginLeft: 8 }}>已选 {selectedRowKeys.length} 项</span>
                </span>
              )}
            </div>
            <Table
              rowSelection={rowSelection}
              dataSource={list}
              columns={columns}
              rowKey={record => record.id}
              pagination={pagination}
              size="middle"
              loading={loading}
              onChange={this.handleTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default UsersList;

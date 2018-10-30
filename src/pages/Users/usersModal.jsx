import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Modal, Form, Input, Button, Cascader, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
class UsersModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,
    };
  }
  handleSHowModal = e => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };
  handleHideModal = e => {
    if (e) e.stopPropagation();
    this.setState({
      visible: false,
    });
  };
  handleOk = e => {
    if (e) e.stopPropagation();
    const {
      onOk,
      record: { id },
    } = this.props;
    const form = this.props.form;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({ confirmLoading: true });
      onOk({ fieldsValue, id });
      form.resetFields();
      this.setState({ confirmLoading: false });
      this.handleHideModal();
    });
  };
  render() {
    const { title, children, record, residences } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18 },
    };
    return (
      <span>
        <span onClick={this.handleSHowModal}>{children}</span>
        <Modal
          title={title}
          centered={true}
          onOk={this.handleOk}
          visible={this.state.visible}
          onCancel={this.handleHideModal}
          confirmLoading={this.state.confirmLoading}
        >
          <Form onSubmit={this.okHandler}>
            <FormItem {...formLayout} label="姓名">
              {getFieldDecorator('name', {
                initialValue: record.name,
                rules: [{ required: true, message: '请输入姓名！', max: 20 }],
              })(<Input placeholder="姓名" />)}
            </FormItem>
            <FormItem {...formLayout} label="所属部门">
              {getFieldDecorator('dept', {
                initialValue: [record.org, record.dept],
                rules: [{ type: 'array', required: true, message: '请选择所属部门！' }],
              })(<Cascader options={residences} />)}
            </FormItem>
            <FormItem {...formLayout} label="用户身份">
              {getFieldDecorator('identity', {
                initialValue: record.identity,
                rules: [{ required: true, message: '请选择用户身份！' }],
              })(
                <Select placeholder="请选择" initialValue="record.identity">
                  <Option value="教职工">教职工 </Option>
                  <Option value="校管理员">校管理员</Option>
                  <Option value="区管理员">区管理员</Option>
                  <Option value="教研人员">教研人员</Option>
                </Select>
              )}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(UsersModal);

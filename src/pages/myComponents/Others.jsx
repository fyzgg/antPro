import React,{ Component } from 'react';
import QRCode from 'qrcode.react';
import { Card, Input, Icon, Tooltip } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import CopyToClipboard from 'react-copy-to-clipboard';

import styles from './Others.less';

const { TextArea } = Input;
class Others extends Component{
  state = {
    value:'',
    copied: false,
  }

  InputChangeHandler = e => {
    const { value } = e.target;
    this.setState({
      value: value,
      copied: false
    })
  }
  copyHandler = () => {
    this.setState({
      copied: true
    })
  }


  render() {
    const href = 'www.baidu.com';
    return(
      <PageHeaderWrapper title="编辑器">
        <div className={styles.content}>
          <Card title="二维码">
            <div className={styles.qcode}>
            <QRCode value={href} />
            <QRCode value={href} level='H'/>
            <QRCode value={href} level='H' fgColor='blue'bgColor='#eee'/>
            </div>
          </Card>
          <Card title="复制到剪切板">
            <div className={styles.copydiv}>
            <TextArea value={this.state.value} autosize={{ minRows:3,maxRows:6}} onChange={this.InputChangeHandler}/>
            <CopyToClipboard text={this.state.value} onCopy={this.copyHandler}>
              <Tooltip title="复制到剪切板" >
                <a href="javascript:;" className={styles.copylink}><Icon type="copy" /></a>
              </Tooltip>
            </CopyToClipboard>
            </div>
          </Card>
        </div>  
      </PageHeaderWrapper>
    )
  }
}
export default Others;
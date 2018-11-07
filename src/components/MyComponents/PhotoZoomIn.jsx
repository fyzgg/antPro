import React, { PureComponent } from 'react';
import { Icon, Link } from 'antd';
import styles from './PhotoZoomIn.less';

class PhotoZoomIn extends PureComponent {

  clickHandler = ({fn}) => {
    const { id } = this.props;
    if (fn) {
      fn(id);
    }
  }
  renderLinks = (links) => {
    let lis = '';
    links.forEach( (item, index) => {
      lis += <li><a href="javascript:;" onClick={this.clickHandler.bind(null,{fn:item.fn})} ><Icom type={item.icon}/></a></li>;
    });
    return lis;
  }
  render() {
    const { title, post, img, links } = this.props;
    
    return(
      <div className={styles["box"]}>
        <img src={img} alt="" />
        <div className={styles["box-content"]}>
          <div className={styles["content"]}>
            <h3 className={styles["title"]}>{title}</h3>
            <span className={styles["post"]}>{post}</span>
            <ul className={styles["icon"]}>
              {links && this.renderLinks(links)}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default PhotoZoomIn;
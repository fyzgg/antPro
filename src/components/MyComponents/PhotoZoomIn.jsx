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
    return links.map( (item) => {
      return (
        <li key={item.id}>
          <a href="javascript:;" onClick={this.clickHandler.bind(null,{fn: item.fn})} >
            <Icon type={item.icon}/>
          </a>
        </li>
        );
    });
  }
  render() {
    const { title, post, img, links, type, width, height  } = this.props;
    const box = 'box'+type;
    
    return(
      <div className={styles[box]}>
        <img src={img} alt="" width={width || '100%' } height={height||'auto'}/>
        {type=='4' && <ul className={styles["icon"]}>
          {links && this.renderLinks(links)}
        </ul>}
        <div className={styles["box-content"]}>
          <div className={styles["content"]}>
            <h3 className={styles["title"]}>{title}</h3>
            <span className={styles["post"]}>{post}</span>
            {
              type != '4' && 
              <ul className={styles["icon"]}>
              {links && this.renderLinks(links)}
            </ul>
            }
            
          </div>
        </div>
      </div>
    )
  }
}

export default PhotoZoomIn;
import React, { Component } from 'react';

import styles from './ImgTitle.less';

class ImgTitle extends Component {

  onClickHandler = (titleClick) => {
    if (titleClick) {
      titleClick();
    }
  }

  render() {
    //type : clip || masked
    //textImg : img
    //:hover : img
    const { type, bgImg, hoverImg, titleClick ,titleType, title } = this.props;
    const container = (type ? 'container-'+ type : 'container-clip');

    const className = type == 'clip' ? 'clipped-title' + titleType : 'masked-image';

    return (
      <div className={styles[container]}>
        <div className={styles[className]}  >
          <span className={styles['img-title']}>{title}</span>
        </div>
    </div>
    )
  }
}

export default ImgTitle;
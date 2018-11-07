import React,{ Component } from 'react';
import { Card, Row, Col  } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './MyComponents.less';

import ImgTitle from '@/components/MyComponents/ImgTitle';
import PhotoZoomIn from '@/components/MyComponents/PhotoZoomIn';




class MyComponents extends Component {


  render () {
    const photosone = [
      {
        id:1,
        title:'Williamson',
        post:'Web designer',
        img:'/images/img-1.jpg',
        links:[
          {
            icon:'search',
            fn:() => {
              console.log('you click the search')
            }
          },
          {
            icon:'link',
            fn:() => {
              alert('you clicked the link!')
            }
          }
        ]
      },
      {
        id:2,
        title:'Williamson',
        post:'Web designer',
        img:'/images/img-2.jpg',
        links:[
          {
            icon:'search',
            fn:() => {
              console.log('you click the search')
            }
          },
          {
            icon:'link',
            fn:() => {
              alert('you clicked the link!')
            }
          }
        ]
      },{
        id:3,
        title:'Williamson',
        post:'Web designer',
        img:'/images/img-3.jpg',
        links:[
          {
            icon:'search',
            fn:() => {
              console.log('you click the search')
            }
          },
          {
            icon:'link',
            fn:() => {
              alert('you clicked the link!')
            }
          }
        ]
      }
    ]
    const photo = {
        id:3,
        title:'Williamson',
        post:'Web designer',
        img:'/images/img-3.jpg',
        links:[
          {
            icon:'search',
            fn:() => {
              console.log('you click the search')
            }
          },
          {
            icon:'link',
            fn:() => {
              alert('you clicked the link!')
            }
          }
        ]
      };


    return (
      <PageHeaderWrapper title='我的组件'>
        <Row className={styles.row}>
          <Col xs={24}>
            <Card>
              <ImgTitle type="clip"
                titleType="1"
                title="THE LION" 
              />
            </Card>
          </Col>
          <Col xs={24}>
            <ImgTitle type="mask"
              title="CERTIFIED ROUGH TEXTURED TEXT" 
            />
          </Col>
          <Col xs={24}>
            <Card>
              <PhotoZoomIn {...photo} />
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    )
  }

}

export default MyComponents;
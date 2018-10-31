import React,{ PureComponent } from 'react';
import { connect } from 'dva';


@connect(({ weather }) => ({
    ...weather
}))
class Weather extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type:'weather/fetch',
      payload:{ city:101230201 }
    })
  }
  render(){
    const { weatherinfo } = this.props;
    console.log( weatherinfo )
    return (
      <div>
        天气预报
      </div>
    )
  }
}

export default Weather;
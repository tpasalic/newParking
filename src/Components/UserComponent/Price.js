import React, { Component } from 'react';

export default class Price extends Component {
  constructor(props){
    super(props);
    this.state={
     feedBack:''
   }
  }

  render() {
    const start_time= new Date(this.props.startTime);
    const end_time= new Date(this.props.endTime);
    console.log("start_time : ", start_time.getHours());
    console.log("end_time : ", end_time.getHours());    
    var hours=end_time.getHours() - start_time.getHours();
    if(hours < 0){
        hours = 0
    }
    return (
    <div style={{margin: '20px'}}>
        Cijena: {hours*2} KM
    </div>
    );
  }
}

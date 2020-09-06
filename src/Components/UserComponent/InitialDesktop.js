import React, { Component } from 'react';
import parkingBack from './parkingBack.jpg';

export default class InitialDesktop extends Component {
  constructor(props){
    super(props);
    this.state={
     feedBack:''
   }
  }

  render() {
      return(
        <img src={parkingBack} width="100%" height='100%' alt="gh-pages branch setting"/>
      )
  }
}

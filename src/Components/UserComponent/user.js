import React,{Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as firebase from 'firebase'; 
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import Logout from "../logout"
import MyBooking from './MyBooking'
import SendFeedBack from './SendFeedBack'
import ParkingLocation from "./ParkingLocation"
import MyFeedback from './MyFeedBack'
import InitialDesktop from './InitialDesktop'
import{
BrowserRouter as Router,
Route,
Link
}from 'react-router-dom';
export default class User extends Component{
 constructor(props) {
    super(props);
    this.state = {
      open: false,
      user_name:''
      };
  }
  handleToggle = () => this.setState({open: !this.state.open});
  handleClick(){
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      console.log(" Sign-out successful.")
    }).catch(function(error) {
      console.log(error);
    });
    this.props.history.push('/');
  }

componentDidMount(){
  firebase.auth().onAuthStateChanged(() => {
    if(firebase.auth().currentUser){
      this.props.history.push('/User/Welcome')
    }else{
      this.props.history.push('/')
    }
  })    
}

ParkingLocation(){
   this.props.history.push("/User/ParkingLocation")

}   
mybooking(){
  this.props.history.push("/User/MyBooking");
}
SendFeedBack(){
   this.props.history.push("/User/SendFeedBack");
}
MyFeedback(){
  this.props.history.push("/User/MyFeedBack");
}

render(){
    const a = <p>AAA</p>;
    return(
            <div>
              <MuiThemeProvider>
                <div>
                      <AppBar
                          title={<span style={styles.title}>Dobrodošli</span>}
                          onTitleTouchTap={handleTouchTap}
                          onLeftIconButtonTouchTap={ this.handleToggle }
                          iconElementRight={<FlatButton label="Odjava" onClick={(event) => this.handleClick(event)}/>}
                        />  
                 <div>
                      <Drawer open={this.state.open} >
                          <MenuItem onTouchTap={this.handleToggle.bind(this)}> X </MenuItem>
                          <MenuItem onTouchTap={this.ParkingLocation.bind(this)}>Parking mjesta</MenuItem>
                          <MenuItem onTouchTap={this.mybooking.bind(this)}>Moje rezervacije </MenuItem>
                          <MenuItem onTouchTap={this.MyFeedback.bind(this)}>Moji utisci</MenuItem>
                          <MenuItem onTouchTap={this.SendFeedBack.bind(this)}>Podijeli utisak</MenuItem>        
                      </Drawer>
             
                      </div>
                        <Route path="/User/Welcome" component={InitialDesktop} />
                        <Route path="/User/ParkingLocation" component={ParkingLocation} />
                        <Route path="/User/MyBooking" component={MyBooking}/>
                         <Route path="/User/SendFeedBack" component={SendFeedBack}/>
                         <Route path="/User/MyFeedBack" component={MyFeedback}/>

                    </div>
             </MuiThemeProvider>
           </div>
  
  )}
}
function handleTouchTap() {
  alert('happy to have your attention !');
}
const styles = {
  title: {
    cursor: 'pointer',
  },
};
const style = {
 margin: 15,
};


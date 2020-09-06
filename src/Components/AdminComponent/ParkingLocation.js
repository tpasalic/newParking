import React,{Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import * as firebase from 'firebase'; 
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Logout from "../logout"
import RaisedButton from 'material-ui/RaisedButton';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import CircularProgress from 'material-ui/CircularProgress';
import{
BrowserRouter as Router,
Route,
Link
}from 'react-router-dom';
import './ParkingLocation.css';
export default class ParkingLocation extends Component{
 
   constructor(props) {
    super(props);
    this.state = {
       start_time: null,
       end_time:null,
       controlledDate: null,
       slot_array:[],
       location_name:[],
       location:' ',
       key:[],
       searchTerm: '',
      };
  }


componentDidMount() {      
  firebase.auth().onAuthStateChanged(() => {
    if(firebase.auth().currentUser){
    const rootRef= firebase.database().ref();
   const speedRef = rootRef.child('Locations/');
   speedRef.on('value',snap => {
    var values=snap.val();
    var keys=Object.keys(values)
     var local_array;
     var slot;
     var slotcount;
     for(var i=0 ;i<keys.length;i++){
       var k = keys[i]
           this.state.location_name.push(values[k].LocationName)
           this.state.slot_array.push(values[k].Slot)
           this.state.slot_array= Object.keys(values[k].Slot).map(function (value,index) 
          {           
             return [value];
          });          
          }    
      this.setState({
       location_name:this.state.location_name,
       slot_array:this.state.slot_array,
       key:keys
      })    
   })
    }
  })
}
editSearchTerm = (e) => {
  this.setState({searchTerm: e.target.value})
}
render(){
    const filterdLocations = this.state.location_name.filter((name) => name.toLowerCase()
    .includes(this.state.searchTerm.toLowerCase()));
    return(
            <div className="list--wrapper">       
              <h3>Dostupne parking lokacije</h3>
              <MuiThemeProvider>
                  <div>
                     { filterdLocations.map((item, index) => (
                       <div>
                    <Paper style={style} zDepth={3} rounded={false} id="abc" >
                     <h3>  {item}<br/> 
                     </h3>
                     <Link
                             to={{
                                    pathname:'/Admin/LocationDetail',
                                    state: {key: this.state.key[index]}
                                   }
                                   } >
                                  <RaisedButton label="Pogledaj mjesta" primary={true} /></Link>
                    </Paper>
                       </div>
                     ))}    
            </div>
      </MuiThemeProvider>
            </div>
  )}
}

const style = {
 margin:20,
 width:500,
  textAlign: 'center',
  display: 'inline-block',
};

const style2 = {
 margin: 20,
 width: 500,
 height: 20,
  textAlign: 'center',
  display: 'inline-block',
};
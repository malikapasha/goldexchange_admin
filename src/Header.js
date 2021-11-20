import React, {Component } from 'react';
import {Link , Redirect} from 'react-router-dom';
import Switch from 'react-switch';
import {COLORS} from  './colors';

class Header extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      logout:false,
     
        checked:false,
        
    }
     this.logout = this.logout.bind(this);
   
     this.handleChange = this.handleChange.bind(this);
  }
  handleChange(checked) {
   
 this.setState({ checked   });
    
  }
   logout()
  {
    localStorage.setItem('str' , '');
    localStorage.clear();
    this.setState({ logout: true})

  }
 render()
 {
if( this.state.logout)
  {
    return(<Redirect to = "/" />)
  }
 
return(

<nav className="main-header navbar navbar-expand navbar-white navbar-light" style = {{background:COLORS.blue , height:77}} >
 
    <ul className="navbar-nav" >
    
      <li className="nav-item">
        <a className="nav-link" data-widget="pushmenu" href="#"><i style= {{color:COLORS.white}} className="fas fa-bars fa-lg"></i></a>
      </li>
      <li className="nav-item d-none d-sm-inline-block">
        <Link to ="/dashboard" className="nav-link" style= {{color:COLORS.white , fontSize:14 , fontWeight:'bold'}} >Dashboard</Link>
      </li>
      
      </ul>
    
    
     {/* <img class="img-circle elevation-2" src= "assets/dist/img/saleslogo.png" tintColor = "white" style = {{width:50, height:50  , color:'#fff' , marginLeft:'85%'}} 
           /> */}
        
          <img class="elevation-2" src= "assets/dist/img/saleslogo.png"
       tintColor = "white" style = {{width:150,  marginLeft:'75%',height:50  , color:'#fff'}} 
           />
  
      
  </nav>
      
);
   
}
}
export default Header;



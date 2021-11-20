import React, {Component } from 'react';
import {Link , Redirect} from 'react-router-dom';
import Switch from 'react-switch';
import {COLORS} from  './colors';
class  Sidebar extends React.Component
{
  constructor(props) {
    super(props)
  
    this.state = {
      //  admin:localStorage.getItem('admin'),
      //  name:localStorage.getItem('name'),
        checked:false,
        log: false,
        logout:false,
        str: false,
    }
    this.logout = this.logout.bind(this);
     this.handleChange = this.handleChange.bind(this);
  }
  handleChange(checked) {
   
 this.setState({ checked   });
    
  }
  
  
  
  componentWillMount()
  {


  if(localStorage.getItem('str')){
console.log('call')
   }
   else 
    {
      this.setState({str: true})
      
    }
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
    <aside className="main-sidebar sidebar-green-primary elevation-4" >
   
    <a className="brand-link" style= {{  background : COLORS.blue }}>
      {/* <img class="elevation-2" src= "assets/dist/img/saleslogo.png"
       tintColor = "white" style = {{width:150, marginLeft:10,height:50  , color:'#fff'}} 
           /> */}
      <span className="brand-text " style= {{ color : COLORS.white, marginRight:20 , fontWeight:'bold' , marginLeft:50 }} >مخمس</span>

      
      
    </a>
     <div class="sidebar" >
<nav class="mt-2"  >
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false" >
      
         
         
         <li class="nav-item">
                <Link to = "/dashboard" class="nav-link">
                  <i class="fas fa-tachometer-alt nav-icon " style = {{color:COLORS.yellow}}></i>
                  <p style = {{fontSize:16 , color: COLORS.black}}>Dashboard</p>
                </Link>
              </li>
              
              <li class="nav-item">
                <Link to = "viewuser" class="nav-link">
                  <i class="fas fa-users nav-icon " style = {{color:COLORS.yellow}}></i>
                  <p style = {{fontSize:16 , color: COLORS.black}}>Users</p>
                </Link>
              </li>
             
          
    
         
         
            
               <li class="nav-item">
                <Link to = "userads" class="nav-link">
            <i class="fab fa-buysellads nav-icon" style = {{color:COLORS.yellow}}></i>
                  <p style = {{fontSize:16 , color: COLORS.black}}>User Ads</p>
                </Link>
              </li>
             
               
               {/* <li class="nav-item">
                <Link to = "complains" class="nav-link">
                  <i class="fas fa-tired nav-icon" style = {{color:COLORS.yellow}}></i>
                  <p style = {{fontSize:16 , color: COLORS.black}}>Complains</p>
                </Link>
              </li> */}
                
              
               {/* <li class="nav-item">
                <Link to = "" class="nav-link">
                <i class="far fa-question-circle nav-icon" style = {{color: COLORS.yellow}}></i>
                  <p style = {{fontSize:16 , color: COLORS.black}}>About Us</p>
                </Link>
              </li> */}
              
              
               <li className="nav-item">
                <a href ="https://m5amas.com/" className="nav-link">
                  <i className="fab fa-servicestack nav-icon" style = {{color:COLORS.yellow}}></i>
                  <p  style = {{fontSize:16 , color: COLORS.black}}>About Us</p>
                </a>
              </li>
           
              <li className="nav-item">
                <a href ="https://m5amas.com/" className="nav-link">
                  <i className="fab fa-servicestack nav-icon" style = {{color:COLORS.yellow}}></i>
                  <p  style = {{fontSize:16 , color: COLORS.black}}>Contact Us</p>
                </a>
              </li>
               <li className="nav-item">
                <a href ="https://m5amas.com/privacy-policy/" className="nav-link">
                  <i className="far fa-address-card nav-icon" style = {{color:COLORS.yellow}}></i>
                  <p  style = {{fontSize:16 , color: COLORS.black}}>Privacy Policy</p>
                </a>
              </li>
              <li className="nav-item">
                <a href ="https://m5amas.com/" className="nav-link">
                  <i className="far fa-question-circle nav-icon" style = {{color:COLORS.yellow}} ></i>
                  <p  style = {{fontSize:16 , color: COLORS.black}}>Terms and Conditions</p>
                </a>
              </li>
          
         
            <li class="nav-item">
                <a onClick = {this.logout} class="nav-link">
                  <i class="fas fa-sign-out-alt nav-icon" style = {{color:COLORS.yellow}}></i>
                  <p style = {{color: COLORS.black , fontSize:16}}>Logout</p>
                </a>
              </li>
         
          

        </ul>
      </nav>
      

    
    </div>
   
  </aside>
  


  );

 
}
}
export default Sidebar;

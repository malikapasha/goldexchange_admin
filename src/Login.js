import React, {Component , Alert } from 'react';
import { BrowserRouter , Link , Redirect} from 'react-router-dom';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { Button, Label,  Modal, ModalHeader, FormGroup ,ModalBody, ModalFooter,InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import Dashboard from './Dashboard';

import "bootstrap/dist/css/bootstrap.css";
import {COLORS} from  './colors';




export const myContext = React.createContext();
const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
  
 export default class  Login extends Component 
{ 
  
 constructor() {
        super();

        this.state = {  email:null,

            password: null ,
            admin: false ,
            log: false,
            loading: false,
              done: undefined,
                newOrderModal: false,
    
               
            }
this.login= this.login.bind(this);
this.onChange = this.onChange.bind(this);
        

    }
 
 handleClose = () => {
    this.setState({ newOrderModal: false })
}
   toggleNewOrders()
{

  this.setState({
    newOrderModal: true
  }) 
}
 
 editOrder( )
 {
   
   this.setState ({
     newOrderModal: !this.state.newOrderModal
   })
 }
 
login (e)
{
  e.preventDefault();
   

  if(!this.state.email || !this.state.password)
    {
     
     
    
      alert("fill all fields" );
     
         

      
        
    }

else if(this.state.email === "admin@m5amas.com" && this.state.password === 'gold@2021')
{
// localStorage.setItem('admin' ,'123' )
// this.setState({admin:true})
 this.setState({loading:true});
  localStorage.setItem('_id','admin');
  localStorage.setItem('loginstatus', true);
    localStorage.setItem('email', 'admin@m5amas.com');
    localStorage.setItem('name','Super Admin');

    localStorage.setItem('contact','+966 771 92 43 15');
    localStorage.setItem('city', 'Algeria');
    localStorage.setItem('address', 'Kuwait');
    localStorage.setItem('password', 'gold@2021');

    localStorage.setItem('admin', true);

    this.setState({ log: true })

    alert('Welcome to Super Admin Panel');

    return <Redirect to='dashboard' />

// alert('Welcome to Super Admin Panel');
}


   

  

else 
{
   this.setState({loading:true});
     this.setState({  newOrderModal: true});
  
  fetch('https://cbwork.herokuapp.com/adminlogin', {
    method: 'post',
    headers: { 'Content-Type': 'application/json',
     },
    body: JSON.stringify(this.state)
  }).then(response =>
   response.json())
    .then((data) => {

  
      console.log(data.user);

      localStorage.setItem('_id',data.user._id);
      localStorage.setItem('loginstatus', data.status);
      localStorage.setItem('email', data.user.email);

       localStorage.setItem('name', data.user.name);

      localStorage.setItem('contact', data.user.contact);
      localStorage.setItem('password', data.user.password);
    // localStorage.setItem('image', data.user.frontside_image);
      localStorage.setItem('address', data.user.address);

       localStorage.setItem('admin',false);


      
      alert('Welcome ' + data.user.name + ' to '+'مخمس' )

     this.setState({ log: true })

      return <Redirect to='dashboard' />
     
      
       

    }).catch((error) => 
    {
alert('Error Occurred, please try again')
this.setState({loading:false})
 this.setState({  newOrderModal: false});


    })
    
   
   
    
    
     
   
    
     
   

  
}
};
  
    onChange(e)
    {
this.setState({[e.target.name]: e.target.value});
console.log(this.state);

    }

 

 render() {
   const {loading} = this.state;
    
 /*if(this.state.log === true || this.state.admin === true )
  {
   return <Redirect to = 'dashboard' />
  } .*/ 
  
   if (localStorage.getItem('loginstatus')) 
  {
    
    return <Redirect to = 'dashboard' />
  }
  
  return(  
   
       
       
  <div className="auth-wrapper justify-content-center">     
 <div className="container">
<div className="row justify-content-center">
<div className="col-xl-10 col-lg-12 col-md-9">

<div className="card o-hidden border-0 shadow-lg my-5 mx-auto">

<div className="card-body">
<div className="row">
<img className="col-lg-5 d-none d-lg-block " 
style ={{width:110 , height:50,marginTop:120}}
 src= "assets/dist/img/saleslogo.png" />
<div className="col-lg-6">
<div className="p-5">
<div className="text-center">
    <div>
    <h1 className="h1  mb-4" style = {{color: COLORS.blue}} >Login</h1>
    </div>
    
    <form className="user">
<div className="form-group mb-4">
<input   type="email" className="form-control" placeholder="Enter email" required name = "email"  onChange ={this.onChange}/>
 

</div>




                <div className="form-group mb-4">
                 <input    type="password" className="form-control" placeholder="Enter password" required  name = "password" onChange ={this.onChange} />
                </div>
                  <div
  style={{
      width: "100%",
     height: "100",
       display: "flex",
       justifyContent: "center",
        alignItems: "center"
      }}
    >
    
      
     
   </div>
               
                
            <button  disabled = {loading} type="submit" className="btn btn-primary btn-block mb-4" style = {{background:COLORS.blue}} onClick = {   this.login  }>{loading && <span style = {{color:'white'}} > Sign In</span> }  
                        {!loading && <span style = {{color:'white'}}>Sign In</span> }</button>
                
         
    </form>
</div>

</div>



</div>
</div>


</div>
</div>
</div>
  <Modal isOpen={this.state.newOrderModal} size="sm" style = {{ marginTop:'15%' ,marginLeft:'50%', }} toggle={this.toggleNewOrders.bind(this)} >
        <ModalHeader
 style ={{background: COLORS.yellow , color:COLORS.yellow }} > <img 
 src= "assets/dist/img/saleslogo.png" style ={{width:150 , height:50}} />   </ModalHeader>
        <ModalBody>
            <div
  style={{
      width: "100%",
     height: "100",
       display: "flex",
       justifyContent: "center",
        alignItems: "center"
      }}
    >
    
    {loading &&  <Loader type="ThreeDots" color={COLORS.blue} height="50" width="100"  />
 }
         
     
   </div>
  </ModalBody>
       
      </Modal>

</div>


               </div>
               </div>   
     

  );

 }
  

}


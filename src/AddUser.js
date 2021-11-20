import React   , {Component} from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Header from './Header';
import {AsyncStorage} from 'AsyncStorage';
import {Link , BrowserRouter} from 'react-router-dom';
import {FormGroup,Label, Input,Row , Col, } from 'reactstrap';
import Loader from 'react-loader-spinner';
const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
 const initialState =
 {

      name: '',
      email: '',
      password: '',
      contact:'',
      nameError:'',
      emailError:'',
      documentError:'',
      passwordError:'',
      contactError:'',
       loading: false,
 }
class AddUser extends Component
{
  state = { file: "assets/dist/img/uu.png"}
  constructor(props){
    super(props)
    
     
    
       this.state = initialState;
       this.state = {
         Formerrors:
         {
           name:'' ,
           email:'' ,
           password:'',
           contact:'',
         }
       }
  }
  handleChange = event =>{
this.setState({ [event.target.name]:event.target.value } )
this.setState({ [event.target.email]:event.target.value } )
this.setState({ [event.target.password]:event.target.value } )
this.setState({ [event.target.contact]:event.target.value } )
  }
validate = () =>
{
   let nameError = '';
     let  emailError = '';
     let  documentError = '';
     let passwordError = '';
     let  contactError = '';
 
if( !this.state.name)
{
 nameError = "fill the empty field"
} 

if(!validEmailRegex.test(this.state.email))         
{
emailError = 'Invalid Email';
}

if( !this.state.password   )
{
passwordError = 'empty or invalid password';
}
if(emailError || nameError || passwordError)
{
  this.setState({emailError , nameError , passwordError});
  return false;
}
return true;
}
handleSubmit = event =>{

event.preventDefault();
this.setState({loading:true});


this.setState({emailError: ""})
this.setState({nameError: ""})
this.setState({passwordError: ""})
const isValid = this.validate();
if(isValid)
{
console.log(" name : " + this.state.name)
console.log(" email: " + this.state.email)
console.log(" password: " + this.state.password)
console.log(" contact: " + this.state.contact)




const url = "https://cors-anywhere.herokuapp.com/https://foodeats.herokuapp.com/users";
const data = { name:this.state.name, 
email:this.state.email , 
password: this.state.password, 
contact:this.state.contact ,

  }
fetch(url, { method: 'POST', 
body: JSON.stringify(data),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.then((data) => {
      
      console.log(data)

      if(data.status == true)
      {
          alert('User has been added successfully');
           window.location.href = '/viewteam'
      }
    
      
})
.catch(error => alert('failed to add user , email already exist', error))
 

}}
   
    
  
  render()
  {

 const {loading} = this.state;

 return(
        <div class="wrapper">
        <Header/>
        <Sidebar/>
         <div class="content-wrapper">
   
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          
          <div class="col-sm-12">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active"> Add New Member</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

  
    <section class="content">
      <div class="row">
        <div class="col-md-10">
          <div class="card card-primary">
            <div class="card-header" style = {{background:'#15238C'}} >
              <h3 class="card-title" style = {{color:'#fff'}} >Add New Member</h3>

              <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                  <i class="fas fa-minus"></i></button>
              </div>
            </div>
            <div class="card-body">
            <div
  style={{
      width: "100%",
     height: "100",
       display: "flex",
       justifyContent: "center",
        alignItems: "center"
      }}
    >
               {loading &&  <Loader type="Circles" color="#15238C" height="50" width="100"  />} </div>
            <Row form>
             <Col md={6}>
         
            <Label for="Name">Name:</Label>
             <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-user" style = {{color:'#15238C'}}></i></span>
                  </div>
            <Input type="name" name = "name" onChange={this.handleChange} placeholder="Enter name" />
          </div>
          <div style = {{color:'red', fontSize:10}}> { this.state.nameError } </div>
        </Col>
        <Col md={6}>
        <Label for="exampleEmail">Email</Label>
           <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-envelope" style = {{color:'#15238C'}}></i></span>
                  </div>
                  <Input type="email" name="email" onChange={this.handleChange} placeholder="Enter Email address" />
            
            
          </div>
            <div style = {{color:'red', fontSize:10}}> { this.state.emailError } </div>
               
        </Col>
        <Col md={6}>
          
            <Label for="examplePassword">Phone</Label>
            <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i style = {{color:'#15238C'}} class="fas fa-phone"></i></span>
                  </div>
            <Input type="password" type="text" name = "contact" onChange={this.handleChange} placeholder="Enter phone number" />
          </div>
          <div style = {{color:'red', fontSize:10}}> { this.state.nameError } </div>
        </Col>
         <Col md={6}>
       
            <Label for="examplePassword">Password</Label>
            <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i style = {{color:'#15238C'}} class="fas fa-key"></i></span>
                  </div>
            <Input type="password" name="password" placeholder="Enter password" />
        </div>
          <div style = {{color:'red', fontSize:10}}> { this.state.nameError } </div>
        </Col>
         <Col md={6}>
       
            <Label for="examplePassword">Designation</Label>
            <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i style = {{color:'#15238C'}} class="fas fa-chair"></i></span>
                  </div>
            <Input type="password" name="password" placeholder="Enter designation" />
        </div>
          <div style = {{color:'red', fontSize:10}}> { this.state.nameError } </div>
        </Col>
 <Col md={6}>
        <Label for="exampleAddress">Address</Label>
         <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" ><i style = {{color:'#15238C'}} class="fas fa-map-marker-alt"></i></span>
                  </div>
        <Input type="text" name="address" id="exampleAddress" placeholder="1234 Main St"/>
      </div>
           
          <div style = {{color:'red', fontSize:10}}> { this.state.nameError } </div>
        </Col>
      </Row>
     
       
   <div style = {{color:'red', fontSize:10}}> { this.state.nameError } </div>
             <div class="input-group">
        <div class="input-group-prepend">
        <span class="input-group-text">
                          <input type="checkbox" />
                        </span>
                      </div>
          <b> Can send notification to user </b>
        </div>
         <div class="input-group">
        <div class="input-group-prepend">
        <span class="input-group-text">
                          <input type="checkbox" />
                        </span>
                      </div>
          <b> Can send invoice to user </b>
        </div>
         
     
        <div class="input-group">
        <div class="input-group-prepend">
        <span class="input-group-text">
                          <input type="checkbox" />
                        </span>
                      </div>
          <b> Add other team members </b>
        </div>
      <div class="input-group">
      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <input type="checkbox" />
                        </span>
                         <b> Approve payment from seller directly from dashboard </b>
                      </div> </div>
                       <div class="input-group">
      <div class="input-group-prepend"   >
                        <span class="input-group-text">
                          <input type="checkbox" />
                        </span>
                         <b >   Contact buyer or seller directly </b>
                      </div> </div>
    
     
              <div class="col-12" style = {{marginTop:'2%'}}>
            
                   
          <Link to = "/viewteam"> <button class="btn btn-secondary btn-lg ">Cancel</button> </Link>
        <Link to = "/viewteam"> <button type="submit" class="btn btn-info  btn-lg float-right" disabled = {loading} style = {{background:'#15238C'}} onClick= {this.handleSubmit} >
          {loading && <span>Sign In</span> }  
                        {!loading && <span>Add</span> }  </button></Link>
        </div>
              
            </div>
         
          </div>
        
        </div>
        
      </div>
      <div class="row">
       
      </div>
    </section>
   
  </div>
  

   <Footer/>
  </div>
    );
  
  }
}
export default AddUser
 
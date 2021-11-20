import React, {Component } from 'react';
import {Link , BrowserRouter} from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

import { Button, Label,  Modal, ModalHeader, FormGroup ,ModalBody, ModalFooter,InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
class Profile extends Component
{  
   constructor(props){
    super(props)
    this.state = {
      file:  "assets/dist/img/u.jpg",
       newOrderModal: false,
    
      hidden: true ,
    
    
       editData:
       {
         _id:'',
        status:'',
        code:'',
        amount:'',
        minorder:'',
        maxorder:'',
        usagelimit:'',
        

       }
    }
    this.handleChange = this.handleChange.bind(this)
    this.toggleShow = this.toggleShow.bind(this);
  }
   handleClose = () => {
    this.setState({ newOrderModal: false })
}
toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }
 toggleNewOrders()
{

  this.setState({
    newOrderModal: true
  }) 
}
 
 editOrder(_id, code , minorder ,  maxorder , amount , usagelimit , status )
 {
   console.log(code)
   this.setState ({
     editData: {_id, code , maxorder , amount ,minorder, status , usagelimit } , newOrderModal: !this.state.newOrderModal
   })
 }

  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })
  }
  updateOrder()
 {
  

   let { code , maxorder , amount ,minorder,  usagelimit  , status ,} = this.state.editData;

    
   console.log(" _id : " +  this.state.editData._id)
console.log(" code: " + this.state.editData.code)
console.log(" max order " + this.state.editData.maxorder)
console.log(" min order " + this.state.editData.minorder)
console.log(" amount " + this.state.editData.amount)
console.log(" status " + this.state.editData.status)
console.log(" usagelimit" + this.state.editData.usagelimit)





const url = "https://cors-anywhere.herokuapp.com/https://foodeats.herokuapp.com/updatepromo";
const data = { _id: this.state.editData._id, 
code:this.state.editData.code, 
 
minorder:this.state.editData.minorder, 
maxorder:this.state.editData.maxorder, 

amount:this.state.editData.amount,
usagelimit:this.state.editData.usagelimit,
status:this.state.editData.status,

  }
fetch(url, { method: 'POST', 
body: JSON.stringify({
   _id: this.state.editData._id, 
code:this.state.editData.code, 

minorder:this.state.editData.minorder, 
maxorder:this.state.editData.maxorder, 
amount:this.state.editData.amount,
usagelimit: this.state.editData.usagelimit,

status:this.state.editData.status,

}),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.then((data) => {
      
      console.log(data)
      if(data.success == true)
      {
        alert('status updated successfully')
     window.location.reload(true)

      }
    
      
})
.catch(error => console.error('Error:', error))

   

 }

  
  render(){
    
  return(
    
      <div class="wrapper " style = {{ "background" : "url('assets/dist/img/pay.jpeg')" , "width":
"100%" , "Height": "100%" ,}} >
     
  
     <section class="content-header  "    >
      <div class="container-fluid" >
        <div class="row mb-2">
        <div class="col-sm-6">
        </div>
    
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">User Profile</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

 
    <section class="content "   >
      <div class="container-fluid  "  >
        <div  >
          <div style = {{marginLeft:'25%'}} class="col-md-6" >

           
            <div class="card card-primary card-outline" style = {{ background : '#212F3C'}}>
              <div class="card-body box-profile" style = {{ background : '#212F3C'}}>
                <div class="text-center">
                  <img class="profile-user-img img-fluid img-circle"
                       src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQNXCoNctzGA8UKlw_SxEDxGIAdZMOy8psh8YgrvI5yecINZSBS&usqp=CAU"
                       alt="User profile picture"/>
                </div>

                <h3 class="profile-username text-center" style = {{color: '#fff'}}>{ localStorage.getItem('name') }  </h3>

                
               
                
              </div>
         
            </div>
          
          
         
        
          <div class="card card-primary ">
              <div class="card-header"  style = {{background: '#fff'}}>
                <h3 class = "text-center" style = {{background: '#fff' , textAlign:'center' }}  >~ Welcome ~ </h3>
              </div>
              
              <div class="card-body">
                <strong><i class="fas fa-user" style = {{color:'#212F3C'}}></i>Name</strong>

                               <p class="text-muted"> { localStorage.getItem('name') } </p>

                <hr/>

                <strong><i class="fas fa-envelope  mr-1" style = {{color:'#212F3C'}}></i>Email</strong>

                <p class="text-muted">{ localStorage.getItem('email') }</p>

                <hr/>

              

                <strong><i class="fas fa-phone-volume mr-1" style = {{color:'#212F3C'}}></i>Phone Number</strong>

                <p class="text-muted"> { localStorage.getItem('contact') }</p>
                 <hr/>
                 <strong><i class="fas fa-lock" style = {{color:'#212F3C'}}></i>Password</strong>
                  
                   <p class="text-muted"> 
                   <input
          type={this.state.hidden ? "password" : "text"} class="text-muted"  style = {{background:'#fff'}}  value =  { localStorage.getItem('password') } 
        />
        <button onClick={this.toggleShow}><i class="fas fa-eye" style = {{color:'#212F3C' , marginRight:'5%'}}></i></button> </p>
        <hr/>

              

              
              

               
              

            

              

                <strong><i class="far fa-file-alt mr-1" style = {{color:'#212F3C' , marginRight:'5%'}}></i>Address</strong>

                <p class="text-muted">{ localStorage.getItem('address') }</p>
                
                
              </div>

       
      
              <div class="form-group row">
                        <div class="offset-sm-2 col-sm-10">
                              
                        
                         <input type = "submit"  style = {{color: '#fff' ,background:'#212F3C' , float:'right' , margin:5}} class="btn btn-success"  onClick ={this.editOrder.bind(this)}  value = "Update"/>
                        </div>
                      </div>
           
              
          </div>
            </div>
        
         <Button color="#fff" onClick={this.toggleNewOrders.bind(this)}></Button>
      <Modal isOpen={this.state.newOrderModal} toggle={this.toggleNewOrders.bind(this)} >
        <ModalHeader style ={{background:'#212F3C'}} ><p style= {{color:'#fff'}} > Update Profile</p> </ModalHeader>
        <ModalBody>
        <Label > Name </Label>
        <FormGroup   >
         <Input type="text"  value = { localStorage.getItem('name') } onChange = {(e) =>{
          let {editData} = this.state;
          editData.code = e.target.value;
          this.setState({editData})
        }}  /></FormGroup>
      <Label  >Email </Label>
       <FormGroup   >
         <Input type="text" value = { localStorage.getItem('email') } onChange = {(e) =>{
          let {editData} = this.state;
          editData.minorder = e.target.value;
          this.setState({editData})
        }}  />
        </FormGroup>
        <Label   >Contact</Label>
         <FormGroup  >
         <Input type="text" value = { localStorage.getItem('contact') } onChange = {(e) =>{
          let {editData} = this.state;
          editData.maxorder = e.target.value;
          this.setState({editData})
        }}  />
        </FormGroup>
      
        <Label   >Address</Label>
         <FormGroup>
         <Input type="text" value = { localStorage.getItem('address') } 
         />
        </FormGroup>
      
  </ModalBody>
        <ModalFooter>
          <Button  onClick={this.updateOrder.bind(this)}  style ={{background:'#212F3C'}}>Update Profile</Button>
          <Button color="secondary" onClick = {this.handleClose} >Cancel</Button>
        </ModalFooter>
      </Modal>

            
          
          
        </div>
       
     </div>
    </section>
 
  </div>

    

   );
}}
export default Profile
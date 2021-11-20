import React , {Component} from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import axios from 'axios';
import { Button, Label,Container , Row, Col, Form, Modal, ModalHeader, FormGroup ,ModalBody, ModalFooter,InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import {Link , BrowserRouter} from 'react-router-dom';

class  Contact extends Component
{
  state = {
  Items:[],
  newOrderModal: false,
     
       editData:
       {
         _id: '',
         name:'',
         image_path:'',
          vehicle_type:'',
          vehicle_number:'',
          contact:'',
          status:'',

        

       }
 };

 constructor() {
   super();
   this.getItems();
     this.handleDeleteRow = this.handleDeleteRow.bind(this);
 
    
 }
handleDeleteRow(i) {
    let Items = [...this.state.Items]
    Items.splice(i, 1)
    this.setState({ 
      Items: Items
    })
  }
   handleClose = () => {
    this.setState({ newOrderModal: false })
}
  getItems = async () =>
    {
      try{

      

    let data = await axios({
      method: 'get' ,
      url:'https://cors-anywhere.herokuapp.com/http://foodeats.herokuapp.com/ryder/5ebadda7a5c7d7001717b26b' 
    }).then(({ data}) =>
    data);
    console.log(data)
    this.setState({ Items: data.ryder})
    }catch(err)
    {
      console.log(err)
    }
 }
 toggleNewOrders()
{

  this.setState({
    newOrderModal: true
  }) 
}
 
 editOrder(_id ,name ,image_path, vehicle_type,vehicle_number ,contact,status)
 {
   console.log(name)
   localStorage.setItem('image' ,image_path)
   this.setState ({
     editData: {_id ,name ,  vehicle_type,vehicle_number ,contact,status } , newOrderModal: !this.state.newOrderModal
   })
 }

 
  
  render()
  {
 
 return (
  <div class="wrapper">
  <Header/>
  <Sidebar/>
 <div class="content-wrapper">
         <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1><b>Delivery Charges</b></h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Delivery Charges Table</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
    <section class="content">
      <div class="row">
        <div class="col-20">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Ride Information</h3>
             
              <Button color="#fff" onClick={this.toggleNewOrders.bind(this)}></Button>
      <Modal isOpen={this.state.newOrderModal} toggle={this.toggleNewOrders.bind(this)} >
        <ModalHeader style = {{background:'green' , color:'#fff'}}><p style = {{color:'#fff'}}>View Rider</p> </ModalHeader>
        <ModalBody>
        
        <FormGroup>
         <Input type="text" value ={ this.state.editData.name} onChange = {(e) =>{
          let {editData} = this.state;
          editData.name = e.target.value;
          this.setState({editData})
        }} placeholder="" /></FormGroup>
      <Label>Image</Label>
       <FormGroup>
         <img src = {localStorage.getItem('image')} style = {{width:100 , height:100}}  />
        </FormGroup>
        <Label>Vehicle Type</Label>
         <FormGroup>
         <Input type="text" value ={ this.state.editData.vehicle_type} onChange = {(e) =>{
          let {editData} = this.state;
          editData.vehicle_type = e.target.value;
          this.setState({editData})
        }} placeholder="Vehicle Type" />
        </FormGroup>
        <Label>Vehicle Number </Label>
         <FormGroup>
         <Input type="text" value ={ this.state.editData.vehicle_number} onChange = {(e) =>{
          let {editData} = this.state;
          editData.vehicle_number = e.target.value;
          this.setState({editData})
        }} placeholder="Vehicle Number" />
        </FormGroup>
         
        <Label>Contact </Label>
         <FormGroup>
         <Input type="text" value ={ this.state.editData.contact} onChange = {(e) =>{
          let {editData} = this.state;
          editData.contact = e.target.value;
          this.setState({editData})
        }} placeholder="Contact" />
        </FormGroup>
         <Label>Status</Label>
         <FormGroup>
         <Input type="text" value ={ this.state.editData.status} onChange = {(e) =>{
          let {editData} = this.state;
          editData.status = e.target.value;
          this.setState({editData})
        }} placeholder="Status" />
        </FormGroup>
      
          
        </ModalBody>
        <ModalFooter>
          
          <Button color="secondary" onClick = {this.handleClose} >Cancel</Button>
        </ModalFooter>
      </Modal>
            
            </div>
           
            <div class="card-body">
 {         this.state.Items.map((item , i) =>
            <Form inline>
          
      <Container>
      <Row>
    
        <Input type="text"   placeholder = "Name"  disabled style = {{marginTop:'5%'}}  />
        <Input style = {{marginLeft:'5%' , marginTop:'5%'}} type="text"  name = "del-charges" placeholder = "0" value = {item.name}  />
      </Row>
       <Row>
    
        <Input type="text"   placeholder = "Image"  disabled style = {{marginTop:'5%'}}  />
        <img src = {item.image_path} style = {{marginLeft:'5%' , marginTop:'5%' , width:50 , height:50}}   name = "del-charges" placeholder = "0"   />
      </Row>
      <Row>
      <Input type="text"   placeholder = "Vehicle Type"  disabled  style = {{ marginTop:'5%'}} />
         <Input type="text"  style = {{marginLeft:'5%' , marginTop:'5%'}} name = "vehicle_type" placeholder = "0" value = {item.vehicle_type}  />

      </Row>
      <Row>
       <Input type="text"   placeholder = "Vehicle Number" style = {{marginTop:'5%'}} disabled  />
        
            <Input type="text" style = {{marginLeft:'5%' , marginTop:'5%'}}  name = "vehicle_number" placeholder = "0"  value = {item.vehicle_number}  />
      </Row>
      <Row>
      <Input type="text"   placeholder = "Contact" style = {{marginTop:'5%'}} disabled  />
        
           <Input type="text" style = {{marginLeft:'5%' , marginTop:'5%'}}  name = "contact" placeholder = "0" value = {item.contact} />
      </Row>
       <Row>
      <Input type="text"   placeholder = "Status" style = {{marginTop:'5%'}} disabled  />
        
           <Input type="text" style = {{marginLeft:'5%' , marginTop:'5%'}}  name = "status" placeholder = "0" value = {item.status} />
      </Row>
     
      </Container>
      
      
      <Button style = {{float:'right' , marginTop:'5%' }}  onClick ={this.editOrder.bind(this , item._id , item.name, item.image_path , item.vehicle_type, item.vehicle_number , item.contact, item.status)}   color="success">Update</Button>
             
              </Form>   )} 
            </div>
           
          </div>
         
        </div>
       
      </div>
    
    </section>
    
  </div>
  <Footer/>
  </div>
  );
}
}
export default Contact
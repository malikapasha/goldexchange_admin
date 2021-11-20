import React, {Component } from 'react';
import Sidebar from './Sidebar';
import { Button, Form,FormText,ListGroup, List, ListGroupItem, Row, Col, Label,Dropdown,ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,  Modal, ModalHeader, FormGroup ,ModalBody, ModalFooter,InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import Header from './Header';
import {COLORS} from  './colors';
import {Progress} from 'reactstrap';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {Link , BrowserRouter} from 'react-router-dom';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter'; 
import paginationFactory from 'react-bootstrap-table2-paginator';
import Footer from './Footer';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';


class Gold extends Component
{  
  
  state = {
  Items:[],
  newOrderModal: false,
     
       editData:
       {
         id: '',
         name:'',
          email:'',
          contact:'',
        

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
      url:'https://cors-anywhere.herokuapp.com/http://foodeats.herokuapp.com/allusers' 
    }).then(({ data}) =>
    data);
    console.log(data.users)
    this.setState({Items: data.users})
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
 
 editOrder(_id, name , email, contact)
 {
   console.log(name)
   this.setState ({
     editData: {_id ,name , email, contact } , newOrderModal: !this.state.newOrderModal
   })
 }

 updateOrder()
 {
  

   let {name , email, contact} = this.state.editData;

    
   console.log(" _id : " +  this.state.editData._id)
console.log(" name: " + this.state.editData.name)
console.log(" email " + this.state.editData.email)
console.log(" contact " + this.state.editData.contact)





const url = "https://cors-anywhere.herokuapp.com/https://foodeats.herokuapp.com/updateorderstatus";
const data = { _id: this.state.editData._id, 
name:this.state.editData.name, 
email:this.state.editData.email, 
contact:this.state.editData.contact, 

  }
fetch(url, { method: 'POST', 
body: JSON.stringify({
   _id:  this.state.editData._id, 
name:this.state.editData.name, 
email:this.state.editData.email,
contact:this.state.editData.contact, 

}),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));
window.location.href = '/viewuser'
   

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
         
          
        </div>
      </div>
    </section>
    <section class="content">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title" style= {{color:COLORS.blue ,fontWeight:'bold' }} >View Users</h3>
           <button type = "submit"  class = "btn  btn-success" style= {{float:'right', marginLeft:2 , width:50 , borderRadius:'50%' , height:50 , background:COLORS.blue}} ><i class="fas fa-plus" style = {{color:COLORS.yellow}}></i></button>
             
            
            </div>
           
            <div class="card-body">
              <table class="table table-bordered table-hover">
                <thead>
                <tr>
                  <th> Id</th>
                  <th>Ad Name</th>
                  
                  <th>Description</th>
                  
                 
                    <th>Status </th>
                   
                </tr>
                </thead>
                <tbody>
                {
                  this.state.Items.map((item , i) =>
            <tr className="trow" key = {i} > 
            <td hidden = "true">{item._id}</td>
                <td>{i}</td>

                  <td>{item.name} </td>
                  <td>
                 {item.email}
                   </td>
                
                 <td>
                {item.contact}
                 </td>
                   <td>
                  <button  class = "btn  btn-sm" style = {{ marginLeft:2 , background:COLORS.blue }}><i class="fas fa-eye" style = {{color:COLORS.yellow}} ></i>
                             </button> </td>
             

               
                </tr>
                )
                 }
              

              
               
                </tbody>
                <tfoot>
                <tr>
                  <th ></th>
                  
                </tr>
                </tfoot>
              </table>
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
export default Gold


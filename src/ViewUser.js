import React , {Component , Alert} from 'react';
import Sidebar from './Sidebar';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Header from './Header';
import Content from './Content';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter'; 
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import Footer from './Footer';
import axios from 'axios';
import Dialog from 'react-dialog'
import { Button, Label,  Modal, ModalHeader,Form, FormGroup ,ModalBody, ModalFooter,InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import {Link , BrowserRouter} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Switch from "react-switch";
import {COLORS} from  './colors';

const linkk = "https://m5amas.com/product_images/";

const formatImage = (cell,row) => {
   if (row.frontside_image) {
    return (
      <span> 
        {/* <img src = { cell } class="img-circle elevation-2" style = {{width:50, height:50}} /> */}
         <text style= {{marginLeft:5}} >{row.name} </text>
 
      </span>
     
    )
     }
}

 

class  ViewUser extends Component
{
  formatWithIcon = (cell, row) => {

    return (
            
        <div>   
     
        <button  class = "btn  btn-sm" onClick = {() => this.viewImages(row._id , row.frontside_image, row.name, row.email , row.address ,row.contact , row.status , row.adsnm , row.backside_image )} style = {{ marginLeft:2 ,borderColor:COLORS.blue ,marginRight:5  }} 

        ><i class="fas fa-eye" style = {{color:COLORS.blue}} ></i>
                             </button> 
                              {/* {row.status === 'active'
                  ?
                              <a  class="btn btn-sm"  onClick = { () => this.viewStatus( row._id , 'blocked' )}  style = {{   color:COLORS.yellow , fontWeight:'bold' , borderColor:COLORS.blue}}>
                  <i style = {{color:COLORS.red }} class="fas fa-ban" >blocked  </i> 
                </a>:
                 <a  class="btn btn-sm"  onClick = { () => this.viewStatus( row._id , 'active'  )}  style = {{   color:COLORS.yellow , fontWeight:'bold' , borderColor:COLORS.blue}}>
                  <i style = {{color:COLORS.green }} class="fas fa-ban" > active </i> 
                </a>
                              } */}

                    <a  class="btn btn-sm"  onClick = { () => this.viewStatus( row._id , 'blocked' )} 
                     style = {{   color:COLORS.yellow , fontWeight:'bold' , borderColor:COLORS.blue}}>
                  <i style = {{color:COLORS.red }} class="fas fa-ban" >delete  </i> 
                </a>

                 <a  class="btn btn-sm"  onClick = { () =>
                 { 
                      localStorage.setItem('adsnum' , row.adsnm);
                   this.viewAdAdds( row._id)} } style = {{  
                   marginLeft:5, color:COLORS.yellow , fontWeight:'bold' , borderColor:COLORS.blue}}>
                  <i style = {{color:COLORS.green }} class="fas fa-ban" >Add Ads </i> 
                </a>


                            
                             </div>
    )
}   
   

  
    apiUsers = [];
 
     state = {
  Items:[],
  Itemss:[],
   title:'',
price:'',  
description:'',
status:'',
link:'',
file_image:'',
  


        tuserid:'0',
       loading: false,
        newOrderModal: false,
       newInfoModel:false,
       newStatusModal:false,
       isDialogOpen: false,
       isSwitchOn:false,
       ad_ads:1,
       editData:
       {
         _id: '',
 
       } ,
       statusData:
       {
         _id:'',
         status:'',
       },

       newData:
 {
   user_id:'',
 
      
 },

 columns: [{  

                  dataField: 'frontside_image',  

                  text: 'User Name' ,
                  
                  formatter:formatImage ,
                   sort: true

                }, 
                 {  

                  dataField: 'contact',  

                  text: 'Contact',
                   

                  sort: true  

             },  

                {  

                        dataField: 'address',  

                        text: 'Address',  

                        sort: true  

                      },
                      
                       {  

                        dataField: 'adsnm',  

                        text: 'Ads Remaining',  

                        sort: true  

                      },
                     
               {

               text:'Action',
              sort: true  ,
            formatter: this.formatWithIcon,
               }, ] ,
                    
    

                      }
    
            
                    
 constructor() {
   super();
  this.getItems();
    
  
    this.handleDeleteRow = this.handleDeleteRow.bind(this);
  
 }
   
   handleChangeAds = event =>{

this.setState({ [event.target.name]:event.target.value } )

  }

    
  // editObject(row) {
  //       console.log('edit',row);
  //   }
    
handleDeleteRow(i) {
    let Items = [...this.state.Items]
    Items.splice(i, 1)
    this.setState({ 
      Items: Items
    })
  }

   openDialog = () => this.setState({ isDialogOpen: true })
 
    handleClosee = () => {

      this.setState({ isDialogOpen: false })

    }

     handleAds = () => {

        this.setState({newInfoModal : false })
      this.setState({adadmodal : false })

      // alert(this.state.ad_ads);

        // localStorage.setItem('_id' , _id);
      const url = "https://cbwork.herokuapp.com/updateadsnum";
const data = {
   userid: localStorage.getItem("_id"), 
adsnm:this.state.ad_ads,
  }

fetch(url, { method: 'POST', 
body: JSON.stringify({
      userid: localStorage.getItem('_id') ,
   adsnm: this.state.ad_ads,
   
}),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.then((data) => {
      
      console.log(data)
        console.log(data.data)
      if(data.status == true)

    {
      alert('updated successfully')
      window.location.reload(true)

    }
   
})
.catch(error => console.error('Error:', error))

    }

  handleClose = () => {
    this.setState({newInfoModal : false })
      this.setState({adadmodal : false })
}
StatusClose = () => {
    this.setState({ newStatusModal: false })
}
closeRes = () =>
{
  this.setState({newInfoModal : false })
}
 toggleNewOrders()
{

  this.setState({
    newOrderModal: true
  }) 
}
 toggleNewStatus()
{

  this.setState({
    newStatusModal: true
  }) 
}
toggleResOrders()
{

  this.setState({
    newInfoModal: true
  }) 
}
 
  viewStatus(_id, status)
 {
   console.log('Id is: '+_id)
   localStorage.setItem('status',status);
  localStorage.setItem('_id' , _id);
    this.setState ({
     statusData: {_id , status  } , newStatusModal: !this.state.newStatusModal
   })
   
   
     
 }

 
  viewAdAdds(_id)
 {

  this.setState({ad_ads:1})
  localStorage.setItem('_id' , _id);
    this.setState ({
      adadmodal: !this.state.adadmodal
   })
   
   
     
 }

 async updateStatus(_id,fstatus)
 {
  

   let {status} = this.state.statusData;
  
  
console.log(localStorage.getItem('_id'));
console.log(localStorage.getItem('activ'));

 
const url = "https://cbwork.herokuapp.com/deleteusernow";
const data = { _id:  this.state.statusData._id, 
status:this.state.statusData.status,
  }

fetch(url, { method: 'POST', 
body: JSON.stringify({
      _id: localStorage.getItem('_id') ,
   status: localStorage.getItem('status'),
   
}),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.then((data) => {
      
      console.log(data)
      if(data.status == true)

    {
      alert('updated successfully')
      window.location.reload(true)

    }
   
})
.catch(error => console.error('Error:', error))
 }
  
  newOrder(userid)
 {
   console.log(userid)
  //  this.setState ({
  //    newInfoModal: !this.state.newInfoModal
  //  })

  //  getItemss();
 }
 

  onChangeHandler(e) {
        console.log(e.target.value);
        let newArray = this.apiUsers.filter((d)=>{
          console.log(d)
            let searchValue = d.contact.toLowerCase();
            return searchValue.indexOf(e.target.value) !== -1;
        });
        console.log(newArray)
        this.setState({
            Items:newArray
        })
    }
  getItems = async () =>
    {
    

     
      try{
         this.setState({loading:false});
    let data = await axios({
      method: 'get' ,
      url:'https://cbwork.herokuapp.com/allusers' 
    }).then(({ data}) =>
    data);
    console.log(data.users)
    this.apiUsers =  data.users;
    this.setState({Items: data.users , loading:true})
  
    }
    catch(err)
    {
      console.log(err)
    }
 }

  viewImages(_id, image , name , email , address, contact, status , adsnum , bimage)
 {
   
    this.setState ({
     editData: {_id  } , newInfoModal: !this.state.newInfoModal,
   })
   
    localStorage.setItem('image',image);
    localStorage.setItem('name' , name);
      localStorage.setItem('email' , email);
        localStorage.setItem('address' , address);
          localStorage.setItem('contact' , contact);
          localStorage.setItem('status' , status);
          localStorage.setItem('adsnum' , adsnum);
            localStorage.setItem('bimage' , bimage);
     
 }
 
   render()
  {
   
    const defaultSorted = [{
  dataField: 'name',
  order: 'desc'
}];
   


     const {loading} = this.state;
 
 return (
  <div class="wrapper" >
  <Header/>
  <Sidebar/>
 <div class="content-wrapper" >
         <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
           
            
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
  
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Users Table</li>

               <Modal isOpen={this.state.newStatusModal} toggle={this.toggleNewStatus.bind(this)}>
                  
        <ModalHeader  style = {{background:COLORS.blue  , color:'#fff'}} ><p style = {{color:COLORS.yellow}}>Do You want To Delete User?</p> </ModalHeader>
      
 <ModalBody> {loading &&    <div
  style={{
      width: "100%",
     height: "100",
       display: "flex",
       justifyContent: "center",
        alignItems: "center",
     
      }}
    > <span> <Loader type="ThreeDots" color={COLORS.blue} height="50" width="100"     /></span></div> 
 }</ModalBody>
        <ModalFooter>
       
          <Button   style = {{background:COLORS.blue , color:COLORS.white}}  onClick= {this.updateStatus.bind(this,localStorage.getItem('_id'), localStorage.getItem('status'))} >yes </Button>
          
            <Button color="secondary" onClick={this.StatusClose}>Cancel</Button>
        </ModalFooter>
      </Modal>   

            </ol>
          </div>
        </div>
      </div>
    </section>
    <section class="content" >
      {!loading &&    <div
  style={{
      width: "100%",
     height: "100",
       display: "flex",
       justifyContent: "center",
        alignItems: "center",
        marginTop:'15%'
      }}
    > <span> <Loader type="ThreeDots" color={COLORS.blue} height="50" width="100"     /></span></div> ||
    <div class="card">
            <div class="card-header"  style= {{  background : COLORS.blue }}>
              <h3 class="card-title"  style = {{color:'#fff' , fontWeight:'bold'}}  >View Users</h3>
             
              
               
              
             
              <Button color="#fff" onClick={this.toggleNewOrders.bind(this)}></Button>
      <Modal isOpen={this.state.newOrderModal} toggle={this.toggleNewOrders.bind(this)} >
        
      </Modal>
             </div>
            <div class="card-body">
         <Input type="text"  value={this.state.value}  placeholder="Search for Contact"  onChange={this.onChangeHandler.bind(this)} style = {{float:'right' , width:'20%' , marginBottom:5 ,borderColor: 'gray', borderWidth: 1, color : "#15238C"}} />
                            <BootstrapTable   
                        style = {{background:'#f2a51a'}}  
bootstrap4
                        hover  


                        keyField='_id'   

                        data={ this.state.Items }  
                         
  
    defaultSorted={ defaultSorted } 
                        columns={ this.state.columns }

                          // cellEdit={ cellEditFactory({ mode: 'click' })}
                    pagination={ paginationFactory() } 
                  >

                  
                  </BootstrapTable>
            
            </div>
          
          </div>
      }
      
    </section>
          <Button color="#fff" onClick={this.toggleResOrders.bind(this)}></Button>
      <Modal isOpen={this.state.newInfoModal} size = "sm" style = {{borderRadius:50 , borderWidth:2, borderColor:'#000'}}  >
       <ModalHeader 
       style = {{ color:COLORS.white , display: 'flex' , height:80 , borderRadius:5}}>
       {/* <img src = {localStorage.getItem('bimage')} style = {{width:'100%', height:80}} /> */}
       
        <FormGroup >
        
         {/* <img class="img-circle" src= {localStorage.getItem('image')} height={80}
    width={80}
    style={{
        position: 'absolute', left: '50%', top: '15%',
        transform: 'translate(-50%, -50%)'
    }}  /> */}
     {/* <button class = "btn btn-sm" style = {{  borderRadius:5 , background:COLORS.yellow, borderColor:COLORS.white, position: 'absolute', left: '22%', top: '15%',
        transform: 'translate(-50%, -50%)'}}>{localStorage.getItem('status')} </button> */}

       <button class = "btn btn-sm" style = {{ borderRadius:5 , background:'white' , justifyContent:'flex-end' , left:'85%', position:'absolute', borderColor:COLORS.white, top:'19%' ,  transform: 'translate(-50%, -50%)'}}>
       Ads:{localStorage.getItem('adsnum')}</button>
        </FormGroup>
         </ModalHeader>
        
        
        
        <ModalBody style= {{marginTop:'5%'}} >
        
        <Label style = {{ marginTop:'2%'  ,}}>User Name:</Label>
       <FormGroup >
        <button  style = {{display:'flex' , borderOpacity:100, color:COLORS.black, margin:2,  height:30, background:COLORS.half, width:'100%', borderRadius:5, elevation:2, borderStyle:'solid' ,borderColor:COLORS.gray, borderWidth:1, justifyContent:'space-between' , alignItems:'center'}} > {localStorage.getItem('name')} </button>
        </FormGroup>
          <Label>Email:</Label>
      <FormGroup>
       <button  style = {{display:'flex' , color:COLORS.black,   background:COLORS.half ,  height:30, width:'100%', height:30, borderRadius:5,  borderStyle:'solid' , elevation:2,borderColor:COLORS.gray, borderWidth:1, justifyContent:'space-between' , alignItems:'center'}} > {localStorage.getItem('email')} </button>
      </FormGroup> 
        <Label>Country:</Label>
       <FormGroup>
        <button  style = {{display:'flex',color:COLORS.black, margin:2, background:COLORS.half ,  height:30, width:'100%', borderRadius:5,  borderStyle:'solid' , elevation:2,borderColor:COLORS.gray, borderWidth:1, justifyContent:'space-between' , alignItems:'center'}} > {localStorage.getItem('address')}</button>
 </FormGroup>
   <Label>Contact:</Label>
  <FormGroup>
         <button  style = {{display:'flex' , color:COLORS.black, margin:2, background:COLORS.half ,  height:30, width:'100%', borderRadius:5,  borderStyle:'solid' , elevation:2,borderColor:COLORS.gray, borderWidth:1, justifyContent:'space-between' , alignItems:'center'}} >{localStorage.getItem('contact')}</button>
         
      </FormGroup> 
           
          
        </ModalBody> 
        <ModalFooter>
       
          <Button style = {{justifyContent:'center' , width:'100%' , background:COLORS.blue}}  onClick = {this.handleClose} >Cancel</Button>
        </ModalFooter>
      </Modal>


       <Modal isOpen={this.state.adadmodal} size = "sm" style = {{borderRadius:50 , borderWidth:2, borderColor:'#000'}}  >
       <ModalHeader 
       style = {{ color:COLORS.white , display: 'flex' , height:80 , borderRadius:5}}>
     
        <FormGroup >
        
      
       <button class = "btn btn-sm" style = {{ borderRadius:5 , background:'white' , justifyContent:'flex-end' , left:'85%', position:'absolute', borderColor:COLORS.white, top:'19%' ,  transform: 'translate(-50%, -50%)'}}>
       Ads:{localStorage.getItem('adsnum')}</button>
        </FormGroup>
         </ModalHeader>
        
        
        
        <ModalBody style= {{marginTop:'5%'}} >
        
     
   <Label>Add Ads</Label>
  <FormGroup>
  
      <select  name = "type" class="form-control" onChange={this.handleChangeAds} name = "ad_ads">
                <option value="1">Provide 1 Ad</option>
				
			      	<option value="2">Provide 2 Ads</option>
              	<option value="5">Provide 5 Ads</option>
              </select>
              

         {/* <button  style = {{display:'flex' , color:COLORS.black, margin:2, background:COLORS.half ,  height:30,
          width:'100%', borderRadius:5,  borderStyle:'solid' , elevation:2,borderColor:COLORS.gray,
           borderWidth:1, justifyContent:'space-between' , alignItems:'center'}} >
           {localStorage.getItem('contact')}
           </button> */}
         
      </FormGroup> 
           
          
        </ModalBody> 
        <ModalFooter>
             <Button style = {{justifyContent:'center' , width:'100%' , background:COLORS.blue}}  onClick = {this.handleAds} >Add</Button>
    
       
          <Button style = {{justifyContent:'center' , width:'100%' , background:COLORS.blue}}  onClick = {this.handleClose} >Cancel</Button>
        </ModalFooter>
      </Modal>

  </div>
    
  <Footer/>

  </div>
      
  );
}
}


export default ViewUser
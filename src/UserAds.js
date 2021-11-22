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
   if (row.feature_image) {
    return (
      <span> 
        <img src = { cell } class="img-circle elevation-2" style = {{width:50, height:50}} />
         <text style= {{marginLeft:5}} >{row.name} </text>
 
      </span>
     
    )
     }
}

 

class  UserAds extends Component
{
  formatWithIcon = (cell, row) => {

    return (
            
        <div>   
             
                               {/* {row.status === 'active'
                  ?
                              <a  class="btn btn-sm"  onClick = { () => this.viewStatus( row._id , 'blocked' )}  style = {{   color:COLORS.yellow , fontWeight:'bold' , borderColor:COLORS.blue , marginRight:5}}>
                  <i style = {{color:COLORS.red }} class="fas fa-ban" >blocked</i> 
                </a>:
                 <a  class="btn btn-sm"  onClick = { () => this.viewStatus( row._id , 'active'  )}  style = {{   color:COLORS.yellow , fontWeight:'bold' , borderColor:COLORS.blue , marginRight:5}}>
                  <i style = {{color:COLORS.green }} class="fas fa-ban" > active </i> 
                </a>
                              } */}
                              
                                  <a  class="btn btn-sm"  
                                  onClick = { () => this.viewStatus( row._id , 'blocked'  )}  style = {{   color:COLORS.yellow , fontWeight:'bold' , borderColor:COLORS.blue , marginRight:5}}>
                  <i style = {{color:COLORS.red }} class="fas fa-ban" > Delete </i> 
                </a>

                 {/* <a  class="btn"style = {{ background:COLORS.blue,  color:COLORS.red}}>
                  <i style = {{color:COLORS.red }} class="fas fa-flag" ></i> 
                </a>   */}
                            
                             <a  class="btn btn-sm"  onClick = { () =>
                 { 
                      localStorage.setItem('adid' , row._id);
                   this.viewAdAdds( row._id)} } style = {{  
                   marginLeft:5, color:COLORS.yellow , fontWeight:'bold' , borderColor:COLORS.blue}}>
                  <i style = {{color:COLORS.green }} class="fas fa-ban" >Make it Premimum </i> 
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
  


ad_ads:1,
        tuserid:'0',
       loading: false,
       load:false,
        newOrderModal: false,
       newInfoModel:false,
       newStatusModal:false,
       isDialogOpen: false,
       isSwitchOn:false,
       editData:
       {
         
         _id: '',
 
       } ,
       statusData:
       {
         userid:'',
         status:'',
       },

       newData:
 {
   userid:'',
 
      
 },

 columns: [

   {  

                        dataField: 'feature_image',  

                        text: 'Image', 
                         formatter:formatImage , 

                        sort: true  

                      }, 

  {  

                  dataField: 'title',  

                  text: 'Ad Title' ,
                  
                  
                   sort: true

                }, 
                  {  

                  dataField: 'user_name',  

                  text: 'User Name' ,
                  
                  
                   sort: true

                }, 

                 {  

                  dataField: 'contact',  

                  text: 'Contact' ,
                  
                  
                   sort: true

                }, 

                 {  

                  dataField: 'weight',  

                  text: 'Weight',
                   

                  sort: true  

             },  

                {  

                        dataField: 'carat',  

                        text: 'Carat',  

                        sort: true  

                      },

                       {  

                        dataField: 'setadpremium',  

                        text: 'Premium Till',  

                        sort: true  

                      },
                       {  

                        dataField: 'country',  

                        text: 'Country',  

                        sort: true  

                      },


                      //  {  

                      //   dataField: 'condition',  

                      //   text: 'Condition',  

                      //   sort: true  

                      // }, 
                      
                      //  {  

                      //   dataField: 'receipt',  

                      //   text: 'Receipt',  

                      //   sort: true  

                      // },
                      //  {  

                      //   dataField: 'notes',  

                      //   text: 'Notes',  

                      //   sort: true  

                      // },
                     
               {

               text:'Action',
              sort: true  ,
            formatter: this.formatWithIcon,
               }, ] ,
                    
    

                      }
    
            
                    
 constructor() {
   super();
  this.getItems();
    
  
    
 }
   
    
  // editObject(row) {
  //       console.log('edit',row);
  //   }
    

    handleAds = () => {

        this.setState({newInfoModal : false })
      this.setState({adadmodal : false })

      // alert(this.state.ad_ads);
      console.log(this.state.ad_ads)

        let newDate = new Date()
let date = newDate.getDate();
let month = newDate.getMonth() + 1;
let year = newDate.getFullYear();

let newday =  date + 1;

 if(this.state.ad_ads === 1)
{
newday = date + 1;
console.log("here 1")
}
else{
  newday = date + 3;
  console.log("here 3")
}

let newdate =  `${year}${'-'}${month<10?`0${month}`:`${month}`}${'-'}${newday}`

console.log(newdate);

      // return;
        // localStorage.setItem('_id' , _id);
      const url = "https://cbwork.herokuapp.com/setadpremium";
const data = {
   userid: localStorage.getItem("_id"), 
setadpremium:newdate,
  }

fetch(url, { method: 'POST', 
body: JSON.stringify({
      userid: localStorage.getItem("_id"), 
setadpremium:newdate,
   
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

   viewAdAdds(_id)
 {

  this.setState({ad_ads:1});

  localStorage.setItem('_id' , _id);
    this.setState ({
      adadmodal: !this.state.adadmodal
   })
   
   
     
 }

   handleChangeAds = event =>{

this.setState({ [event.target.name]:event.target.value } )
  }

 
    handleClosee = () => this.setState({ isDialogOpen: false })
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
 
  viewStatus(userid, status)
 {
   localStorage.setItem('status',status);
  localStorage.setItem('_id' , userid);
    this.setState ({
     statusData: {userid , status  } , newStatusModal: !this.state.newStatusModal
   })
   
   
     
 }
 async updateStatus(userid,fstatus)
 {
  

   let {status} = this.state.statusData;
  
  
console.log(localStorage.getItem('_id'));
console.log(localStorage.getItem('status'));


 
const url = "https://cbwork.herokuapp.com/deleteadnow";


fetch(url, { method: 'POST', 
body: JSON.stringify({
      _id: localStorage.getItem('_id') ,

   
}),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.then((data) => {
   //  this.setState({load:false})
      console.log(data)
      if(data.status == true)

    {
        //    this.setState({load:true})
      alert('Deleted successfully')
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
            let searchValue = d.title.toLowerCase();
            return searchValue.indexOf(e.target.value) !== -1;
        });
        console.log(newArray)
        this.setState({
            Items:newArray
        })
    }

     onChangeHandlernumber(e) {
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
        this.setState({loading:false ,});

      try{

      

    let data = await axios({
      method: 'get' ,
      url:'https://cbwork.herokuapp.com/alladsadmin' 
    }).then(({ data}) =>
    data);
    console.log(data.data)
     this.apiUsers =  data.data;
    this.setState({Items: data.data ,  loading:true })
    }catch(err)
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
   


     const {loading , load} = this.state;
 
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
              <li class="breadcrumb-item active">User Ads Table</li>

<Modal isOpen={this.state.adadmodal} size = "sm" style = {{borderRadius:50 , borderWidth:2, borderColor:'#000'}}  >
       <ModalHeader 
       style = {{ color:COLORS.white , display: 'flex' , height:80 , borderRadius:5}}>
     
        <FormGroup >
        
      
       {/* <button class = "btn btn-sm" style = {{ borderRadius:5 , background:'white' , justifyContent:'flex-end' , left:'85%', position:'absolute', borderColor:COLORS.white, top:'19%' ,  transform: 'translate(-50%, -50%)'}}>
       Ads:{localStorage.getItem('adsnum')}</button> */}
        </FormGroup>
         </ModalHeader>
        
        
        
        <ModalBody style= {{marginTop:'5%'}} >
        
     
   <Label>Select no of Days:</Label>
  <FormGroup>
         <select  name = "type" class="form-control" onChange={this.handleChangeAds} name = "ad_ads">
                <option value="1">Premimum for 1 Day</option>
				
			      	<option value="3">Premimum for 3 Days</option>
              
              </select>
         
      </FormGroup> 
           
          
        </ModalBody> 
        <ModalFooter>
             <Button style = {{justifyContent:'center' , width:'100%' , background:COLORS.blue}}  onClick = {this.handleAds} >Done</Button>
    
       
          <Button style = {{justifyContent:'center' , width:'100%' , background:COLORS.blue}}  onClick = {this.handleClose} >Cancel</Button>
        </ModalFooter>
      </Modal>

               <Modal isOpen={this.state.newStatusModal} toggle={this.toggleNewStatus.bind(this)}>
                  
        <ModalHeader  style = {{background:COLORS.blue  , color:'#fff'}} >
        <p style = {{color:'#fff'}}>Sure to delte Item?</p> </ModalHeader>
      <ModalBody>
 {!load && <span> <Loader type="ThreeDots" color={COLORS.blue} height="50" width="100" style = {{marginLeft:"30%"}}  /></span>  }
      </ModalBody>
 
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
              <h3 class="card-title"  style = {{color:'#fff' , fontWeight:'bold'}}  >View Users Ads</h3>
             
              
               
              
             
              <Button color="#fff" onClick={this.toggleNewOrders.bind(this)}></Button>
      <Modal isOpen={this.state.newOrderModal} toggle={this.toggleNewOrders.bind(this)} >
        
      </Modal>
             </div>
            <div class="card-body">
              <Input type="text"  value={this.state.value} 
               placeholder="Search for User Contact"  onChange={this.onChangeHandlernumber.bind(this)}
                style = {{float:'right' , width:'20%' , marginBottom:5 ,borderColor: 'gray', borderWidth: 1, color : "#15238C"}} />
       

         <Input type="text"  value={this.state.value} 
          placeholder="Search for Title"  onChange={this.onChangeHandler.bind(this)} style = {{marginRight:15,float:'right' , width:'20%' , marginBottom:5 ,borderColor: 'gray', borderWidth: 1, color : "#15238C"}} />
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
       
      
  </div>
    
  <Footer/>

  </div>
      
  );
}
}


export default UserAds
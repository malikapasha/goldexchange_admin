import React , {Component} from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import axios from 'axios';
import { Button, Label,  Modal, ModalHeader, FormGroup ,ModalBody, ModalFooter,InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import {Link , BrowserRouter} from 'react-router-dom';
import Loader from 'react-loader-spinner';

class  ViewTeam extends Component
{
  state = { Items: [],
  title:'',
price:'',  
description:'',
status:'',
link:'',
file_image:'',

  Itemss:[],


        tuserid:'0',
       loading: false,
   newOrderModal: false,
       newInfoModel:false,
       editData:
       {
         _id: '',
 
       } ,
       newData:
 {
 
      
 },
                
              } 
 
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
toggleResOrders()
{

  this.setState({
    newInfoModal: true
  }) 
}
viewStatus(_id,title ,description , price  , link)
 {
   

    this.setState ({
     editData: {_id  } , newOrderModal: !this.state.newOrderModal
   })
     localStorage.setItem('_id', _id);
   localStorage.setItem('title', title);
     localStorage.setItem('des', description);
       localStorage.setItem('price',price);
           localStorage.setItem('link',link);
    
 }
 getId(_id )
    {
    localStorage.setItem('_id', _id);

 }
  newOrder(userid)
 {
   console.log(userid)
  //  this.setState ({
  //    newInfoModal: !this.state.newInfoModal
  //  })

  //  getItemss();
 }
 getItems = async () =>
    {
     
      try{
         this.setState({loading:false});
    let data = await axios({
      method: 'get' ,
      url:'https://cbwork.herokuapp.com/allfolders' 
    }).then(({ data}) =>
    data);
    console.log(data)
    this.apiUsers =  data;
    this.setState({Items: data , loading:true})
  
    }
    catch(err)
    {
      console.log(err)
    }
 }
 getItemss = async (userid) =>
    {

 console.log('userid');
      console.log(userid);
      this.setState ({
     newInfoModal: !this.state.newInfoModal,  tuserid:userid
   });

      // this.setState({loading:true, tuserid:userid });
      try{
    let data = await axios({
      method: 'get' ,
      url:'https://cbwork.herokuapp.com/bankaccount/'+userid
    }).then(({ data}) =>
    data);
    console.log(data.data)
    this.setState({Itemss: data.data})
    }catch(err)
    {
      console.log(err)
    }


 }
   handleChange = event =>{
 
this.setState({ [event.target.name]:event.target.value } )
  
}
/*handleImageChange = event => {
   let file_image = event.target.files;
   console.log('datafiles' , file_image)
   let reader = new FileReader();
   reader.readAsDataURL(file_image[0])
   reader.onload =(e) =>
   {
     console.log('data' , e.target.result)
   }
  };*/
handleSubmit = event =>{
event.preventDefault();

console.log(" price: " + this.state.price)

console.log(" title: " + this.state.title)
console.log(" description: " + this.state.description)
console.log("link: " + this.state.link)
//console.log("image: " + this.state.file_image)






const url = "https://cbwork.herokuapp.com/createfolder";
const data = {
 
  title:this.state.title, 
price:this.state.price ,
description:this.state.description,
link:  this.state.link,
file_image:"https://spokeright.com/food/restwo.jpg",


  }
fetch(url, { method: 'POST', 
body: JSON.stringify(data),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.then((data) => {
      
      console.log(data)
      if(data.status == true)
      {
          alert('folder has been added successfully');
           window.location.reload(true)
           
      }
    
      
})
.catch(error => console.error('Error:', error));
 
  } 
 
 
 
  render()
  {
 
  const {loading} = this.state;
 return (

  <div class="wrapper">
  <Header/>
  <Sidebar/>
 <div class="content-wrapper">
         <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
           <Button color="#fff" onClick={this.toggleNewOrders.bind(this)}></Button>
      <Modal isOpen={this.state.newOrderModal} toggle={this.toggleNewOrders.bind(this)} >
        <ModalHeader style = {{background:'#212F3C' , color:'#fff'}}><p style = {{color:'#fff'}}>Folders Detail </p> </ModalHeader>
        <ModalBody>
           <Label>Title </Label>
        <FormGroup>
         <Input type="text"   value = {localStorage.getItem('title')}
           placeholder="title"  />
        </FormGroup>
         
       
          <Label> Description </Label>
        <FormGroup >
         <textarea maxLine = "2" style = {{width:'100%' , padding:8, height:'80%' , borderRadius:'15' ,}}
          placeholder="description"  value = {localStorage.getItem('des') }/>
        </FormGroup>
          <Label>Price</Label>
        <FormGroup>
         <Input type="price"     value = {localStorage.getItem('price')} />
        </FormGroup>
         <Label>Link</Label>
        
          <FormGroup>
         <Input type="text"     value = {localStorage.getItem('link')} />
        </FormGroup>
        
        </ModalBody>
        <ModalFooter>
         
          <Button color="secondary" onClick = {this.handleClose} >Cancel</Button>
        </ModalFooter>
      </Modal>
            <h1><b>Folders</b></h1>
           
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Folder Table</li>
              <Button color="#fff" onClick={this.toggleResOrders.bind(this)}></Button>
      <Modal isOpen={this.state.newInfoModal} >
        <ModalHeader style = {{background:'#212F3C'  , color:'#fff'}}  ><p style = {{color:'#fff'}} >Add Folder </p></ModalHeader>
        
            <ModalBody>
         
         
    
          <Label>Title </Label>
        <FormGroup>
         <Input type="text"  
           placeholder="title" name = "title"  onChange={this.handleChange}   />
        </FormGroup>
      
         
       
          <Label> Description </Label>
        <FormGroup>
         <Input type="text" 
          placeholder="description" name = "description"  onChange={this.handleChange}  />
        </FormGroup>
          <Label>Price</Label>
        <FormGroup>
         <Input type="number"   placeholder="price" name = "price"  onChange={this.handleChange}   />
        </FormGroup>
         <Label>Link</Label>
        <FormGroup>
         <Input type="text"   name = "link"  onChange={this.handleChange}   />
        </FormGroup>
          <Label>Image</Label>
        <FormGroup>
         <Input type="file"  name = "image_path"  onChange = {this.handleChange}   />
        </FormGroup>
        </ModalBody> 
        <ModalFooter>
          <Button style = {{background:'#212F3C'}} onClick= {this.handleSubmit} > Add</Button>
          <Button color="secondary" onClick = {this.closeRes} >Cancel</Button>
        </ModalFooter>
      </Modal>

            </ol>
          </div>
        </div>
      </div>
    </section>
    <section class="content">
    <div class="card">
            <div class="card-header" style = {{background:'#212F3C' }}>
              <h3 class="card-title" style = {{color:'#fff'}}>Folders</h3>
               {!loading && <span> <Loader type="TailSpin" color="#fff" height="50" width="100"  style = {{ marginLeft: "47%"}}  /></span>  }
                
     <button type = "submit"  class = "btn  btn-success" style= {{float:'right', marginLeft:2 , width:50 , borderRadius:'50%' , height:50 , background:"#fff"}}  onClick={this.getItemss.bind(this )} ><i class="fas fa-plus" style = {{color:'#212F3C'}}></i></button>
            </div>
         
            <div class="card-body">
              <table  class="table  table-hover" style = {{ borderCollapse: 'collapse'}}>
               
                 <tbody >
                               {
             this.state.Items.map((item , i) => 
             <tr >
            <td  >  
                 
            
             <div >
             
            <div class="info-box "  style = {{width:'60%'}}>
              <span style = {{background:'#212F3C'}} class="info-box-icon  elevation-1"><img src = {item.file_image} style = {{width:50 , height:50}} /></span>

                <div class="info-box-content">
                <span class="info-box-text">{item.title }</span>
                 <Link to = "payoutdetails">
                <span class="info-box-number" onClick ={this.getId.bind(this , item._id , localStorage.setItem('file' , item._id) )} >
                {item.description}
                 
                </span>
               </Link>
                   
                    <i class="fas fa-edit fa-lg" style = {{float:'right'}} onClick = {this.viewStatus.bind(this , item._id, item.title , item.description , item.price  , item.link)}></i> 
              </div>
              </div>
         </div>
             
            
               
            
                 
                
              
                </td>
                </tr>
                  )}
                </tbody>
           
                
              </table>
            </div>
          
          </div>
      
    </section>
    
  </div>
  <Footer/>
  </div>
  );
}
}
export default ViewTeam
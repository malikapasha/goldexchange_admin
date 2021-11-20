import React, {Component } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import Content from './Content';
import {COLORS} from  './colors';
import { Button, Label,  Modal, ModalHeader,Form, FormGroup ,ModalBody, ModalFooter,InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import {Link , BrowserRouter} from 'react-router-dom';
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead , MDBDataTable  } from 'mdbreact';
import Loader from 'react-loader-spinner';
const linkk = "https://m5amas.com/product_images/"

class Complains extends Component
{
   formatWithIcon = (cell,row) => {
    return(
        <span>  <button  onClick= { ()=> this.emailuser(row.useremail)} class = "btn  btn-sm" style = {{background:'#fff', borderColor:'red' , color:'red'}}
                             >Send Email:<img src = "https://cdn4.iconfinder.com/data/icons/social-media-2210/24/Gmail-128.png" style ={{width:20 , height:20 , }} />
                            </button></span>
    )
}   
 

  state = { Items: [],  

              
               columns: [
                {  

                        dataField: 'username',  

                        text: 'Name',  

                        sort: true  

                      },  
             {  

                  dataField: 'useremail',  

                  text: 'Email',  

                       sort: true  ,


             },
             {  

                  dataField: 'comment',  

                  text: 'Comment',  

                 sort:true  

                },
               {


                text:'Action',
              sort: true  ,
                   formatter: this.formatWithIcon,
               },
               ],
                
            
           
  
            
  loading:false,
    
 };
apiUsers = [];
 constructor() {
   super();
   this.getItems();
     this.handleDeleteRow = this.handleDeleteRow.bind(this);
       
 
    

 }
   
    onChangeHandler(e) {
        console.log(e.target.value);
        let newArray = this.apiUsers.filter((d)=>{
          console.log(d)
            let searchValue = d.useremail.toLowerCase();
            return searchValue.indexOf(e.target.value) !== -1;
        });
        console.log(newArray)
        this.setState({
            Items:newArray
        })
    }
onClick(){
   console.log(this.props.email);
  window.location.href = `mailto:${this.props.email}`;
  }
handleDeleteRow(i) {
    let Items = [...this.state.Items]
    Items.splice(i, 2)
    this.setState({ 
      Items: Items
    })
  }
  emailuser(useremail)
 {
        console.log(useremail);
  // window.location.href = `mailto:${this.props.email}`;
        window.location.href = "mailto:"+useremail;
 }
 
  getItems = async () =>
    {
     this.setState({loading:false});


      try{

      

    let data = await axios({
      method: 'get' ,
      url:'https://cbwork.herokuapp.com/complains' 
    }).then(({ data}) =>
    data);
    console.log(data.complains)
    this.apiUsers =  data.complains;
   
    this.setState({Items: data.complains,  loading:true , })
       
    
    }catch(err)
    {
      console.log(err)

    }
 
}

    render()
    {
        if(this.state.Items === null) 
         {
           return(
              <div class="wrapper">

   <Header/>
      <Sidebar/>
      <div class="content-wrapper">
 
         
             
        <img src = "https://dawer.ly/assets/img/not-found.png" style = {{alignItems:'center', justifyContent:'center' , marginLeft:'40%' , marginTop:'10%' }}  />
      </div> 
         <Footer/>    </div>)

         }
         else{

         
      const defaultSorted = [{
  dataField: 'email',
  order: 'desc'
}];
   
      
        const {loading} = this.state;

  return(
 <div class="wrapper">

   <Header/>
      <Sidebar/>
      <div class="content-wrapper">
 
         <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1> </h1>
          </div>
          <div class="col-sm-12">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Complain Table</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
    <section class="content">
      <div class="row">
        <div class="col-12">
      { !loading &&    <div
  style={{
      width: "100%",
     height: "100",
       display: "flex",
       justifyContent: "center",
        alignItems: "center",
        marginTop:'15%'
      }}
    > <span> <Loader type="ThreeDots" color={COLORS.blue} height="50" width="100"     /></span></div> ||<div class="card">
            <div class="card-header"  style = {{background:COLORS.blue}}>
              <h3 class="card-title"  style = {{color:'#fff'}}>Complain Table  </h3>
                   
                         </div>
            <div class="card-body">
            <Input type="text"  value={this.state.value}  placeholder="Search for..."  onChange={this.onChangeHandler.bind(this)} style = {{float:'right' , width:'20%' ,  marginBottom:5 ,borderColor: 'gray', borderWidth: 1, color : "#15238C"}} />
           
             <BootstrapTable   
                       
                        hover
               
                        keyField='_id'    
                     
                       

                        data={ this.state.Items }   
                     
                       defaultSorted={ defaultSorted }

                        columns={ this.state.columns }
                    pagination={ paginationFactory() } 
                      rows = {this.state.rows}>
                     
                    </BootstrapTable>
            
            </div>   
             
            </div>
          
        
          }
        </div>
        
 
      
       
      </div>
    
    </section>
    

  
          
        </div>
        <Footer/>
         </div>
      
        
  );
    }
    }

}

export default Complains

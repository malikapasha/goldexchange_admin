import React, {Component } from 'react';
import {BrowserRouter , Link , Redirect} from 'react-router-dom';
import Header from'./Header';
import Sidebar from './Sidebar';
import Content from './Content';
import Footer from './Footer';
import { MDBInput } from 'mdbreact';
import axios from 'axios';
import stylebox from './stylebox.css';
import {COLORS} from  './colors';

class Dashboard  extends React.Component
{  
  state = {
     Items:[],
     Itemm:[],
      
    str:false,
     
  }
  constructor(props) {
    super(props);
    this.getUsers();
    this.getAds();
  
     
     
   this.logout = this.logout.bind(this);
  }
  getUsers  = async () =>
    {
try{
    let data = await axios({
      method: 'get' ,
      url:'https://cbwork.herokuapp.com/allusers' 
    }).then(({ data}) =>
    data);
    console.log(data) 
    const  countuser = data.users.length
    this.setState({ countuser , })
    localStorage.setItem('countuser' , countuser)
    }catch(err)
    {
      console.log(err)
    }

    }
     getAds  = async () =>
    {
try{
    let data = await axios({
      method: 'get' ,
      url:'https://cbwork.herokuapp.com/alladsadmin' 
    }).then(({ data}) =>
    data);
    console.log(data)
   var i;
    
    const  countads = data.data.length
   this.setState({ countads  })
   localStorage.setItem('ads' , countads)

   console.log("the count is:"+ countads)
    }catch(err)
    {
      console.log(err)
    }}


  componentWillMount()
  { 
     
 
   
let email =   localStorage.getItem('email');
  
 let _id =   localStorage.getItem('_id');
 let loginstatus =  localStorage.getItem('loginstatus');
 
 let name =    localStorage.getItem('name');
 let  contact =      localStorage.getItem('contact');
   let city =      localStorage.getItem('city');
   let address =     localStorage.getItem('address');
     let admin =   localStorage.getItem('admin');
      let str = localStorage.setItem('str', true);


   }
 

  logout()
  {
    localStorage.setItem('admin' , '');
    localStorage.clear();
  }
  render(){
 if( localStorage.getItem('admin') == true )
 {
   return <Redirect to = "/" />
 }
 return(
    
  
<div class="wrapper">
 
  <Header/>
    <Sidebar/>

   
  <div class="content-wrapper"  >
   
    <div class="content-header" >
      
    </div>

 <div class="row mb-2">
      <div class="col-md-6 col-sm-6 col-6">
    
       <div class="content">
      <div class="mb-2">
        
        
        
         
           <div class="row" style = {{marginLeft:5}}> 
          <div class="col-md-6 col-sm-4 col-12"  >

            <div class="info-box bg-gradient-info" >
              <span class="info-box-icon"> <i class="fab fa-buysellads"></i> </span>

              <div class="info-box-content" >
                <span class="info-box-text">No of Ads</span>
                <span class="info-box-number">0{localStorage.getItem('ads')}</span>

               
               
              </div>
           
            </div>
          
          </div>
         
        <div class="col-md-6 col-sm-4 col-12">
            <div class="info-box bg-gradient-success " >
              <span class="info-box-icon"> <i class="fab fa-buysellads"></i> </span>

              <div class="info-box-content" >
                <span class="info-box-text">Active Ads</span>
                <span class="info-box-number">0</span>

                
              </div>
            
            </div>
            
          </div>
         
          <div class="col-md-6 col-sm-4 col-12" >
            <div class="info-box bg-gradient-warning" >
              <span class="info-box-icon"><i class="fab fa-buysellads"></i> </span>
              <div class="info-box-content" >
           
                <span class="info-box-text"  > Sold Ads</span>
                <span class="info-box-number">0</span>
              
             
               
              </div>
          
            </div>
          
          </div>
       
          {/* <div class="col-md-6 col-sm-4 col-12" >
            <div class="info-box bg-gradient-danger" >
              <span class="info-box-icon"> <i class="fab fa-buysellads"></i></span>

              <div class="info-box-content" >
                <span class="info-box-text" >Reported Ads</span>
                <span class="info-box-number">0</span>

               
              </div>
           
            </div>
       
          </div> */}
         <div class="col-md-6 col-sm-4 col-12" >
            <div class="info-box bg-gradient-primary" >
              <span class="info-box-icon"> <i class="fas fa-users"></i> </span>

              <div class="info-box-content" >
                <span class="info-box-text">Users</span>
                <span class="info-box-number"> 0{ localStorage.getItem('countuser') }</span>

               
              </div>
          
            </div>
          
          </div>
         
          {/* <div class="col-md-6 col-sm-4 col-12"  >
            <div class="info-box bg-gradient-danger">
              <span class="info-box-icon">  <i class="fab fa-buysellads"></i></span>

              <div class="info-box-content ">
                <span class="info-box-text">Blocked Ads</span>
                <span class="info-box-number">0</span>

                
              </div>
          
            </div>
          
          </div> */}
           
          </div>
        </div>
      </div>
   
    

  
        
    
         
   
        </div>

        <div class="col-md-6 col-sm-6 col-6">
   
         <div class="card card-primary" style ={{display:'none'}}>
            <div class="card-header" style = {{background: COLORS.blue}}   >
              <h3 class="card-title" style = {{color:COLORS.white}} >Send Notifications</h3>

              <div class="card-tools" >
                <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                  <i  style = {{color:COLORS.whi}} class="fas fa-minus"></i></button>
              </div>
            </div>
            <div class="card-body">
              <div class = "row">
            <div class="container"> 
         
         
  <div class="checkbox">
     <input type="checkbox" id="checkbox" name="" value=""/>
     <label for="checkbox"><span>All</span></label>
  </div>

  <div class="checkbox ">
     <input type="checkbox" id="checkbox2" name="" value=""/>
     <label for="checkbox2"><span>Bars</span></label>
  </div>
   <div class="checkbox ">
     <input type="checkbox" id="checkbox3" name="" value=""/>
     <label for="checkbox3"><span>Pure Gold Jewelry</span></label>
  </div>
   <div class="checkbox ">
     <input type="checkbox" id="checkbox4" name="" value=""/>
     <label for="checkbox4"><span>Jewelry woth lobes</span></label>
  </div>
   <div class="checkbox ">
     <input type="checkbox" id="checkbox5" name="" value=""/>
     <label for="checkbox5"><span>Gold liras</span></label>
  </div>
   <div class="checkbox ">
     <input type="checkbox" id="checkbox6" name="" value=""/>
     <label for="checkbox6"><span>Vintage</span></label>
  </div>
  </div>

            
             
          
                   </div>
             <form action="#" method="post" style = {{marginTop:'1%'}}>
                  <div class="input-group mb-3">
                  <input type="text" class="form-control rounded-0" />
                  <span class="input-group-append">
                    <button type="button" class="btn btn-info btn-flat" style = {{background: COLORS.blue , color:COLORS.yellow}}>Send</button>
                  </span>
                </div>
                </form>
            
              
             </div>
             
            
             
            </div>
        </div>


      </div>

     

   

  </div>       
     
  
     
  
  <Footer/>
  </div>
);
 
 

   
  }
}
export default Dashboard;
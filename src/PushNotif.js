import React   , {Component} from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import {Link , BrowserRouter} from 'react-router-dom';
import AdSense from 'react-adsense';
import firebase  from './firebase';
import {COLORS} from  './colors';
 class PushNotif extends Component
{
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render()
  {
    return(
        <div class="wrapper">
        <Header/>
        <Sidebar/>
         <div class="content-wrapper">
   
    <section class="content-header" >
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Send Notifications</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Notifications </li>
            </ol>
          </div>
        </div>
      </div>
    </section>

  
    <section class="content" >
      <div class="row">
        <div class="col-md-6" >
          <div class="card card-primary" >
            <div class="card-header" style = {{background: COLORS.blue}}   >
              <h3 class="card-title" style = {{color:COLORS.yellow}} >Send Notifications</h3>

              <div class="card-tools" >
                <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                  <i  style = {{color:COLORS.yellow}} class="fas fa-minus"></i></button>
              </div>
            </div>
            <div class="card-body">
            
              
            
                <div class="form-group">
                <label for="inputClientCompany">Notifications Type</label>
                 <select  name = "type" class="form-control">
                <option value="1">A</option>
				
			      	<option value="2">B</option></select>
       
      
              </div>
              
             <form action="#" method="post">
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
         <div class="col-md-6" >
          <div class="card card-secondary">
            <div class="card-header" style = {{background: COLORS.yellow}} >
              <h3 class="card-title" style = {{color:COLORS.blue}} >Notification List</h3>

              <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                  <i class="fas fa-minus"></i></button>
              </div>
            </div>
            <div class="card-body">
              <table class="table table-bordered table-hover">
                <thead>
                <tr>
                  <th>No</th>
                  <th>Notification Type</th>
                  <th>Message</th>
                  <th>Sent Time</th>
                  
                 
                 
                   
                </tr>
                
                </thead>
                <tbody>
                <tr>
                  <td>1</td>
                  <td>Xyz</td>
                    <td>Xyz</td>
                  <td>2:00</td>
                    

                </tr>
                  <tr>
                  <td>1</td>
                  <td>Xyz</td>
                    <td>Xyz</td>
                  <td>2:00</td>
                    

                </tr>
                
                </tbody>
                
              </table>
            </div>
          </div>
            
           </div>
        
      </div>
      
    </section>
   
  </div>
  

  <footer class="main-footer">
    <div class="float-right d-none d-sm-block">
      <b>Version</b> 1.0.1
    </div>
    <b>Developed By:</b>
<strong>  <a href=""> Circular Byte</a>.</strong> All rights are reserved
  </footer>
  </div>
    );
  }
  
}
export default PushNotif
 
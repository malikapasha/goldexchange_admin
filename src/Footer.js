import React, {Component } from 'react';
import {COLORS} from  './colors';
export default class Footer extends Component{
render()
{
return(
    <div>
     <footer className="main-footer" style = {{background:COLORS.blue , }}   >
    <div className="float-right d-none d-sm-block" >
      <b style = {{color:COLORS.white}}>Version</b > 1.0.1  </div>
    Powered By:<strong > <a href="https://m5amas.com/" style = {{color:COLORS.white}}>مخمس</a>.</strong> All rights
    reserved.
  </footer> </div>
)
}
}

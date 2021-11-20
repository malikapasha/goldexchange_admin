import React from 'react';
import {Switch , Route, Router, Redirect} from 'react-router-dom';
import Dashboard from './Dashboard';

import UserAds from './UserAds';

import Login from './Login';

// import Complains from './Complains';

// import PushNotif from './PushNotif';
// import ViewTeam from './ViewTeam';
// import Gold from './Gold';
// import Profile from './Profile';


import AddUser from './AddUser';
import ViewUser from './ViewUser';

import Footer from './Footer';


import history from './history';

export const myContext = React.createContext();
class  Content extends React.Component
{
   constructor(props) {
      super(props)
     this.state={
      token:'',
      email:"",
      
    };
   }
   
   render()
   {
 
 return ( 
     <Router history={history}>
   <Switch>
<Route exact path = "/" component  = {Login}/>
<Route path = "/dashboard" component  = {Dashboard}/>

{/* <Route path = "/gold" component  = {Gold}/> */}

<Route path = "/footer" component  = {Footer}/>
{/* <Route path = "/complains" component  = {Complains}/>
<Route path = "/notif" component  = {PushNotif}/> */}
{/* 
<Route path = "/profile" component  = {Profile}/> */}
<Route path = "/userads" component  = {UserAds}/>

<Route path = "/adduser" component  = {AddUser}/>
<Route path = "/viewuser" component  = {ViewUser}/>
{/* <Route path = "/viewteam" component  = {ViewTeam}/> */}
<Route path = "/footer" component  = {Footer}/>
 </Switch> 
   </Router>
);
}
}
export default Content
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import './App.css';
import AuthApi from './AuthApi';
import Cookies from 'js-cookie';

function App() {
const [auth, setAuth] = React.useState(false) ;

const readCookie =() =>{
  const user = Cookies.get('user');
  if (user){
    setAuth(true);
  }
}
React.useEffect(() =>{
  readCookie()
})
  return (
    <div className="App">
      <AuthApi.Provider value ={{auth,setAuth}}>
      <Router>
      <Routes/>
      </Router>
      </AuthApi.Provider>
    </div>
  );
}
// login component
const Login=()=>{
  const Auth = React.useContext(AuthApi);
 const handleOnClick = () =>{
   Auth.setAuth(true);
   Cookies.set('user', 'loginTrue')
 }
  return(
    <div>
      <h1>Welcome to web coding</h1>
      <h1>Login</h1>
      <button onClick ={handleOnClick}> Login </button>
    </div>
  )

}

// dashboard component
const Dashboard = () =>{
  const Auth = React.useContext(AuthApi);
  const handleOnClick = () =>{
    Auth.setAuth(false);
    Cookies.remove('user');
  }
  return(<div>
    <h1>DashBoard</h1>
     <button onClick = {handleOnClick}>logout </button>
  </div>
  )
}

const Routes = ()=>{
  const Auth = React.useContext(AuthApi)
  return(
    <Switch>
      <ProtectedLogin  path = '/login' auth ={Auth.auth} component = {Login}/>
      <ProtectedRoute path= '/dashboard' auth={Auth.auth} component ={Dashboard}/>
    </Switch>
  )
}
const ProtectedRoute =({auth,component: Component, ...rest}) =>{
  return (<Route
  
  {...rest}
  render = {
    () =>auth ?(
      <Component/>
    ):
    (
      <Redirect to  = "/login"/>
    )
  }
  />)
}
  const ProtectedLogin =({auth,component: Component, ...rest}) =>{
    return (<Route
    
    {...rest}
    render = {
      () =>!auth ?(
        <Component/>
      ):
      (
        <Redirect to  = "/dashboard"/>
      )
    }
    />)

  
}

export default App;
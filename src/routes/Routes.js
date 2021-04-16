import React, { useState } from "react";
import {BrowserRouter,Switch,Route  } from "react-router-dom";
import Panel from "../pages/Panel";
import Productos from "../pages/Productos";
import Reportes from "../pages/Reportes";
import Ventas from "../pages/Ventas";
import Login from '../pages/login';
import useToken from '../components/useToken';


function App() {
  
  const { token, setToken } = useToken();
  
  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Panel}/>
      <Route path="/Productos" component={Productos}/>
      <Route path="/Ventas"><Ventas/> </Route>
      <Route path="/Reportes" component={Reportes}/>
    </Switch>
    </BrowserRouter>
  );
}

export default App;

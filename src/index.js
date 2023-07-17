import { React } from 'react';
import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./login";
import { CreateAccount } from './createaccount';
import { Deposite } from './deposite';
import { Withdraw } from './withdraw';
import { NavBar } from "./navbar";
import { UserProvider } from "./context";
import 'bootstrap/dist/css/bootstrap.css'


function Spa() {
    return (
      <HashRouter>
          <UserProvider>
          <NavBar/>
            <div className="container" style={{padding: "20px"}}>
              <Routes>
                  <Route exact path="/" element ={<Login />} />
                  <Route path="/login/" element ={<Login />} />
                  <Route path="/CreateAccount" element={<CreateAccount />} />
                  <Route path="/deposite/" element={<Deposite />} />
                  <Route path="/withdraw/" element ={<Withdraw />} />
              </Routes>
            </div>
          </UserProvider>
      </HashRouter>
    );
  }
  
  
  const root = createRoot(document.getElementById('root'));
  root.render(
    <Spa/>
);
  
  
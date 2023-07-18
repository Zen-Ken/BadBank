import { useContext } from "react";
import { UserProvider, UserContext, Card } from "./context";

export function NavBar(){
  const {user , setUser}        = useContext(UserContext);
  
  return(

  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">BadBank</a>
      {JSON.stringify(user) === '{}' ?
      <>
      {/* <li className="nav-item">
        <a className="nav-link" href="#/login/">Login</a>
      </li> */}
      </>
      : 
      <>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <a className="nav-link" href="#/login/">Account</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/deposite/">Deposite</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/withdraw/">Withdraw</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/balance/">Balance</a>
          </li>
        </ul>
      </div>
      </>}
    </div>
    </nav>

  );
}
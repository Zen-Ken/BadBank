import { React, useContext, useState, useEffect } from "react";
import { UserContext, Card } from "./context";

export function PasswordReset(){
    const [email, setEmail]     = useState('');
    const [show, setShow]       = useState(true);
    const [status, setStatus]   = useState('');    
  
  
    return (
      <Card
        bgcolor="secondary"
        header="Password Reset"
        status={status}
        body={show ?
          <ResetEmailEntry email={email} setEmail={setEmail} setShow={setShow}/>:
          <NewPassword email={email} setEmail={setEmail} setShow={setShow}/>
        }
      />
    ) 
  }

  function ResetEmailEntry(props){
    function handle(){
      props.setShow(false)
    }

    return (<>
      Email<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter email" 
        value={props.email} 
        onChange={e => props.setEmail(e.currentTarget.value)}/>
      <button id="btnLogin" type="submit" className="btn btn-light ml-1 my-1" onClick={handle}>Send</button><br/>
      </>
    )
  }

  function NewPassword(props){
    return (<>
      New Password<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter New" 
        value={props.email} 
        onChange={e => props.setEmail(e.currentTarget.value)}/>
      <button id="btnLogin" type="submit" className="btn btn-light ml-1 my-1">Send</button><br/>
      </>
    )
  }
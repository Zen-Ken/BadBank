import { React, useContext, useState, useEffect } from "react";
import { UserContext, Card } from "./context";

export function PasswordReset(){
    const { user, setUser }     = useContext(UserContext);
    const [show, setShow]       = useState(true);
    const [status, setStatus]   = useState('');    
  
  
    return (
      <Card
        bgcolor="secondary"
        header={show ? "Password Reset" : "Account"}
        status={status}
        body={
         <>
            Email has been sent
         </>}
      />
    ) 
  }

  
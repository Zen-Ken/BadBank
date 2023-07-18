import { React, useContext, useState, useEffect } from "react";
import { UserContext, Card } from "./context";
import { useNavigate } from 'react-router-dom'

export function Balance(){
    const [status, setStatus] = useState('');  
    const {user, setUser}     = useContext(UserContext);
  
    const history = useNavigate ();
    const handleNotLoggedin = () => {
      history.push('/Login');
    };
  
    useEffect(()=>{
      if(JSON.stringify(user) === '{}')
        handleNotLoggedin();
    },[]);
  
    return (
      <Card
        bgcolor="info"
        header="Balance"
        status={status}
        body=
          {<BalanceMsg/>}
      />
    )
  
  }
  
  function BalanceMsg(props){
  
    return (<>
      <h5>Mr.{props.user.name} Your Balance is:</h5>
      <h3> ${props.user.balance} </h3>
    
      
    </>);
  } 
  
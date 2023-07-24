import { React, useContext, useState, useEffect } from "react";
import { UserContext, Card } from "./context";
import { useNavigate } from 'react-router-dom'

export function Deposite(){
    const [show, setShow]     = useState(true);
    const [status, setStatus] = useState('');  
    const {user, setUser}     = useContext(UserContext);
    const [amount, setAmount] = useState('');
  
    const history = useNavigate ();
    const handleNotLoggedin = () => {
      history.push('/Login');
    };
  
    
    // For Testing
    useEffect(()=>{
      if(JSON.stringify(user) === '{}')
        handleNotLoggedin()
    },[]);
  
    return (
      <Card
        bgcolor="warning"
        header="Deposit"
        status={status}
        body={show ? 
          <DepositeForm setShow={setShow} setStatus={setStatus} amount={amount} setAmount={setAmount} user={user} setUser={setUser} /> :
          <DepositMsg setShow={setShow} setStatus={setStatus} useNavigate ={useNavigate }/>}
      />
    )
  }
  
  function DepositeForm(props){  
    function validate(input){
      if (0 >= input) {
        props.setStatus("enter a number greater than 0");
        return false;
      }
      props.setStatus('');
        return true;
    }
  
    function handle(){
      if(!validate(props.amount))
        return
  
      fetch(`${process.env.REACT_APP_API_IP_ADDRESS}/account/update/${props.user.email}/${props.amount}`)
      .then(response => response.text())
      .then(text => {
          try {
              const data = JSON.parse(text);
              props.setUser({...props.user, balance: data.balance})
              props.setStatus('');
              props.setShow(false);
          } catch(err) {
              props.setStatus('Deposit failed')
              console.log("Deposite Error with backend")
          }
      });
    }
    return (<>
      <h5> Mr.{props.user.name} Your Balance is:</h5>
      <h3> Balance: ${props.user.balance}</h3>
  
      Amount<br/>
      <input type="number" 
        className="form-control w-90" 
        placeholder="Enter amount" 
        value={props.amount} onChange={e => props.setAmount(e.currentTarget.value)}/><br/>
  
      <button type="submit" 
        className="btn btn-light" 
        onClick={handle}
       >Deposit</button>
    </>);
  } 
  
  function DepositMsg(props){
    const history = props.useNavigate ();
  
    const handleHomeBtn = () => {
      history('/Login');
    };
  
    return (<>
      <h5>Your Money Has Been Deposited</h5>
      <button type="submit" 
        className="btn btn-light mx-1" 
        onClick={() => {
            props.setShow(true);
            props.setStatus('');
        }}>
          Deposit Again
      </button>
      <button type="submit" 
        className="btn btn-light m-1" 
        onClick={handleHomeBtn}>
          Home
      </button>
      
    </>);
  } 
  
  
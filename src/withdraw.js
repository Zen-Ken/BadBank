import { React, useContext, useState, useEffect } from "react";
import { UserContext, Card } from "./context";
import { useNavigate  } from 'react-router-dom'


export function Withdraw(){
    const [show, setShow]     = useState(true);
    const [status, setStatus] = useState('');  
    const {user, setUser}     = useContext(UserContext);
    const [amount, setAmount] = useState('');

    const history = useNavigate();
    const handleNotLoggedin = () => {
      history.push('/Login');
    };
  
    
    useEffect(()=>{
      if(JSON.stringify(user) === '{}')
        handleNotLoggedin();
    },[]);
  
    return (
      <Card
        bgcolor="success"
        header="Withdraw"
        status={status}
        body={show ? 
          <WithdrawForm setShow={setShow} setStatus={setStatus} user={user} setUser={setUser} amount={amount}  setAmount={setAmount}/> :
          <WithdrawMsg setShow={setShow} setStatus={setStatus} useNavigate={useNavigate}/>}
      />
    )
  }
  
  function WithdrawForm(props){
  
    function validate(input){
  
      if (input > props.user.balance) {
        props.setStatus("transaction failed");
        return false;
      }
      if (0 > input) {
        props.setStatus("enter a positive number only");
        return false;
      }
      props.setStatus('');
      return true;
    }
  
    function handle(){
      if(!validate(props.amount))
       return
  
      fetch(`${process.env.REACT_APP_API_IP_ADDRESS}/account/update/${props.user.email}/-${props.amount}`)
      .then(response => response.text())
      .then(text => {
          try {
              const data = JSON.parse(text);
              props.setUser({...props.user, balance: data.balance})
              props.setStatus('');
              props.setShow(false);
              console.log('JSON:', data);
          } catch(err) {
              props.setStatus('Withdrawal failed')
              console.log('err:', text);
          }
      });
    }
  
    return(<>
      <h5> Mr.{props.user.name} Your Balance is:</h5>
      <h3> Balance: ${props.user.balance} </h3>
      
      Amount<br/>
      <input type="number" 
        className="form-control" 
        placeholder="Enter amount" 
        value={props.amount} 
        onChange={e => props.setAmount(e.currentTarget.value)}/><br/>
  
      <button type="submit" 
        className="btn btn-light" 
        onClick={handle}>
          Withdraw
      </button>
  
    </>);
  }
  function WithdrawMsg(props){
    const history = props.useNavigate();
  
    const handleHomeBtn = () => {
      history('/login');
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
  // function WithdrawMsg(props){
  //   // const history = props.useNavigate();
  
  //   // const handleHomeBtn = () => {
  //   //   history.push('/Login');
  //   // };
  
  //   return (<>
  //     <h5>Your Money Has Been Withdrawn</h5>
  //     <button type="submit" 
  //       className="btn btn-light mx-1" 
  //       onClick={() => {
  //           props.setShow(true);
  //           props.setStatus('');
  //       }}>
  //         Withdraw Again
  //     </button>
  //     {/* <button type="submit" 
  //       className="btn btn-light m-1" 
  //       onClick={handleHomeBtn}>
  //         Home
  //     </button>
  //      */}
  //   </>);
  // } 
  
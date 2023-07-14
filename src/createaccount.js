import { React, useContext, useState, useEffect } from "react";
import { UserProvider, UserContext, Card } from "./context";

export function CreateAccount(){
    const { user, setUser }   = useContext(UserContext);
    const [show, setShow]     = useState(true);
    const [status, setStatus] = useState('');
  
    return (
      <Card
        bgcolor="primary"
        header="Create Account"
        status={status}
        body={show ? 
          <CreateForm setShow={setShow} setStatus={setStatus} setUser={setUser}/> : 
          <CreateMsg setShow={setShow} setStatus={setStatus} setUser={setUser}/>}
      />
    )
  }
  
  function CreateMsg(props){
    return(<>
      <h5>Success</h5>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => props.setShow(true)}>Add another account</button>
    </>);
  }
  
  function CreateForm(props){
    const [name, setName]         = useState('');
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
  
    function handle(){
      fetch(`${process.env.REACT_APP_API_IP_ADDRESS}/account/create/${name}/${email.toLowerCase()}/${password}`)
        .then(response => response.text())
        .then(text => {
            try {
                const data = JSON.parse(text);
                props.setUser(data);
                props.setStatus('');
                props.setShow(false);
                console.log('JSON:', data);
            } catch(err) {
                props.setStatus('Login Failed')
                props.setShow(true);
            }
        });
    }    
  
    return (<>
  
      Full Name<br/>
      <input type="input" 
        className="form-control" 
        placeholder="John Doe" 
        value={name} 
        onChange={e => setName(e.currentTarget.value)} /><br/>
  
      Email address<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter email" 
        value={email} 
        onChange={e => setEmail(e.currentTarget.value)}/><br/>
  
      Password<br/>
      <input type="password" 
        className="form-control" 
        placeholder="Enter password" 
        value={password} 
        onChange={e => setPassword(e.currentTarget.value)}/><br/>
  
      <button type="submit" 
        className="btn btn-light" 
        onClick={handle}>Create Account</button>
    </>);
  } 
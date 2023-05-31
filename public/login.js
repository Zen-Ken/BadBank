function Login(){
  const { user, setUser }     = React.useContext(UserContext);
  const [show, setShow]       = React.useState(true);
  const [status, setStatus]   = React.useState('');    

  React.useEffect(() =>{
    JSON.stringify(user) === '{}' ?  setShow(true) : setShow(false);
  },[]);

  return (
    <Card
      bgcolor="secondary"
      header={show ? "Login" : "Account"}
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus} user={user} setUser={setUser}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus} user={user} setUser={setUser} />}
    />
  ) 
}

function LoginMsg(props){
  function handle(){
    props.setShow(true);
    props.setStatus('');
    //props.setName('');
  }

  return(<>
    <h5>Welcome, {props.user.name}! </h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Sign Out
    </button>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  
  function handle(){
    fetch(`/account/login/${email}/${password}`)
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
            console.log('err:', text);
        }
    });
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById('btnLogin').click();
    }
  }
  
  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input 
      id="txtPassword"
      type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}
      onKeyPress={handleKeyPress}/><br/>

    <button id="btnLogin" type="submit" className="btn btn-light ml-1 my-1" onClick={handle}>Login</button><br/>
    New User? <a className=' link-body-emphasis' href=".#/CreateAccount/">Create Account</a>
  </>);
}
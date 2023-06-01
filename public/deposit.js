function Deposit(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const {user, setUser}     = React.useContext(UserContext);
  const { useHistory }      = ReactRouterDOM

  const history = useHistory();
  const handleNotLoggedin = () => {
    history.push('/Login');
  };

  const reloadUser = () => {
    fetch(`/account/login/${props.user.email}/${amount}`)
      .then(response => response.text())
      .then(text => {
          try {
              const data = JSON.parse(text);
              setUser(data);
            } catch(err) {
              handleNotLoggedin()
          }
      });
  };

  
  // For Testing
  React.useEffect(()=>{
    if(JSON.stringify(user) === '{}')
      handleNotLoggedin()
  },[]);

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={show ? 
        <DepositeForm setShow={setShow} setStatus={setStatus} user={user} setUser={setUser} /> :
        <DepositMsg setShow={setShow} setStatus={setStatus} useHistory={useHistory}/>}
    />
  )
}

function DepositeForm(props){
  const [amount, setAmount] = React.useState('');

  function validate(input){
    if (0 >= input) {
      props.setStatus("enter a number greater than 0");
      return false;
    }
    props.setStatus('');
      return true;
  }

  function handle(){
    if(!validate(amount))
      return

    fetch(`/account/update/${props.user.email}/${amount}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setUser({...props.user, balance: data.value.balance})
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
      value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}
     >Deposit</button>
  </>);
} 

function DepositMsg(props){
  const history = props.useHistory();

  const handleHomeBtn = () => {
    history.push('/Login');
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


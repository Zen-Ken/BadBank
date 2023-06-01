function Withdraw(){
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

  
  React.useEffect(()=>{
    // fetch(`/account/login/kenny@test.com/test1234`)
    //   .then(response => response.text())
    //   .then(text => {
    //       try {
    //           const data = JSON.parse(text);
    //           setUser(data);
    //           console.log('user:', text);
    //         } catch(err) {
    //           setStatus('Failed Login')
    //           console.log('err:', text);
    //       }
    //   });
    if(JSON.stringify(user) === '{}')
      handleNotLoggedin();
  },[]);

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus} user={user} setUser={setUser}/> :
        <WithdrawMsg setShow={setShow} setStatus={setStatus} useHistory={useHistory}/>}
    />
  )
}

function WithdrawForm(props){
  const [amount, setAmount] = React.useState('');

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
    if(!validate(amount))
     return

    fetch(`/account/update/${props.user.email}/-${amount}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setUser({...props.user, balance: data.value.balance})
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
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Withdraw
    </button>

  </>);
}
function WithdrawMsg(props){
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
// function WithdrawMsg(props){
//   // const history = props.useHistory();

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

function Balance(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const {user, setUser}     = React.useContext(UserContext);
  const { useHistory }      = ReactRouterDOM

  const history = useHistory();
  const handleNotLoggedin = () => {
    history.push('/Login');
  };

  // For Testing
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
      bgcolor="info"
      header="Balance"
      status={status}
      body=
        {<BalanceMsg setShow={setShow} setStatus={setStatus} user={user}/>}
    />
  )

}

function BalanceMsg(props){

  return (<>
    <h5>Mr.{props.user.name} Your Balance is:</h5>
    <h3> ${props.user.balance} </h3>
  
    
  </>);
} 

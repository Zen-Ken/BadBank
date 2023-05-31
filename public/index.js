function Spa() {
  return (
    <HashRouter>
        <UserProvider>
        <NavBar/>        
          <div className="container" style={{padding: "20px"}}>
            <Route path="/" exact component={Login} />
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/login/" component={Login} />
            <Route path="/deposit/" component={Deposit} />
            <Route path="/withdraw/" component={Withdraw} />
            <Route path="/balance/" component={Balance} />
            <Route path="/alldata/" component={AllData} />
          </div>
        </UserProvider>
    </HashRouter>
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);

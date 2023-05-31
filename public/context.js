const Route             = ReactRouterDOM.Route;
const Link              = ReactRouterDOM.Link;
const HashRouter        = ReactRouterDOM.HashRouter;
const UserContext       = React.createContext(null);
const UserUpdate        = React.createContext();

function Card(props){
  function classes(){
    const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
    const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
    return 'card mx-auto mb-3 ' + bg + txt;
  }

  return (
    <div className={classes()} style={{maxWidth: "50%"}}>
      <div className="card-header font-weight-bold text-center">{props.header}</div>
      <div className="card-body">
        {props.title && (<h5 className="card-title">{props.title}</h5>)}
        {props.text && (<p className="card-text">{props.text}</p>)}
        {props.body}
        {props.status && (<div id='createStatus'>{props.status}</div>)}
      </div>
    </div>      
  );    
}


function UserProvider(props){
  const [user, setUser]   = React.useState({});
  
  return(
    <UserContext.Provider value={{user, setUser}} >
      {props.children}
    </UserContext.Provider>
  )
}



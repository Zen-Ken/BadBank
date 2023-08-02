import { React, useContext, useState, useEffect } from "react";
import { UserContext, Card } from "./context";
import { useNavigate } from 'react-router-dom'

export function Account(){
    const {user, setUser}   = useContext(UserContext);
    const [edit, setEdit]   = useState(false);    

    const history = useNavigate ();
    const handleNotLoggedin = () => {
      history('/Login');
    };
    useEffect(()=>{
        if(JSON.stringify(user) === '{}')
          handleNotLoggedin()
      },[]);
    
    return (
        <Card
          bgcolor="dark"
          header="Account"
          body={ edit ?
            <AccountEdit user={user} setEdit={setEdit} setUser={setUser}/>:
            <AccountForm user={user} setEdit={setEdit}/>}
        />
    )
}

function AccountForm(props){
    function handleEdit(){
       props.setEdit(true);
    }

    
    return(<div className="text my-0">
        <p>Name: {props.user.name}</p>
        <p>Email: {props.user.email}</p>
        <button type="submit" 
        className="btn btn-light m-1" 
        onClick={handleEdit}>
          Edit
      </button>
    </div>)
}

function AccountEdit(props){
    const [newName, setnewName]   = useState(props.user.name)
    const [newEmail, setnewEmail] = useState(props.user.email)
  
    function handleSave(){
        if(newName!==props.user.name || newEmail!==props.user.email){
          console.log("sending message to backend");
          fetch(`${process.env.REACT_APP_API_IP_ADDRESS}/account/updateUser/${props.user.email.toLowerCase()}/${newEmail}/${newName}`)
          .then(response => response.text())
          .then(text => {
            try {
              const data = JSON.parse(text);
              props.setUser({...data[0]})
            } 
            catch(err) {
              props.setEdit(false);
              console.log("Fail response from Backend");  
            }
          });
      }
      props.setEdit(false);
    }
    
    return(<div className="text my-0">
        <p>Name: <input value={newName}  onChange={e => setnewName(e.currentTarget.value)}/></p>
        <p>Email: <input value={newEmail}  onChange={e => setnewEmail(e.currentTarget.value)}/></p>
        <button type="submit" 
        className="btn btn-light m-1" 
        onClick={handleSave}>
          Save
        </button>       
    </div>
    )
}
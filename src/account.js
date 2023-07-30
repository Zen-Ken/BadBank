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
          header="Deposit"
          body={ edit ?
            <AccountEdit user={user} setEdit={setEdit}/>:
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
    const [userInfo, setUserInfo]   = useState({
        name:props.user.name,
        email:props.user.email
    });    

    function handleSave(){
        props.setEdit(false);
        if(userInfo.name!=props.user.name || userInfo.email!=props.user.email)
        {console.log("save")}
    }
    
    return(<div className="text my-0">
        <p>Name: <input value={userInfo.name}  onChange={e => setUserInfo(e.currentTarget.value)}/></p>
        <p>Email: <input value={userInfo.email}  onChange={e => setUserInfo(e.currentTarget.value)}/></p>
        <button type="submit" 
        className="btn btn-light m-1" 
        onClick={handleSave}>
          Save
        </button>       
    </div>
    )
}
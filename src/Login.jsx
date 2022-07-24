
import React,{useState} from 'react';
import "./Login.css";
import { useHistory } from "react-router-dom";

const Login=()=>{
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentView, setCurrentview] = useState("signUp");
  const [wrongpass, setWrongpass] = useState(false);
  const [alreadyexist, setAlreadyexist] = useState(false);
  let history = useHistory();

  const Loggedin=async()=>{

    let loginUid;
    let ans=await fetch("https://myntra-server-mysql.herokuapp.com/usersData")
    .then(function (res) {
      return res.json();
    })
    .then((json) => {
      loginUid=json.uid;
      return json;
    });

    let x=false;
    
    ans.forEach((ele)=>{
      console.log(ele.email+" "+ele.password+" "+email+" "+password);
      if((email==ele.email && password==ele.password)||(email=="")||(password==""))
      {
        x=true; //already exist or not accepted
      }
    })

    if(x==false)
    {
      history.push({pathname:"/Myntra",state:{uid:loginUid}});
      const res=await fetch("https://myntra-server-mysql.herokuapp.com/loggedInData",{
        method:"POST",
        headers:{
          "Accept":"application/json",
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name:name,
            email:email,
            password:password,
            uid:loginUid
        })
      })
    }
    else{
      setAlreadyexist(true);
    }
    
  }

  const loginApprove=async()=>{
    
    let ans=await fetch("https://myntra-server-mysql.herokuapp.com/usersData")
    .then(function (res) {
      return res.json();
    })
    .then((json) => {
      return json;
    });

    let x=false;
    let loginUid;
    ans.forEach((ele)=>{
      // console.log(email+" "+password+" "+ele.email+" "+ele.password);
      if(email==ele.email && password==ele.password)
      {
        x=true;
        loginUid=ele.uid;
      }
    })
    //{pathname:"/",state:{uid:loginUid}}
    if(x==true){ 
      history.push({pathname:"/Myntra",state:{uid:loginUid}});
      (async()=>await fetch("https://myntra-server-mysql.herokuapp.com/loginuid",{
        method:"POST",
        headers:{
          "Accept":"application/json",
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
            uid:loginUid
        })
      }))();
    }
    else{setWrongpass(true);}

  }

  let View = () => {
    switch(currentView) {
      case "signUp":
        return (
          <div className="formclass">
            <h2>Sign Up!</h2>
            <fieldset>
              <legend>Create Account</legend>
              <ul>
                <li>
                  <label for="username">Username:</label>
                  <input  type="text" id="username" onChange={ (el) => setName(el.target.value)} required/>
                </li>
                <li>
                  <label for="email">Email:</label>
                  <input type="email" id="email" onChange={ (el) => setEmail(el.target.value)} required/>
                </li>
                <li>
                  <label for="password">Password:</label>
                  <input  type="password" id="password" onChange={ (el) => setPassword(el.target.value)} required/>
                </li>
              </ul>
            </fieldset>
            
            
            <button className="btn" onClick={ () => Loggedin()}>Submit</button>
            {alreadyexist==true && setTimeout(() => {setAlreadyexist(false)}, 2000) && <div>Already existing email or Empty spaces, Try Another one......</div>}
            <button  onClick={ () => setCurrentview("logIn")}>Have an Account?</button>
          </div>
        )
        break
      case "logIn":
        return (
          <div className="formclass">
            <h2>Welcome Back!</h2>
            <fieldset>
              <legend>Log In</legend>
              <ul>
                <li>
                  <label for="email">Email:</label>
                  <input  type="text" id="email" onChange={ (el) => setEmail(el.target.value)} required/>
                </li>
                <li>
                  <label for="password">Password:</label>
                  <input type="password" id="password" onChange={ (el) => setPassword(el.target.value)} required/>
                </li>
                <li>
                  <i/>
                  <a onClick={ () => setCurrentview("PWReset")}>Forgot Password?</a>
                </li>
              </ul>
            </fieldset>
           
            <button className="btn" onClick={ () => loginApprove()}>Login</button>
            {wrongpass==true && setTimeout(() => {setWrongpass(false)}, 2000) && <div>Wrong pass, Try Again Please....</div>}
            <button onClick={ () => setCurrentview("signUp")}>Create an Account</button>
            
          </div>
        )
        break;
      case "PWReset":
        return (
          <div className="formclass">
          <h2>Reset Password</h2>
          <fieldset>
            <legend>Password Reset</legend>
            <ul>
              <li>
                <em>A reset link will be sent to your inbox!</em>
              </li>
              <li>
                <label for="email">Email:</label>
                <input type="email" id="email" required/>
              </li>
            </ul>
          </fieldset>
          <button>Send Reset Link</button>
          <button type="submit" onClick={ () => setCurrentview("logIn")}>Go Back</button>
        </div>
        )
      default:
        break
    }
  }

  return (
    <div id="entry-page">
        {View()}
    </div>
  )
}
export default Login;

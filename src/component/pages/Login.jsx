import React, { useContext, useState } from 'react'
import Context from '../../Context/Context';
import { useNavigate } from 'react-router-dom';
function Login() {
  let context=useContext(Context);
  let{setlogedin}=context;
  let Navigate=useNavigate();
  let [SigninData,setSigninData]=useState({Name:"",password:""});
  function onchange(e){
    setSigninData({...SigninData,[e.target.name]:e.target.value})
  }
  async function handleSubmit(e){
    e.preventDefault();
    console.log(SigninData)
      const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Name:SigninData.Name,password:SigninData.password}), 
        });
        const json=await response.json();
        console.log(json);
        if(json.success===true){
          console.log(json.authtoken);
          localStorage.setItem('token',json.authtoken);
          setlogedin(true);
          Navigate('/');
        }
  }
  return (
    <div className='container'>
    <form className='form'>
  <div className="mb-3 my-3">
    <label htmlFor="exampleInputEmail1" className="form-label">UserName</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='Name' onChange={onchange}/>
  </div>
  <div className="mb-3 my-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={onchange}/>
  </div>
  <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
</form>
    </div>
  )
}

export default Login
import React, { useContext, useState } from 'react'
import Context from '../../Context/Context';
import { Navigate, useNavigate } from 'react-router-dom';
function Signin() {
  let context=useContext(Context);
  let Navigate=useNavigate();
  let {setlogedin}=context;
  let [SigninData,setSigninData]=useState({name:"",password:"",cpassword:""});
  function onchange(e){
    setSigninData({...SigninData,[e.target.name]:e.target.value})
  }
  async function handleSubmit(e){
    e.preventDefault();
    console.log("Enter handle submit")
    if(SigninData.password!==SigninData.cpassword){
      console.log("Enter password doesn't match")
      return
    }
    console.log(SigninData)
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Name:SigninData.name,password:SigninData.password}), 
        });
        const json=await response.json();
        console.log(json);
        if(json.success===true){
          localStorage.setItem('token',json.authtoken);
          setlogedin(true);
          Navigate('/');
        }
  }


  return (
    <div>
  <div className='container'>
    <form className='form'>
  <div className="mb-3 my-3">
    <label htmlFor="exampleInputEmail1" className="form-label">UserName</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='name' onChange={onchange} required minLength={3}/>
  </div>
  <div className="mb-3 my-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={onchange} required minLength={5}/>
  </div>
  <div className="mb-3 my-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Comform Password</label>
    <input type="password" className="form-control" id="exampleInputPassword2" name='cpassword' onChange={onchange} required minLength={5}/>
  </div>
  <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
</form>
    </div>


    </div>
  )
}

export default Signin
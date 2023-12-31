import React, { useContext } from "react";
import {Link} from "react-router-dom";
import Context from "../Context/Context";
function Navbar(props) {
  let context=useContext(Context);
  let { logedin,setlogedin,userdata}=context;
  const light={
    backgroundColor:'rgba(20, 196, 20, 0.3)',
  }
  const dark={
    backgroundColor: 'rgba(52, 52, 52, 0.5)'
  }
  // (props.mode === 'light' ? {light} : {dark})
  let Logout=()=>{
    localStorage.removeItem('token');
    setlogedin(false)
  }
  return (
    <nav className={"navbar navbar-expand-lg navbar-dark" } style={(props.mode === 'light' )? light :dark}>
      <div className="container-fluid">
        <a className={`navbar-brand text-${(props.mode === 'light') ? 'dark' : 'light'}`} href="/">
          <strong>Typer</strong>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item active">
        <Link className="nav-link" to="/">Home</Link>
      </li>
     </ul>
          <div className="nav-item d-flex "style={{paddingRight:"10px"}}>
          <div className="nav-item">
        
          </div>
          {(logedin)?(
            <>
           <Link to="/profile"><img
            src={userdata.img}
            className="rounded-circle z-depth-0"
            alt="avatar"
            height="40"
            style={{margin:"3px 10px 0px 10px"}}
          /></Link>
          <table className={`tb text-${(props.mode === 'light' ? 'dark' : 'light')}`}><tbody><tr><td colSpan={2} style={{"marginBottom":"50px"}}>{userdata.name}</td></tr><tr ><td style={{paddingRight:"5px"}}>{userdata.averageSpeed} WPM</td><td >{userdata.NoofRaces} races</td></tr></tbody></table>
          <button type="button" className="btn btn-primary mx-1 btn-sm" onClick={Logout}>Logout</button>
          </>)
          :(<div>
          <Link to="/login"><button type="button" className="btn btn-primary mx-1">LogIn</button></Link>
          <Link to="/Signin"><button type="button" className="btn btn-primary ">SignUp</button></Link>
          </div>)
          }
          <div className="form-check form-switch bott">  
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              onClick={props.tog}
            />


            <label
              className={`form-check-label text-${
                props.mode === "light" ? "dark" : "light"
              }`}
              htmlFor="flexSwitchCheckDefault"
            >
              DarkMode
            </label>
          </div>
          </div>
      
        </div>
      </div>
    </nav>);
}
export default Navbar;

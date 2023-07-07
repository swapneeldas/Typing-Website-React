import React from "react";
function Navbar(props) {
  const light={
    backgroundColor:'rgba(20, 196, 20, 0.3)',
  }
  const dark={
    backgroundColor: 'rgba(52, 52, 52, 0.5)'
  }
  // (props.mode === 'light' ? {light} : {dark})
  return (
    <nav className={"navbar navbar-expand-lg" } style={(props.mode === 'light' )? light :dark}>
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
     
     </ul>
          <div className="nav-item d-flex "style={{paddingRight:"10px"}}>
          <div className="nav-item">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1NdwQHpqwyAxobeRGSbbaMWMQLOhE3loPuA&usqp=CAU"
            className="rounded-circle z-depth-0"
            alt="avatar"
            height="40"
            style={{margin:"7px 10px 0px 10px"}}
          />
          </div>
          
          <table className={`tb text-${(props.mode === 'light' ? 'dark' : 'light')}`}><tbody><tr><td colSpan={2} style={{"marginBottom":"50px"}}>korean girl</td></tr><tr ><td style={{paddingRight:"5px"}}>50 WPM</td><td >5000 races</td></tr></tbody></table>
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

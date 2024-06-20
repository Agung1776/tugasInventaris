import React from "react"
import {Link} from "react-router-dom"
class Navbar extends React.Component{
    constructor(){
        super()
        this.state = {
            role: "",
            nama_user : ""

        }

        this.state.role = localStorage.getItem("role")
        this.state.nama_user = localStorage.getItem("nama_user")
    }
    logOut = () => {
        if (window.confirm("Are you sure to logout")) {
            window.location = '/'
            localStorage.clear()
            localStorage.removeItem("id")
            localStorage.removeItem("token")
            localStorage.removeItem("role")
            localStorage.removeItem("nama_user")
            localStorage.removeItem("username")
        }
    }
    render(){
        return(
            <div className="navbar">
                
                <a className="nav-main" href="#">
                    Inventaris Ruang URTU Rotekinfo
                </a>
                <div className="nav-yellow">
            </div>
            <div className="nav-yellow">
            </div>
                {/* menu */}
                <div className="navbar">
                    <ul className="nav-text">
                        <li>
                            <Link className="nav-text" to="/inv">
                                Inventaris
                            </Link>
                        </li>
                        <li>
                            <Link to="/user" className="nav-text">
                                User
                            </Link>
                        </li>
                        <li  onClick={() => this.logOut()}>
                            <a className="nav-text" href="/">
                                <span onClick={() => this.logOut()}>Logout</span>
                            </a>
                        </li>
                        <li className="nav-text">
                            {this.state.nama_user}
                        </li>    
                    </ul>
                </div>
            </div>
            
        )
    }
}
export default Navbar;
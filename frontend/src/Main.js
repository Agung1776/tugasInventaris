import React from "react"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./pages/Login"
import User from "./pages/User"
// import Tambah_data from "./pages/Tambah_data"
import Inv from "./pages/Inv"

class Main extends React.Component{
    render(){
        return (
            <Router>
                <Routes>
                    <Route exact path="/" element={<Login/>} />
                    <Route exact path="/inv" element={<Inv/>} />
                    <Route path="/user" element={<User/>} />
                    {/* <Route path="*" element={<NotFound/>} />
                    <Route path="/Inv" element={<Inv/>} /> */}
                </Routes>
            </Router>


        )
    }
}
export default Main;
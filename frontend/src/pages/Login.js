import React from "react";
import axios from 'axios'

export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: "",
            isModalOpen: false,
            logged: false,
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLogin = (e) => {
        e.preventDefault()
        let data = {
            username: this.state.username,
            password: this.state.password
        }
        let url = "http://localhost:8000/user/login"
        axios.post(url, data)
            .then(response => {
                this.setState({ logged: response.data.data.logged })
                if (response.status === 200) {
                    let id_user = response.data.data.id_user
                    let token = response.data.data.token
                    let nama_user = response.data.data.nama_user
                    let role = response.data.data.role
                    let username = response.data.data.username
                    localStorage.setItem("id_user", id_user)
                    localStorage.setItem("token", token)
                    localStorage.setItem("role", role)
                    localStorage.setItem("nama_user", nama_user)
                    localStorage.setItem("username", username)
                    alert("Success Login")
                    window.location.href = "/inv"
                } else {
                    alert(response.data.message)
                    this.setState({ message: response.data.message })

                }
            })
            .catch(error => {
                console.log("error", error.response.status)
                if (error.response.status === 404) {
                    window.alert("Failed to login dashboard");
                }
            })
    }
    render() {
        return (
            <div className="bg-login">
                <div className="hitam"></div>
                <div className="login">
                    <div className="inline-flex items-center w-full">
                        <h1 className="text-lg font-bold text-neutral-600 leading-6 lg:text-5xl">Selamat Datang!</h1>
                    </div>
                    <div className="mt-4 text-base text-gray-500">
                        <h3>Inventaris Ruang Urtu Rotekinfo</h3>
                    </div>
                    <form onSubmit={this.handleLogin}>
                        <div className="mt-6 space-y-2">
                            <div>
                                <h1 htmlFor="username" className="sr-only">Username</h1><br></br>
                                <input type="text" name="username" id="username" className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" placeholder="Nama pengguna" value={this.state.username} onChange={this.handleChange} />
                            </div>
                            <div>
                                <h1 htmlFor="password" className="sr-only">Password</h1> <br></br>
                                <input type="password" name="password" id="password" className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" placeholder="Kata sandi" value={this.state.password} onChange={this.handleChange} />
                            </div>
                            <div className="flex flex-col mt-4 lg:space-y-2">
                                <button type="submit" name="login">Log In</button>
                            </div>
                        </div>
                    </form>
                    <div className="order-first hidden w-full lg:block">
                        <img className="object-cover h-full bg-cover rounded-l-lg" src="../assets/logo.png" alt="" />
                    </div>
                </div>
            </div>
        );
    }
}
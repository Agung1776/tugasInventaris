import React, { Component } from "react" 

import Navbar from '../Components/Navbar' 

import axios from 'axios' 

import { Modal } from 'bootstrap' 

 

class User extends Component { 

    constructor() { 

        super(); 

        this.state = { 

            user: [], 

            id_user: 0,

            nama_user: "", 

            role: "", 

            username: "",

            password: "", 

            action: "", 

            search: "", 

 

        } 

    } 

    getuser() { 

        axios.get("http://localhost:8000/user/getuser") 

            .then(response => { 

                this.setState({ 

                    user: response.data.user 

                }) 

                console.log(response) 

            }) 

            .catch(error => { 

                console.log(error); 

            }); 

    } 

    componentDidMount() { 

        this.getuser() 

        this.modalshow = new Modal(document.getElementById("modal")) 

    } 

    Add = () => { 

        this.modalshow.show(); 

        this.setState({         

            nama_user: "", 

            role: "",  

            username: "", 

            password: "", 

            action: "insert"

        }); 

 

    } 

    bind = (event) => { 

        this.setState({ [event.target.name]: event.target.value }); 

    } 

    Save = (event) => { 

        event.preventDefault(); 



        let data = {
            nama_user:this.state.nama_user,
            role:this.state.role,
            username: this.state.username,
            password: this.state.password
        } 
         
        let url = ""; 

        if (this.state.action === "insert") { 

            url = "http://localhost:8000/user/insertuser" 

            let data = {
                nama_user:this.state.nama_user,
                role:this.state.role,
                username: this.state.username,
                password: this.state.password
                } 
            // new Response(formData).text().then(console.log)
            // console.log(this.state.nama_user)
            // console.log(formData.append("password", this.state.password))
            axios.post(url, data) 
            // console.log(axios.post(url, formData))
                .then(response => { 

                    // jika proses simpan berhasil, memanggil data yang terbaru 

                    this.getuser(); 

                }) 

                .catch(error => { 

                    console.log(error); 

                    alert('gagal insert'); 

                }); 

        } else { 

            url = "http://localhost:8000/user/updateuser/" + this.state.id_user 

            let data = {
                nama_user:this.state.nama_user,
                role:this.state.role,
                username: this.state.username,
                password: this.state.password
            }  
            console.log(this.state.nama_user)
            
            axios.put(url, data) 
            // console.log(axios.put(url, formData))
                .then(response => { 

                    // jika proses simpan berhasil, memanggil data yang terbaru 

                    this.getuser(); 

                }) 

                .catch(error => { 

                    console.log(error); 

                    alert('gagal update'); 

                }); 

        } 

 

        // menutup form modal 

        this.modalshow.hide(); 

    } 

    Edit = (item) => { 

        this.setState({ 

            id_user: item.id_user, 

            nama_user: item.nama_user, 

            role: item.role, 

            username: item.username,  

            password: item.password,

            action: "update" 

        }); 

        this.modalshow.show() 

    } 

    finduser = (event) => { 

        let url = "http://localhost:8000/user/search"; 

        if (event.keyCode === 13) { 

            // menampung data keyword pencarian 

            let form = { 

                find: this.state.search 

            } 

            // mengakses api untuk mengambil data pegawai 

            // berdasarkan keyword 

            axios.post(url, form) 

                .then(response => { 

                    // mengisikan data dari respon API ke array pegawai 

                    this.setState({ user: response.data.user }); 

                    console.log(response) 

                }) 

                .catch(error => { 

                    console.log(error); 

                }); 

        } 

    } 

    Drop = (id) => { 

        if (window.confirm("Apakah anda yakin?")) { 

            let url = "http://localhost:8000/user/dropuser/" + id; 

            axios.delete(url) 

                .then(response => { 

                    // mengisikan data dari respon API ke array pegawai 

                    this.getuser() 

                }) 

                .catch(error => { 

                    console.log(error); 

                }); 

        } 

    } 

 

    render() { 

        return ( 

            <div> 
              <div className="header">
                <Navbar /> 
                        <h3>Daftar User</h3> 
                        <span>
                          <button className="btn btn-success" onClick={this.Add} 

                            data-toggle="modal"> 

                            Tambah Data 

                          </button>  
                        </span>

                        <input type="text" className="form-control mb-2" name="search" value={this.state.search} 

                            onChange={this.bind} onKeyUp={this.finduser} placeholder="Pencarian..." /> 
              </div>
                <div className="container"> 

                    <div className="alert alert-dark"> 

                        

                        {/* tampilan tabel pegawai */} 

                        <table > 
  

                            <thead> 

                                <tr> 

                                    <th>Nama User</th> 

                                    <th>Role</th> 

                                    <th>Username</th> 

                                    <th>Password</th> 

                                    <th>Aksi</th> 

                                </tr> 

                            </thead> 

                            <tbody> 

                                {this.state.user.map((item, index) => { 

                                    return ( 

                                        <tr key={index}> 

                                            <td>{item.nama_user}</td> 

                                            <td>{item.role}</td> 

                                            <td>{item.username}</td>  

                                            <td>{item.password}</td> 

                                            <td> 

                                                <button className="tmbl-edt" data-toggle="modal" 

                                                    data-target="#modal" onClick={() => this.Edit(item)}> 

                                                    Edit 

                                                </button> 

                                                <button className="tmbl-hps" onClick={() => this.Drop(item.id_user)}> 

                                                    Hapus 

                                                </button> 

                                            </td> 

                                        </tr> 

                                    ); 

                                })} 

                            </tbody> 

                        </table> 

                        <button className="btn btn-success" onClick={this.Add} 

                            data-toggle="modal"> 

                            Tambah Data 

                        </button> 

                        {/* modal form user */} 

                        <div className="modal fade" id="modal"> 

                            <div className="modal-dialog"> 

                                <div className="modal-content"> 

                                    <div className="modal-header"> 

                                        Form User 

                                    </div> 

                                    <form onSubmit={this.Save}> 
                                    <center>
                                        <div className="modal-body"> 

                                            Nama User

                                            <input type="text" name="nama_user" value={this.state.nama_user} onChange={this.bind} 

                                                className="form-control" required /> 

                                           <center> Role </center>
                                        
                                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black" placeholder="Jenis role" name="role" value={this.state.role} onChange={this.bind} required>
                                            <option value="">Pilih Role</option>
                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                        </select> <br></br><br></br>
                                        
                                            Username 

                                            <input type="text" name="username" value={this.state.username} onChange={this.bind} 

                                                className="form-control" required /> 

                                            Password 

                                            <input type="text" name="password" value={this.state.password} onChange={this.bind} 

                                                className="form-control" required />

                                        </div> 

                                        <div className="modal-footer"> 

                                            <button className="btn btn-sm btn-success" type="submit"> 

                                                Simpan 

                                            </button> 

                                        </div> 
                                    </center> 
                                    </form> 

                                </div> 

                            </div> 

 

                        </div> 

                    </div> 

                </div> 

            </div> 

        ) 

    } 

} 

export default User;
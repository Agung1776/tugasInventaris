import React, { Component } from "react" 

import Navbar from '../Components/Navbar' 

import axios from 'axios' 

import { Modal } from 'bootstrap' 

 

class Inv extends Component { 

    constructor() { 

        super(); 

        this.state = { 

            inv: [], 

            id_barang: 0,

            nama_barang: "", 

            jumlah: 0, 

            satuan: "",

            gambar: "", 

            action: "", 

            search: "", 

 

        } 

    } 

    getinv() { 

        axios.get("http://localhost:8000/inv/getinv") 

            .then(response => { 

                this.setState({ 

                    inv: response.data.barang 

                }) 

                console.log(response) 

            }) 

            .catch(error => { 

                console.log(error); 

            }); 

    } 

    componentDidMount() { 

        this.getinv() 

        this.modalshow = new Modal(document.getElementById("modal")) 

    } 

    Add = () => { 

        this.modalshow.show(); 

        this.setState({         

            nama_barang: "", 

            satuan: "",  

            jumlah: "", 

            gambar: "", 

            action: "insert"

        }); 

 

    } 

    bind = (event) => { 

        this.setState({ [event.target.name]: event.target.value }); 

    } 

    onFileChange = event => { 

        // Update the state 

        this.setState({ gambar: event.target.files[0] }); 

    }; 

    Save = (event) => { 

        event.preventDefault(); 



        const formData = new FormData(); 

        formData.append("nama_barang", this.state.nama_barang); 

        formData.append("jumlah", this.state.jumlah) 

        formData.append("satuan", this.state.satuan) 
 
        if (this.state.gambar != "") { 

            formData.append("gambar", this.state.gambar, this.state.gambar.name); 

        } 
        
        let url = ""; 

        if (this.state.action === "insert") { 

            url = "http://localhost:8000/inv/insertinv" 

            const formData = new FormData(); 

            formData.append("nama_barang", this.state.nama_barang); 

            formData.append("jumlah", this.state.jumlah) 

            formData.append("satuan", this.state.satuan) 

            if (this.state.gambar != "") { 

                formData.append("gambar", this.state.gambar, this.state.gambar.name); 

            }
            new Response(formData).text().then(console.log)
            console.log(this.state.nama_barang)
            console.log(formData.nama_barang)
            axios.post(url, formData) 
            console.log(axios.post(url, formData))
                .then(response => { 

                    // jika proses simpan berhasil, memanggil data yang terbaru 

                    this.getinv(); 

                }) 

                .catch(error => { 

                    console.log(error); 

                    alert('gagal insert'); 

                }); 

        } else { 

            url = "http://localhost:8000/inv/updateinv/" + this.state.id_barang 

            const formData = new FormData(); 

            formData.append("nama_barang", this.state.nama_barang); 

            formData.append("jumlah", this.state.jumlah) 

            formData.append("satuan", this.state.satuan)  

            if (this.state.gambar != "") { 

                formData.append("gambar", this.state.gambar, this.state.gambar.name); 

            } 

            axios.put(url, formData) 
            console.log(axios.put(url, formData))
                .then(response => { 

                    // jika proses simpan berhasil, memanggil data yang terbaru 

                    this.getinv(); 

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

            id_barang: item.id_barang, 

            nama_barang: item.nama_barang, 

            jumlah: item.jumlah, 

            satuan: item.satuan,  

            action: "update" 

        }); 

        this.modalshow.show() 

    } 

    findinv = (event) => { 

        let url = "http://localhost:8000/inv/search"; 

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

                    this.setState({ inv: response.data.barang }); 

                    console.log(response) 

                }) 

                .catch(error => { 

                    console.log(error); 

                }); 

        } 

    } 

    Drop = (id) => { 

        if (window.confirm("Apakah anda yakin?")) { 

            let url = "http://localhost:8000/inv/dropinv/" + id; 

            axios.delete(url) 

                .then(response => { 

                    // mengisikan data dari respon API ke array pegawai 

                    this.getinv() 

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
                        <h3>Daftar Inventaris</h3> 
                        <span>
                          <button className="btn btn-success" onClick={this.Add} 

                            data-toggle="modal"> 

                            Tambah Data 

                          </button>  
                        </span>

                        <input type="text" className="form-control mb-2" name="search" value={this.state.search} 

                            onChange={this.bind} onKeyUp={this.findinv} placeholder="Pencarian..." /> 
              </div>
                <div className="container"> 

                    <div className="alert alert-dark"> 

                        

                        {/* tampilan tabel pegawai */} 

                        <table > 
  

                            <thead> 

                                <tr> 

                                    <th>Nama Barang</th> 

                                    <th>Jumlah</th> 

                                    <th>Satuan</th> 

                                    <th>Gambar</th> 

                                    <th>Aksi</th> 

                                </tr> 

                            </thead> 

                            <tbody> 

                                {this.state.inv.map((item, index) => { 

                                    return ( 

                                        <tr key={index}> 

                                            <td>{item.nama_barang}</td> 

                                            <td>{item.jumlah}</td> 

                                            <td>{item.satuan}</td>  

                                            <td><img src={"http://localhost:8000/gambar/" + item.gambar} width="80" /></td> 

                                            <td> 

                                                <button className="tmbl-edt" data-toggle="modal" 

                                                    data-target="#modal" onClick={() => this.Edit(item)}> 

                                                    Edit 

                                                </button> 

                                                <button className="tmbl-hps" onClick={() => this.Drop(item.id_barang)}> 

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

                        {/* modal form inv */} 

                        <div className="modal fade" id="modal"> 

                            <div className="modal-dialog"> 

                                <div className="modal-content"> 

                                    <div className="modal-header"> 

                                        Form Inventaris 

                                    </div> 

                                    <form onSubmit={this.Save}> 

                                        <div className="modal-body"> 

                                            Nama Barang 

                                            <input type="text" name="nama_barang" value={this.state.nama_barang} onChange={this.bind} 

                                                className="form-control" required /> 

                                            Jumlah

                                            <input type="number" name="jumlah" value={this.state.jumlah} onChange={this.bind} 

                                                className="form-control" required /> 

                                            Satuan 

                                            <input type="text" name="satuan" value={this.state.satuan} onChange={this.bind} 

                                                className="form-control" required /> 

                                            Gambar 

                                            <input type="file" name="gambar" onChange={this.onFileChange} 

                                                className="form-control" /> 

                                        </div> 

                                        <div className="modal-footer"> 

                                            <button className="btn btn-sm btn-success" type="submit"> 

                                                Simpan 

                                            </button> 

                                        </div> 

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

export default Inv;
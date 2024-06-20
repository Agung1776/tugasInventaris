const db = require("../index") 

const upload = require('./file-upload').single('gambar') 

exports.getAllinvs = async (req, res) => { 

    let sql = "select * from barang" 

    db.query(sql, (error, result) => { 

        let response = null 

        if (error) { 

            response = { 

                message: error.message // pesan error 

            } 

        } else { 

            response = { 

                count: result.length, // jumlah data 

                barang: result // isi data 

            } 

        } 

        res.json(response) // send response 

    }) 

}; 

exports.insertinv = async (req, res) => { 

    upload(req, res, async error => { 

        // console.log(request.body); 

        if (error) { 

            return res.json({ message: error }) 

        } 

        let data = []; 

        if (!req.file) { 

            // return res.json({ message: `nothing to upload` }) 

            data = {  

                nama_barang: req.body.nama_barang, 

                jumlah: req.body.jumlah, 

                satuan: req.body.satuan

            } 

        } else { 

            data = {  

                nama_barang: req.body.nama_barang, 

                jumlah: req.body.jumlah, 

                satuan: req.body.satuan, 

                gambar: req.file.filename

            } 

        } 

 
        console.log(data)
        let message = "" 

 

        let sql = "insert into barang set ?" 

        db.query(sql, data, (err, result) => { 

            if (err) { 

                message = err.message 

            } else { 

                message = result.affectedRows + " row inserted" 

            } 

            let response = { 

                message: message 

            } 

            res.json(response) 

        }) 

    }) 

 

} 

exports.updateinv = async (req, res) => { 

 

    upload(req, res, async error => { 

        // console.log(request.body); 

        if (error) { 

            return res.json({ message: error }) 

        } 

        let data = []; 

        if (!req.file) { 

            data = [{  

                nama_barang: req.body.nama_barang, 

                jumlah: req.body.jumlah, 

                satuan: req.body.satuan 

            }, req.params.id] 

        } else { 

            data = 

                [{ 
 

                    nama_barang: req.body.nama_barang, 

                    jumlah: req.body.jumlah, 

                    satuan: req.body.satuan,

                    gambar: req.file.filename

                }, req.params.id] 

        } 

        let message = "" 

        let sql = "update barang set ? where id_barang = ?" 

        db.query(sql, data, (err, result) => { 

            if (err) { 

                message = err.message 

            } else { 

                message = result.affectedRows + " row updated" 

            } 

 

            let response = { 

                message: message 

            } 

            res.json(response) 

        }) 

    }) 

} 

exports.dropinv = async (req, res) => { 

    let data = { 

        id_barang: req.params.id 

    } 

    let message = "" 

    let sql = "delete from barang where ?" 

    db.query(sql, data, (err, result) => { 

        if (err) { 

            message = err.message 

        } else { 

            message = result.affectedRows + " row deleted" 

        } 

 

        let response = { 

            message: message 

        } 

        res.json(response) 

    }) 

} 

exports.search = async (req, res) => { 

    let find = req.body.find 

    let sql = "select * from barang where satuan like '%" + find + "%' or nama_barang like '%" + find + "%'" 

    db.query(sql, (err, result) => { 

        if (err) { 

            throw err 

        } else { 

            let response = { 

                count: result.length, 

                barang: result 

            } 

            res.json(response) 

        } 

    }) 

}
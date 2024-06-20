const db = require("../index") 
const md5 = require("md5") 
const Cryptr = require("cryptr") 
const crypt = new Cryptr("140533601726")

exports.login = async (req, response) => {  

    
    // create sql query 
    let username= req.body.username

    let password= req.body.password

         // password 

     

    let sql = "SELECT * FROM `user` WHERE username = '"+username+"' AND password ='"+password+"'" 

 

    // run query 

    db.query(sql,(error, result) => { 
        if (error) throw error 

 
        
        // cek jumlah data hasil query 

        if (result.length > 0) { 

            // user tersedia 

            return response.status(200).json({
                message: "Success login",
                
                data:{
                    id_user: result[0].id_user,
                    username: result[0].username,
                    nama_user: result[0].nama_user,
                    token: crypt.encrypt(result[0].id_user),
                    role: result[0].role,
                },
            });

        } else { 

            
                return response.status(404).json({
                    message: "username or password doesn't match",
                    err: error,
                });
           

        } 

    }) 

}

exports.getAllusers = async (req, res) => { 

    let sql = "select * from user" 

    db.query(sql, (error, result) => { 

        let response = null 

        if (error) { 

            response = { 

                message: error.message // pesan error 

            } 

        } else { 

            response = { 

                count: result.length, // jumlah data 

                user: result // isi data 

            } 

        } 

        res.json(response) // send response 

    }) 

}; 

exports.insertuser = async (req, res) => { 

        let data = [];        

            data = {  

                nama_user: req.body.nama_user, 

                role: req.body.role, 

                username: req.body.username, 

                password: req.body.password

            } 
        console.log(data)
        let message = "" 

        let sql = "insert into user set ?" 

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
 

} 

exports.updateuser = async (req, res) => { 

        let data = []; 
 

            data = [{  

                nama_user: req.body.nama_user, 

                role: req.body.role, 

                username: req.body.username,

                password: req.body.password

            }, req.params.id] 


        let message = "" 

        let sql = "update user set ? where id_user = ?" 

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
} 

exports.dropuser = async (req, res) => { 

    let data = { 

        id_user: req.params.id 

    } 

    let message = "" 

    let sql = "delete from user where ?" 

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

    let sql = "select * from user where nama_user like '%" + find + "%' or username like '%" + find + "%'" 

    db.query(sql, (err, result) => { 

        if (err) { 

            throw err 

        } else { 

            let response = { 

                count: result.length, 

                user: result 

            } 

            res.json(response) 

        } 

    }) 

}

const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql2")



const db = mysql.createPool({
    host:"localhost",
    user: "root",
    password: "**********",
    database: "ecommerce"
})


app.use(cors({}))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res)=>{
    const sqlGet = "SELECT * from product_detail"
    db.query(sqlGet, (err, result)=>{
        res.send(result)
    })
})


app.get("/seller/:seller_id", (req, res)=>{
    const {seller_id} = req.params
    const sqlGet = "SELECT * from product_detail WHERE seller_id = ?"
    db.query(sqlGet, seller_id,(err, result)=>{
        res.send(result)
    })
})

app.get("/bank/seller/:seller_id", (req, res)=>{
    const {seller_id} = req.params
    const sqlGet = "SELECT account from seller_detail WHERE seller_id = ?"
    db.query(sqlGet, seller_id,(err, result)=>{
        res.send(result)
    })
})

app.get("/bank/customer/:customer_id", (req, res)=>{
    const {customer_id} = req.params
    const sqlGet = "SELECT account from customer_detail WHERE customer_id = ?"
    db.query(sqlGet, customer_id,(err, result)=>{
        res.send(result)
    })
})



app.get("/getcart/:customer_id", (req, res)=>{
    const {customer_id} = req.params
    const sqlGet = "SELECT * from cart_history WHERE customer_id = ?"
    db.query(sqlGet, customer_id,(err, result)=>{
        res.send(result)
    })
})




app.get("/getcart/item/:customer_id", (req, res)=>{
    const {customer_id} = req.params
    const sqlGet = "select cart_history.order_id, product_detail.product_id, product_detail.product_name,product_detail.product_img, product_detail.price "+
    "FROM product_detail " +
    "JOIN cart_history ON product_detail.product_id = cart_history.product_id AND cart_history.customer_id = ? AND cart_history.status = 'incart' ;"
    db.query(sqlGet, customer_id,(err, result)=>{
        res.send(result)
        // var total = 0
        // for(var i=0; i<result.length; i++){
        //     var obj = result[i]
        //     total = total + obj["price"]
        // }
        // console.log(total)
       // return res.json({Total: total})
    })
})

app.get("/getorder/item/:customer_id", (req, res)=>{
    const {customer_id} = req.params
    const sqlGet = "select cart_history.order_id, cart_history.status ,product_detail.product_id, product_detail.product_name,product_detail.product_img, product_detail.price "+
    "FROM product_detail " +
    "JOIN cart_history ON product_detail.product_id = cart_history.product_id AND cart_history.customer_id = ? AND (cart_history.status = 'placed' OR cart_history.status = 'delievered');"
    db.query(sqlGet, customer_id,(err, result)=>{
        res.send(result)
        // var total = 0
        // for(var i=0; i<result.length; i++){
        //     var obj = result[i]
        //     total = total + obj["price"]
        // }
        // console.log(total)
       // return res.json({Total: total})
    })
})



//To show order and cart history in seller dashboard
app.get("/seller/cart/:seller_id", (req, res)=>{
    const {seller_id} = req.params
    const sqlGet = "select cart_history.order_id, cart_history.customer_id, product_detail.product_id, product_detail.product_name,product_detail.product_img, product_detail.price, cart_history.status "+
    "FROM product_detail " +
    "JOIN cart_history ON product_detail.product_id = cart_history.product_id AND cart_history.seller_id = ?;"
    db.query(sqlGet, seller_id,(err, result)=>{
        res.send(result)
        var total = 0
        for(var i=0; i<result.length; i++){
            var obj = result[i]
            total = total + obj["price"]
        }
        console.log(total)
    })
})




app.get("/seller/order/:seller_id", (req, res)=>{
    const {seller_id} = req.params
    const sqlGet = "select cart_history.order_id, cart_history.customer_id, product_detail.product_id, product_detail.product_name,product_detail.product_img, product_detail.price, cart_history.status "+
    "FROM product_detail " +
    "JOIN cart_history ON product_detail.product_id = cart_history.product_id AND cart_history.seller_id = ? AND status = 'placed';"
    db.query(sqlGet, seller_id,(err, result)=>{
        res.send(result)
        var total = 0
        for(var i=0; i<result.length; i++){
            var obj = result[i]
            total = total + obj["price"]
        }
        console.log(total)
    })
})


app.post("/api/post", (req, res) =>{
    const {product_name, product_img, num_item, description, category, price, seller_id} = req.body;
    
    const sqlInsert = "INSERT INTO product_detail (product_name, product_img, num_item, description, category, price, seller_id)"+
    " VALUES (?,?,?,?,?,?,?); "
    db.query(sqlInsert, [product_name, product_img, num_item, description, category, price, seller_id], (error, result)=>{
        if(error){
            console.log(error)
        }
    })

})

app.post("/addtocart/post", (req, res) =>{
    const {customer_id,
        product_id,
        sellerid} = req.body;
    
    const sqlInsert = "INSERT INTO cart_history (seller_id, customer_id, product_id, status)"+
    " VALUES (?,?,?,?); "
    db.query(sqlInsert, [sellerid, customer_id, product_id, "incart"], (error, result)=>{
        if(error){
            console.log(error)
        }
    })

})

app.delete("/api/remove/:product_id", (req, res) =>{
    const {product_id} = req.params;
    const sqlRemove = "DELETE FROM product_detail WHERE product_id = ?"
    
    db.query(sqlRemove,product_id, (error, result)=>{
        if(error){
            console.log(error)
        }
    })

})

app.delete("/cart/remove/:order_id", (req, res) =>{
    const {order_id} = req.params;
    const sqlRemove = "DELETE FROM cart_history WHERE order_id = ?"
    
    db.query(sqlRemove, order_id, (error, result)=>{
        if(error){
            console.log(error)
        }
    })

})




app.get("/api/get/:product_id", (req, res)=>{
    const {customer_id,product_id} = req.params
    const sqlGet = "SELECT * from product_detail WHERE product_id = ?"
    db.query(sqlGet, product_id, (err, result)=>{

        if(err){
            console.log(err)
        }

        res.send(result)
    })
  
})


app.get("/api/get/:customer_id/:product_id", (req, res)=>{
    const {customer_id,product_id} = req.params
    const sqlGet = "SELECT * from product_detail WHERE product_id = ?"
    db.query(sqlGet, product_id, (err, result)=>{

        if(err){
            console.log(err)
        }

        res.send(result)
    })
  
})

app.put("/api/update/:product_id", (req, res)=>{
    const {product_id} = req.params
    const {product_name, product_img, num_item, description, category, price, seller_id } = req.body
    const sqlUpdate = "UPDATE product_detail SET product_name= ? , product_img = ?, num_item= ?, description = ? , category = ? , price = ?, seller_id = ? WHERE product_id = ?"
    db.query(sqlUpdate, [product_name, product_img, num_item, description, category, price, seller_id, product_id], (err, result)=>{
        if(err){
            console.log(err)
        }
        res.send(result)
    })
  
})

app.put("/order/status/change/:customer_id", (req, res)=>{
    const {customer_id} = req.params

    const sqlUpdate = "UPDATE cart_history SET status= 'placed' WHERE customer_id = ?"
    db.query(sqlUpdate, customer_id, (err, result)=>{
        if(err){
            console.log(err)
        }
        res.send(result)
    })
  
})

app.put("/order/deliever/:order_id", (req, res)=>{
    const {order_id} = req.params

    const sqlUpdate = "UPDATE cart_history SET status= 'delievered' WHERE order_id = ?"
    db.query(sqlUpdate, order_id, (err, result)=>{
        if(err){
            console.log(err)
        }
        res.send(result)
    })
  
})



app.put("/seller/account/change/:seller_id/:amount", (req, res)=>{
    const {seller_id, amount} = req.params
    const sqlQuery = "SELECT account FROM seller_detail WHERE seller_id = ?"
    db.query(sqlQuery, seller_id, (err, result)=>{
        if(err){
            console.log(err)
        }
        const updatedAmount = parseInt(result[0].account) + parseInt(amount)

        const sqlUpdate = "UPDATE seller_detail SET account = ? WHERE seller_id = ?"

        db.query(sqlUpdate, [updatedAmount, seller_id], (er, rslt)=>{
        if(er){
            console.log(er)
        }
            console.log(`Amount ${updatedAmount-amount} added to seller's account`)
            res.send(result)
        })




    })

     

    // const sqlUpdate = "UPDATE seller_detail SET account=  WHERE seller_id = ?"
    // db.query(sqlUpdate, seller_id, (err, result)=>{
    //     if(err){
    //         console.log(err)
    //     }
    //     res.send(result)
    // })
  
})





app.get("/placeorder/:total/:customer_id", (req, res)=>{
    const {total, customer_id} = req.params
    const sqlQuery = "SELECT account from customer_detail where customer_id = ?"

    db.query(sqlQuery, customer_id, (err, result)=>{
        if(err){
            console.log(err)
        }
        console.log(result[0].account)
        if(total<=result[0].account){
            console.log("ok")
            var balance = result[0].account-total
            const sqlQ = "UPDATE customer_detail SET account = ? WHERE customer_id = ?"

            db.query(sqlQ, [balance, customer_id], (er, rslt)=>{
                if(er){
                    console.log(er)
                }
                //
            })

            console.log("successfully debited amount from customer's account")
            res.send("success")
        }
        else{
            
        console.log("not enough amount")
    
        }
        //res.send(result)
        
    })

})




app.get("/",(req, res) => {
    // const sqlInsert = "INSERT INTO product (product_id, product_name, num_item, description, category, price)"+
    // " VALUES (1,'Jen Wrist Watch', 100, 'Cool Watch', 'electronics', 2000); ";
    
    // db.query(sqlInsert, (err, result)=>{
    //     console.log("error", err)
    //     console.log("result", result)
    //     res.send("Heolo Express")
    // })
    
    
})


app.get("/login/get", (req, res)=>{
    const sqlGet = "SELECT * from customer"
    db.query(sqlGet, (err, result)=>{
        res.send(result)
    })
})


app.post('/login', (req, res) =>{
    const sql = "SELECT * from customer_detail where email = ? AND password = ?"

    db.query(sql, [req.body.email, req.body.password],(err, data) =>{
        if(err) return res.json("Server Side Error")
        if(data.length > 0){
            console.log(data[0])
            // const email = data[0].email
            // const token = jwt.sign({email}, "secretsecretsecretsecretsecretsecret", {expiresIn : '1d'})
            // res.cookie('token', token)
            return res.json({Status: "Success", Customer: data[0]})
        }else{
            return res.json({Message: "No such record"})
        }
    } )

})

app.post('/seller/login', (req, res) =>{
    const sql = "SELECT * from seller_detail where seller_email = ? AND seller_password = ?"

    db.query(sql, [req.body.email, req.body.password],(err, data) =>{
        if(err) return res.json("Server Side Error")
        if(data.length > 0){
            console.log(data[0])
            // const email = data[0].email
            // const token = jwt.sign({email}, "secretsecretsecretsecretsecretsecret", {expiresIn : '1d'})
            // res.cookie('token', token)
            console.log(data[0])
            return res.json({Status: "Success", Seller: data[0]})
        }else{
            return res.json({Message: "No such record"})
        }
    } )

})



app.post("/customer/register", (req, res)=>{

    const {c_name, email, password, mobile, address, account} = req.body
    const sql = "SELECT * from customer_detail where email = ?"


    db.query(sql, email, (err, data) => {
        if(err) {return res.json("Server side error")}
        if( data.length[0]>=1){
            return res.json({Status:"Failure"})
        }else{

            const reg = "INSERT INTO customer_detail (name,email, password, mobile, address, account )"+
            "VALUES (?,?,?,?,?,?);"
            db.query(reg, [c_name, email, password, mobile, address, account], (error, result)=>{
                if(error){
                    console.log(error)
                }else{
                    return res.json({Status: "Success", Customer: data[0]})
                }
            })

            
        }
        

    })

})







app.listen(5000, ()=>{

    console.log("Server is running on port 5000")

})

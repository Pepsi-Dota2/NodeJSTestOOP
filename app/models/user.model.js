const sql = require("./db.model");

const user_table = function( user) {
    this.email = user.email;
    this.password = user.password;
};

user_table.create = (newUser, result) =>{
    
    sql.query("INSERT INTO user_table SET ?", newUser, (error , res)=> {
        if(error){
            console.error(error);
            result(error, null);
            return;
        }
        result(null, { id: res.insertID, ...newUser})
    })
};

user_table.loginByEmailAndPassword = (email, password, result) =>{
    const qry = "SELECT id, email, password FROM user_table WHERE email = ? AND password = ?";
    sql.query(qry, [email, password], (error, res)=> {
        if(error){
            result(error , null);
            return;
        }
        if(res.length){
            result(null , res[0]);
            return;
        }
        return({kind:"not found"}, null);
    })
}

module.exports = user_table;
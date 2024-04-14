//database connection file accessing
const { dbCon }=require('../routes/database');

const loginFunc = (req, res) =>{
    var email=req.body.email;
    var password=req.body.password;
    var queryStr = "select * from registration_details where email='"+email+"' AND password='"+password+"';"
    console.log(queryStr)
    return new Promise(function(resolve, reject) {
        dbCon.query(queryStr, function (err, result) {
            if(err){
                return reject(err);
            };
            resolve(result);
           
        })
    })
 }
 
    const registerFunc=(req,res)=>{
    //trim this is for to remove spaces between name,email,password,phone,country
    var name=req.body.Name.trim();
    var email=req.body.Email.trim();
    var password=req.body.Password.trim();
    var phone=req.body.Phone.trim();
    var country=req.body.Country.trim();
     
    var sql="SELECT * from registration_details where Email='"+email+"';"
    console.log(sql);


    return new Promise(function(resolve, reject) {
        // The Promise constructor should catch any errors thrown on
        // this tick. Alternately, try/catch and reject(err) on catch.
        return dbCon.query(sql,function (err,result){
            if(err){
                return reject(err);
            }
            console.log(result);
            if(result && result.length >0){
                resolve(result);
            }else{
                var sql1="insert into registration_details(Name,Email,Password,Phone,Country) values('"+name+"','"+email+"','"+password+"','"+phone+"','"+country+"');"
                console.log(sql1);
                return dbCon.query(sql1,function(err,result1){
                    if(err) throw err;
                    console.log("Inside.......")
                    console.log(result1);
                    resolve(result1);
                })
            }
        
        })
    })

    
 };

const updateFunc=(req,res)=>{

    var name=req.body.Name;
    var email=req.body.Email;
    var phone=req.body.Phone;
    var country=req.body.Country;
    console.log(req.body);

    var queryStr = "update registration_details set Name='"+name+"',Phone='"+phone+"',Country='"+country+"' where email='"+email+"';"
    console.log(queryStr);
    return new Promise(function(resolve,reject){
        dbCon.query(queryStr,function(err,result){
            if(err){
                return reject(err);
            }
           console.log(result);
            resolve(result);
            
                
        })
    })
}
const deleteFunc=(req,res)=>{

    var ID=req.body.ID;

    var queryStr = "Delete from registration_details where ID='"+ID+"';"
    console.log(queryStr);
    return new Promise(function(resolve,reject){
        dbCon.query(queryStr,function(err,result){
            if(err){
                return reject(err);
            }
           console.log(result);
            resolve(result);
            
                
        })
    })
}
    const updatepasswordfunc=(req,res)=>{
        var email=req.body.Email;
        var password=req.body.password[0];
        console.log(req.body.password[0]);
        console.log(req.body.Email);

            var queryStr = "select * from registration_details where email='"+email+"' AND password="+password+";"
            //console.log(queryStr)
            return new Promise(function(resolve,reject){
            dbCon.query(queryStr, function (err, result) {
            if(err){
                return reject(err);
            };
                
               console.log(result);
                if(result && result.length > 0){
                var mysql="update registration_details  set Password='"+req.body.password[1]+" 'where email='"+email+"';"
                console.log(mysql);
                dbCon.query(mysql, function(err,result1){
                    if(err) throw err;
                    resolve(result1);
                    console.log(result1);
                })
                }
            })
        })
    }

var sessionChecker = (req, res, next) => {    
    //console.log(`Session Checker: ${req.session.user.ID}`);
    if (req.session.user) {
        console.log(`Found User Session`.green);
        next();
    } else {
        console.log(`No User Session Found`.red);
        res.redirect('/users/login');
    }
};

//transfering functions to access this another file
module.exports = {loginFunc,registerFunc,updateFunc, sessionChecker,updatepasswordfunc,deleteFunc}



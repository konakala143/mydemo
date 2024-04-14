var express = require('express');
var router = express.Router();
//var mysql = require('mysql2');
const { dbCon }=require('./database');
const {  registerFunc,loginFunc,updateFunc,deleteFunc } = require('../controllers/users');

router.get('/profile', function(req, res, next) {
    var email='samba@gmail.com';
    var queryStr = "select * from registration_details where email='"+email+"';"
    console.log(queryStr)
    dbCon.query(queryStr, function (err, result) {
      if(err) throw err;
        console.log(result);
        res.send(result[0]);
    })
   
  });

router.get('/search',function(req,res,next){
    var msg = "";
    var mailType = "";
    console.log(req.query.mail=='gmail.com');
    if(req.query && req.query.mail=='gmail.com'){
      msg = req.query.message
      mailType = req.query.mail

      //console.log(msg);
      //console.log(msgType);
      var queryStr = "SELECT * FROM registration_details WHERE Email LIKE '%gmail.com%';"
    console.log(queryStr)
    dbCon.query(queryStr, function (err, result) {
      if(err) throw err;
        console.log(result);
        res.send(result);})
    }
    else{
        var queryStr = "SELECT * FROM registration_details WHERE Email LIKE '%yahoo.com%';"
        console.log(queryStr)
        dbCon.query(queryStr, function (err, result) {
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
   }


   
 })



  router.post('/register', function(req, res, next) {
    console.log(req.body)
    var result = registerFunc(req, res).then(registerRes =>{
      console.log(registerRes)
      if(registerRes && registerRes.length >0){
          var email=registerRes[0].Email;
          console.log(email);
          var msg = 'This Email id alredy exits';
          var msgtype='error'
          res.send({"status":msgtype, "message": msg, "data": registerRes})
      }else{
          var msg = 'Registeration sucessful';
          var msgtype='success'
          res.send({"status": "success", "message": msg, "data": registerRes})
      }
    });
    
  })

  router.post('/login', function(req, res, next) {
    //console.log(req.session)
    var result = loginFunc(req, res).then(loginRes =>{
      //console.log(loginRes)
      if(loginRes && loginRes.length >0){
          req.session.user = loginRes[0]
          res.send({"data": loginRes})
      }else{
          var msg ='Username and Password invalid';
          res.send({"status": "failed", "message": msg, "data": loginRes})

      }
    });
  });

 router.put('/update', function(req, res, next) {
            var result = updateFunc(req, res).then(updateres =>{
              //console.log(updateFunc)
              if(updateres && updateres.affectedRows > 0 && updateres.changedRows > 0){
                  var msg ='Your Details Updated sucessfuly';
                  var msgtype='success'
                  res.send({"status":"true","message":msg,"data":updateres})
              }
              else{
                  var msg ='this email is not registered';
                  var msgtype='error'
                  res.send({"status":"flase","message":msg})
              }
            });
      });

        router.delete('/delete', function(req, res, next) {
        //         var ID='43';
        //         var queryStr = "delete from registration_details where ID='"+ID+"';"
        //         console.log(queryStr)
        //         dbCon.query(queryStr, function (err, result) {
        //         if(err) throw err;
        //         if(result && result.affectedRows > 0){
        //             var msg ='Your Details Deleted sucessfuly';
        //             var msgtype='success'
        //             res.send({"status":"true","message":msg,"data":result})
        //         }
        //         else{
        //             var msg ='this email is not registered';
        //             var msgtype='error'
        //             res.send({"status":"flase","message":msg,"data":result})
        //         }
        // })
                var result = deleteFunc(req, res).then(deleteres =>{
                    //console.log(updateFunc)
                    if(deleteres && deleteres.affectedRows > 0){
                        var msg ='Your Details deleted sucessfuly';
                        var msgtype='success'
                        res.send({"status":"true","message":msg,"data":deleteres})
                    }
                    else{
                        var msg ='this email is not registered';
                        var msgtype='error'
                        res.send({"status":"flase","message":msg})
                    }
                })
            });



module.exports = router

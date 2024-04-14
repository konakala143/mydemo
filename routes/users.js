const { name } = require('ejs');
var express = require('express');
var router = express.Router();
//database connection file accessing
const { dbCon }=require('./database');
//accessing file with different functions
const { loginFunc, sessionChecker, registerFunc, updateFunc,updatepasswordfunc,deleteFunc } = require('../controllers/users');

/* GET users listing. */
  router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

  router.get('/login', function(req,res,next){
    if (req.session.user){
        res.redirect('/users/profile');
    }
      var msg = "";
      var msgType = "";

      if(req.query && req.query.message){
        msg = req.query.message
        msgType = req.query.msgType
        //console.log(msg);
        //console.log(msgType);
      }
      //console.log(msgType);
    res.render('login',{status: true, message: msg, msgType: msgType})
  });

  router.post('/login', function(req, res, next) {
    //console.log(req.session)
    var result= loginFunc(req, res).then(loginRes =>{
      console.log(loginRes)
      if(loginRes && loginRes.length >0){
        console.log(loginRes);
         req.session.user = loginRes[0];
          res.redirect('/users/profile')
      }else{
          var msg = encodeURIComponent('Username and Password invalid');
          var msgtype='error'
          res.redirect('/users/login?message='+msg+'&msgType='+msgtype)
      }
    });
  });

    router.get('/register', function(req, res, next) {
      console.log(req.query)
      var msg = "";
      var msgType = "";
      if(req.query && req.query.message){
        msg = req.query.message
        msgType = req.query.msgType
      }
      
      res.render('register',{status: true, message: msg, msgType: msgType});
    });
    router.post('/register', function(req, res, next) {
      var result = registerFunc(req, res).then(registerres =>{
        console.log(registerres)
        if(registerres && registerres.length >0){
            var email=registerres[0].Email;
            console.log(email);
            var msg = 'This Email id alredy exits';
            var msgtype='error'
            res.redirect('/users/register?message='+msg+'&msgType='+msgtype)
        }
        else if(registerres && registerres.affectedRows >0){
            var msg = 'Registeration sucessful';
            var msgtype='success'
            res.redirect('/users/register?message='+msg+'&msgType='+msgtype)
        }else{
            var msg='Registeration failed';
            var msgtype='warning'
            res.redirect('/users/register?message='+msg+'&msgType='+msgtype)
        }})
      });  
      
      

  router.get('/update',sessionChecker, function(req, res, next) {
    //console.log(req.session);
      var email=""
      var result=''
      
      console.log(result);
      console.log(email);
      //console.log(email);
    var msg = "";
    var msgType = ""
    if(req.query && req.query.message){
      msg = req.query.message
      msgType = req.query.msgType
    }
    if(req.session.user&&req.session.user.Email){
      result=req.session.user
      //email=req.session.user.Email
    }
    //console.log(req.query.message)
    // var email='samba@gmail.com';
    
      // var queryStr = "select * from registration_details where email='"+req.query.message+"';"
      // console.log(queryStr)
      // dbCon.query(queryStr, function (err, result) {
      //   if(err) throw err;
      //     console.log(result);
      //     if(result && result.length > 0){
      //       res.render('update',{status: true, message: msg, data: result[0], msgType: msgType});
      //     }else{
      //       res.render('update',{status: true, message: msg, data: result[0], msgType: msgType});
      //     }
      //   })
        res.render('update',{status: true,data:result, message: msg, msgType: msgType})
      });
 


  router.post('/update', function(req, res, next) {
    
    // var queryStr = "select * from registration_details where email='"+email+"';"
    //   console.log(queryStr)
    //   dbCon.query(queryStr, function (err, result) {
    //     if(err) throw err;
    //       console.log(result);
    //       if(result && result.length > 0){
    //         var mysql="update registration_details set Name='"+name+"',Password='"+password+"',Phone='"+phone+"',Country='"+country+"' where email='"+email+"'"
    //         console.log(mysql);
    //         dbCon.query(mysql, function(err,result1){
    //           if(err) throw err;
    //           console.log(result1)
    //           if(result1 && result1.affectedRows > 0 && result1.changedRows > 0){
    //             //result not empty and result1.affectedrows is greater than zero and result1.changedrows is greater than zero...
    //             var msg = encodeURIComponent('User details updated successfully.');
    //             var msgType = 'success'
    //             res.redirect('/users/update?message='+msg+'&msgType='+msgType)
    //           }else if(result1 && result1.affectedRows > 0 && result1.changedRows == 0){
    //             var msg = encodeURIComponent("You didn't modified ");
    //             var msgType = 'warning'
    //             res.redirect('/users/update?message=' + msg+'&msgType='+msgType)
    //           }else{
    //             var msg = encodeURIComponent('Something entered wrong. Please try again later.');
    //             var msgType = 'error'
    //             res.redirect('/users/update?message=' + msg+'&msgType='+msgType)
    //           }
            
    //           //res.send({status: true, data: result1});
    //         })
            var result = updateFunc(req, res).then(updateres =>{
              //console.log(updateFunc)
              if(updateres && updateres.affectedRows > 0 && updateres.changedRows > 0){
                  var msg ='Your Details Updated sucessfuly';
                  var msgtype='success'
                  res.redirect('/users/update?message='+msg+'&msgType='+msgtype)
              }
              else{
                  var msg ='this email is not registered';
                  var msgtype='error'
                  res.redirect('/users/update?message='+msg+'&msgType='+msgtype)
              }
            });
         // }
        //})
      });
    router.get('/profile', sessionChecker, function(req, res, next) {
      //this email we taken from login details
      console.log(req.session);
      var email=""
      if(req.session.user&&req.session.user.Email){
        email=req.session.user.Email
      }
      
      
        var queryStr = "select * from registration_details where email='"+email+"';"
        console.log(queryStr)
        dbCon.query(queryStr, function (err, result) {
          if(err) throw err;
            console.log(result);
            if(result && result.length > 0){
              res.render('profile',{status: true, data: result[0]});
            }else{
              res.render('register',{message: ""});
            }
          })
          
        });
    
    router.post('/profile', function(req, res, next) {
      console.log(req.body)
      res.render('update',{message: ""})

      
    });

    router.get('/password',sessionChecker, function(req, res, next) {
      console.log(req.query)
      var msg = "";
      var msgType = ""
      if(req.query && req.query.message){
        msg = req.query.message
        msgType = req.query.msgType
      }
      if(req.session.user&&req.session.user.Email){
        result=req.session
        email=req.session.user.Email
      }
      res.render('password', {status: true,data:email, message: msg, msgType: msgType});
    });


    router.post('/password', function(req, res, next) {
                console.log(updatepasswordres);
                var result = updatepasswordfunc(req, res).then(updatepasswordres=>{
                  if(updatepasswordres && updatepasswordres.affectedRows > 0 && updatepasswordres.changedRows > 0){
                  //result not empty and result1.affectedrows is greater than zero and result1.changedrows is greater than zero...
                  var msg ='User details updated successfully.';
                  var msgType = 'success'
                  res.redirect('/users/password?message='+msg+'&msgType='+msgType)
                }else if(updatepasswordres && updatepasswordres.affectedRows > 0 && updatepasswordres.changedRows == 0){
                  var msg ="You didn't modified ";
                  var msgType = 'warning'
                  res.redirect('/users/password?message=' + msg+'&msgType='+msgType)
                }else{
                  var msg ='Something entered wrong. Please try again later.';
                  var msgType = 'error'
                  res.redirect('/users/password?message=' + msg+'&msgType='+msgType)
                }})
              })
                // console.log(result);
                // if(result && result.affectedRows > 0 && result.changedRows > 0){
                  //result not empty and result1.affectedrows is greater than zero and result1.changedrows is greater than zero...
                //   var msg = encodeURIComponent('User details updated successfully.');
                //   var msgType = 'success'
                //   res.redirect('/users/password?message='+msg+'&msgType='+msgType)
                // }else if(result1 && result1.affectedRows > 0 && result1.changedRows == 0){
                //   var msg = encodeURIComponent("You didn't modified ");
                //   var msgType = 'warning'
                //   res.redirect('/users/password?message=' + msg+'&msgType='+msgType)
                // }else{
                //   var msg = encodeURIComponent('Something entered wrong. Please try again later.');
                //   var msgType = 'error'
                //   res.redirect('/users/password?message=' + msg+'&msgType='+msgType)
                // }
              
  router.get('/logout', async function(req, res, next) {
            req.session.destroy(function(err) {
                console.log('Destroyed session')
            })
            res.redirect('/users/login');
          });

          router.get('/delete',sessionChecker, function(req, res, next) {
            
              var email=""
              var result=""
            var msg = "";
            var msgType = ""
            if(req.query && req.query.message){
              msg = req.query.message
              msgType = req.query.msgType
            }
            if(req.session.user&&req.session.user.Email){
              result=req.session.user
              //email=req.session.user.Email
            }
            //console.log(req.query.message)
            // var email='samba@gmail.com';
            
              // var queryStr = "select * from registration_details where email='"+req.query.message+"';"
              // console.log(queryStr)
              // dbCon.query(queryStr, function (err, result) {
              //   if(err) throw err;
              //     console.log(result);
              //     if(result && result.length > 0){
              //       res.render('update',{status: true, message: msg, data: result[0], msgType: msgType});
              //     }else{
              //       res.render('update',{status: true, message: msg, data: result[0], msgType: msgType});
              //     }
              //   })
                res.render('profile',{status: true,data:result, message: msg, msgType: msgType})
              });
         
        
        
          router.post('/delete', function(req, res, next) {
            
            // var queryStr = "select * from registration_details where email='"+email+"';"
            //   console.log(queryStr)
            //   dbCon.query(queryStr, function (err, result) {
            //     if(err) throw err;
            //       console.log(result);
            //       if(result && result.length > 0){
            //         var mysql="update registration_details set Name='"+name+"',Password='"+password+"',Phone='"+phone+"',Country='"+country+"' where email='"+email+"'"
            //         console.log(mysql);
            //         dbCon.query(mysql, function(err,result1){
            //           if(err) throw err;
            //           console.log(result1)
            //           if(result1 && result1.affectedRows > 0 && result1.changedRows > 0){
            //             //result not empty and result1.affectedrows is greater than zero and result1.changedrows is greater than zero...
            //             var msg = encodeURIComponent('User details updated successfully.');
            //             var msgType = 'success'
            //             res.redirect('/users/update?message='+msg+'&msgType='+msgType)
            //           }else if(result1 && result1.affectedRows > 0 && result1.changedRows == 0){
            //             var msg = encodeURIComponent("You didn't modified ");
            //             var msgType = 'warning'
            //             res.redirect('/users/update?message=' + msg+'&msgType='+msgType)
            //           }else{
            //             var msg = encodeURIComponent('Something entered wrong. Please try again later.');
            //             var msgType = 'error'
            //             res.redirect('/users/update?message=' + msg+'&msgType='+msgType)
            //           }
                    
            //           //res.send({status: true, data: result1});
            //         })
                    var result = deleteFunc(req, res).then(deleteres =>{
                      //console.log(updateFunc)
                      if(deleteres && deleteres.affectedRows > 0 && deleteres.changedRows > 0){
                          var msg ='Your Details deleted sucessfuly';
                          var msgtype='success'
                          res.redirect('/users/update?message='+msg+'&msgType='+msgtype)
                      }
                      else{
                          var msg ='this email is not registered';
                          var msgtype='error'
                          res.redirect('/users/update?message='+msg+'&msgType='+msgtype)
                      }
                    });
                 // }
                //})
              });


router.get('/forgotPassword', function(req,res,next){
  res.render('Forgotpassword');
})

router.post('/forgotPassword',async function(req,res,next){
  try {
    const email=req.body.email;
    if (!email) {
      res.status(400).json("Missing required paramaters");
    } else {
      try {
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
          res.status(400).json("Invalid email");
        } else {
          const isHandled = await handleForgotPassword(email);
          if (isHandled) {
            res.status(200).json("Reset instruction sent");
          }
        }
      } catch (error) {
        res.status(500).json("Internal server error");
      }
    }
    
  } catch (error) {
    res.status(500).json("Internal server error");
  }
})




module.exports = router;


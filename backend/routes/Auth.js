var express = require('express');
var router = express.Router();
const UserDb = require('../Model/Users')
const jwt = require('jsonwebtoken')
const {ObjectId} = require('mongodb')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/register',(req,res)=>{

  const{FirstName,Lastname,Email,Password} = req.body

  console.log(req.body)

  UserDb.findOne({FirstName:FirstName,LastName:Lastname}).then(response=>{

    if(response == null){
      UserDb.collection.insertOne({FirstName:FirstName,LastName:Lastname,Email:Email,Password:Password,CreatedDate:new Date()},(err,result)=>{

        if(err) throw err
    
        if(result){
          res.json({response:true,message:"Sucessfully Added"})
        }
    
      })
      
    }else{
      res.json({response:false,message:"User Already Exist"})
    }

  }).catch(err=>{
    throw err
  })

  

})


router.post('/login',(req,res)=>{

  const {Username,Password} = req.body

  console.log(req.body)

  UserDb.findOne({FirstName:Username,Password:Password}).then((result)=>{

    console.log(result)

    if(!result){
      res.json({response:false,message:"User Not Registered"})
    }else{

      let jwtSecretKey = "secret";
      let data = {
          time: new Date(),
          username: Username,
      }
    
      const token = jwt.sign(data, jwtSecretKey,{expiresIn:'1h'});

      res.json({response:true,message:"User Found",detail:result,token })
    }

  }).catch(err => {
    throw err
});

})


router.post("/validateToken", (req, res) => {
  // Tokens are generally passed in the header of the request
  // Due to security reasons.

  // console.log(req.headers);
  let jwtSecretKey = "secret";

  try {
      const token = req.headers['token']

      const verified = jwt.verify(token, jwtSecretKey);
      if(verified){
          res.json({response:true,message:"Successfully Verified"})
      }else{
          // Access Denied
          res.json({response:false,message:"Access Denied"}).status(401)
      }
  } catch (error) {
      // Access Denied
      res.json({response:false,message:"Access Denied"}).status(401)
  }
});


router.get("/getAllUser",(req,res)=>{

  UserDb.find({}).then(response=>{

    if(response.length > 0){
      res.json({response:true,message:"Users Found",detail:response})
    }else{
      res.json({response:false,message:"Users Not Found",detail:response})
    }
  }).catch(err=>{
    throw err
  })
})



router.put('/updateUser/:id', (req, res) => {
  let id = req.params.id
  
 

  const {FirstName,LastName,Email,Password} = req.body
  UserDb.findOneAndUpdate({ _id: new ObjectId(id) },
      {
          $set: {
 
            FirstName:FirstName,
            LastName:LastName,
            Email:Email,
            Password:Password

          }
      }).then(response=>{
        console.log(response)

        if(response == null){
          res.json({response:false,message:"User Profile Not Updated",detail : []})
        }else{
          res.json({response:true,message:"User Profile Updated",detail : []})
        }
        
      }).catch(err=>{
        throw err
      })
})

module.exports = router;

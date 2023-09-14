var express = require('express');
var router = express.Router();
var TaskDb = require('../Model/Task')
const UserDb = require('../Model/Users')
const {ObjectId} = require('mongodb')

/* GET users listing. */
router.post('/postTask', (req, res)=>{
  
  const{Title,Description,DueDate,Status,AssignedBy} = req.body

  TaskDb.collection.insertOne({Title:Title,Description:Description,DueDate:new Date(DueDate),Status:Status,AssignedBy:new ObjectId(AssignedBy),CreatedOn:new Date(),AssignedTo:''},(err,result)=>{

    if(err) throw err

    if(result){
      res.json({response:true,message:"Successfully Created Task."})
    }


  })

});


router.get('/getAllTask/:id',(req,res)=>{
  
  const Id = req.params['id']
  const pipeline = [
    {
      $match: { $or: [{ AssignedBy: new ObjectId(Id) }, { AssignedTo: new ObjectId(Id) }] }
    },
    {
      $lookup: {
        from: "users",
        localField: 'AssignedBy',
        foreignField: "_id",
        as: "UserInfo"
      }
    }
  ];


  

  TaskDb.aggregate(pipeline).then((result)=>{

      if(result.length > 0){
        res.json({response:true,message:"Data Found",detail : result})
      }else{
        res.json({response:false,message:"Data Not Found",detail : result})
      }
    }).catch(err=>{
      throw err
    })

})



router.put('/updateTask/:id', (req, res) => {
  let id = req.params.id
  
  // console.log(id)

  // console.log(req.body)

  const {Title,Description,DueDate,Status} = req.body
  TaskDb.findOneAndUpdate({ _id: new ObjectId(id) },
      {
          $set: {

            Title: Title,
            Description:Description,
            DueDate:DueDate,
            Status:Status

          }
      }).then(response=>{
        console.log(response)
        res.json({response:true,message:"Task Updated",detail : []})
      }).catch(err=>{
        throw err
      })
})


router.put('/updateTaskStatus/:id', (req, res) => {
  let id = req.params.id
  
  // console.log(id)

  // console.log(req.body)

  const {Status} = req.body
  TaskDb.findOneAndUpdate({ _id: new ObjectId(id) },
      {
          $set: {

          
            Status:Status

          }
      }).then(response=>{
        console.log(response)
        res.json({response:true,message:"Task Status Updated",detail : []})
      }).catch(err=>{
        throw err
      })
})



router.delete('/deleteTask/:id', (req, res) => {
  let id = req.params.id
  
  
  TaskDb.deleteOne({ _id: new ObjectId(id)}).then(response=>{
        console.log(response)
        res.json({response:true,message:"Task Deleted Sucessfully",detail : []})
      }).catch(err=>{
        throw err
      })
})


router.put('/AssignTask/:id', (req, res) => {
  let id = req.params.id
  
  console.log(id)

  console.log(req.body)

  const {AssignedTo} = req.body
  TaskDb.findOneAndUpdate({ _id: new ObjectId(id) },
      {
          $set: {

          
            AssignedTo:new ObjectId(AssignedTo)

          }
      }).then(response=>{
        console.log(response)

        if(response == null){
          res.json({response:false,message:"Task Status Not Updated",detail : []})
        }else{
          res.json({response:true,message:"Task Status Updated",detail : []})
        }
        
      }).catch(err=>{
        throw err
      })
})







module.exports = router;

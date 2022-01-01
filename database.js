const mongoose = require("mongoose");
    
//connecting mongoose
const MONGODB_URI = 'mongodb+srv://Aguda:oluwadavey14@cluster123.kmcwy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection.on('connected', () => {
     console.log('connected')
})

//creating the person(human) prototype
let personSchema = new mongoose.Schema({
      name: {
            type: String,
            required: true
          },
          age: Number,
      
         favoriteFoods: [String]
      })

let Person = mongoose.model("Person", personSchema);


//Creating and Saving a Record of a Model
let person = new Person({name: "Liam", age: 30, favoriteFoods: ['Plantain, Rice']})
person.save((error, data) => {
     if(error){
          console.log(error);
     }else{
          console.log(data);
     }
})

//create many people with model.create()
let arrayOfPeople = [
     {
          name: "Rebecca",
          age: 25,
          favoriteFoods: ['Spaghetti, Rice']
     },
     {
          name: "Toyo",
          age: 27,
          favoriteFoods: ['Pounded Yam, Indomie']
     },
     {
          name: "Omar",
          age: 28,
          favoriteFoods: ['Fried Rice, Cous-Cous']
     },
];

//inserting the arrayOfPeople into the database
     Person.create(arrayOfPeople, (error, data) => {
          if(error){
               console.log(error)
          }else{
               console.log(data)
          }
     })


//using model.find() to search the database
     Person.find({name: 'Omar'}, (error, data) => {
          if(error){
               console.log(error)
          }else{
               console.log(data)
          }
     })



//using model.findOne() to return a single matching document from your database
     Person.findOne({favoriteFoods: {$all: ['Rice']}}, (error, data) =>{
          if(error){
               console.log(error)
          }else{
               console.log(data)
          }
     })



//Using model.findById() to search the database by _id

     Person.findById('61cf24537ad6b9b1f7a51c61', (error, data)  =>{
          if(error){
               console.log(error)
          }else{
               console.log(data)
          }
     })


//Performing updates on the database by running find, edit and then Save

     Person.findOne({name: 'Toyo'}, (error, result) => {
      if(error){
           console.log(error)
      }else{
           result.favoriteFoods.push("Yamarita")
           result.save((error, recordUpdate) => {
                if(error){
                     console.log(error);
                }else{
                    console.log(recordUpdate)
                }
           }) 
      }
 })


//Here, we're performing new updates on a document with model.findOneAndUpdate()
     Person.findOneAndUpdate({name: 'Liam'}, {age: 23}, {new: true}, (error, gotPerson) => {
          if(error){
               console.log(error);
          }
          console.log(gotPerson)
     });


//Deleting a document using model.findByIdAndRemove
  Person.findByIdAndRemove('61cf24537ad6b9b1f7a51c60', {new: true}, (error, deletedRecord) => {
       if(error){
            console.log(error);
       }else{
            console.log(deletedRecord)
       }
  })


  //Deleting Many Documents with model.remove()
       Person.remove({name: "Omar"}, (error, JSONStatus) => {
            if(error){
                 console.log(error);
            }else{
                 console.log(JSONStatus)
            }
       })
  

  //Using chain search query helpers to narrow search for results in the database
     Person.find({favoriteFoods: {$all: ['Rice']}})
          .sort({name: 'asc'})
          .limit(2)
          .select({age: true})
          .exec((error, data) => {
               if(error){
                    console.log(error);
               }else{
                    console.log(data)
               }
          }) 

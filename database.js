let mongoose = require('mongoose');
// const { MongoClient } = require('mongodb');    
//connecting mongoose
const MONGODB_URI = 'mongodb+srv://Aguda:oluwadavey14@cluster123.kmcwy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection.on('connected', () => {
     console.log('connected')
})
//creating the person(human) prototype
const humanSchema = new mongoose.Schema({
      name: {
            type: String,
            required: true
          },
          age: Number,
      
         favoriteFoods: [String]
      })

//Creating and Saving a Record of a Model
let Person = mongoose.model('Person', humanSchema)

let data = ({
     name: "Liam",
     age: 30,
     favoriteFoods: ['Plantain, Rice'] 
}) 

const person = new Person(data) // instance of the model

person.save((error) => {
     if(error){
          console.log('Error')
     }else{
          console.log('Saved')
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

let createManyPeople = new Person(arrayOfPeople)
     Person.create(arrayOfPeople, (error) => {
          if(error){
               console.log('error')
          }else{
               console.log('done')
          }
     })

//using model.find() to search the database
     // Person.find({name: 'Omar'}, (error) => {
     //      if(error){
     //           console.log('Error')
     //      }else{
     //           console.log('finished')
     //      }
     // })
let findPeopleByName = function(personName){
     Person.find({name: personName}, (error) =>{
          if(error){
               console.log('Error')
          }else{
               console.log('Worked!')
          }
     })
}



//using model.findOne() to return a single matching document from your database
let findOneByFavoriteFoods = function(personFavoriteFoods){
     Person.findOne({favoriteFoods: {$all: [personFavoriteFoods]}}, (error) =>{
          if(error){
               console.log('Error')
          }else{
               console.log('Worked!')
          }
     })
}


//Using model.findById() to search the database by _id
let findPersonById = function(personId, done){
     Person.findById(personId, (error, result)  =>{
          if(error){
               console.log(error)
          }else{
               done(null, result)
          }
     })
}

//Performing updates on the database by running find, edit and then Save
let findHumanById = function(personId, done){
     let newFood = 'Hamburger';
     Person.findById({name: 'Toyo'}, (error, result) => {
      if(error){
           console.log(error)
      }else{
           result.age = 30
           result.favoriteFoods.push(newFood)
           result.save((error, recordUpdate) => {
                if(error){
                     console.log(error);
                }else{
                     done(null, recordUpdate)
                }
           }) 
      }
 })
}

//Here, we're performing new updates on a document with model.findOneAndUpdate()
let findAndUpdate = (personName, done) => {
     let query = {name: personName}
     let update = {age: 20}
     let options = { new: true};
     Person.findOneAndUpdate(query, update, options, (error, gotPerson) => {
          if(error){
               console.log('There was an error');
          }
          done(null,gotPerson)
     });
};

//Deleting a document using model.findByIdAndRemove
let removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (error, deletedRecord) => {
       if(error){
            console.log(error);
       }else{
            done(null, deletedRecord)
       }
  })
}

  //Deleting Many Documents with model.remove()
  let removeManyPeople = (done) => {
       let nameToRemove = "Liam"
       Person.remove({name: nameToRemove}, (error, JSONStatus) => {
            if(error){
                 console.log(error);
            }else{
                 done(null, JSONStatus)
            }
       })
  }
  
  //Using chain search query helpers to narrow search for results in the database
  let queryChain = (done) => {
     let foodSearch = "Rice";
     Person.find({favoriteFoods: {$all: [foodSearch]}})
          .sort({name: 1})
          .limit(2)
          .select({age: true})
          .exec((error, filteredSearch) => {
               if(error){
                    console.log(error);
               }else{
                    done(null, filteredSearch)
               }
          }) 
}
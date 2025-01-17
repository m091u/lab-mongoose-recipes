const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const newRecipe = {
      title: "Tiramisu",
      level: "Easy Peasy",
      ingredients: ["Ladyfingers", "mascarpone", "eggs","expresso", "cocoa" ,"sugar"],
      cuisine: "italian",
      dishType: "dessert",
      image:"https://www.recipesfromitaly.com/wp-content/uploads/2019/10/authentic-Italian-tiramisu-600x900-1.jpg.webp",
      duration: 30,
      creator: "Unknown"
    }
  return Recipe.create(newRecipe);
  })
  .then((dataFromApi)=> {
    console.log(`This recipes title is ${dataFromApi.title}`);
    return Recipe.insertMany(data);
  })
  .then(() => {
   return Recipe.findOneAndUpdate({ title:"Rigatoni alla Genovese"}, { $set: { "duration": 100 } }, { new: true }); 
  })
  .then((update) => {
    console.log(`Update successful, new duration is` , update.duration);
  })
  .then(()=> {
    return Recipe.deleteOne({ title: "Carrot Cake"});
  })
  .then((result) => {
    if (result.deletedCount === 1) {
      console.log("Recipe successfully deleted");
    } else {
      console.log("Error deleting recipe");
    }
  })
  .then(()=> {
    mongoose.connection.close()
    console.log("Lab done! Connection closed")
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });



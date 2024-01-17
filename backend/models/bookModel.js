
import mongoose from "mongoose";


const bookSchema = mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  author:{
    type:String,
    required:true
  },
  publishYear:{
    type:Number,
    required:true
  }
},
{
  timestamps:true // recording time 
});

//creating Book model using mongoose
export const Book = mongoose.model('Book', bookSchema); //Model needs a schema => 'name' and 'type'

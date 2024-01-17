
import express from 'express';
import { Book } from '../models/bookModel.js';


const router = express.Router();

//----------------------------------------------------------Routes

//-----------------------Route to add a new book:
//create a new route to save a new book in th db
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all the required fileds: title, author, Publishyear",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

//----------------------Route to get All the books from DataBase

// ----creating a connection to the server with mongoose db
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({}); //empty { } to get all the items from db
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message); //difference in {}
    response.status(500).send({ message: error.message });
  }
});

//-------------------------Route to get a single book by id:

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params; //y {}
    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

//----------------------------Route to update the data

router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "send all the required feilds",
      });
    }
    // Destructuring assignment to extract 'id' from request.params
    const { id } = request.params; //requesting body is an objext => request.params.id

    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(400).json({ message: "Book not Found" });
    }

    return response.status(200).json({
      message: "Book updated succesfuuly",
    });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

//------------------------------Route to Delete a data

router.delete('/:id',async(request,response)=>{
  try{
    const {id} = request.params;
    const result = await Book.findByIdAndDelete(id);
    if(!result){
      return response.status(400).json({message: 'Book not found'}) //indicating response of json format
    }
    return response.status(200).send({message: 'Book deleted succesfully'}) // any tyoe of response. Plain , json
  }catch(error){
    console.log(error.message);
    response.status(400).send({message:error.message});
  }
});

export default router;
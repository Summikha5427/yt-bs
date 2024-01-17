
import express from "express"; //adding a express framework to create express application
import { PORT,monDBURL } from "./config.js"; //mongoose DateBase
import mongoose from "mongoose"; //mongoose library
import booksRoutes from "./routes/booksRoutes.js";
import cors from 'cors';

// --------------------------------------------------Framework and Middleware
//creating an instance for the express appllcation
const app = express();
//Middleware for passing request body
app.use(express.json());


//Middlware for handling CORS Policy
//Option 1: Allow all the origins with Default of cors(*)
app.use(cors());

//Option 2:Allow Custom Origins
// app.use(cors({
//   origin:'https://localhost:3000', //Only the clients with this origin can access this server
//   method:['GET','POST','PUT','DELETE'], //only there methods can be used by the client 
//   allowedHeaders: ['Content-Type'] 
// }));

//-----------Route for checking Connection with the server



//API - create a HTTP route(req,res) for the server
app.get("/", (request, response) => {
  console.log(request);
  return response
    .send("Welcome to the BookStore - MERN application")
    .status(200); //OK status code
}); 

//Middleware for Routes
app.use('/books',booksRoutes);

//----------------------------------------------------Mongoose connection
mongoose
  .connect(monDBURL)
  .then(() => {
    console.log("App connected to DB");
    //--listen method :to start the server.
    //-(ListenerNumber , a callback fucntion)
    app.listen(PORT, () => {
      console.log(`App is listening to the Port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

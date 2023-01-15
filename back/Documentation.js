import { model } from "mongoose"
import UserRoute from "./routes/User.Swagger.js";
import OutfitRoute from "./routes/OutFit.Swagger.js"


const swaggerDocumentation ={
openapi: "3.0.1",
info:{
    title :"Clothy Documentation",
    version: "0.0.1",
    description: "This is clothy app documentation"
},
servers: [
{
    url:"http://localhost:3000",
    decription :"Local dev"
}



],
tags:[
{name:"User",
description:"User Management"
},
{
    name:"OutFit",
    description:"OutFit Management"
    
}
],
paths:{

...UserRoute,
...OutfitRoute

},

};
export default swaggerDocumentation;
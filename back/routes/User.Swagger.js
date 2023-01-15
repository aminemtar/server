const user = [
    {
        firstname: "mohamedamine",
        lastname: "mtar",
        birthdate: "1998-02-09T23:00:00.000Z",
        pseudo: "mtar",
        imageF: "aa",
        email: "#######@esprit.tn",
        phone: 29076383,
        password: "$2a$10$pd8VSCcGTQ94MRMghULpSeJTDkbQU6JcZjKpsPcqKWkRUS7qdIeny",
        isVerified: false,
        preference: "hihop",
        gender: "male",
        _id: "637c2c94a48115fb9d28242a",
        createdAt: "2022-11-22T01:57:40.615Z",
        updatedAt: "2022-11-22T01:57:40.615Z",
        __v: 0
    }
]
const ListUser = {

    tags: ["User"],
    description: "List of all Users",
    responses: {
        200: {
            description: "Ok",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            count: 0,
                            user,
                        }
                    }
                }
            }
        }

    },
}
const CreateUser = {
    tags: ["User"],
    description: "Create User",
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        firstname: {
                            type: "string",
                            description: "Firstname of the user",
                            example: "MedAmine"
                        },
                        lastname: {
                            type: "string",
                            description: "Lastname of the user",
                            example: "MedAmine"
                        },
                        pseudo: {
                            type: "string",
                            description: "Pseudo of the user",
                            example: "Damine"
                        },
                        birthdate: {
                            type: "date",
                            description: "Birthdate of user",
                            example: "02-10-1998"
                        },
                        email: {
                            type: "string",
                            description: "email of user",
                            example: "######@gamil.com"
                        },
                        password: {
                            type: "string",
                            description: "Password of user",
                            example: "********"
                        },
                        phone: {
                            type: "int",
                            description: "Phone Number of user",
                            example: 2222222
                        },
                        preference: {
                            type: "string",
                            description: "Style preference of user",
                            example: "HIP-HOP,CHIC,..."
                        },
                        gender: {
                            type: "string",
                            description: "Gender of user",
                            example: "Male"
                        }
                    }
                }
            }
        }
    },
    responses: {
        200: {
            description: "Ok",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: user[0],

                    }
                }
            }
        }

    }
}
const UpdateUser ={
    tags: ["User"],
    description: "Update User",
    parameters:[
        {
            name:"id",
            in:"path",
            description:"ID of user",
            required:true,
            type:"string",
            example:"637c2c94a48115fb9d28242a"
        }
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        firstname: {
                            type: "string",
                            description: "Firstname of the user",
                            example: "MedAmine"
                        },
                        lastname: {
                            type: "string",
                            description: "Lastname of the user",
                            example: "MedAmine"
                        },
                        pseudo: {
                            type: "string",
                            description: "Pseudo of the user",
                            example: "Damine"
                        },
                        birthdate: {
                            type: "date",
                            description: "Birthdate of user",
                            example: "02-10-1998"
                        },
                        email: {
                            type: "string",
                            description: "email of user",
                            example: "######@gamil.com"
                        },
                       
                        phone: {
                            type: "int",
                            description: "Phone Number of user",
                            example: 2222222
                        },
                        preference: {
                            type: "string",
                            description: "Style preference of user",
                            example: "HIP-HOP,CHIC,..."
                        },
                        gender: {
                            type: "string",
                            description: "Gender of user",
                            example: "Male"
                        }
                    }
                }
            }
        }
    },
    responses: {
        200: {
            description: "Ok",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: user[0],

                    }
                }
            }
        }

    }

}
const GetUserById = {
    tags: ["User"],
    summary:"Get user by ID",
    description: "Get user by ID",
    parameters:[
        {
            name:"id",
            in:"path",
            description:"ID of user",
            required:true,
            type:"string",
            example:"637c2c94a48115fb9d28242a"
        }
    ],
    responses: {
        200: {
            description: "Ok",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: user[0],

                    }
                }
            }
        },
        500:{
          description:"User not found",
        }

    }

}
const login ={
    tags: ["User"],
    description: "Login ",
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {                       
                       
                        email: {
                            type: "string",
                            description: "email of user",
                            example: "######@gamil.com"
                        },
                        password: {
                            type: "string",
                            description: "Password of user",
                            example: "********"
                        },
                        
                    }
                }
            }
        }
    },
    responses: {
        200: {
            description: "Ok",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: user[0],

                    }
                }
            }
        }

    }

}
const DeleteUser ={
    tags: ["User"],
    summary:"Delete User by ID",
    description: "Delete User by ID",
    parameters:[
        {
            name:"id",
            in:"path",
            description:"ID of user",
            required:true,
            type:"string",
            example:"637c2c94a48115fb9d28242a"
        }
    ],
    responses: {
        200: {
            description: "Ok",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: user[0],

                    }
                }
            }
        },
        500:{
          description:"User not found",
        }

    }
}
const UserRoute = {
    "/api/allUser": {
        get: ListUser
    },
    "/api/register": {
        post: CreateUser
    },
    "/api/one/{id}":{
     get: GetUserById
    },
    "/api/UpdatePr/{id}":{
        put : UpdateUser
    },
    "/api/login":{
        post : login
    },
    "/deleteUser/:id":{
        delete: DeleteUser
    }
}
export default UserRoute
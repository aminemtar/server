const outfit = [
    {
        _id: "637c2c94a48115fb9d28242a",
        type: "T-Shirt",
        description: "ZARA PULL",
        taille: "S,XS,L,XL,XXL,.....",
        couleur: "Noir",
        createdAt: "2022-11-22T01:57:40.615Z",
        updatedAt: "2022-11-22T01:57:40.615Z",
        __v: 0
    }
]
const ListOutfit ={
    tags: ["OutFit"],
    description: "List of all OutFit",
    responses: {
        200: {
            description: "Ok",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            count: 0,
                            outfit,
                        }
                    }
                }
            }
        }

    },
}
const CreateOutfit ={
    tags: ["OutFit"],
    description: "Create OutFit",
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        typee: {
                            type: "string",
                            description: "type of OutFit",
                            example: "T-Shirt"
                        },
                        description: {
                            type: "string",
                            description: "Description of the OutFIT",
                            example: "ZARA PULL"
                        },
                        taille: {
                            type: "string",
                            description: "size of the OUTFIT",
                            example: "XL"
                        },
                        couleur: {
                            type: "string",
                            description: "color  of OUTFIT",
                            example: "02-10-1998"
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
                        example: outfit[0],

                    }
                }
            }
        }

    }
}
const OutfitRoute ={
    "/outfit/getall":{
        get: ListOutfit
    },
    "/outfit/add":{
        post: CreateOutfit
    }
}



export default OutfitRoute
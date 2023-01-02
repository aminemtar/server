# Clothy Server

This repository contains the server-side code for the Clothy iOS app. The server is built using Node.js and Express.js, and is responsible for handling API requests and storing data in a database.

## Installation

1. Clone this repository
2. Install dependencies by running `npm install`
3. Start the server by running `npm start`

## API

The Clothy server exposes the following API endpoints:

### GET /outfit/getone
Gets a list of all clothing items in the database

### POST /items
Adds a new clothing item to the database. Expects a JSON object in the following format:
{
    "userId": "id user",
    "type": "Item Type",
    "color" : "Item Color",
    "size" : "Item Size"
}

### DELETE /outfit/:id
Deletes the clothing item with the specified ID from the database.

## Database

The Clothy server uses a MongoDB database to store clothing items. You will need to set up your own instance of MongoDB and provide the connection string as an environment variable.

## Deployment

The Clothy server is set up to be easily deployable to a hosting service such as Heroku. Simply connect your desired hosting service to this repository and the server will be automatically deployed on every push to the `mtar` branch.

# Credits

haithem ghattas
mohamed amine mtar 

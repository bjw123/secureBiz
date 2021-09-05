# DB Migrate/Refresh Script Guide

DB migration script for populating and clearing the MongoDB
collection has been added, aiming to provide a convenient way of
setting up new MongoDB or refreshing the DB.

#### The DB migration command use cases:

- Testing the add/update/delete endpoints or functions with
  frequent DB record updates. It can help to reset collections
  quickly.
- Installing the application using a fresh MongoDB setup.

### Requirement

The MongoDB connection should be set up by updating the
`express/.env` environmental variable file.

Refer to: `express/.env.template` template for required fields
and values.

This is supported by package `dotenv`, visit the package's npm page
for more information:

https://www.npmjs.com/package/dotenv

### Script Location and Command Definition

The script location:

`express/migration/db_refresh.js`

The script definition is defined in `express/package.json`'s 
"scripts" property:

```
"scripts": {
    ...
    "migrate": "node migration/db_refresh.js",
    ...
}
```

### Config Settings

DB config settings can be found and updated from this file:

`express/config/dbConnect.js`

```javascript
const collectionLocations = {
  Category: '../database/Categories.json',
  Feedback: '../database/Feedback.json',
  Question: '../database/Questions.json'
}
```

`collectionLocations` stores the model and its respective JSON file
path.

### Command Format

`npm run migrate [MODEL_NAME] [OPERATION_FLAG]`

### Command Usage Example

1. To clear `Question` model's collection (`Questions` collection
in MongoDB), run:
  
   `npm run migrate Question down`

   This will clear up `Questions` collection.
   
   ***Note: in the command line example, `Question` is the model
   name that you can find from `express/models`. The model name can
   be different from the collection name.***
   
   Eg. `mongoose.model('Category', CategorySchema, 'Categories')`
   The above statement defines a `Category` model using `Categories`
   collection.
2. To populate or refresh `Question` model's collection using
   `database/Questions.json` file's data, run:
   
   `npm run migrate Question up`
   
   **Note: Adding `up` flag will run a complete removal first.**
   * `up` flag will create the collection using the collection name
     specified in the model definition.
   * It will clear up the collection first, if there are already
     records in it. So the records in it after using `up` flag will
     be identical as in the JSON source data file.

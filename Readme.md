# Simple Money Tracker 

## built using MERN stack

# Setup 

- Backend

`npm install express mongoose nodemon dotenv cors`

  - create a .env file and add <br>
    `MONGO_URL= your_mongodb_url`
- Frontend
    add your api url. for example :
  create a .env add the below to .env 
    ` VITE_API_URL=http://localhost:4000/api`
    So endpoints are
  - url+ '/transaction' to send post request
  - url  + '/transactions' to send get request

# How to use

as your start backend cd /backend then<br>
  `npm run start` <br>
start front end <br>
  `npm run dev` <br>

- Syntax for adding new transaction
   ex:
    +3000 salary <br>
    then set date time<br>
    description is not required but better to add<br>
    then submit and you have added it to you data base<br>

  Note: there must be gap between amount and title <br>
  ex: -200food is wrong syntax <br>
    +200 food us correct syntax
    

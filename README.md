# AgiLion

AgiLion is a ticket support system, where you can sign in, ask questions, write notes, view all your tickets and of course- get help from the support staff!<br />
It's a hands-on MERN project I developed while self-learning the course [React Front To Back 2022](https://www.udemy.com/course/react-front-to-back-2022/) by Brad Traversy on Udemy.<br /><br />
👉 [Click here](https://agi-lion.herokuapp.com/) for live demo!<br /><br />
The project contains all the fundamentals needed to create a MERN Stack Project (MongoDB, ExpressJS, React, NodeJS), including:
* Advanced React fundamentals such as:
  * Redux toolkit - state management (slices [reducers], useSelector & useDispatch hooks)
  * Private Routes
  * HTTP Requests with axios

* Database:
  * MongoDB - with Atlas and Compass
  * Mongoose- ODM

* Node.js & Express.js:
  * Creating RESTful API from scratch
  * Hashing passwords with bcryptjs for security measures
  * Authentication with JWT Token
  * Protected Routes
  * Working with Postman




## Usage

### Set Environment Variables

Add an .env file and insert your [MongoDB](https://www.mongodb.com/) database URI and your JWT secret to the .env file

### Install backend dependencies

```bash
npm install
```

### Install client dependencies

```bash
cd frontend
npm install
```

### Run app in development (frontend & backend)

```bash
npm run dev
```

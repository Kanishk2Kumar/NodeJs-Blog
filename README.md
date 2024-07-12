# Cyber Journal

## Overview
This project is a blogging website created using HTML, CSS, JavaScript, EJS, and MongoDB. It allows users to create and view blog posts. The website features a responsive design and includes functionalities such as user authentication, post categorization, and search.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Snippets](#project-snippets)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contact](#contact)

## Features
- User authentication (Sign up, Login, Logout)
- Create and Read blog posts
- Categorize posts by tags
- Search functionality
- Responsive design

## Technologies Used
- HTML
- CSS
- JavaScript
- EJS (Embedded JavaScript Templating)
- MongoDB
- Node.js
- Express.js

## Project Snippets
![image](https://github.com/user-attachments/assets/c996463f-c168-48cb-b85c-478f5b7e0f6c)
![image](https://github.com/user-attachments/assets/a848b419-5762-4c25-9129-e2c7f3f099f9)
![image](https://github.com/user-attachments/assets/9855e277-fc3b-4d99-94fb-177ebd26c38a)


## Installation
1. Clone the repository:
    sh
    https://github.com/Kanishk2Kumar/NodeJs-Blog.git
    
2. Navigate to the project directory:
    sh
    cd NodeJS-Blog
    
3. Install dependencies:
    sh
    npm install
    
4. Set up environment variables:
    - Create a .env file in the root directory
    - Add the following variables:
        env
        MONGODB_URI=your-mongodb-uri
        

## Usage
1. Start the development server:
    sh
    npm start

    or
   
    sh
    nodemon app.js
3. Open your browser and navigate to http://localhost:5000.

## Project Structure
blogging-website/
├── public/
│ ├── css/
│ ├── js/
│ └── images/
├── views/
│ ├── partials/
│ ├── auth/
│ ├── posts/
│ └── index.ejs
├── .env
├── app.js
├── package.json
└── README.md

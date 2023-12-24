# Real Time Chat Application
## Objective
Build a real-time chat application using Node.js, Express.js, and Socket.IO.

## Project Description:

In this project, you will create a real-time chat application that allows multiple users to join chat rooms and communicate with each other. The application will be built using Node.js, Express.js, and Socket.IO for real-time communication.

## Project Requirement Description:

1. Set up a basic Node.js project with Express.js, Socket.IO, and other necessary NPM packages.
2. Create a simple web interface using HTML, CSS, and JavaScript to allow users to join chat rooms and send messages
3. Implement server-side logic using Node.js and Socket.IO to manage chat rooms, user connections, and message broadcasting.4. Implement the following Socket.IO events on the server-side:
    a. connection: Handle a new user connection.
    b. join: Add a user to a specific chat room.
    c. message: Broadcast a message to all users in a chat room.
    d. disconnect: Handle user disconnections and clean up user data.
5. Implement corresponding Socket.IO event listeners on the client-side using JavaScript to update the user interface in real-time.
6. Implement proper error handling for invalid chat room names, user names, and other potential issues.
7. Test the chat application using multiple browser instances to simulate multiple users.

## Initial Project Setup:

Used the below-mentioned npm command to initialize the project-
`npm init`

## Follow the below commands to run the project locally on your system:

1. Clone the repository:

   ```bash
   https://github.com/Shani-Kumar-Gupta/real-time-chat-application.git
   ```
2. Open the cloned repository

2. Navigate to the project directory:

   ```bash
   cd real-time-chat-application
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the application

   ```bash
   npm start
   ```
   Alternative to run the application
   ```bash
   npm run dev
   ```

## Add .env file with below mentioned keys and add your value to run the code locally
   ```bash
   #Port Number
   PORT_NUMBER = 3000

   #Environment
   NODE_ENV = "development"
   ```

## Dependencies:

As a part of backend application and API development, I have used the below-mentioned packages or modules as dependencies-
1. express
2. dotenv
3. helmet
4. winston
5. morgan
6. socket.io


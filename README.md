# Task Manager

## Local Setup

### Prerequisites

- Node.js and npm installed
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/nayabshah/taskManager.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd taskManager
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Create a `.env` file in the root directory and add necessary environment variables:**

   ```env
   NODE_ENV="production"
   MONGODB_URI="mongodb://localhost:27017/your-database"
   ```

   _Replace `your-database` with the name of your MongoDB database._

5. **Start the application:**

   ```bash
   npm start

   ```

6. **Access the application in your browser at [http://localhost:5000](http://localhost:5000).**

## API Documentation

- API documentation is available in the `request.http` file.
- Open the `request.http` file using a tool like [Rest Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) in Visual Studio Code.

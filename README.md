# TaskTrek

## Introduction

TaskTrek is a ToDoList application designed to help users manage their tasks efficiently. Built using Remix with Prisma as the ORM, this app leverages a PostgreSQL database. The entire setup is containerized using Docker Compose for ease of deployment and development. TaskTrek supports fundamental CRUD operations - Create, Read, Update, and Delete tasks, with a focus on simplicity and effectiveness.

## Features

- **Create Tasks:** Add new tasks to your list.
- **Read Tasks:** View all your tasks in a neatly organized list.
- **Update Tasks:** Edit task details as your priorities and needs change.
- **Delete Tasks:** Remove tasks from your list once they are completed or no longer needed.
- **Server-Side Rendering (SSR):** Ensures faster load times and improved SEO.

## Prerequisites

- Docker and Docker Compose
- Node.js
- npm

## Getting Started

### Setting Up the Environment

1. **Clone the Repository:**

   ```sh
   git clone [repository-url]
   cd TaskTrek
   ```

2. **Environment Variables:**
   Copy the `env.example` file to a new file named `.env` and adjust the variables if necessary.

   ```sh
   cp env.example .env
   ```

   The default values in `env.example` are:

   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/task_trek_db?schema=public"
   POSTGRES_USER="postgres"
   POSTGRES_PASSWORD="postgres"
   POSTGRES_DB="task_trek_db"
   ```

### Running the App

1. **Start Docker Compose:**

   ```sh
   docker-compose up -d
   ```

2. **Install Dependencies:**

   ```sh
   npm install
   ```

3. **Run the Development Server:**

   ```sh
   npm run dev
   ```

   The app will be running on [http://localhost:3000](http://localhost:3000).

## Testing

TaskTrek uses Cypress for end-to-end testing. Ensure that the app is running before executing tests.

1. **Run Cypress Tests:**
   ```sh
   npx cypress open
   ```

## Contributing

Contributions to TaskTrek are welcome. Please ensure that your code adheres to the project's style and standards.

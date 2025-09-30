# Task Management Kanban Board

A simple and intuitive task management application built with React. This project provides a Kanban-style board to visualize and manage tasks across different stages: "Pending," "In Progress," and "Completed."

## Features

*   **Create, Edit, and Delete Tasks:** Easily add new tasks, modify existing ones, or remove them.
*   **Kanban Board:** Visualize your workflow with three columns for task status.
*   **Task Details:** View task titles and descriptions. Hover over the description to see the full text in a tooltip.
*   **Priority Levels:** Assign 'High', 'Medium', or 'Low' priority to tasks, indicated by color-coded badges.
*   **Responsive Design:** The application is designed to work on different screen sizes.
*   **Toast Notifications:** Get instant feedback for actions like creating, updating, or deleting tasks.

## Tech Stack

*   **Frontend:**
    *   React
    *   React-Bootstrap
    *   Axios (for API requests)
    *   React Toastify (for notifications)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js and npm (or yarn) installed on your machine.
*   A running instance of the backend API.

### Installation

1.  Clone the repo:
    ```sh
    git clone  https://github.com/ALabiyb/taskManagementKanbanView.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd todo_frontend
    ```
3.  Install NPM packages:
    ```sh
    npm install
    ```

### Running the Application

1.  Start the development server:
    ```sh
    npm start
    ```
2.  Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## API Dependency

This frontend application requires a backend server to be running to handle task data. The API should expose the following endpoints:

*   `GET /tasks`: Fetches all tasks.
*   `POST /tasks`: Creates a new task.
*   `PUT /tasks/{id}`: Updates an existing task.
*   `DELETE /tasks/{id}`: Deletes a task.

Make sure the `API_BASE_URL` in `src/utils/constants.js` is configured to point to your backend server's address.

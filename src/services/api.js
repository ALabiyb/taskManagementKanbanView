// Import the axios library for making HTTP requests.
import axios from 'axios';
// Import the base URL for the API from a constants file.
import { API_BASE_URL } from '../utils/constants';

// Create an axios instance with a predefined base URL and headers.
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

// Define a TaskService object that encapsulates all API calls related to tasks.
const TaskService = {
    // Fetches all tasks from the server.
    getAllTasks: () => apiClient.get('/tasks'),
    // Creates a new task on the server.
    createTask: (task) => apiClient.post('/tasks', task),
    // Updates an existing task on the server.
    updateTask: (id, task) => apiClient.put(`/tasks/${id}`, task),
    // Deletes a task from the server.
    deleteTask: (id) => apiClient.delete(`/tasks/${id}`),
};

// Export the TaskService to be used by other parts of the application.
export default TaskService;
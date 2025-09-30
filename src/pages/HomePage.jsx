// Import necessary libraries and components from React, React-Bootstrap, and other modules.
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import TaskCard from '../components/TaskCard';
import AddTaskModal from '../components/AddTaskModal';
import TaskService from '../services/api';
import { toast } from "react-toastify";

// Define the HomePage component, which is the main page for task management.
const HomePage = () => {
    // State to hold the list of tasks.
    const [tasks, setTasks] = useState([]);
    // State to control the visibility of the Add/Edit Task modal.
    const [showModal, setShowModal] = useState(false);
    // State to hold the task currently being edited.
    const [currentTask, setCurrentTask] = useState(null);



    // useEffect hook to fetch tasks when the component mounts.
    useEffect(() => {
        fetchTasks();
    }, []);

    // Function to fetch all tasks from the server.
    const fetchTasks = async () => {
        try {
            // Call the API to get all tasks.
            const response = await TaskService.getAllTasks();
            // Update the tasks state with the fetched data.
            setTasks(response.data);
        } catch (error) {
            // Log any errors that occur during fetching.
            console.error('Failed to fetch tasks:', error);
        }
    };

    // Function to handle saving a new or updated task.
    const handleSave = async (taskData) => {
        try {
            // If the task data includes an ID, it's an update.
            if (taskData.id) {
                await TaskService.updateTask(taskData.id, taskData);
                toast.success('✅ Task updated successfully!');
            } else {
                // Otherwise, it's a new task.
                await TaskService.createTask(taskData);
                toast.success('✅ Task created successfully!');
            }
            // Refresh the task list after saving.
            fetchTasks();
        } catch (error) {
            console.error('Save failed:', error);
            toast.error('❌ Operation failed. Check console.');
        }
    };

    // Function to handle the deletion of a task.
    const handleDelete = (id) => {
        // Show a confirmation toast before deleting.
        toast.warn(
            <div>
                <p>⚠️ Are you sure you want to delete this task?</p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                    {/* Button to cancel the deletion and dismiss the toast. */}
                    <button
                        onClick={() => toast.dismiss()} // Close toast
                        style={{
                            padding: '4px 12px',
                            background: '#6c757d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>
                    {/* Button to confirm the deletion. */}
                    <button
                        onClick={async () => {
                            try {
                                // Call the API to delete the task.
                                await TaskService.deleteTask(id);
                                toast.success('✅ Task deleted successfully!');
                                // Refresh the task list.
                                fetchTasks();
                            } catch (error) {
                                console.error('Delete failed:', error);
                                toast.error('❌ Delete failed.');
                            } finally {
                                toast.dismiss(); // Close toast
                            }
                        }}
                        style={{
                            padding: '4px 12px',
                            background: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>,
            {
                position: "top-right",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: false,
                draggable: false,
                theme: "light",
                icon: false, // Remove default icon
            }
        );
    };

    // Function to handle editing a task. It sets the current task and opens the modal.
    const handleEdit = (task) => {
        setCurrentTask(task);
        setShowModal(true);
    };

    // Function to close the modal and reset the current task.
    const closeModal = () => {
        setShowModal(false);
        setCurrentTask(null);
    };

    // Group tasks into 'pending', 'in_progress', and 'completed' based on their status.
    const pending = tasks.filter(t => t.status?.toLowerCase() === 'pending');
    const inProgress = tasks.filter(t => t.status?.toLowerCase() === 'in_progress');
    const completed = tasks.filter(t => t.status?.toLowerCase() === 'completed');

    // Render the component's UI.
    return (
        <div>
            {/* Header section with the title and 'Add New Task' button. */}
            <div className="bg-dark text-white py-3">
                <Container fluid>
                    <Row className="align-items-center">
                        <Col xs={8}>
                            <h3 className="mb-0">📌 Task Management</h3>
                        </Col>
                        <Col xs={4} className="text-end">
                            <Button variant="primary" onClick={() => setShowModal(true)}>
                                ➕ Add New Task
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Main content area with Kanban-style columns for tasks. */}
            <Container fluid className="p-4">
                <Row className="g-4">
                    {/* 'Pending' column */}
                    <Col md={4}>
                        <Card className="h-100 shadow-sm">
                            <Card.Header className="bg-primary text-white">
                                ✅ Pending ({pending.length})
                            </Card.Header>
                            <Card.Body>
                                {pending.length === 0 ? (
                                    <p className="text-muted text-center my-4">No pending tasks</p>
                                ) : (
                                    // Map through pending tasks and render a TaskCard for each.
                                    pending.map(task => (
                                        <TaskCard
                                            key={task.id}
                                            task={task}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                        />
                                    ))
                                )}
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* 'In Progress' column */}
                    <Col md={4}>
                        <Card className="h-100 shadow-sm">
                            <Card.Header className="bg-warning text-dark">
                                ⏳ In Progress ({inProgress.length})
                            </Card.Header>
                            <Card.Body>
                                {inProgress.length === 0 ? (
                                    <p className="text-muted text-center my-4">No tasks in progress</p>
                                ) : (
                                    // Map through in-progress tasks and render a TaskCard for each.
                                    inProgress.map(task => (
                                        <TaskCard
                                            key={task.id}
                                            task={task}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                        />
                                    ))
                                )}
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* 'Completed' column */}
                    <Col md={4}>
                        <Card className="h-100 shadow-sm">
                            <Card.Header className="bg-success text-white">
                                🎉 Completed ({completed.length})
                            </Card.Header>
                            <Card.Body>
                                {completed.length === 0 ? (
                                    <p className="text-muted text-center my-4">No completed tasks</p>
                                ) : (
                                    // Map through completed tasks and render a TaskCard for each.
                                    completed.map(task => (
                                        <TaskCard
                                            key={task.id}
                                            task={task}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                        />
                                    ))
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Modal for adding or editing a task. */}
            <AddTaskModal
                show={showModal}
                onHide={closeModal}
                onSave={handleSave}
                taskToEdit={currentTask}
            />
        </div>
    );
};

// Export the HomePage component to be used in other parts of the application.
export default HomePage;
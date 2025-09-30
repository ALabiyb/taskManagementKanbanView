// Import necessary components from React and React-Bootstrap.
import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

// Define the AddTaskModal component for adding or editing tasks.
const AddTaskModal = ({ show, onHide, onSave, taskToEdit }) => {
    // State to manage the form data for the task.
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'low',
        status: 'PENDING'
    });

    // useEffect hook to populate the form when a task is being edited.
    useEffect(() => {
        if (taskToEdit) {
            // If a task is being edited, set the form data to the task's details.
            setFormData({
                id: taskToEdit.id,
                title: taskToEdit.title || '',
                description: taskToEdit.description || '',
                priority: taskToEdit.priority?.toLowerCase() || 'low',
                status: taskToEdit.status?.toUpperCase() || 'PENDING'
            });
        } else {
            // If not editing, reset the form to its default state for a new task.
            setFormData({
                title: '',
                description: '',
                priority: 'low',
                status: 'PENDING'
            });
        }
    }, [taskToEdit]); // This effect runs when the taskToEdit prop changes.

    // Handle changes in form inputs and update the formData state.
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission.
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior.
        onSave(formData); // Call the onSave function passed via props with the form data.
        onHide(); // Close the modal.
    };

    // Render the modal UI.
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                {/* Set the modal title based on whether a task is being edited or added. */}
                <Modal.Title>{formData.id ? 'Edit Task' : 'Add New Task'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {/* Form field for the task title. */}
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    {/* Form field for the task description. */}
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    {/* Form field for selecting the task priority. */}
                    <Form.Group className="mb-3" controlId="priority">
                        <Form.Label>Priority</Form.Label>
                        <Form.Select name="priority" value={formData.priority} onChange={handleChange}>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </Form.Select>
                    </Form.Group>

                    {/* Form field for selecting the task status. */}
                    <Form.Group className="mb-3" controlId="status">
                        <Form.Label>Status</Form.Label>
                        <Form.Select name="status" value={formData.status} onChange={handleChange}>
                            <option value="PENDING">Pending</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="COMPLETED">Completed</option>
                        </Form.Select>
                    </Form.Group>

                    {/* Submit button for the form. */}
                    <Button variant="primary" type="submit" className="w-100 mt-3">
                        {/* Change button text based on whether a task is being edited or created. */}
                        {formData.id ? 'Update Task' : 'Create Task'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

// Export the AddTaskModal component for use in other parts of the application.
export default AddTaskModal;
// Import necessary components from React and React-Bootstrap.
import React, { useState } from 'react';
import { Card, Badge, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

// Define the TaskCard component, which displays a single task.
const TaskCard = ({ task, onEdit, onDelete }) => {
    // State to control the visibility of the description tooltip.
    const [showTooltip, setShowTooltip] = useState(false);

    // Function to determine the color variant for the priority badge based on the task's priority level.
    const getPriorityVariant = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'high': return 'danger';
            case 'medium': return 'warning';
            case 'low': return 'primary';
            default: return 'secondary';
        }
    };

    // Render the task card UI.
    return (
        <Card className="mb-3 shadow-sm">
            <Card.Body>
                {/* Display the task title. */}
                <Card.Title className="fw-bold">{task.title}</Card.Title>

                {/* Use an OverlayTrigger to show a tooltip with the full description on hover. */}
                <OverlayTrigger
                    placement="bottom"
                    overlay={
                        <Tooltip id={`tooltip-${task.id}`}>
                            {task.description || 'No description'}
                        </Tooltip>
                    }
                    show={showTooltip}
                >
                    {/* Display a truncated version of the description. */}
                    <Card.Text
                        className="text-muted small mb-2"
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                    >
                        {task.description?.length > 50
                            ? `${task.description.substring(0, 50)}...`
                            : task.description || '—'}
                    </Card.Text>
                </OverlayTrigger>

                {/* Container for the priority badge and action buttons. */}
                <div className="d-flex justify-content-between align-items-center">
                    {/* Display the task priority with a corresponding color. */}
                    <Badge bg={getPriorityVariant(task.priority)}>
                        {task.priority?.charAt(0).toUpperCase() + task.priority?.slice(1) || 'Low'}
                    </Badge>
                    {/* Action buttons for editing and deleting the task. */}
                    <div>
                        <Button variant="outline-primary" size="sm" onClick={() => onEdit(task)}>
                            Edit
                        </Button>
                        <Button
                            variant="outline-danger"
                            size="sm"
                            className="ms-2"
                            onClick={() => onDelete(task.id)}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

// Export the TaskCard component for use in other parts of the application.
export default TaskCard;
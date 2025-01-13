
# Task API - Task Management CRUD

## Description

This API allows you to manage tasks through CRUD operations. In addition to the basic functionalities, it supports bulk task import via CSV files.

## Features

- **Create Tasks:** Create tasks with title and description.
- **List Tasks:** Retrieve all registered tasks, with filtering by title or description.
- **Update Tasks:** Update the title and/or description of a specific task by ID.
- **Delete Tasks:** Remove a specific task by ID.
- **Mark as Complete:** Toggle the completion status of a task.
- **Bulk Import:** Add multiple tasks from a CSV file.

## Task Structure

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "completed_at": "datetime | null",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

## Endpoints

### 1. Create a Task

- **Route:** `POST /tasks`
- **Request Body:**
  ```json
  {
    "title": "string",
    "description": "string"
  }
  ```
- **Description:** Creates a new task. The fields `id`, `created_at`, `updated_at`, and `completed_at` are automatically generated.

---

### 2. List Tasks

- **Route:** `GET /tasks`
- **Optional Query Parameters:**
  - `title` - Filter by title.
  - `description` - Filter by description.
- **Description:** Returns a list of all registered tasks.

---

### 3. Update a Task

- **Route:** `PUT /tasks/:id`
- **Request Body:**
  ```json
  {
    "title": "string (optional)",
    "description": "string (optional)"
  }
  ```
- **Description:** Updates the provided fields (`title` and/or `description`) of a specific task.

---

### 4. Delete a Task

- **Route:** `DELETE /tasks/:id`
- **Description:** Deletes a task by its `id`.

---

### 5. Mark as Complete

- **Route:** `PATCH /tasks/:id/complete`
- **Description:** Marks a task as completed or reverts it to not completed.

---

### 6. Bulk Import Tasks

- **Route:** `POST /tasks/import`
- **Description:** Allows importing tasks from a CSV file.
- **CSV Format:**
  ```csv
  title,description
  Task 1,Description 1
  Task 2,Description 2
  ```

## Validation Rules

1. The `title` and `description` fields must be present and valid in the `POST` and `PUT` routes.
2. The `id` must exist in the database for the `PUT`, `DELETE`, and `PATCH /tasks/:id/complete` routes. If not, an error message should be returned.

## Technologies Used

- **Node.js**
- **Streams**
- **CSV Parsing**

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/task-api.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

## Testing

Include details on how to run tests, if applicable.

---

Feel free to customize it further as needed! 😊

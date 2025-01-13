import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { search } = req.query;

      const tasks = database.select(
        "tasks",
        search ? { title: search, description: search } : null
      );

      return res
        .setHeader("Content-type", "application/json")
        .end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      if (!req.body) {
        return res.writeHead(400).end("Title and description are required");
      }

      const { title, description } = req.body;

      const task = {
        id: randomUUID(),
        title,
        description,
        created_at: new Date(),
        completed_at: null,
      };

      database.insert("tasks", task);

      return res.writeHead(201).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      const existentTask = database.select("tasks", id);

      if (!existentTask) {
        return res.writeHead(400).end("Task not found");
      }

      database.delete("tasks", id);

      return res.writeHead(204).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      if (!req.body) {
        return res.writeHead(404);
      }
      const { title, description, completed_at } = req.body;

      const existentTask = database.select("tasks", id);

      if (!existentTask) {
        return res.writeHead(400).end("Task not found");
      }

      if (!title || !description) {
        return res.writeHead(400).end("Title and description are required");
      }

      database.update("tasks", id, {
        ...existentTask,
        title,
        description,
        completed_at,
        updated_at: new Date(),
      });

      return res.writeHead(204).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;

      const existentTask = database.select("tasks", id);

      if (!existentTask) {
        return res.writeHead(400).end("Task not found");
      }

      if (existentTask.completed_at) {
        return res.writeHead(400).end("Task already completed");
      }

      database.update("tasks", id, {
        ...existentTask,
        completed_at: new Date(),
      });

      return res.writeHead(204).end();
    },
  },
];

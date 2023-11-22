"use client";
import { useState, KeyboardEvent, useEffect } from "react";
import io from "socket.io-client";

import "../../styles/tasklist.scss";

import { FiCheckSquare } from "react-icons/fi";

interface Task {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [updatedOrders, setUpdatedOrders] = useState<Task[]>([]);

  const handleCreateNewTask = async () => {
    await fetch("http://localhost:3333/products", {
      body: JSON.stringify({ name: newTaskTitle, status: "ordered" }),
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    await listOrders();

    setNewTaskTitle("");
  };

  const listOrders = async () => {
    const resp = await fetch(`http://localhost:3333/products`);
    const data = await resp.json();
    setTasks(data);
  };

  useEffect(() => {
    if (updatedOrders.length) {
      updatedOrders.forEach((updatedOrder) => {
        const currentOrderIndex = tasks.findIndex(
          (order) => order.id === updatedOrder.id
        );
        tasks[currentOrderIndex].status = updatedOrder.status;
        setTasks([...tasks]);
      });
    }
  }, [updatedOrders]);

  useEffect(() => {
    listOrders();
    const ws = io("http://localhost:3333");
    ws.on("status", (updatedOrders: Task[]) => {
      setUpdatedOrders(updatedOrders);
    });
    return () => {
      ws.close();
    };
  }, []);

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    const { key } = event;

    console.log(key);

    if (key === "Enter") handleCreateNewTask();
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Lista de pedidos</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Nome do produto"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
            onKeyDown={handleKeyDown}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task, index) => (
            <li key={task.id}>
              <div data-testid="task">
                <label className="checkbox-container">{index}</label>
                <p>{task.name}</p>
              </div>

              <button type="button" data-testid="remove-task-button">
                {task.status}
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}

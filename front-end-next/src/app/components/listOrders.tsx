"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";

interface Order {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}
export default function ListOrder() {
  const [productName, setProductName] = useState("");
  const [updatedOrders, setUpdatedOrders] = useState<Order[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const createOrder = async () => {
    await fetch("http://localhost:3333/products", {
      body: JSON.stringify({ name: productName, status: "ordered" }),
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    await listOrders();
  };

  const listOrders = async () => {
    const resp = await fetch(`http://localhost:3333/products`);
    const data = await resp.json();
    setOrders(data);
  };

  useEffect(() => {
    if (updatedOrders.length) {
      updatedOrders.forEach((updatedOrder) => {
        const currentOrderIndex = orders.findIndex(
          (order) => order.id === updatedOrder.id
        );
        orders[currentOrderIndex].status = updatedOrder.status;
        setOrders([...orders]);
      });
    }
  }, [updatedOrders]);

  useEffect(() => {
    listOrders();
    const ws = io("http://localhost:3333");
    ws.on("status", (updatedOrders: Order[]) => {
      setUpdatedOrders(updatedOrders);
    });
    return () => {
      ws.close();
    };
  }, []);

  return (
    <>
      <>
        <input
          placeholder="Nome do produto"
          onChange={(event) => setProductName(event.target.value)}
        />
        <button onClick={() => createOrder()}>Pedir</button>
      </>
      {orders.map((order) => (
        <div key={order.id}>
          <p>{order.id}</p>
          <p>{order.name}</p>
          <p>{order.status}</p>
        </div>
      ))}
    </>
  );
}

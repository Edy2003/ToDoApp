import { id } from "@instantdb/react";
import { db } from "@/lib/clientDb";
import type { UpdateTodoInput } from "./types";

export const mutations = {
  createTodo: (userId: string, title: string, order: number) => {
    const todoId = id();
    return db.transact(
      db.tx.todos[todoId]
        .update({
          title: title.slice(0, 100),
          completed: false,
          createdAt: Date.now(),
          order,
        })
        .link({ owner: userId })
    );
  },

  updateTodo: (todoId: string, data: UpdateTodoInput) => {
    return db.transact(db.tx.todos[todoId].update(data));
  },

  deleteTodo: (todoId: string) => {
    return db.transact(db.tx.todos[todoId].delete());
  },

  toggleComplete: (todoId: string, currentValue: boolean) => {
    return db.transact(
      db.tx.todos[todoId].update({ completed: !currentValue })
    );
  },
};

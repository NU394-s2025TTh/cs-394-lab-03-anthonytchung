// src/components/TodoDetail.tsx

import React from 'react';

import { Todo } from '../types/todo-type';

interface TodoDetailProps {
  todoId: number;
}

type FetchError = {
  message: string;
};

/**
 * TodoDetail component fetches and displays the details of a specific todo item based on the provided todoId.
 * It uses the useEffect hook to fetch the todo details from the API when the component mounts or when the todoId changes.
 * @param todoId - The ID of the todo item to fetch and display.
 */
export const TodoDetail: React.FC<TodoDetailProps> = ({ todoId }) => {
  const [todo, setTodo] = React.useState<Todo | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchTodo = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/todos/${todoId}`,
        );
        if (!response.ok) {
          setError(`HTTP ${response.status}`);
        }
        const data = await response.json();
        setTodo(data);
      } catch (error) {
        const fetchError = error as FetchError;
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTodo();
  }, [todoId]);

  if (loading) {
    return <div>Loading todo...</div>;
  }
  if (error) {
    return <div>Error loading todo</div>;
  }
  if (!todo) {
    return <div>No todo found</div>;
  }

  return (
    <div className="todo-detail">
      <h2>Todo Details</h2>
      <p>
        <strong>ID:</strong> {todo.id}
      </p>
      <p>
        <strong>Title:</strong> {todo.title}
      </p>

      <p>
        <strong>User ID:</strong> {todo.userId}
      </p>
      <p>{todo.completed && <strong>Completed</strong>}</p>
    </div>
  );
};
// ### 2. TodoDetail Component

// Create a component that fetches and displays a single todo item based on an ID

// Requirements:

// - Accept a todo ID as a prop
// - Use `useEffect` to fetch the specific todo when the component mounts or when the ID changes
// - Display all relevant details of the todo
// - Implement loading and error states
// - Add proper TypeScript typing

// src/components/TodoList.tsx

import React from 'react';

import { Todo } from '../types/todo-type';

interface TodoListProps {
  onSelectTodo: (id: number) => void;
}
interface FetchTodosParams {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

/**
 * fetchTodos function fetches todos from the API and updates the state.
 * @param setTodos - React setState Function to set the todos state.
 * @param setFilteredTodos - React setState Function to set the filtered todos state.
 * @param setLoading - react setState Function to set the loading state.
 * @param setError - react setState Function to set the error state.
 *
 * @returns {Promise<void>} - A promise that resolves when the todos are fetched and state is updated.  You should call this in useEffect.
 * setup useEffect to call this function when the component mounts
 * wraps the fetch API call in a try-catch block to handle errors gracefully and update the loading and error states accordingly.
 * The function uses async/await syntax to handle asynchronous operations, making the code cleaner and easier to read.
 * fetch from the URL https://jsonplaceholder.typicode.com/todos
 */
// remove eslint-disable-next-line @typescript-eslint/no-unused-vars when you use the parameters in the function
export const fetchTodos = async ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTodos,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setFilteredTodos,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setLoading,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setError,
}: FetchTodosParams): Promise<void> => {};
/**
 * TodoList component fetches todos from the API and displays them in a list.
 * It also provides filter buttons to filter the todos based on their completion status.
 * @param onSelectTodo - A function that is called when a todo is selected. It receives the todo id as an argument.
 * @returns
 */

// remove the following line when you use onSelectTodo in the component

export const TodoList: React.FC<TodoListProps> = ({ onSelectTodo }) => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = React.useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = React.useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filteredTodos, setFilteredTodos] = React.useState<Todo[]>([]);

  React.useEffect(() => {
    async function callTodo() {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: Todo[] = await res.json();
      setTodos(data);
    }

    callTodo();
  }, []);

  return (
    <div className="todo-list">
      <h2>Todo List</h2>
      <p>
        These are the filter buttons. the tests depend on the data-testids; and use
        provided styles. Implement click event handlers to change the filter state and
        update the UI accordingly to show just those todo&apos;s. other hints: you can
        change the styling of the button with <code>className</code> property. if the
        className of a button is &quot;active&quot; it will use the{' '}
        <code> .todo-button.completed</code> CSS style in App.css
      </p>
      <div className="filter-buttons">
        <button data-testid="filter-all">All</button>
        <button data-testid="filter-open">Open</button>
        <button data-testid="filter-completed">Completed</button>
      </div>
      <p>
        Show a list of todo&apos;s here. Make it so if you click a todo it calls the event
        handler onSelectTodo with the todo id to show the individual todo
      </p>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            data-testid={`todo-${todo.id}`}
            onClick={() => onSelectTodo(todo.id)}
            style={{
              cursor: 'pointer',
              textDecoration: todo.completed ? 'line-through' : 'none',
              marginBottom: '4px',
            }}
          >
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

// ## Lab Requirements

// You'll be implementing two main components:

// ### 1. TodoList Component

// Create a component that fetches and displays all todos from the API endpoint: https://jsonplaceholder.typicode.com/todos

// you can open this url in a browser to see the data structure.

// Requirements:

// - Use the `useEffect` hook to fetch data when the component mounts
// - Display the list of todos with at least their title and completion status
// - Implement loading and error states
// - Add TypeScript interfaces for the todo data structure
// - Implement filter buttons ("All", "Open", "Completed") to filter the todo list based on completion status
// - Apply proper styling to show which filter is currently active
// - Implement the filtering functionality client-side without making additional API calls when filters are changed

// ### 2. TodoDetail Component

// Create a component that fetches and displays a single todo item based on an ID

// Requirements:

// - Accept a todo ID as a prop
// - Use `useEffect` to fetch the specific todo when the component mounts or when the ID changes
// - Display all relevant details of the todo
// - Implement loading and error states
// - Add proper TypeScript typing

// ### 3. Bonus Challenge (Optional)

// Implement a feature that allows toggling between the list view and detail view of a selected todo.

// ## Tasks

// 1. Review the provided project structure and familiarize yourself with the template code
// 2. Define TypeScript interfaces for the Todo data structure
// 3. Implement the TodoList component with useEffect for data fetching
// 4. Implement the TodoDetail component with useEffect
// 5. Connect the components in the main App component
// 6. Ensure all tests pass by running `npm test` and `npm run grade`

// ## Submission Guidelines

// 1. Commit your changes regularly with descriptive commit messages
// 2. Push your final solution to your GitHub repository
// 3. Ensure all tests are passing before submission
// 4. The assignment will be automatically graded based on passing test criteria

// ## Understanding Closures and useEffect

// One of the most common pitfalls when working with useEffect is dealing with stale closures. Understanding JavaScript closures is essential for properly implementing useEffect in React.

// ### What are Closures?

// A closure is a function bundled together with references to its surrounding state (the lexical environment). In JavaScript, closures are created every time a function is created. This means that functions defined inside React components can access and "remember" variables from their outer scope.

// ### Stale Closures in useEffect

// Stale closures occur when the remembered data becomes outdated due to the asynchronous nature of JavaScript. This commonly happens in scenarios involving data fetching or timers within React components. When your useEffect code captures variables from the component scope and those variables change, the effect might still be referencing old values.

// ### Example of a Stale Closure Problem

// ```tsx
// function Counter() {
//   const [count, setCount] = useState(0);

//   // This effect has a stale closure problem
//   useEffect(() => {
//     const timer = setInterval(() => {
//       console.log(`Current count: ${count}`);
//       setCount(count + 1); // This will always use the initial value of count
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []); // Empty dependency array

//   return <div>{count}</div>;
// }
// ```

// In this example, the count variable is captured in the closure when the effect runs, but because the dependency array is empty, the effect never re-runs with updated values. This means the interval will always increment from the initial value.

// ### How to Fix Stale Closures

// To fix stale closures in React components:

// 1. List all necessary dependencies in the useEffect dependency array
// 2. Use functional updates for state setters
// 3. Clear timers and intervals in the cleanup function

// Corrected example:

// ```tsx
// function Counter() {
//   const [count, setCount] = useState(0);

//   // Fixed version using a functional update
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCount((prevCount) => prevCount + 1); // Functional update doesn't rely on closed-over value
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []); // Empty dependency array is now fine

//   return <div>{count}</div>;
// }
// ```

// ## Resources on useEffect

// Here are some helpful resources to understand React's useEffect hook:

// 1. [React Official Documentation on useEffect](https://react.dev/reference/react/useEffect)
// 2. [A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/) - Dan Abramov's comprehensive guide
// 3. [React's useEffect: Best Practices and Common Pitfalls](https://www.palo-it.com/en/blog/stale-closures-impact-on-react-components) - Article on stale closures in React
// 4. [Fantastic Closures and How to Find Them in React](https://www.developerway.com/posts/fantastic-closures) - Understanding closures in React
// 5. [Using the Effect Hook - React Legacy Docs](https://legacy.reactjs.org/docs/hooks-effect.html) - Detailed explanation of useEffect

// ## useEffect Pitfalls to Watch Out For

// 1. **Infinite Loops**: Not specifying the dependency array or incorrectly including changing values can cause infinite render loops
// 2. **Stale Closures**: Be careful with values from outside the effect that change over time
// 3. **Race Conditions**: When multiple API calls are made in quick succession, results may return out of order
// 4. **Missing Cleanup**: Always clean up subscriptions or timers to prevent memory leaks
// 5. **Over-fetching**: Be mindful of when effects run to avoid unnecessary API calls

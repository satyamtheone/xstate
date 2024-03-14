import { createMachine, assign } from "xstate";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoContext {
  todos: Todo[];
}

type TodoEvent =
  | { type: "ADD"; text: string }
  | { type: "TOGGLE"; id: number }
  | { type: "DELETE"; id: number }
  | { type: "UPDATE"; id: number; newText: string }; // Define the UPDATE event type

export const todoMachine = createMachine({
  id: "todo",
  initial: "active",
  context: {
    todos: [],
  },
  types: {
    events: {} as TodoEvent,
    context: {} as TodoContext,
  },
  states: {
    active: {
      on: {
        ADD: {
          actions: assign({
            todos: ({ context, event }) => [
              ...context.todos,
              { id: Date.now(), text: event.text, completed: false },
            ],
          }),
        },
        TOGGLE: {
          actions: assign({
            todos: ({ context, event }) =>
              context.todos.map((todo) =>
                todo.id === event.id
                  ? { ...todo, completed: !todo.completed }
                  : todo
              ),
          }),
        },
        DELETE: {
          actions: assign({
            todos: ({ context, event }) =>
              context.todos.filter((todo) => todo.id !== event.id),
          }),
        },
        UPDATE: {
          actions: assign({
            todos: ({ context, event }) =>
              context.todos.map((todo) =>
                todo.id === event.id ? { ...todo, text: event.newText } : todo
              ),
          }),
        },
      },
    },
  },
});

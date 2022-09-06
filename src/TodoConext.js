import React, { useReducer, createContext, useContext, useRef } from "react";
import { act } from "react-dom/test-utils";
// useReducer를 통하여 바로 함수 적용

const initialTodos = [
  {
    id: 1,
    text: "프로젝트 생성하기",
    done: true,
  },
  {
    id: 2,
    text: "컴포넌트 스타일링",
    done: true,
  },
  {
    id: 3,
    text: "Context 생성하기",
    done: false,
  },
  {
    id: 4,
    text: "기능 생성하기",
    done: false,
  },
];

function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return state.concat(action.todo);
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.id);
    default:
      throw new Error("Unhandled type");
  }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIDContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextID = useRef(5);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIDContext.Provider value={nextID}>
          {children}
        </TodoNextIDContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error("Cannot find TodoStateContext");
  }
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error("Cannot find TodoDispatchContext");
  }
  return context;
}

export function useTodoNextID() {
  const context = useContext(TodoNextIDContext);
  if (!context) {
    throw new Error("Cannot find TodoNextIDContext");
  }
  return context;
}

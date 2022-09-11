import React from "react";
import { createGlobalStyle } from "styled-components";
import TodoCreate from "./components/TodoCreate";
import TodoHead from "./components/TodoHead";
import TodoList from "./components/TodoList";
import TodoTemplate from "./components/TodoTemplate";
import { TodoProvider } from "./TodoConext";

const GlobaStyle = createGlobalStyle`
  body{
    background: #e9ecef;
  }
`;

function App() {
  return (
    <TodoProvider>
      <GlobaStyle />
      <TodoTemplate>
        <TodoHead />
        <TodoList />
        <TodoCreate />
      </TodoTemplate>
    </TodoProvider>
  );
}

export default App;

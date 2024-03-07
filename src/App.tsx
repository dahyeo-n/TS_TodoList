import React, { useState } from 'react';
import { Todo } from './types';
import styled from 'styled-components';

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [task, setTask] = useState('');

    const handleAddTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (task.trim() !== '') {
            const newTodo: Todo = {
                id: Date.now(),
                task,
                completed: false,
            };
            setTodos([...todos, newTodo]);
            setTask('');
        }
    };

    const toggleCompletion = (id: number) => {
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    // 진행 중인 항목과 완료된 항목을 필터링
    const incompleteTodos = todos.filter((todo) => !todo.completed);
    const completedTodos = todos.filter((todo) => todo.completed);

    return (
        <div style={{ width: '1200px', margin: 'auto' }}>
            <h1>Todo List</h1>
            <StTodo>
                <form onSubmit={handleAddTodo}>
                    <input
                        type="text"
                        placeholder="할 일을 작성해주세요"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    />
                    <button type="submit">Add Todo</button>
                </form>
            </StTodo>

            <h2>Working</h2>
            <StTodoBox>
                {incompleteTodos.map((todo) => (
                    <li key={todo.id}>
                        {todo.task}
                        <button onClick={() => toggleCompletion(todo.id)}>Complete</button>
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </StTodoBox>

            <h2>Done</h2>
            <StTodoBox>
                {completedTodos.map((todo) => (
                    <li key={todo.id}>
                        {todo.task}
                        <button onClick={() => toggleCompletion(todo.id)}>Cancle</button>
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </StTodoBox>
        </div>
    );
}

const StTodo = styled.div`
    display: flex;
    gap: 10px;
    padding: 15px;
    border-radius: 5px;
    background-color: gainsboro;
    justify-content: center;
    font-size: large;
`;

const StTodoBox = styled.ul`
    background-color: lightgrey;
    height: 200px;
    border-radius: 5px;
    display: flex;
    padding: 20px;
    color: black;
`;

export default App;

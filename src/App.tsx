import React, {useState, useEffect} from "react";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const storedTodos = localStorage.getItem("todos");
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);

    const addTodo = (text: string) => {
        const newTodo: Todo = {
            id: todos.length ? todos[todos.length - 1].id + 1 : 1,
            text,
            completed: false,
        };
        setTodos([...todos, newTodo]);
        localStorage.setItem("todos", JSON.stringify(todos.concat(newTodo)));
    };

    const toggleTodo = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? {...todo, completed: !todo.completed} : todo
            )
        );
        localStorage.setItem("todos", JSON.stringify(todos));
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input
                type="text"
                placeholder="Add Todo"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        addTodo(e.currentTarget.value);
                        e.currentTarget.value = "";
                    }
                }}
            />
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                        />
                        <span
                            style={{
                                textDecoration: todo.completed
                                    ? "line-through"
                                    : "none",
                            }}>
                            {todo.text}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;

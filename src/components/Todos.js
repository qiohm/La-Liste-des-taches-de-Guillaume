import React, { useState } from "react"
import SelectTodos from "./SelectTodos"
import TodosList from "./TodosList"
import AddToDoForm from "./AddToDoForm"
import { v4 as uuidv4 } from "uuid"
const initialTodos = [

]
const Todos = (props) => {
    const [filter, setFilter] = useState("notcompleted")
    const [todos, setTodos] = useState(initialTodos)
    const addTodo = (text) => {
        const newTodo = {
            text,
            isCompleted: false,
            id: uuidv4()
        };
        console.log(newTodo);
        setTodos([...todos, newTodo])
    };

    const deleteTodo = (task) => {
        setTodos(todos.filter((el) => el !== task))
    };

    const toggleCompleteTodo = (task) => {
        setTodos(
            todos.map((el) => {
                return {
                    ...el,
                    isCompleted: task.id === el.id ? !el.isCompleted : el.isCompleted
                }
            })
        )
    }
    const filteredTodos = todos.filter((el) => {
        if (filter === "completed") {
            return el.isCompleted
        }
        if (filter === "notcompleted") {
            return !el.isCompleted
        }
        return true
    })

    const completedCount = todos.filter((el) => el.isCompleted).length
    return (
        <>
            <h2 className="text-center">
                Ma liste de tâches ({completedCount} / {todos.length})
      </h2>
            <SelectTodos filter={filter} setFilter={setFilter} />
            <TodosList
                todos={filteredTodos}
                deleteTodo={deleteTodo}
                toggleCompleteTodo={toggleCompleteTodo}

            />
            <AddToDoForm addTodo={addTodo} setFilter={setFilter} />
        </>
    )
}

export default Todos
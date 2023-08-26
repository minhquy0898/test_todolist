import React from 'react'
import { useState, useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai'
import './TodoList.css'
const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);
    }, []);


    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (taskInput.trim() !== '') {
            setTasks([...tasks, { id: Date.now(), text: taskInput, completed: false }]);
            setTaskInput('');
        }
    };

    const completeTask = (taskId) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    const deleteTask = (taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
    };

    const deleteAllTasks = () => {
        setTasks([]);
    };

    const clearCompletedTasks = () => {
        const updatedTasks = tasks.filter(task => !task.completed);
        setTasks(updatedTasks);
    };

    const filterTasks = (filterType) => {
        setFilter(filterType);
    };

    const filteredTasks = filter === 'all'
        ? tasks
        : filter === 'active'
            ? tasks.filter(task => !task.completed)
            : tasks.filter(task => task.completed);
    return (
        <div className='container'>
            <div className='todoList'>
                <h1 className='todList_title'>#Todo</h1>
                <div className='todoList_nav'>
                    <div className='nav_action'>
                        <button className={`button ${filter === 'all' ? 'active' : ''}`} onClick={() => filterTasks('all')}>All</button>
                        <button className={`button ${filter === 'active' ? 'active' : ''}`} onClick={() => filterTasks('active')}>Active</button>
                        <button className={`button ${filter === 'completed' ? 'active' : ''}`} onClick={() => filterTasks('completed')}>Completed</button>
                    </div>

                    <hr className='line' />
                </div>
                <div className='todoList_form'>
                    <input
                        type="text"
                        placeholder="add details"
                        value={taskInput}
                        onChange={e => setTaskInput(e.target.value)}
                    />
                    <button className='btn_add' onClick={addTask}>Add Task</button>
                </div>
                <ul className='todoList_list'>
                    {filteredTasks.map(task => (
                        <li className='list_item' key={task.id}>
                            <div className='list_item_right'>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => completeTask(task.id)}
                                />
                                <span className={task.completed ? 'completed' : ''}>{task.text}</span>
                            </div>

                            <AiOutlineDelete onClick={() => deleteTask(task.id)} />
                        </li>
                    ))}

                </ul>

            </div>
        </div>
    )
}

export default TodoList

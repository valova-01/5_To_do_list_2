import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [sortByAlphabet, setSortByAlphabet] = useState(false);

	useEffect(() => {
		fetch('http://localhost:3005/todos')
			.then((response) => response.json())
			.then((data) => setTodos(data))
			.catch((error) => console.error(error));
	}, []);

	useEffect(() => {
		if (sortByAlphabet) {
			const sorted = [...todos].sort((a, b) => a.text.localeCompare(b.text));
			setTodos(sorted);
		}
	}, [sortByAlphabet, todos]);

	const addTodo = () => {
		fetch('http://localhost:3005/todos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({ text: newTodo }),
		})
			.then((response) => response.json())
			.then((data) => {
				setTodos([...todos, data]);
				setNewTodo('');
			})
			.catch((error) => console.error(error));
	};

	const deleteTodo = (id) => {
		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'DELETE',
		})
			.then((response) => {
				if (response.ok) {
					const updatedTodos = todos.filter((todo) => todo.id !== id);
					setTodos(updatedTodos);
				}
			})
			.catch((error) => console.error(error));
	};

	const startEdit = (id) => {
		const updatedTodos = todos.map((todo) => {
			if (todo.id === id) {
				todo.isEdit = true;
			}
			return todo;
		});
		setTodos(updatedTodos);
	};

	const saveEdit = (id, editedText) => {
		const updatedTodos = todos.map((todo) => {
			if (todo.id === id) {
				todo.text = editedText;
				todo.isEdit = false;
			}
			return todo;
		});
		setTodos(updatedTodos);
		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({ text: editedText }),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Не удалось обновить задачу');
				}
			})
			.catch((error) => console.error(error));
	};

	const handleSearch = () => {
		fetch(`http://localhost:3005/todos?q=${searchTerm}`)
			.then((response) => response.json())
			.then((data) => setTodos(data))
			.catch((error) => console.error(error));
	};

	return (
		<div className={styles.app}>
			<h1 className={styles.title}>Список задач</h1>
			<TodoInput
				newTodo={newTodo}
				setNewTodo={setNewTodo}
				addTodo={addTodo}
				setSearchTerm={setSearchTerm}
				handleSearch={handleSearch}
				setSortByAlphabet={() => setSortByAlphabet(!sortByAlphabet)}
			/>
			<TodoList sortedTodos={todos} deleteTodo={deleteTodo} startEdit={startEdit} saveEdit={saveEdit} />
		</div>
	);
};

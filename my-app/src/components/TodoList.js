import React from 'react';
import styles from '../App.module.css';
import { TodoItem } from './TodoItem';

export const TodoList = ({ sortedTodos, deleteTodo, startEdit, saveEdit }) => {
	return (
		<ul className={styles.todoList}>
			{sortedTodos.map((todo) => (
				<TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} startEdit={startEdit} saveEdit={saveEdit} />
			))}
		</ul>
	);
};

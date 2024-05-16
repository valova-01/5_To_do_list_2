import React, { useState } from 'react';
import styles from '../App.module.css';

export const TodoItem = ({ todo, deleteTodo, startEdit, saveEdit }) => {
	const [isEdit, setIsEdit] = useState(false);
	const [editedTodoText, setEditedTodoText] = useState(todo.text);

	const handleEdit = () => {
		setIsEdit(true);
		startEdit(todo.id);
	};

	const handleSave = () => {
		setIsEdit(false);
		saveEdit(todo.id, editedTodoText);
	};

	return (
		<li key={todo.id}>
			{isEdit ? (
				<>
					<input type="text" value={editedTodoText} onChange={(event) => setEditedTodoText(event.target.value)} className={styles.inputField} />
					<button onClick={handleSave} className={styles.showButton}>
						Сохранить
					</button>{' '}
				</>
			) : (
				<>
					{todo.text}
					<button onClick={() => deleteTodo(todo.id)} className={styles.showButton}>
						Удалить
					</button>{' '}
					<button onClick={handleEdit} className={styles.showButton}>
						Изменить
					</button>{' '}
				</>
			)}
		</li>
	);
};

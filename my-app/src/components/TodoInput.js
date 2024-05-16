import React from 'react';
import styles from '../App.module.css';

export const TodoInput = ({ newTodo, setNewTodo, addTodo, setSearchTerm, handleSearch, setSortByAlphabet }) => {
	return (
		<div className={styles.inputContainer}>
			<input type="text" value={newTodo} onChange={(event) => setNewTodo(event.target.value)} placeholder="Новая задача" className={styles.inputField} />
			<button onClick={addTodo} className={styles.showButton}>
				Добавить
			</button>{' '}
			<input type="text" onChange={(event) => setSearchTerm(event.target.value)} placeholder="Поиск" className={styles.inputField} />
			<button onClick={handleSearch} className={styles.showButton}>
				Поиск
			</button>{' '}
			<button onClick={setSortByAlphabet} className={styles.showButton}>
				Сортировать по алфавиту
			</button>{' '}
		</div>
	);
};

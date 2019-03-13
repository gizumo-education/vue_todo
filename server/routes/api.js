import express from 'express';
import todos from '../api/todos';

const router = express.Router();

router.get('/todos', todos.getAllTodos);
router.post('/todos', todos.addTodo);
router.get('/todos/:id', todos.getTodo);
router.patch('/todos/:id', todos.editTodo);
router.put('/todos/:id', todos.deleteTodo);
router.delete('/todos/:id', todos.destroyTodo);

export default router;

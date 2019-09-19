import fs from 'fs';
import path from 'path';

const rootPath = path.join(__dirname, '../../');
const todosJsonPath = `${rootPath}todos.json`;

const fetchTodos = () => {
  try {
    const todosFile = fs.readFileSync(todosJsonPath);
    return JSON.parse(todosFile);
  } catch (err) {
    return {
      todos: []
    };
  }
};

const writeTodos = (data) => {
  fs.writeFileSync(todosJsonPath, JSON.stringify(data));
}

export default {
  getAllTodos(req, res) {
    const data = fetchTodos();
    return res.send(data);
  },

  getTodo(req, res) {
    const { id } = req.params;
    const data = fetchTodos();
    let targetTodo = data.todos.find((todo) => {
      return todo.id === parseInt(id, 10);
    });
    if (!targetTodo) {
      return res
        .status(404)
        .send({ message: `ID ${id} のアイテムは存在しません。` });
    }

    return res.send(targetTodo);
  },

  addTodo(req, res) {
    // idはこちらで付与
    // title   require
    // detail    require
    // completedはこちらで付与
    if (!req.body.title || !req.body.detail) {
      return res
        .status(400)
        .send({ message: 'タイトルと内容はどちらも必須項目です。' });
    }
    const data = fetchTodos();
    const idNum = data.todos.length ? data.todos[data.todos.length - 1].id + 1 : 1;
    const newTodo = Object.assign({}, req.body, {
      id: idNum,
      completed: false
    });
    data.todos.push(newTodo);
    writeTodos(data)
    return res.send(newTodo);
  },

  editTodo(req, res) {
    const { id } = req.params;
    let { title, detail, completed } = req.body;
    const data = fetchTodos();
    if (typeof completed !== 'boolean' && completed) {
      return res
        .status(400)
        .send({ message: '完了してるかどうかは、Boolean（true/false）しか受け付けません。' });
    }

    let targetTodo = data.todos.find((todo) => {
      return todo.id === parseInt(id, 10);
    });

    if (!targetTodo) {
      return res
        .status(404)
        .send({ message: `ID ${id} のアイテムは存在しません。` });
    }

    Object.assign(targetTodo, {
      title: title || targetTodo.title,
      detail: detail || targetTodo.detail,
      completed: completed === true || completed === false ? completed : targetTodo.completed
    })

    const newTodos = data.todos.map((todo) => {
      if (todo.id === parseInt(id, 10)) {
        return targetTodo;
      }
      return todo;
    });

    writeTodos({ todos: newTodos });
    res.send(targetTodo);
  },

  deleteTodo(req, res) {
    res.send('論理削除未実装 削除には論理削除と物理削除があるから、それは覚えてね！');
  },

  destroyTodo(req, res) {
    const { id } = req.params;
    const data = fetchTodos();
    const targetTodo = data.todos.find((todo) => {
      return todo.id === parseInt(id, 10);
    });

    if (!targetTodo) {
      return res
        .status(404)
        .send({ message: `ID ${id} のアイテムは存在しません。` });
    }

    const newTodos = data.todos.filter((todo) => {
      return todo.id !== parseInt(id, 10);
    });

    writeTodos({ todos: newTodos });
    res.send({ todos: newTodos });
  }
}

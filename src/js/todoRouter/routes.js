import Todos from 'TodoRouterDir/containers/Todos';

const routes = [
  {
    name: 'allTodo',
    path: '/',
    component: Todos,
  },
  {
    name: 'completedTodo',
    path: '/completed',
    component: Todos,
  },
  {
    name: 'incompleteTodo',
    path: '/incomplete',
    component: Todos,
  },
];

export default routes;

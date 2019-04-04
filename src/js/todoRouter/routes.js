import Todos from 'TodoRouterDir/containers/Todos';

const routes = [
  {
    name: 'allTodos',
    path: '/',
    component: Todos,
  },
  {
    name: 'completedTodos',
    path: '/completed',
    component: Todos,
  },
  {
    name: 'incompleteTodos',
    path: '/incomplete',
    component: Todos,
  },
];

export default routes;

import Todos from 'TodoRouterDir/containers/Todos';

const routes = [
  {
    path: '/',
    component: Todos,
  },
  {
    path: '/completed',
    component: Todos,
  },
  {
    path: '/incomplete',
    component: Todos,
  },
];

export default routes;

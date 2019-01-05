import { DooDooController } from '../../controller/DooDooController';
import { AccountController } from '../../controller/AccountController';

export const Routes = [
  {
    method: 'get',
    route: '/doodoo',
    controller: DooDooController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/doodoo/:id',
    controller: DooDooController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/doodoo',
    controller: DooDooController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/doodoo',
    controller: DooDooController,
    action: 'remove',
  },
  {
    method: 'get',
    route: '/account',
    controller: AccountController,
    action: 'create',
  },
];

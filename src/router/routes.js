import { routes as auth } from '../modules/auth';
import { routes as home } from '../pages/home';

export default [
    ...home,
    ...auth,
];
import { routes as auth } from '../modules/auth';
import { routes as home } from '../pages/home';
import { routes as ordemServico } from '../pages/ordemServico';

export default [
    ...home,
    ...auth,
    ...ordemServico
];
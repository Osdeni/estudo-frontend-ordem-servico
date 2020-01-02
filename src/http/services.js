import { services as auth } from '@/modules/auth';
import { services as ordemServico } from '@/pages/ordemServico';
import { services as tipo } from '@/pages/tipo';
import { services as marca } from '@/pages/marca';
import { services as cliente } from '@/pages/pessoa';

export default {
    auth,
    ordemServico,
    tipo,
    marca,
    cliente
}
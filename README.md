# Ordem de serviço - Estudos e Aprendizado - FrontEnd - VueJs

### Publicação em nuvem:
    * http://35.198.44.70
        * Google cloud console
        * Docker e Kubernetes
        * referências: (https://github.com/Osdeni/kubernets-gcp)

- Recursos utilizados:
    * Git e Gitflow;
    * Bootstrap 4;
    * VueJs;
    * Npm e webpack para gerenciamento de dependências e build;
    * VueX para trocas de estado;
    * Autenticação com JWT;
    * Componentização de algumas áreas;
    * Roteamento:
        * uso de lazy loading;
        * uso de nested routes;
        * Proteção de rotas sem token;
    * Interceptação de Http para token e tratamento de erros 401, 403..
    * Emissão de eventos de componentes filhos para parent local e global;
    * Validação de formulários com Vuelidate;
    * Automplete nos usuários;
    * Máscara de data;
    * Uso da camada service;
    * Armazenamento de token em localstorage;
    * Responsivo;
    * Para build:
        * uso do webpack
        * minificação de javascripts e css
        * nomeclatura com random words para não fazer cache
        * docker, docker compose, minikube

## Instalação

``` bash
# instalar as dependências
npm install

# rodar em ambiente local na porta 8080
npm run dev
```

## Dados de acessos:
``` bash
API backend nuvem: http://34.95.145.32:8082/api/
API backend local: http://localhost:8082/api/

func1@gmail.com:
senha: secret
Role: ATENDIMENTO(Pode criar ordens)
    
func2@gmail.com e func3@gmail.com:
senha: secret
Role: TECNICO (Pode dar seguimento nas evoluções das SUAS ordens de serviços)
```
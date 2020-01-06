import Vue from 'vue';
import VueResource from 'vue-resource';
import services from './services';
import interceptors from './interceptors';

Vue.use(VueResource);

const http = Vue.http;

// prefixo das requisições
http.options.root = process.env.API_URL ? process.env.API_URL : 'http://localhost:8082/api/';

http.interceptors.push(interceptors);

Object.keys(services).map(service => {
    services[service] = Vue.resource('', {}, services[service]);
});

const setBearerToken = token => {
    http.headers.common['Authorization'] = `Bearer ${token}`;
}

export { http, setBearerToken };
export default services;
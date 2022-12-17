// extraer token
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const token = urlParams.get('tkn');

const navegacion = 'file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Administardor/';

const dashboard = () => {
    let url = navegacion +'Dashboard.html?tkn='+token;
    window.location.assign(url);
};

const admin_usuario = () => {
    let url = navegacion +'usuarios/Administrar-Usuario.html?tkn='+token;
    window.location.assign(url);
};

const planificar_actividades = () => {
    let url = navegacion 
    + 'Planificar-actividades/Planificar-actividades.html?tkn='
    +token;
    window.location.assign(url);
};

const administrar_contrato = () => {
    let url = navegacion 
    + 'administrar-contrato/administrar-contrato.html?tkn='
    +token;
    window.location.assign(url);
};

const pago = () => {
    let url = navegacion + 'pago/pago.html?tkn='+token;
    window.location.assign(url);
};

const estadistica_global = () => {
    let url = navegacion + 'estadistica-global/estadistica-global.html?tkn='+token;
    window.location.assign(url);
};

const estadistica_cliente = () => {
    let url = navegacion + 'estadistica-cliente/estadistica-cliente.html?tkn='+token;
    window.location.assign(url);
};
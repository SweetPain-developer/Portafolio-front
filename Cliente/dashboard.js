// extraer token
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const token = urlParams.get('tkn');

const navegacion = 'file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Cliente/'

const dashboard = () => {
    let url = navegacion+ 'Dashboard.html?tkn='+token;
    window.location.assign(url);
};
const Solicitudes = () => {
    let url = navegacion+ 'solicitudes/solicitudes.html?tkn='+token;
    window.location.assign(url);
};
const Reportes = () => {
    let url = navegacion+ 'reportes/reportes.html?tkn='+token;
    window.location.assign(url);
};
const Pagos = () => {
    let url = navegacion+ 'pagos/pagos.html?tkn='+token;
    window.location.assign(url);
};
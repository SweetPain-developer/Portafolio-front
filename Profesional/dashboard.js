// extraer token
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const token = urlParams.get('tkn');
// Metodos de navegacion
const navegacion = 'file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Profesional/';

const dashboard = () => {
    let url = navegacion +'Dashboard.html?tkn='+token;
    window.location.assign(url);
};

const Cliente_menu = () => {
    let url = navegacion +'clientes/clientes.html?tkn='+token;
    window.location.assign(url);
}; 
const Actividades_menu = () => {
    let url = navegacion +'Planificar-actividades/Planificar-actividades.html?tkn='+token;
    window.location.assign(url);
}; 
const Caso_asesoria_menu = () => {
    let url = navegacion +'caso-asesoria/caso-asesoria.html?tkn='+token;
    window.location.assign(url);
};
// fin Metodos de navegacion
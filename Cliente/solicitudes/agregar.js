// extraer token
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const token = urlParams.get('tkn');

let urls = [
    'file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Cliente/solicitudes/',
    'http://localhost:3001/dogueSolution/api/caso-asesoria/ingresar-asesoria'
]; 
// Metodos de navegación
const navegacion = 'file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Cliente/';

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

// fin Metodos de navegación

const cancelar = () => {
    let url =  urls[0] + 'solicitudes.html?tkn=' + token;
    window.location.assign(url);
};

const validar = (id_tipo,descripcion) => {
    if (id_tipo === 'Seleccione...') {return false;}
    if (descripcion === '') { return false}
    return true;
}

const agregar = () => {

    let descripcion = document.getElementById('descripcion').value;
    let id_tipo = document.getElementById('tipo').value;

    if(!validar(id_tipo,descripcion)){
        return Swal.fire(
            'Completar formulario',
            'Complete el formulario para continuar.',
            'error'
        );
    }

    let body = {
        descripcion,
        id_tipo
    };

    let cabecera = new Headers();
    cabecera.append("Content-Type", "application/json");
    cabecera.append("Authorization", "Bearer "+token);
    let requestOptions = {
        method: 'POST',
        headers: cabecera,
        body: JSON.stringify( body ),
        redirect: 'follow'
    };
    fetch(urls[1], requestOptions)
    .then( response => response.text() )
    .then( result => {
        let respuesta = JSON.parse(result);
        
        if (respuesta.flg_ok === 0) {
            return Swal.fire(
                'Problemas con la creación de la incidencia',
                respuesta.mensaje,
                'error'
            );
        }
        console.info('respuesta', respuesta);
        Swal.fire(
            'Incidencia creada',
            respuesta.mensaje,
            'success'
        ).then(x =>{
            let url =  urls[0] + 'solicitudes.html?tkn=' + token;
            window.location.assign(url);
        });
    })
    .catch( error => console.info(error) );
}
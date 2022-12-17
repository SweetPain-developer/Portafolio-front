// extraer token
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const token = urlParams.get('usr').split('?')[2].replace('tkn=','').trim();
const usuario = urlParams.get('usr').split('?')[0];
const id = urlParams.get('usr').split('?')[1].replace('id=','').trim()

let urls = [
    'http://localhost:3001/dogueSolution/api/Administrar-Contrato/listra-plan', // 0
    'http://localhost:3001/dogueSolution/api/pago/obtener-detalle', // 1
    'file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Administardor/pago/pago.html'
];

console.info({
    token,
    usuario,
    id
});

// Metodos de navegacion
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
    let url = navegacion + '?tkn='+token;
    window.location.assign(url);
};

const estadistica_cliente = () => {
    let url = navegacion + '?tkn='+token;
    window.location.assign(url);
};
// fin metodos de navegacion


const obtener_plan = () => {
    let cabecera = new Headers();
    const modelo_envio = {
        tipo:1
    };
    cabecera.append("Content-Type", "application/json");
    cabecera.append("Authorization", "Bearer " + token);
    const cuerpo_envio = JSON.stringify(modelo_envio);
    let requestOptions = {
        method: 'POST',
        headers: cabecera,
        body: cuerpo_envio,
        redirect: 'follow'
    };
    console.info('requestOptions',requestOptions);
    fetch(urls[0], requestOptions)
    .then(response => response.text())
    .then( resp => {
        let respuesta = JSON.parse(resp);
        console.info(respuesta);
        
        document.getElementById('cliente').value = usuario;
        document.getElementById('plan').value = respuesta.data[0].nombre;
        document.getElementById('monto_base').value = respuesta.data[0].monto_base;
        document.getElementById('cant_check_anual').value = respuesta.data[0].cant_check_anual;
        document.getElementById('cant_ases_mensual').value = respuesta.data[0].cant_ases_mensual;
        document.getElementById('cant_terr_mensual').value = respuesta.data[0].cant_terr_mensual;
        document.getElementById('cargo_extra').value = respuesta.data[0].cargo_extra;
    })
    .catch( error => console.info('error',error) );
};

obtener_plan();

const cabecera_tabla = `
<thead>
    <tr>
    <th scope="col" class="table-active" >Cargo</th>
    <th scope="col" class="table-active" >Cantidad</th>
    <th scope="col" class="table-active" >Precio</th>
</thead>
<tbody id="cuerpoTabla">
</tbody>`;

const detalle = () => {
    let tabla = document.getElementById('tablaDetalle');
    let cabecera = new Headers();
    const modelo_envio = {
        id
    };
    cabecera.append("Content-Type", "application/json");
    cabecera.append("Authorization", "Bearer " + token);
    const cuerpo_envio = JSON.stringify(modelo_envio);
    let requestOptions = {
        method: 'POST',
        headers: cabecera,
        body: cuerpo_envio,
        redirect: 'follow'
    };
    console.info('requestOptions',requestOptions);
    fetch(urls[1], requestOptions)
    .then(response => response.text())
    .then( resp => {
        let respuesta = JSON.parse(resp);
        console.info(respuesta);
        if (respuesta.data.length !== 0) {
            tabla.innerHTML = cabecera_tabla;
            respuesta.data.map(item => {
                tabla.innerHTML += `
                <tr>
                    <td> ${item.nombre}</td>
                    <td> ${item.cantidad}</td>
                    <td> ${item.precio}</td>
                </tr>
                `;
                return item;
            });
        }
    })
    .catch( error => console.info('error',error) );
};

detalle();

const cancelar = () => {
    let url = urls[2]+ '?tkn='+token;
    window.location.assign(url);
};
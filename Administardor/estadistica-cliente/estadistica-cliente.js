// extraer token
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const token = urlParams.get('tkn');

let urls = [
    'http://localhost:3001/dogueSolution/api/reporte/reporte',
    'http://localhost:3001/dogueSolution/api/usuario/obtener-usuario-tipo'
];

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
    let url = navegacion + 'estadistica-global/estadistica-global.html?tkn='+token;
    window.location.assign(url);
};

const estadistica_cliente = () => {
    let url = navegacion + 'estadistica-cliente/estadistica-cliente.html?tkn='+token;
    window.location.assign(url);
};
// fin metodos de navegacion

const cliente = () => {
    const combobox = document.getElementById("cliente");
    combobox.innerHTML=`
        <option selected>Seleccione...</option>
    `; 
    const modelo_envio = {
        tipo:1
    };
    let cabecera = new Headers();
    cabecera.append("Content-Type", "application/json");
    cabecera.append("Authorization", "Bearer "+token);
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
        
        respuesta.data.map( item => {
            combobox.innerHTML+=`
            <option value="${item.usuario}" >${item.usuario}</option>
            `;
        });
    })
    .catch( error => console.info('error',error) );
};

cliente();

const genera_graficos = ({
    grafico1,grafico2,grafico3
}) => {
    const colors = ['rgb(69,177,223)', 'rgb(99,201,122)', 'rgb(203,82,82)', 'rgb(229,224,88)'];
    const graph = document.querySelector("#graph");
    const graph1 = document.querySelector("#graph1");
    const graph2 = document.querySelector("#graph2");
    
    // grafico de torta
    const labels_torta = [];
    const data_torta = [];
    grafico3.map(item => {
        labels_torta.push(item.descripcion);
        data_torta.push(item.cantidad);
        return item;
    });    

    const pie_data = {
        labels: labels_torta,
        datasets: [{
            data: data_torta,
            backgroundColor: colors
        }]
    };

    const config_pie = {
        type: 'pie',
        data: pie_data,
    };

    // grafico columnas 1
    const labels_columnas1 = [];
    const data_columnas1 = [];
    grafico1.map(item => {
        labels_columnas1.push(item.descripcion);
        data_columnas1.push(item.cantidad);
        return item;
    });
    
    const columnas1_data = {
        labels: labels_columnas1,
        datasets: [{
            label: 'Actividades finalizadas',
            data: data_columnas1,
            backgroundColor: colors
        }]
    };

    const config_columnas1 = {
        type: 'bar',
        data: columnas1_data,
    };
    // grafico columnas 2
    const labels_columnas2 = [];
    const data_columnas2 = [];
    grafico2.map(item => {
        labels_columnas2.push(item.descripcion);
        data_columnas2.push(item.cantidad);
        return item;
    });
    
    const columnas2_data = {
        labels: labels_columnas2,
        datasets: [{
            label: 'Actividades por profesional',
            data: data_columnas2,
            backgroundColor: colors
        }]
    };

    const config_columnas2 = {
        type: 'bar',
        data: columnas2_data,
    };

    new Chart(graph, config_pie);
    new Chart(graph1, config_columnas1);
    new Chart(graph2, config_columnas2);
};

const validar = ({cliente,fecha_desde,fecha_hasta})  =>  {
    if (cliente === 'Seleccione...') {
        return false;
    }
    if (fecha_desde === '') {
        return false;
    }
    if (fecha_hasta === '') {
        return false;
    }
    return true
};

const Buscar = () => {
    let cliente = document.getElementById('cliente').value;
    let fecha_desde = document.getElementById('desde').value;
    let fecha_hasta = document.getElementById('hasta').value;
    console.info('campos',{cliente,fecha_desde,fecha_hasta});
    if (!validar({cliente,fecha_desde,fecha_hasta})) {
        return Swal.fire(
            'Completar campos',
            'Es necesario completar todos los campos para buscar.',
            'error'
        );
    }

    let cabecera = new Headers();
    cabecera.append("Content-Type", "application/json");
    cabecera.append("Authorization", "Bearer "+token);
    const cuerpo_envio = JSON.stringify({
        fecha_desde,
        fecha_hasta,
        cliente,
        opcion: 2,
        flg_cliente: 0
    });
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
        if (respuesta.flg_ok === 0) {
            return Swal.fire(
                'Error al cargar los reportes',
                respuesta.mensaje,
                'error'
            );
        }
        console.info(respuesta);
        genera_graficos({
            grafico1:respuesta.data.grafico1,
            grafico2:respuesta.data.grafico2,
            grafico3:respuesta.data.grafico3
        });
    })
    .catch( error => console.info('error',error) );
};
// extraer token
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const token = urlParams.get('tkn');

let urls = [
    'http://localhost:3001/dogueSolution/api/usuario/obtener-usuario-tipo', // 0
    'http://localhost:3001/dogueSolution/api/Administrar-Contrato/listra-plan',// 1
    'http://localhost:3001/dogueSolution/api/Administrar-Contrato/agregar-contrato', // 2
    'file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Administardor/administrar-contrato/administrar-contrato.html' // 3
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
        
        respuesta.data.map( item => {
            combobox.innerHTML+=`
            <option value="${item.usuario}" >${item.usuario}</option>
            `;
        });
    })
    .catch( error => console.info('error',error) );
}

const planes = () => {
    const combobox = document.getElementById("Plan");
    combobox.innerHTML=`
        <option selected>Seleccione...</option>
    `;
    const modelo_envio = {
        tipo:1
    };
    let cabecera = new Headers();
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
        
        respuesta.data.map( item => {
            combobox.innerHTML+=`
            <option value="${item.id}" >${item.nombre}</option>
            `;
        });
    })
    .catch( error => console.info('error',error) );
}

cliente();
planes();

const validador = ({cliente,Plan, fch_contrato,fch_vencimiento}) => {
    if (cliente === 'Seleccione...') {
        return false;
    }
    if (Plan === 'Seleccione...') {
        return false;
    }
    if (fch_contrato === '') {
        return false;
    }
    if (fch_vencimiento === '') {
        return false;
    }
    return true;
};

const agregar = () => {
    let usuario = document.getElementById('cliente').value;
    let Plan = document.getElementById('Plan').value;
    let fch_contrato = document.getElementById('fch_contrato').value;
    let fch_vencimiento = document.getElementById('fch_vencimiento').value;
    console.info('Datos llegando',{usuario,Plan, fch_contrato,fch_vencimiento});
    let validado = validador({usuario,Plan, fch_contrato,fch_vencimiento});
    
    if (!validado) {
        return Swal.fire(
            'Completar formulario',
            'Es necesario completar el formulario par poder continuar.',
            'error'
        ); 
    }
    const modelo_envio = {usuario,Plan, fch_contrato,fch_vencimiento};
    console.info('modelo_entrada',modelo_envio);

    let cabecera = new Headers();
    cabecera.append("Content-Type", "application/json");
    cabecera.append("Authorization", "Bearer " + token);
    const cuerpo_envio = JSON.stringify(modelo_envio);
    let requestOptions = {
        method: 'POST',
        headers: cabecera,
        body: cuerpo_envio,
        redirect: 'follow'
    };
    fetch(urls[2], requestOptions)
    .then(response => response.text())
    .then(result => {
        respuesta = JSON.parse(result);
        if (respuesta.flg_ok === 0) {
            return Swal.fire(
                'Error al agregar contrato',
                respuesta.mensaje,
                'error'
            );
        } else {
            Swal.fire(
                'Guardado correctamente',
                respuesta.mensaje,
                'success'
            ).then( x=> {
                let url = urls[3] + '?tkn=' + token;
                window.location.assign(url);
            });
        }
    })
    .catch(error => console.log('error', error));
};

const cancelar = () => {
    let url = urls[3] + '?tkn=' + token;
    window.location.assign(url);
}; 
// extraer token
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const token = urlParams.get('id').split('?')[1].replace('tkn=','').trim();
// Declaraciones y asignaciones
let urls = [
    'file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Profesional/', // 0
    'file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Profesional/Planificar-actividades/Planificar-actividades.html', // 1
    'http://localhost:3001/dogueSolution/api/usuario/obtener-usuario-tipo', // 2
    'http://localhost:3001/dogueSolution/api/Planificar-Actividades/listar-estados', // 3
    'http://localhost:3001/dogueSolution/api/Planificar-Actividades/listar-servicios',// 4
    'http://localhost:3001/dogueSolution/api/Planificar-Actividades/editar-actividad', // 5
    'http://localhost:3001/dogueSolution/api/Planificar-Actividades/obtener-actividad', // 6
];
// Metodos de navegacion
const navegacion = urls[0];

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
// fin metodos de navegacion

const cancelar = () => {
    let url = urls[1] + '?tkn=' + token;
    window.location.assign(url);
}; 

const profesional = () => {
    const combobox = document.getElementById("profesional");
    combobox.innerHTML=`
        <option selected>Seleccione...</option>
    `; 
    const modelo_envio = {
        tipo:2
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
    fetch(urls[2], requestOptions)
    .then(response => response.text())
    .then( resp => {
        let respuesta = JSON.parse(resp);
        console.info(respuesta);
        respuesta.data.map( item => {
            combobox.innerHTML+=`
            <option value="${item.nombre}">${item.nombre}</option>
            `; 
        });
    })
    .catch( error => console.info('error',error) );
};

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
    fetch(urls[2], requestOptions)
    .then(response => response.text())
    .then( resp => {
        let respuesta = JSON.parse(resp);
        console.info(respuesta);
        
        respuesta.data.map( item => {
            combobox.innerHTML+=`
            <option value="${item.nombre}" >${item.nombre}</option>
            `;
        });
    })
    .catch( error => console.info('error',error) );
}

const estado = () => {
    const combobox = document.getElementById("estado");
    combobox.innerHTML=`
        <option selected>Seleccione...</option>
    `; 
    const modelo_envio = {};
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
    fetch(urls[3], requestOptions)
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
};

const servicio = () => {
    const combobox = document.getElementById("servicio");
    combobox.innerHTML=`
        <option selected>Seleccione...</option>
    `;
    const modelo_envio = {};
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
    fetch(urls[4], requestOptions)
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
};
// LLamadas
cliente();
profesional();
estado();
servicio();

const obtener_actividad = () => {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let id = urlParams.get('id').split('?')[0];
    console.info('id',id);
    let cabecera = new Headers();
    cabecera.append("Content-Type", "application/json");
    cabecera.append("Authorization", "Bearer "+token);
    const cuerpo_envio = JSON.stringify({ id });
    let requestOptions = {
        method: 'POST',
        headers: cabecera,
        body: cuerpo_envio,
        redirect: 'follow'
    };
    console.info('requestOptions',requestOptions.body);
    fetch(urls[6], requestOptions)
    .then(response => response.text())
    .then(result => {
        respuesta = JSON.parse(result);
        if (respuesta.flg_ok === 0) {
            return Swal.fire(
                'Problemas para encontrar la actividad',
                respuesta.mensaje,
                'error'
            );
        }
        console.info('respuesta', respuesta);
        console.info('Clientes', respuesta.data[0].cliente);
        document.getElementById('cliente').value = respuesta.data[0].cliente;
        document.getElementById('profesional').value = respuesta.data[0].profesional;
        document.getElementById('estado').value = respuesta.data[0].id_estado;
        document.getElementById('servicio').value = respuesta.data[0].id_servicio;
        document.getElementById('fch_programada').value = respuesta.data[0].fecha_programada;
        document.getElementById('fch_registro').value = respuesta.data[0].fecha_registro;
        document.getElementById('descripcion').value = respuesta.data[0].descripcion;
    })
    .catch(error => console.log('error', error));

}

setTimeout( () => {
    obtener_actividad();
}, '200');

const validador = ({
    cliente,
    profesional,
    estado,
    servicio,
    fecha_programada,
    fecha_registro,
    descripcion,
}) => {
    if (cliente === 'Seleccione...') {
        return false;
    }
    if (profesional === 'Seleccione...') {
        return false;
    }
    if (estado === 'Seleccione...') {
        return false;
    }
    if (servicio === 'Seleccione...') {
        return false;
    }
    if (fecha_programada === '') {
        return false;
    }
    if (fecha_registro === '') {
        return false;
    }
    if (descripcion === '') {
        return false;
    }
    return true;
};

const actualizar = () => {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let anuncioParam = urlParams.get('id').split('?')[0];
    let cliente = document.getElementById('cliente').value;
    let profesional = document.getElementById('profesional').value;
    let estado = document.getElementById('estado').value;
    let servicio = document.getElementById('servicio').value;
    let fecha_programada = document.getElementById('fch_programada').value;
    let fecha_registro = document.getElementById('fch_registro').value;
    let descripcion = document.getElementById('descripcion').value;

    let validado = validador({
        cliente,
        profesional,
        estado,
        servicio,
        fecha_programada,
        fecha_registro,
        descripcion,
    }); 
    console.info('validado',validado);
    console.info({
        cliente,
        profesional,
        estado,
        servicio,
        fecha_programada,
        fecha_registro,
        descripcion,
    });
    if (!validado) {
        return Swal.fire(
            'Completar formulario',
            'Es necesario completar el formulario par poder continuar.',
            'error'
        ); 
    }
    let fecha_pro = fecha_programada.split('/').join('');
    let fecha_reg = fecha_registro.split('/').join('');
    if (fecha_pro < fecha_reg) {
        return Swal.fire(
            'Completar formulario',
            'La fecha de registro debe ser menor a la fecha programada',
            'error'
        ); 
    }

    const modelo_envio = {
        id:anuncioParam,
        cliente,
        profesional,
        estado,
        servicio,
        fecha_programada,
        fecha_registro,
        descripcion,
    };
    console.info('modelo_entrada',modelo_envio);

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
    console.info('Cuerpo', requestOptions);
    fetch(urls[5], requestOptions)
    .then(response => response.text())
    .then(result => {
        respuesta = JSON.parse(result);
        if (respuesta.flg_ok === 0) {
            return Swal.fire(
                'Error actualizar usuario',
                respuesta.mensaje,
                'error'
            );
        } else {
            Swal.fire(
                'Actividad Actualizado',
                respuesta.mensaje,
                'success'
            ).then( x=> {
                let url = urls[1]+'?tkn='+token;
                window.location.assign(url);
            });
        }
    })
    .catch(error => console.log('error', error));
};
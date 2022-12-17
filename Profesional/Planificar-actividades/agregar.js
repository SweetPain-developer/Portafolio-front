// extraer token
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const token = urlParams.get('tkn');

// Declaraciones y asignaciones
let urls = [
    'file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Profesional/',
    'file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Profesional/Planificar-actividades/Planificar-actividades.html',
    'http://localhost:3001/dogueSolution/api/usuario/obtener-usuario-tipo',
    'http://localhost:3001/dogueSolution/api/Planificar-Actividades/listar-estados',
    'http://localhost:3001/dogueSolution/api/Planificar-Actividades/listar-servicios',
    'http://localhost:3001/dogueSolution/api/Planificar-actividades/agregar-actividad'
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
};

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

const agregar = () => {
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
    fetch(urls[5], requestOptions)
    .then(response => response.text())
    .then(result => {
        respuesta = JSON.parse(result);
        if (respuesta.flg_ok === 0) {
            return Swal.fire(
                'Error al agregar Actividad',
                respuesta.mensaje,
                'error'
            );
        } else {
            Swal.fire(
                'Guardado correctamente',
                respuesta.mensaje,
                'success'
            ).then( x=> {
                let url = urls[1] + '?tkn=' + token;
                window.location.assign(url);
            });
        }
    })
    .catch(error => console.log('error', error));
};

const cancelar = () => {
    let url = urls[1] + '?tkn=' + token;
    window.location.assign(url);
}; 
// LLamadas
cliente();
profesional();
estado();
servicio();
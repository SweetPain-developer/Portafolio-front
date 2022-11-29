const cancelar = () => {
    let url = 'file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Administardor/Planificar-actividades/Planificar-actividades.html';
    window.location.assign(url);
};

const profesional = () => {
    const combobox = document.getElementById("profesional");
    combobox.innerHTML=`
        <option selected>Seleccione...</option>
    `; 
    let url = 'http://localhost:3001/dogueSolution/api/usuario/obtener-usuario-tipo';
    const modelo_envio = {
        tipo:2
    };
    let cabecera = new Headers();
    cabecera.append("Content-Type", "application/json");
    const cuerpo_envio = JSON.stringify(modelo_envio);
    var requestOptions = {
        method: 'POST',
        headers: cabecera,
        body: cuerpo_envio,
        redirect: 'follow'
    };
    fetch(url, requestOptions)
    .then(response => response.text())
    .then( resp => {
        let respuesta = JSON.parse(resp);
        console.info(respuesta);
        respuesta.data.map( item => {
            combobox.innerHTML+=`
            <option value="${item.id}">${item.nombre}</option>
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
    let url = 'http://localhost:3001/dogueSolution/api/usuario/obtener-usuario-tipo';
    const modelo_envio = {
        tipo:3
    };
    let cabecera = new Headers();
    cabecera.append("Content-Type", "application/json");
    const cuerpo_envio = JSON.stringify(modelo_envio);
    var requestOptions = {
        method: 'POST',
        headers: cabecera,
        body: cuerpo_envio,
        redirect: 'follow'
    };
    console.info('requestOptions',requestOptions);
    fetch(url, requestOptions)
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

const estado = () => {
    const combobox = document.getElementById("estado");
    combobox.innerHTML=`
        <option selected>Seleccione...</option>
    `; 
    let url = 'http://localhost:3001/dogueSolution/api/Planificar-Actividades/listar-estados';
    const modelo_envio = {};
    let cabecera = new Headers();
    cabecera.append("Content-Type", "application/json");
    const cuerpo_envio = JSON.stringify(modelo_envio);
    var requestOptions = {
        method: 'POST',
        headers: cabecera,
        body: cuerpo_envio,
        redirect: 'follow'
    };
    console.info('requestOptions',requestOptions);
    fetch(url, requestOptions)
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
    let url = 'http://localhost:3001/dogueSolution/api/Planificar-Actividades/listar-servicios';
    const modelo_envio = {};
    let cabecera = new Headers();
    cabecera.append("Content-Type", "application/json");
    const cuerpo_envio = JSON.stringify(modelo_envio);
    var requestOptions = {
        method: 'POST',
        headers: cabecera,
        body: cuerpo_envio,
        redirect: 'follow'
    };
    console.info('requestOptions',requestOptions);
    fetch(url, requestOptions)
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

const obtener_usuario = () => {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var id = urlParams.get('id');
    console.info('id',id);
    let cabecera = new Headers();
    cabecera.append("Content-Type", "application/json");
    const cuerpo_envio = JSON.stringify({ id });
    var requestOptions = {
        method: 'POST',
        headers: cabecera,
        body: cuerpo_envio,
        redirect: 'follow'
    };
    console.info('requestOptions',requestOptions.body);
    let url ='http://localhost:3001/dogueSolution/api/Planificar-Actividades/obtener-actividad';
    fetch(url, requestOptions)
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
            document.getElementById('cliente').value=respuesta.data[0].cliente;
            document.getElementById('profesional').value = respuesta.data[0].profesional;
            document.getElementById('estado').value = respuesta.data[0].id_estado;
            document.getElementById('servicio').value = respuesta.data[0].id_servicio;
            document.getElementById('fch_programada').value = respuesta.data[0].fecha_programada;
            document.getElementById('fch_registro').value = respuesta.data[0].fecha_registro;
            document.getElementById('descripcion').value = respuesta.data[0].descripcion;
        })
        .catch(error => console.log('error', error));

}

obtener_usuario();

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
    let anuncioParam = urlParams.get('id');
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
            'Es necesario Completar el formulario par poder continuar.',
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
    const cuerpo_envio = JSON.stringify(modelo_envio);
    var requestOptions = {
        method: 'POST',
        headers: cabecera,
        body: cuerpo_envio,
        redirect: 'follow'
    };
    console.info('Cuerpo', requestOptions);
    let link ='http://localhost:3001/dogueSolution/api/Planificar-Actividades/editar-actividad';
    fetch(link, requestOptions)
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
                let url = 'file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Administardor/Planificar-actividades/Planificar-actividades.html'
                window.location.assign(url);
            });
        }
    })
    .catch(error => console.log('error', error));
};
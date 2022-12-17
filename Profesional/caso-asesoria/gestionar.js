// extraer token
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const token = urlParams.get('id').split('?')[1].replace('tkn=','').trim();

// Metodos de navegacion
const navegacion = 'file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Profesional/';

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

const cancelar = () => {
    let url = navegacion +'caso-asesoria/caso-asesoria.html?tkn='+token;
    window.location.assign(url);
};

const Finalizar = () => {
    let id = urlParams.get('id').split('?')[0];
    console.info('id',id);
    let cabecera = new Headers();
    cabecera.append("Content-Type", "application/json");
    cabecera.append("Authorization", "Bearer "+token);
    const cuerpo_envio = JSON.stringify({ id_caso: id, id_estado:5 });
    let requestOptions = {
        method: 'POST',
        headers: cabecera,
        body: cuerpo_envio,
        redirect: 'follow'
    };
    console.info('requestOptions',requestOptions.body);
    fetch("http://localhost:3001/dogueSolution/api/caso-asesoria/actualizar", requestOptions)
    .then(response => response.text())
    .then(result => {
        respuesta = JSON.parse(result);
        if (respuesta.flg_ok === 0) {
            return Swal.fire(
                'Problemas para finalizar la asesoria',
                respuesta.mensaje,
                'error'
            );
        }
        console.info('respuesta', respuesta);
        Swal.fire(
            'Finalizada correctamente',
            'Se finalizo correctamente el caso de asesoria.',
            'success'
        ).then(x => {
            let url = navegacion +'caso-asesoria/caso-asesoria.html?tkn='+token;
            window.location.assign(url);
        });
    })
    .catch(error => console.log('error', error));
}; 

const validar = (descripcion) => {
    if (descripcion === '') { return false;}
    return true;
};

const Actualizar = () => {
    let descripcion = document.getElementById('descripcion2').value;
    if (!validar(descripcion)) {
        return Swal.fire(
            'Completar formulario',
            'Es necesario completar el formulario para continuar',
            'error'
        );
    }
    let id = urlParams.get('id').split('?')[0];
    console.info('id',id);
    let cabecera = new Headers();
    cabecera.append("Content-Type", "application/json");
    cabecera.append("Authorization", "Bearer "+token);
    const cuerpo_envio = JSON.stringify({ id_caso: id, descripcion });
    let requestOptions = {
        method: 'POST',
        headers: cabecera,
        body: cuerpo_envio,
        redirect: 'follow'
    };
    console.info('requestOptions',requestOptions.body);
    fetch("http://localhost:3001/dogueSolution/api/caso-asesoria/insertar-interaccion", requestOptions)
    .then(response => response.text())
    .then(result => {
        respuesta = JSON.parse(result);
        if (respuesta.flg_ok === 0) {
            return Swal.fire(
                'Problemas para actualizar la asesoria',
                respuesta.mensaje,
                'error'
            );
        }
        console.info('respuesta', respuesta);
        Swal.fire(
            'Actualizada correctamente',
            'Se actualizo correctamente el caso de asesoria.',
            'success'
        ).then(x => {
            cargar_historia();
            document.getElementById('descripcion2').value = '';
        });
    })
    .catch(error => console.log('error', error));
};

const obtener_asesoria = () => {
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
    fetch("http://localhost:3001/dogueSolution/api/caso-asesoria/obtener-asesoria", requestOptions)
    .then(response => response.text())
    .then(result => {
        respuesta = JSON.parse(result);
        if (respuesta.flg_ok === 0) {
            return Swal.fire(
                'Problemas para cargar al asesoria',
                respuesta.mensaje,
                'error'
            );
        }
        console.info('respuesta', respuesta);
        document.getElementById('usuario').value = respuesta.data[0].nombre_usuario;
        document.getElementById('fch_creacion').value = respuesta.data[0].fecha_creacion;
        document.getElementById('fch_cierre').value = respuesta.data[0].fecha_cierre;
        document.getElementById('estado').value = respuesta.data[0].estado;
        document.getElementById('descripcion').value = respuesta.data[0].descripcion;
    })
    .catch(error => console.log('error', error));
};

obtener_asesoria();

const cargar_historia = () => {
    let id = urlParams.get('id').split('?')[0];
    let tabla = document.getElementById('tablaHistoria');
    /* Cabecera tabla items*/
    tabla.innerHTML = `
    <thead>
        <tr>
        <th scope="col" class="table-active" >Id</th>
        <th scope="col" class="table-active" >Descripción</th>
        </tr>
    </thead>
    <tbody id="cuerpoTabla">
    </tbody>`;
    
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
    fetch('http://localhost:3001/dogueSolution/api/caso-asesoria/obtener_historia', requestOptions)
    .then(response => response.text())
    .then(result => {
        respuesta = JSON.parse(result);
        if (respuesta.flg_ok === 0) {
            return Swal.fire(
                'Problemas para cargar la historia del la asesoria',
                respuesta.mensaje,
                'error'
            );
        }
        console.info('respuesta', respuesta);
        item = respuesta.data;
        item.map( (item) => {
            tabla.innerHTML += `
            <tr>
                <td> ${item.id_detalle}  </td>
                <td> ${item.desc_interaccion}   </td>
            </tr>
            `;
        });
    })
    .catch(error => console.log('error', error));

};

cargar_historia();
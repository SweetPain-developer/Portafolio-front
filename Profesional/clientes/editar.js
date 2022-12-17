// extraer token
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const token = urlParams.get('id').split('?')[1].replace('tkn=','').trim();
console.info('token',token);
// declaraciones y asignaciones
let item = [];
let urls = [
    'http://localhost:3001/dogueSolution/api/usuario/obtener-usuario-tipo', // 0
    'file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Profesional/clientes/', // 1
    'http://localhost:3001/dogueSolution/api/clientes/obtener-items', // 2
    'http://localhost:3001/dogueSolution/api/clientes/obtener-checklist', // 3
    'http://localhost:3001/dogueSolution/api/clientes/actualizar-revision', // 4
    'http://localhost:3001/dogueSolution/api/clientes/agregar-item', // 5
    'http://localhost:3001/dogueSolution/api/clientes/eliminar-item', // 6
];
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

const cancelar = () => {
    let url = urls[1]+ 'clientes.html?tkn=';
    window.location.assign(url+token);
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
};

cliente();

const agregar_item = () => {
    let usuario = document.getElementById('cliente').value;
    let item = document.getElementById('item').value;
    let modelo_envio = {
        usuario,
        item
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
    console.info('Cuerpo', requestOptions);
    fetch(urls[5], requestOptions)
    .then(response => response.text())
    .then(result => {
        respuesta = JSON.parse(result);
        if (respuesta.flg_ok === 0) {
            return Swal.fire(
                'Error al agregar item a la lista de chequeo',
                respuesta.mensaje,
                'error'
            );
        } else {
            Swal.fire(
                'Guardado correctamente',
                respuesta.mensaje,
                'success'
            );
        }
    })
    .catch(error => console.log('error', error));
    document.getElementById('item').value = '';
    obtener_checkList();
};

const eliminar_item = (id) => {
    let modelo_envio = {
        id
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
    console.info('Cuerpo', requestOptions);
    fetch(urls[6], requestOptions)
    .then(response => response.text())
    .then(result => {
        respuesta = JSON.parse(result);
        if (respuesta.flg_ok === 0) {
            return Swal.fire(
                'Error al Eliminar item a la lista de chequeo',
                respuesta.mensaje,
                'error'
            );
        } else {
            Swal.fire(
                'Guardado correctamente',
                respuesta.mensaje,
                'success'
            );
        }
    })
    .catch(error => console.log('error', error));
    obtener_checkList();
};

const cambiar_estado = (index, revisado) => {
    revisado = revisado === 1 ? 0 : 1;
    item[index].revisado = revisado;
};

const obtener_item = (usuario) => {
    let tabla = document.getElementById('tablaItems');
    /* Cabecera tabla items*/
    tabla.innerHTML = `
    <thead>
        <tr>
        <th scope="col" class="table-active" >ID</th>
        <th scope="col" class="table-active" >Nombre</th>
        <th scope="col" class="table-active" >revisión</th>
        </tr>
    </thead>
    <tbody id="cuerpoTabla">
    </tbody>`;

    document.getElementById("cliente").value = usuario;
    let cabecera = new Headers();
    cabecera.append("Content-Type", "application/json");
    cabecera.append("Authorization", "Bearer "+token);
    const cuerpo_envio = JSON.stringify({ usuario });
    let requestOptions = {
        method: 'POST',
        headers: cabecera,
        body: cuerpo_envio,
        redirect: 'follow'
    };
    console.info('requestOptions',requestOptions.body);
    fetch(urls[2], requestOptions)
        .then(response => response.text())
        .then(result => {
            respuesta = JSON.parse(result);
            if (respuesta.flg_ok === 0) {
                return Swal.fire(
                    'Problemas para cargar el checklist',
                    respuesta.mensaje,
                    'error'
                );
            }
            console.info('respuesta', respuesta);
            item = respuesta.data;
            item.map( (item, index) => {
                tabla.innerHTML += `
                <tr>
                    <td> ${item.id}  </td>
                    <td> ${item.nombre}   </td>
                    <td>
                        <div class="form-check form-switch align-self-center">
                            <input class="form-check-input" type="checkbox" role="switch" id="switch${item.id}" onClick="cambiar_estado(${index},${item.revisado})" ${ Number(item.revisado) === 1 ? 'checked':''} >
                            <a type="button" class="btn btn-outline-danger" onClick="eliminar_item(${item.id})" >Eliminar</a>
                        </div>
                    </td>
                </tr>
                `;
            });
        })
        .catch(error => console.log('error', error));

};

const obtener_checkList = () => {
    let cabecera = new Headers();
    cabecera.append("Content-Type", "application/json");
    cabecera.append("Authorization", "Bearer "+token);
    const cuerpo_envio = JSON.stringify({ id:urlParams.get('id').split('?')[0] });
    let requestOptions = {
        method: 'POST',
        headers: cabecera,
        body: cuerpo_envio,
        redirect: 'follow'
    };
    console.info('requestOptions',requestOptions.body);
    fetch(urls[3], requestOptions)
        .then(response => response.text())
        .then(result => {
            respuesta = JSON.parse(result);
            if (respuesta.flg_ok === 0) {
                return Swal.fire(
                    'Problemas para cargar el checklist',
                    respuesta.mensaje,
                    'error'
                );
            }
            console.info('respuesta', respuesta);
            document.getElementById('mejora').value = respuesta.data[0].mejoras_check === '0' ? 'NO' : respuesta.data[0].mejoras_check;
            document.getElementById('fhc_revision').value = respuesta.data[0].fecha_revision;
            console.info('usuario',respuesta.data[0].nombre_usuario);
            obtener_item(respuesta.data[0].nombre_usuario);

        })
        .catch(error => console.log('error', error));
};

obtener_checkList();

const actualizar = () => {
    let usuario = document.getElementById("cliente").value;
    let mejora = document.getElementById('mejora').value;
    let modelo_envio = {
        usuario,
        mejora,
        items_checkeo: item
    }
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
    console.info('Cuerpo', requestOptions);
    fetch(urls[4], requestOptions)
    .then(response => response.text())
    .then(result => {
        respuesta = JSON.parse(result);
        if (respuesta.flg_ok === 0) {
            return Swal.fire(
                'Error al agregar lista de chequeo',
                respuesta.mensaje,
                'error'
            );
        } else {
            Swal.fire(
                'Guardado correctamente',
                respuesta.mensaje,
                'success'
            ).then(x => {
                let url = urls[1] + 'clientes.html?tkn=' + token;
                window.location.assign(url);
            });


        }
    })
    .catch(error => console.log('error', error));
}
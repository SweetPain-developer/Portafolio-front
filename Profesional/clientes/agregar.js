// extraer token
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const token = urlParams.get('tkn');

let urls = [
    'http://localhost:3001/dogueSolution/api/usuario/obtener-usuario-tipo', // 0
    'file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Profesional/clientes/', // 1
    'http://localhost:3001/dogueSolution/api/clientes/agregar-checklist', // 2
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

let items = [];
const tabla_items = () => {
    let tabla = document.getElementById('tablaItems');
    /* Cabecera tabla items*/
    tabla.innerHTML = `
    <thead>
        <tr>
            <th scope="col" class="table-active" >ID</th>
            <th scope="col" class="table-active" >Nombre</th>
            <th scope="col" class="table-active" >Acción</th>
        </tr>
    </thead>
    <tbody id="cuerpoTabla">
    </tbody>`;
    if (items.length !== 0) {
        items.map( (obj,index) => {
            tabla.innerHTML +=`
            <tr>
                <td> ${index}  </td>
                <td> ${obj.nombre}   </td>
                <td>
                    <div class="form-check form-switch align-self-center">
                        <a type="button" class="btn btn-outline-danger" onClick="eliminar(${index})" >Eliminar</a>
                    </div>
                </td>
            </tr>
            `;
        });
    } 
};

const agregar_item = () => {
    let nombre = document.getElementById('item').value;
    items.push({nombre});
    document.getElementById('item').value = '';
    tabla_items();
} 

const  eliminar = (id) => {
    items = items.filter( (item,index) => index !== id );
    console.info(items);
    tabla_items();
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
tabla_items();

const validaciones = (usuario) => {
    if ( usuario === 'Seleccione...' ) {
        return false
    }
    if ( items.length === 0 ) {
        return false;
    }
    return true
};

const agregar = () => {
    let usuario = document.getElementById('cliente').value;
    if (!validaciones(usuario)) {
        return Swal.fire(
            'Error al agregar lista de chequeo',
            'Es necesario al menos ingresar el cliente y un item.',
            'error'
        );
    }
    let modelo_envio = {
        usuario,
        items_checkeo: items
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
    fetch(urls[2], requestOptions)
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
};
let pageIndex = 0;

const editar = (id) => {
    console.info('Identificador',id);
    window.location.assign(`file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Administardor/usuarios/editar.html?id=${id}`);
};


const sumarPagina = () => {
    pageIndex = pageIndex + 1;
    listar_usuarios();
};

const restarPagina = () => {
    pageIndex = pageIndex - 1;
    listar_usuarios();
};

const cambiar_estado = (id,vigencia) => {
    console.info('Identificador',id,'vigencia',vigencia);
    let vigencia_cambiada = vigencia === 1? 0 : 1;
    let url = "http://localhost:3001/dogueSolution/api/usuario/cambiar-vigencia";
    let body = {
        id_usuario:id,
        vigencia:vigencia_cambiada
    };
    let cabecera = new Headers();
    cabecera.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: cabecera,
        body: JSON.stringify( body ),
        redirect: 'follow'
    };
    Swal.fire({
        icon: 'warning',
        title: 'Quieres cambiar el estado?',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
    }).then( (result) => {
        if (result.isConfirmed) {
            fetch(url, requestOptions)
            .then( response => response.text() )
            .then( result => {
                let respuesta = JSON.parse(result);
                return Swal.fire(
                    'Cambio de estado',
                    respuesta.mensaje,
                    'success'
                );
            })
            .catch(error => console.info('error',error));
        } else {
            listar_usuarios();
        }
    });
};

const listar_usuarios = () => {
    let tabla = document.getElementById('tablaUsuario');
    let pageSize = document.getElementById('pageSize')?.value || 5 ;
    tabla.innerHTML = `
    <thead>
        <tr>
        <th scope="col" class="table-active" >Usuario</th>
        <th scope="col" class="table-active" >Nombre</th>
        <th scope="col" class="table-active" >Apellido</th>
        <th scope="col" class="table-active" >Correo</th>
        <th scope="col" class="table-active" >Acciones</th>
        </tr>
    </thead>
    <tbody id="cuerpoTabla">
    </tbody>`;
    let filter = document.getElementById('buscador').value;
    let url = "http://localhost:3001/dogueSolution/api/usuario/listar-usuario";
    let body = {
        filter: filter.split(' '),
        pageIndex:pageIndex,
        pageSize:Number(pageSize),
        sortDirection:'asc',
        sortColum:""
    };
    let cabecera = new Headers();
    cabecera.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: cabecera,
        body: JSON.stringify( body ),
        redirect: 'follow'
    };
    fetch(url, requestOptions)
    .then( response => response.text() )
    .then( result => {
        let respuesta = JSON.parse(result);
        
        if (respuesta.flg_ok === 0) {
            return Swal.fire(
                'Problemas con la lista de usuarios',
                respuesta.mensaje,
                'error'
            );
        }
        console.info('respuesta', respuesta);
        console.info('pageSize', typeof(pageSize));
                   
        respuesta.data.map(item => {
            tabla.insertRow(-1).innerHTML =`
            <tr>
                <td> ${item.usuario}  </td>
                <td> ${item.nombre}   </td>
                <td> ${item.apellido} </td>
                <td> ${item.email}    </td>
                <td>
                <div class="form-check form-switch align-self-center">
                    <a type="button" class="btn btn-outline-success" onClick="editar(${item.id})" >Editar</a>
                    <input class="form-check-input" type="checkbox" role="switch" id="switch${item.id}" onClick="cambiar_estado(${item.id},${item.vigencia})" ${ item.vigencia === 1 ? 'checked':''} >
                </div>
                </td>
            </tr>`;
            return item;
        });
        tabla.innerHTML +=`<tr> 
        <td colspan="5" class="table-active">
            <div class="col-0 float-end">
                <select class="form-select" id="pageSize" onchange="listar_usuarios()">
                    <option value="5"  ${ Number(pageSize) === 5 ? 'selected' : '' } >5</option>
                    <option value="10" ${ Number(pageSize) === 10 ? 'selected' : '' } >10</option>
                    <option value="20" ${ Number(pageSize) === 20 ? 'selected' : '' } >20</option>
                    <option value="30" ${ Number(pageSize) === 30 ? 'selected' : '' } >30</option>
                </select>
            </div>
            <div class="btn-group me-2 float-end">
                <button type="button" class="btn btn-outline-secondary" onclick="restarPagina()"> < </button>
                <button type="button" class="btn btn-outline-secondary">${pageIndex}</button>
                <button type="button" class="btn btn-outline-secondary" onclick="sumarPagina()"> > </button>
            </div>
        </td>
        </tr>`;
    })
    .catch( error => console.info(error) );
};  

listar_usuarios();
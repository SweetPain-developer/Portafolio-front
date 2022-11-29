let pageIndex = 0;

const editar = (id) => {
    console.info('Identificador',id);
    // cambiar al momento de llegar al editar
    let url = `file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Administardor/administrar-contrato/editar.html?id=${id}`;
    window.location.assign(url);
};

const sumarPagina = () => {
    pageIndex = pageIndex + 1;
    listar_usuarios();
};

const restarPagina = () => {
    pageIndex = pageIndex - 1;
    listar_usuarios();
};

const listar_contratos = () => {
    let tabla = document.getElementById('tablaContrato');
    let pageSize = document.getElementById('pageSize')?.value || 5 ;
    tabla.innerHTML = `
    <thead>
        <tr>
        <th scope="col" class="table-active" >Fecha contrato</th>
        <th scope="col" class="table-active" >Fecha vencimiento</th>
        <th scope="col" class="table-active" >usuario</th>
        <th scope="col" class="table-active" >plan</th>
        <th scope="col" class="table-active" >Editar</th>
        </tr>
    </thead>
    <tbody id="cuerpoTabla">
    </tbody>`;
    let filter = document.getElementById('buscador').value;
    let url = "http://localhost:3001/dogueSolution/api/Administrar-Contrato/listar-contratos";
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
                'Problemas con la lista de contratos',
                respuesta.mensaje,
                'error'
            );
        }
        console.info('respuesta', respuesta);
        console.info('pageSize', typeof(pageSize));
                   
        respuesta.data.map(item => {
            tabla.insertRow(-1).innerHTML =`
            <tr>
                <td> ${item.fecha_contrato} </td>
                <td> ${item.fecha_vencimiento} </td>
                <td> ${item.nombre} </td>
                <td> ${item.nombre_plan} </td>
                <td>
                <a type="button" class="btn btn-outline-success" onClick="editar(${item.id})" >Editar</a>
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

listar_contratos();
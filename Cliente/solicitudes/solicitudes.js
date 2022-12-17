// extraer token
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const token = urlParams.get('tkn');

let pageIndex = 0;

let urls = [
    'file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Cliente/solicitudes/',
    'http://localhost:3001/dogueSolution/api/caso-asesoria/listar-incidencias'
];

// Metodos de navegación
const navegacion = 'file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Cliente/';

const dashboard = () => {
    let url = navegacion+ 'Dashboard.html?tkn='+token;
    window.location.assign(url);
};
const Solicitudes = () => {
    let url = navegacion+ 'solicitudes/solicitudes.html?tkn='+token;
    window.location.assign(url);
};
const Reportes = () => {
    let url = navegacion+ 'reportes/reportes.html?tkn='+token;
    window.location.assign(url);
};
const Pagos = () => {
    let url = navegacion+ 'pagos/pagos.html?tkn='+token;
    window.location.assign(url);
};

// fin Metodos de navegación

const sumarPagina = () => {
    pageIndex = pageIndex + 1;
    listar_asesorias();
};

const restarPagina = () => {
    pageIndex = pageIndex - 1;
    listar_asesorias();
};

const vista_agregar = () => {
    let url = urls[0]+`agregar.html?tkn=${token}`;
    window.location.assign(url);
};

const listar_incidencias = () => {
    let tabla = document.getElementById('tablaIncidencias');
    let pageSize = document.getElementById('pageSize')?.value || 5 ;
    tabla.innerHTML = `
    <thead>
        <tr>
        <th scope="col" class="table-active" >Descripcion</th>
        <th scope="col" class="table-active" >Usuario</th>
        <th scope="col" class="table-active" >tipo</th>
        </tr>
    </thead>
    <tbody id="cuerpoTabla">
    </tbody>`;
    let filter = document.getElementById('buscador').value;
    let body = {
        filter: filter.split(' '),
        pageIndex:pageIndex,
        pageSize:Number(pageSize),
        sortDirection:'asc',
        sortColumn:""
    };
    let cabecera = new Headers();
    cabecera.append("Content-Type", "application/json");
    cabecera.append("Authorization", "Bearer "+token);
    let requestOptions = {
        method: 'POST',
        headers: cabecera,
        body: JSON.stringify( body ),
        redirect: 'follow'
    };
    fetch(urls[1], requestOptions)
    .then( response => response.text() )
    .then( result => {
        let respuesta = JSON.parse(result);
        
        if (respuesta.flg_ok === 0) {
            return Swal.fire(
                'Problemas con la lista de incidencias',
                respuesta.mensaje,
                'error'
            );
        }
        console.info('respuesta', respuesta);
        console.info('pageSize', typeof(pageSize));
                   
        respuesta.data.map(item => {
            tabla.insertRow(-1).innerHTML =`
            <tr>
                <td> ${item.descripcion}</td>
                <td> ${item.nombre_usuario}</td>
                <td> ${item.tipo}</td>
                </td>
            </tr>`;
            return item;
        });
        tabla.innerHTML +=`<tr> 
        <td colspan="3" class="table-active">
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

listar_incidencias();
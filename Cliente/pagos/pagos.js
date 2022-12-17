// extraer token
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const token = urlParams.get('tkn');

let urls = [
    'http://localhost:3001/dogueSolution/api/pago/obtener-anios-periodo',// 0
    'http://localhost:3001/dogueSolution/api/pago/obtener-meses-periodo', // 1
    'http://localhost:3001/dogueSolution/api/pago/buscar', // 2
    'file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Cliente/pagos/ver-detalle.html', // 3
    'http://localhost:3001/dogueSolution/api/pago/actualizar-pago',
];

// Metodos de navegacion
const navegacion = 'file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Cliente/'

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
// fin Metodos de navegacion
const cargar_anio = () => {
    let cbx_anio = document.getElementById('anio');
    cbx_anio.innerHTML=`
        <option selected>Seleccione...</option>
    `; 
    const modelo_envio = { };
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
    fetch(urls[0], requestOptions)
    .then(response => response.text())
    .then( resp => {
        let respuesta = JSON.parse(resp);
        console.info(respuesta);
        respuesta.data.map( item => {
            cbx_anio.innerHTML+=`
            <option value="${item.anio}">${item.anio}</option>
            `; 
        });
    })
    .catch( error => console.info('error',error) ); 
    cargar_mes();
};

const cargar_mes = () => {
    let cbx_mes = document.getElementById('mes');
    let anio = document.getElementById('anio').value;
    if (anio === 'Seleccione...') {
        cbx_mes.innerHTML=`
            <option selected>Seleccione...</option>
        `; 
    }
    const modelo_envio = { 
        anio
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
    fetch(urls[1], requestOptions)
    .then(response => response.text())
    .then( resp => {
        let respuesta = JSON.parse(resp);
        console.info(respuesta);
        respuesta.data.map( item => {
            cbx_mes.innerHTML+=`
            <option value="${item.mes}">${item.mes}</option>
            `; 
        });
    })
    .catch( error => console.info('error',error) ); 
};

cargar_anio();

const ver_detalle = (id,nombre) => {
    // cambiar al momento de llegar al editar
    let url = urls[3] + `?usr=${nombre}?id=${id}?tkn=${token}`;
    window.location.assign(url);
};

const Buscar = () => {
    let mes = document.getElementById('mes').value;
    let anio = document.getElementById('anio').value;
    let periodo = `${mes}/${anio}`;
    let tabla = document.getElementById('tablaPago');

    tabla.innerHTML = `
    <thead>
        <tr>
        <th scope="col" class="table-active" >ID</th>
        <th scope="col" class="table-active" >Total Pago</th>
        <th scope="col" class="table-active" >Estado</th>
        <th scope="col" class="table-active" >Periodo</th>
        <th scope="col" class="table-active" >Fecha Facturado</th>
        <th scope="col" class="table-active" >Fecha Pago</th>
        <th scope="col" class="table-active" >Cliente</th>
        <th scope="col" class="table-active" >Acciones</th>
        </tr>
    </thead>
    <tbody id="cuerpoTabla">
    </tbody>`;
    let cabecera = new Headers();
    cabecera.append("Content-Type", "application/json");
    cabecera.append("Authorization", "Bearer "+token);
    let modelo_envio = { 
        periodo, 
        flg_tkn: 1 
    };
    const cuerpo_envio = JSON.stringify(modelo_envio);
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
            item.map( (item) => {
                tabla.innerHTML += `
                <tr>
                    <td> ${item.id}  </td>
                    <td> ${item.total_pago}   </td>
                    <td> ${item.estado}   </td>
                    <td> ${item.periodo}   </td>
                    <td> ${item.fecha_facturado}   </td>
                    <td> ${item.fecha_pago}   </td>
                    <td> ${item.usuario}   </td>
                    <td>
                        <div class="form-check form-switch align-self-center">
                            ${ item.estado === 'FACTURADO' || item.estado === 'NO PAGADO' ? `<a type="button" class="btn btn-outline-primary" onclick="pagar(${item.id})" >Pagar</a>`: ''}
                            <a type="button" class="btn btn-outline-success" onclick="ver_detalle(${item.id},'${item.usuario}')" >Ver Detalle</a>
                        </div>
                    </td>
                </tr>
                `;
            });
        })
        .catch(error => console.log('error', error));
};

const pagar = (id) => {
    let cabecera = new Headers();
    cabecera.append("Content-Type", "application/json");
    cabecera.append("Authorization", "Bearer "+token);
    let modelo_envio = { 
        id
    };
    const cuerpo_envio = JSON.stringify(modelo_envio);
    let requestOptions = {
        method: 'POST',
        headers: cabecera,
        body: cuerpo_envio,
        redirect: 'follow'
    };
    console.info('requestOptions',requestOptions.body);
    fetch(urls[4], requestOptions)
    .then(response => response.text())
    .then(result => {
        respuesta = JSON.parse(result);
        if (respuesta.flg_ok === 0) {
            return Swal.fire(
                'Problemas para realizar el pago',
                respuesta.mensaje,
                'error'
            );
        }
        console.info('respuesta', respuesta);
        Swal.fire(
            'Pago realizado con exito.',
            respuesta.mensaje,
            'success'
        ).then( x => Buscar());
    })
    .catch(error => console.log('error', error));
};
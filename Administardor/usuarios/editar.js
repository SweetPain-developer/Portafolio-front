// extraer token
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const token = urlParams.get('id').split('?')[1].replace('tkn=','').trim();
console.info('token',token);
// declaraciones y asignaciones
let nombre_usuario;
let id_empresa;

// Metodos de navegacion
const navegacion = 'file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Administardor/';

const dashboard = () => {
    let url = navegacion +'Dashboard.html?tkn='+token;
    window.location.assign(url);
};

const admin_usuario = () => {
    let url = navegacion +'usuarios/Administrar-Usuario.html?tkn='+token;
    window.location.assign(url);
};

const planificar_actividades = () => {
    let url = navegacion 
    + 'Planificar-actividades/Planificar-actividades.html?tkn='
    +token;
    window.location.assign(url);
};

const administrar_contrato = () => {
    let url = navegacion 
    + 'administrar-contrato/administrar-contrato.html?tkn='
    +token;
    window.location.assign(url);
};

const pago = () => {
    let url = navegacion + 'pago/pago.html?tkn='+token;
    window.location.assign(url);
};

const estadistica_global = () => {
    let url = navegacion + 'estadistica-global/estadistica-global.html?tkn='+token;
    window.location.assign(url);
};

const estadistica_cliente = () => {
    let url = navegacion + 'estadistica-cliente/estadistica-cliente.html?tkn='+token;
    window.location.assign(url);
};
// fin metodos de navegacion

const cancelar = () => {
    let url = 'file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Administardor/usuarios/Administrar-Usuario.html?tkn=';
    window.location.assign(url+token);
}; 
 
const validador = ({nombre,apellido,password,usuario,id_tipo,telefono,email}) => {
    if(nombre === '') {
        return false;
    }
    if(apellido === '') {
        return false;
    }
    if(password === '') {
        return false;
    }
    if(usuario === '') {
        return false;
    }
    if(id_tipo === 'Seleccione...') {
        return false;
    }
    if(telefono === '') {
        return false;
    }
    if(email === '') {
        return false;
    }
    return true;
}; 

const validador_empresa = ({nom_empresa,fono_empresa,calle,region_id,comuna_id,rut_empresa}) =>{
    if(nom_empresa === '') {
        return false;
    }
    if(fono_empresa === '') {
        return false;
    }
    if(calle === '') {
        return false;
    }
    if(region_id === 'Seleccione...') {
        return false;
    }
    if(comuna_id === 'Seleccione...') {
        return false;
    }
    if(rut_empresa === '') {
        return false;
    }
    return true;
};


const obtener_regiones = () =>{
    let cbx_regiones = document.getElementById('region');
    cbx_regiones.innerHTML=`
        <option selected>Seleccione...</option>
    `; 
    let url = 'http://localhost:3001/dogueSolution/api/usuario/obtener-region';
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
    fetch(url, requestOptions)
    .then(response => response.text())
    .then( resp => {
        let respuesta = JSON.parse(resp);
        console.info(respuesta);
        respuesta.data.map( item => {
            cbx_regiones.innerHTML+=`
            <option value="${item.id}">${item.nombre}</option>
            `; 
        });
    })
    .catch( error => console.info('error',error) ); 
};

const obtener_comunas = () => {
    let cbx_regiones = document.getElementById('region').value;
    let cbx_comunas = document.getElementById('comuna');
    console.info('cbx_regiones',cbx_regiones);
    cbx_comunas.innerHTML=`
        <option selected>Seleccione...</option>
    `; 
    let url = 'http://localhost:3001/dogueSolution/api/usuario/obtener-comunas-region';
    const modelo_envio = {
        region_id:Number(cbx_regiones)
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
    fetch(url, requestOptions)
    .then(response => response.text())
    .then( resp => {
        let respuesta = JSON.parse(resp);
        console.info(respuesta);
        respuesta.data.map( item => {
            cbx_comunas.innerHTML+=`
            <option value="${item.id}">${item.nombre}</option>
            `; 
        });
    })
    .catch( error => console.info('error',error) ); 
};

const Agregar_empresa = () => {
    let id_tipo = document.getElementById('tipo_usuario').value;
    let formulario = document.getElementById('formulario');
    console.info('este es el id',id_tipo);
    if (Number(id_tipo) === 1) {    
        formulario.innerHTML = `
        <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">Nombre Empresa</span>
            <input id="empresaNombre" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" maxlength="50">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">Rut Empresa</span>
            <input id="rutEmpresa" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" maxlength="50">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">Telefono Empresa</span>
            <input id="fonoEmpresa" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" maxlength="50">
        </div>
        <div class="input-group mb-3">
            <label class="input-group-text" for="region">Region</label>
            <select class="form-select" id="region" onchange="obtener_comunas()">
            </select>
        </div>
        <div class="input-group mb-3">
            <label class="input-group-text" for="comuna">Comuna</label>
            <select class="form-select" id="comuna">
                <option selected>Seleccione...</option>
            </select>
          </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">Calle Empresa</span>
            <input id="calleEmpresa" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" maxlength="50">
        </div>
        `;
        obtener_regiones();
    } else {
        formulario.innerHTML = '';
    }
};

const obtener_usuario = () => {
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
    fetch("http://localhost:3001/dogueSolution/api/usuario/obtener-usuario", requestOptions)
        .then(response => response.text())
        .then(result => {
            respuesta = JSON.parse(result);
            if (respuesta.flg_ok === 0) {
                return Swal.fire(
                    'Problemas para cargar al usuarios',
                    respuesta.mensaje,
                    'error'
                );
            }
            nombre_usuario = respuesta.data[0].usuario;
            console.info('respuesta', respuesta);
            document.getElementById('nombre').value=respuesta.data[0].nombre;
            document.getElementById('apellido').value = respuesta.data[0].apellido;
            document.getElementById('password_usuario').value = respuesta.data[0].contrasena;
            document.getElementById('usuario').value = respuesta.data[0].usuario;
            document.getElementById('tipo_usuario').value = respuesta.data[0].tipo_usuario;
            document.getElementById('telefono').value = respuesta.data[0].telefono;
            document.getElementById('email').value = respuesta.data[0].email;
            if (Number(respuesta.data[0].tipo_usuario) === 1){
                Agregar_empresa();
            }
        })
        .catch(error => console.log('error', error));

};

const obtener_empresa = () => {
    let cabecera = new Headers();
    cabecera.append("Content-Type", "application/json");
    cabecera.append("Authorization", "Bearer "+token);
    const cuerpo_envio = JSON.stringify({ nombre_usuario });
    let requestOptions = {
        method: 'POST',
        headers: cabecera,
        body: cuerpo_envio,
        redirect: 'follow'
    };
    console.info('requestOptions',requestOptions.body);
    fetch("http://localhost:3001/dogueSolution/api/usuario/obtener-empresa", requestOptions)
        .then(response => response.text())
        .then(result => {
            respuesta = JSON.parse(result);
            if (respuesta.flg_ok === 0) {
                return Swal.fire(
                    'Problemas para cargar al usuarios',
                    respuesta.mensaje,
                    'error'
                );
            }
            console.info('respuesta', respuesta);
            document.getElementById('empresaNombre').value=respuesta.data[0].nombre;
            document.getElementById('rutEmpresa').value = respuesta.data[0].rut;
            document.getElementById('fonoEmpresa').value = respuesta.data[0].telefono;
            document.getElementById('region').value = respuesta.data[0].id_region;
            obtener_comunas();
            setTimeout( () => { 
                document.getElementById('comuna').value = respuesta.data[0].id_comuna;
            },'200');
            document.getElementById('calleEmpresa').value = respuesta.data[0].calle;
        })
        .catch(error => console.log('error', error));

};

obtener_usuario();

setTimeout( () => {
    obtener_empresa();
}, '200');

const actualizar = () => {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let anuncioParam = urlParams.get('id');
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let password = document.getElementById('password_usuario').value;
    let usuario = document.getElementById('usuario').value;
    let id_tipo = document.getElementById('tipo_usuario').value;
    let telefono = document.getElementById('telefono').value;
    let email = document.getElementById('email').value;
    let nom_empresa,fono_empresa,calle,region_id,comuna_id,rut_empresa;

    let validado = validador({nombre,apellido,password,usuario,id_tipo,telefono,email}); 
    if (!validado) {
        return Swal.fire(
            'Completar formulario',
            'Es necesario completar el formulario par poder continuar.',
            'error'
        ); 
    }
    
    const modelo_envio = {
        id_usuario:anuncioParam,
        nombre,
        apellido,
        password,
        usuario,
        id_tipo,
        telefono,
        email,
    };
    console.info('modelo_entrada',modelo_envio);
    if (Number(id_tipo) === 1 ) {
        nom_empresa = document.getElementById('empresaNombre').value;
        fono_empresa = document.getElementById('fonoEmpresa').value;
        calle = document.getElementById('calleEmpresa').value;
        region_id = document.getElementById('region').value;
        comuna_id = document.getElementById('comuna').value;
        rut_empresa = document.getElementById('rutEmpresa').value;
        const vali = validador_empresa({nom_empresa,fono_empresa,calle,region_id,comuna_id,rut_empresa}); 
        if (!vali) {
            return Swal.fire(
                'Completar formulario',
                'Es necesario completar el formulario par poder continuar.',
                'error'
            ); 
        }
        modelo_envio.rut_empresa = rut_empresa;
        modelo_envio.comuna_id = comuna_id;
        modelo_envio.fono_empresa = fono_empresa;
        modelo_envio.region_id = region_id;
        modelo_envio.calle = calle;
        modelo_envio.nom_empresa = nom_empresa;
        modelo_envio.id_empresa = id_empresa;
    }
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
    fetch("http://localhost:3001/dogueSolution/api/usuario/actualizar-usuario", requestOptions)
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
                'Usuario Actualizado',
                respuesta.mensaje,
                'success'
            ).then( x=> {
                let url = 'file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Administardor/usuarios/Administrar-Usuario.html?tkn='
                window.location.assign(url+token);
            });


        }
    })
    .catch(error => console.log('error', error));
};
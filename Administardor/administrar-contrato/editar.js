// extraer token
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const token = urlParams.get('id').split('?')[1].replace('tkn=','').trim();
console.info('token',token);
// declaraciones y asignaciones
let vigencia;
let urls = [
    'file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Administardor/administrar-contrato/administrar-contrato.html', // 0
    'http://localhost:3001/dogueSolution/api/usuario/obtener-usuario-tipo', // 1
    'http://localhost:3001/dogueSolution/api/Administrar-Contrato/listra-plan', // 2
    'http://localhost:3001/dogueSolution/api/Administrar-Contrato/editar-contratos', // 3
    'http://localhost:3001/dogueSolution/api/Administrar-Contrato/obtener-contrato', // 4
];
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
    let url = urls[0]+'?tkn='+ token;
    window.location.assign(url);
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
    fetch(urls[1], requestOptions)
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

const planes = () => {
    const combobox = document.getElementById("Plan");
    combobox.innerHTML=`
        <option selected>Seleccione...</option>
    `; 
    const modelo_envio = {
        tipo:3
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
            <option value="${item.id}" >${item.nombre}</option>
            `;
        });
    })
    .catch( error => console.info('error',error) );
};

cliente();
planes();

const validador = ({cliente,plan, fch_contrato,fch_vencimiento}) => {
    if (cliente === 'Seleccione...') {
        return false;
    }
    if (plan === 'Seleccione...') {
        return false;
    }
    if (fch_contrato === '') {
        return false;
    }
    if (fch_vencimiento === '') {
        return false;
    }
    return true;
};
const obtener_contrato = () => {
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
    fetch(urls[4], requestOptions)
        .then(response => response.text())
        .then(result => {
            respuesta = JSON.parse(result);
            if (respuesta.flg_ok === 0) {
                return Swal.fire(
                    'Problemas encontrar el contrato',
                    respuesta.mensaje,
                    'error'
                );
            }
            console.info('respuesta', respuesta);
            document.getElementById('cliente').value=respuesta.data[0].cliente;
            document.getElementById('Plan').value = respuesta.data[0].plan;
            document.getElementById('fch_contrato').value = respuesta.data[0].fecha_contrato;
            document.getElementById('fch_vencimiento').value = respuesta.data[0].fecha_vencimiento;
            vigencia = Number(respuesta.data[0].vigencia);
            document.getElementById('switchbuttom').innerHTML = `
            <label class="form-check-label" for="flexSwitchCheckChecked">Estado</label>
            <input id="Estado" class="form-check-input" type="checkbox" role="switch" ${ vigencia === 1 ?'checked':''} onclick="Vigente()">
            `;
        })
        .catch(error => console.log('error', error));

}

obtener_contrato();

const Vigente = () => {
    if (vigencia === 1) {
        vigencia = 0;
    } else {
        vigencia = 1;
    }
};

const actualizar = () => {
    
    let estado = document.getElementById('Estado');
    console.info('estado',estado);

    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let anuncioParam = urlParams.get('id').split('?')[0];
    let cliente = document.getElementById('cliente').value;
    let plan = document.getElementById('Plan').value;
    let fch_contrato = document.getElementById('fch_contrato').value;
    let fch_vencimiento = document.getElementById('fch_vencimiento').value;
    let validado = validador({cliente,plan, fch_contrato,fch_vencimiento}); 
    console.info('validado',validado);
    console.info({cliente,plan, fch_contrato,fch_vencimiento});
    if (!validado) {
        return Swal.fire(
            'Completar formulario',
            'Es necesario completar el formulario par poder continuar.',
            'error'
        ); 
    }
    const modelo_envio = {
        id:anuncioParam,
        plan,
        fch_contrato,
        fch_vencimiento,
        vigencia
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
    console.info('Cuerpo', requestOptions);
    fetch(urls[3], requestOptions)
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
                let url = urls[0]+'?tkn='+token;
                window.location.assign(url);
            });
        }
    })
    .catch(error => console.log('error', error));
};
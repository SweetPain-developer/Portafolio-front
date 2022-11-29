const cancelar = () => {
    let url = 'file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Administardor/administrar-contrato/administrar-contrato.html';
    window.location.assign(url);
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

const planes = () => {
    const combobox = document.getElementById("Plan");
    combobox.innerHTML=`
        <option selected>Seleccione...</option>
    `; 
    let url = 'http://localhost:3001/dogueSolution/api/Administrar-Contrato/listra-plan';
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
    let url ='http://localhost:3001/dogueSolution/api/Administrar-Contrato/obtener-contrato';
    fetch(url, requestOptions)
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
        })
        .catch(error => console.log('error', error));

}

obtener_contrato();

const actualizar = () => {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let anuncioParam = urlParams.get('id');
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
            'Es necesario Completar el formulario par poder continuar.',
            'error'
        ); 
    }
    
    const modelo_envio = {
        id:anuncioParam,
        id_usuario:cliente,
        plan,
        fch_contrato,
        fch_vencimiento
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
    let link ='http://localhost:3001/dogueSolution/api/Administrar-Contrato/editar-contratos';
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
                let url = 'file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Administardor/administrar-contrato/administrar-contrato.html'
                window.location.assign(url);
            });
        }
    })
    .catch(error => console.log('error', error));
};
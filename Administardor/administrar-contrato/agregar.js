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

const validador = ({cliente,Plan, fch_contrato,fch_vencimiento}) => {
    if (cliente === 'Seleccione...') {
        return false;
    }
    if (Plan === 'Seleccione...') {
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

const agregar = () => {
    let id_usuario = document.getElementById('cliente').value;
    let Plan = document.getElementById('Plan').value;
    let fch_contrato = document.getElementById('fch_contrato').value;
    let fch_vencimiento = document.getElementById('fch_vencimiento').value;
    console.info('Datos llegando',{id_usuario,Plan, fch_contrato,fch_vencimiento});
    let validado = validador({id_usuario,Plan, fch_contrato,fch_vencimiento});
    
    if (!validado) {
        return Swal.fire(
            'Completar formulario',
            'Es necesario Completar el formulario par poder continuar.',
            'error'
        ); 
    }
    const modelo_envio = {id_usuario,Plan, fch_contrato,fch_vencimiento};
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
    let url = 'http://localhost:3001/dogueSolution/api/Administrar-Contrato/agregar-contrato';
    fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => {
        respuesta = JSON.parse(result);
        if (respuesta.flg_ok === 0) {
            return Swal.fire(
                'Error al agregar contrato',
                respuesta.mensaje,
                'error'
            );
        } else {
            Swal.fire(
                'Guardado correctamente',
                respuesta.mensaje,
                'success'
            ).then( x=> {
                let url = 'file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Administardor/administrar-contrato/administrar-contrato.html';
                window.location.assign(url);
            });
        }
    })
    .catch(error => console.log('error', error));
};

const cancelar = () => {
    let url = 'file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Administardor/administrar-contrato/administrar-contrato.html';
    window.location.assign(url);
}; 
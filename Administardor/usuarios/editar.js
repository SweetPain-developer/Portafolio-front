const cancelar = () => {
    window.location.assign('file:///C:/Users/angel/Desktop/Portafolio-front/Administardor/usuarios/Administrar-Usuario.html');
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
const actualizar = () => {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var anuncioParam = urlParams.get('id');
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let password = document.getElementById('password_usuario').value;
    let usuario = document.getElementById('usuario').value;
    let id_tipo = document.getElementById('tipo_usuario').value;
    let telefono = document.getElementById('telefono').value;
    let email = document.getElementById('email').value;

    let validado = validador({nombre,apellido,password,usuario,id_tipo,telefono,email}); 
    if (!validado) {
        return Swal.fire(
            'Completar formulario',
            'Es necesario Completar el formulario par poder continuar.',
            'error'
        ); 
    }
    
    const modelo_envio = {
        id:anuncioParam,
        nombre,
        apellido,
        password,
        usuario,
        id_tipo,
        telefono,
        email,
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
                    window.location.assign('file:///C:/Users/angel/Desktop/Portafolio-front/Administardor/usuarios/Administrar-Usuario.html');
                });


            }
        })
        .catch(error => console.log('error', error));
};

const obtener_usuario = () => {
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
    fetch("http://localhost:3001/dogueSolution/api/usuario/obtener-usuario", requestOptions)
        .then(response => response.text())
        .then(result => {
            respuesta = JSON.parse(result);
            if (respuesta.flg_ok === 0) {
                return Swal.fire(
                    'Problemas con la lista de usuarios',
                    respuesta.mensaje,
                    'error'
                );
            }
            console.info('respuesta', respuesta);
            document.getElementById('nombre').value=respuesta.data[0].nombre;
            document.getElementById('apellido').value = respuesta.data[0].apellido;
            document.getElementById('password_usuario').value = respuesta.data[0].contrasena;
            document.getElementById('usuario').value = respuesta.data[0].usuario;
            document.getElementById('tipo_usuario').value = respuesta.data[0].tipo_usuario;
            document.getElementById('telefono').value = respuesta.data[0].telefono;
            document.getElementById('email').value = respuesta.data[0].email;
        })
        .catch(error => console.log('error', error));

}

obtener_usuario();
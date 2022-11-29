const login = () => {
    let user = document.getElementById('user').value;
    let pass = document.getElementById('pass').value;
    const rutas = [
        {

            tipo: "ADMINISTRADOR",
            url: 'file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Administardor/Dashboard.html'
        },
        {
            tipo: "PROFESIONAL",
            url: 'file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Profesional/Dashboard.html'
        },
        {
            tipo: "CLIENTE",
            url: 'file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Cliente/Dashboard.html'
        }
    ];
    if (user === '' || pass === '') {
        return Swal.fire(
            'Error al ingresar',
            'Debe ingresar usuario y contraseña.',
            'error'
        );
    }
    console.info('credenciales', { user, pass });
    let cabecera = new Headers();
    cabecera.append("Content-Type", "application/json");
    const cuerpo_envio = JSON.stringify({ user, pass });
    var requestOptions = {
        method: 'POST',
        headers: cabecera,
        body: cuerpo_envio,
        redirect: 'follow'
    };
    console.info('Cuerpo', requestOptions);
    fetch("http://localhost:3001/dogueSolution/api/login/autenticacion", requestOptions)
        .then(response => response.text())
        .then(result => {
            respuesta = JSON.parse(result);
            if (respuesta.flg_ok === 0) {
                return Swal.fire(
                    'Error al ingresar',
                    respuesta.mensaje,
                    'error'
                );
            }
            window.location.assign(rutas.filter(item => item.tipo === respuesta.data.tipo_usuario)[0].url);
        })
        .catch(error => console.log('error', error));
};
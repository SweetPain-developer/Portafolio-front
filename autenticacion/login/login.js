let urls = [
    'file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Administardor/Dashboard.html', // vistas administrador
    'file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Profesional/Dashboard.html', // vistas profesional
    'file:///C:/Users/angel/Desktop/Proyectos/Portafolio-front/Cliente/Dashboard.html', // vistas cliente
    'http://localhost:3001/dogueSolution/api/login/autenticacion' // servicio
];

const login = () => {
    let user = document.getElementById('user').value;
    let pass = document.getElementById('pass').value;
    const rutas = [
        { tipo: "ADMINISTRADOR", url: urls[0] },
        { tipo: "PROFESIONAL", url: urls[1] },
        { tipo: "CLIENTE", url: urls[2] }
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
                'Error al ingresar',
                respuesta.mensaje,
                'error'
            );
        }
        let token = respuesta.token;
        window.location.assign(rutas.filter(item => item.tipo === respuesta.data.tipo_usuario)[0].url+`?tkn=${token}`);
    })
    .catch(error => console.log('error', error));
};
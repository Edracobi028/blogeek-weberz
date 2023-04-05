$(() => {    
    //auth-google auth-facebook Paso 2 : crear objeto
    const objAuth = new Autenticacion()

    

    $("#btnRegistroEmail").click(() => {
        const nombres = $('#nombreContactoReg').val();
        const email = $('#emailContactoReg').val();
        const password = $('#passwordReg').val();
        const auth = new Autenticacion() //crear una instancia de autenticación
        auth.crearCuentaEmailPass(email, password, nombres)
    });

    $("#btnInicioEmail").click(() => {
        const email = $('#emailSesion').val();
        const password = $('#passwordSesion').val();
        // TODO : LLamar auth cuenta con email
    });

    //auth-google Paso 3: en el evento del click llamar el metodo desde el objeto creado objAuth
    $("#authGoogle").click(() => objAuth.authCuentaGoogle());

    //auth-facebook Paso 3: llama al funcion donde configuramos el provider de facebook
    $("#authFB").click(() => objAuth.authCuentaFacebook()); 

    //$("#authTwitter").click(() => //AUTH con Twitter);

    $('#btnRegistrarse').click(() => {
        $('#modalSesion').modal('close');
        $('#modalRegistro').modal('open');
        
        
    });

    $('#btnIniciarSesion').click(() => {
        $('#modalRegistro').modal('close');
        $('#modalSesion').modal('open');
    });

});
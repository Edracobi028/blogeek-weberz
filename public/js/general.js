$(() => {
  $('.tooltipped').tooltip({ delay: 50 })
  $('.modal').modal()

  // TODO: Adicionar el service worker

  // Init Firebase nuevamente
  /* firebase.initializeApp(config); */
  // Initialize Firebase
 firebase.initializeApp(firebaseConfig); 
/* const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);  */

  // TODO: Registrar LLave publica de messaging

  // TODO: Solicitar permisos para las notificaciones

  // TODO: Recibir las notificaciones cuando el usuario esta foreground

  // TODO: Recibir las notificaciones cuando el usuario esta background

  // TODO: Listening real time

  // TODO: Firebase observador del cambio de estado
  //crear una funcion para escuchar y nos de el usuario
  firebase.auth().onAuthStateChanged( user => {
    if(user){
      $('#btnInicioSesion').text('Salir') //texto del boton salir
      //validar
      if (user.photoURL) {
        $('#avatar').attr('src', user.photoURL) //si tiene una foto la utenticacion se la agrega al avatar
      }else{
        $('#avatar').attr('src', 'imagenes/usuario_auth.png') //imagen por defecto identificado
      }
    }else {
      $('#btnInicioSesion').text('Iniciar Sesión')
      $('#avatar').attr('src', 'imagenes/usuario.png') //imagen por defecto no identificado
    }
  })

  //$('#btnInicioSesion').text('Salir')
  //$('#avatar').attr('src', user.photoURL)
  //$('#avatar').attr('src', 'imagenes/usuario_auth.png')
  //$('#btnInicioSesion').text('Iniciar Sesión')
  //$('#avatar').attr('src', 'imagenes/usuario.png')

  // TODO: Evento boton inicio sesion
  $('#btnInicioSesion').click(() => {
    
    //Obtener el usuario que esta autenticado
    const user = firebase.auth().currentUser
    if (user) {
      //Si esta autenticado mostrara el signout
      $('#btnInicioSesion').text('Iniciar Sesión') //muestra boton de inicio de sesion
      return firebase.auth().signOut().then( () => {
        $('#avatar').attr('src', 'imagenes/usuario.png') //Muestra el avatar
        Materialize.toast(`SignOut correcto`, 4000) //Muestra mensaje 4s
      }).catch(error => {
        Materialize.toast(`Error al realizar SignOut => ${error}`, 4000)
      })
    }

    $('#emailSesion').val('')
    $('#passwordSesion').val('')
    $('#modalSesion').modal('open')
  })

  $('#avatar').click(() => {
    //$('#avatar').attr('src', 'imagenes/usuario.png')
    //Materialize.toast(`SignOut correcto`, 4000)
  })

  $('#btnTodoPost').click(() => {
    $('#tituloPost').text('Posts de la Comunidad')   
  })

  $('#btnMisPost').click(() => {
    //$('#tituloPost').text('Mis Posts')
    //Materialize.toast(`Debes estar autenticado para ver tus posts`, 4000)    
  })
})

$(() => {
  $('.tooltipped').tooltip({ delay: 50 })
  $('.modal').modal()

  // Init Firebase nuevamente
  /* firebase.initializeApp(config); */
  // Initialize Firebase
 firebase.initializeApp(firebaseConfig); 
/* const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);  */

  // Paso1 cloud-messaging: promesa donde registramos el service worker
  navigator.serviceWorker.register('notificaciones-sw.js')
  .then(registro => {
    console.log('service worker registrado')
    firebase.messaging().useServiceWorker(registro)
  }).catch(error => {
    console.error(`Error al registrar el service worker => ${error}`)
  })

  // Paso2 cloud-messaging: Registrar credenciales para hace la relacion de esta app
  const messaging = firebase.messaging() //obtener instancia de messaging

  // Paso3 cloud-messaging: Registramos la LLave publica de messaging del proyecto en firebase
  messaging.usePublicVapidKey(
    'BAXVFmmO2FSOFZq49AI_0lrGP5WrB5jgN_VnPMZlGGhiQZAv0TmlymyAAqXKbIUpTzw-CnFVOEC6-IIFKdSjRWs'
  )

  // Paso 4 cloud-messaging: Solicitar permisos para las notificaciones y registrar nuestro token a firebase
  messaging.requestPermission()
  .then(() => {
    console.log("Permiso otorgado")
    return messaging.getToken()
  }).then(token => {
    const db = firestore.firestore() //crear instancia firestore
    db.settings({timestampsInSnapshots:true})
    db.colletion('tokens').doc(token).set({
      token: token
    }).catch(error => {
      console.error(`Error al registrar el token en la BD => ${error}`)
    })
  })

  // TODO: Recibir las notificaciones cuando el usuario esta foreground
  // TODO: Recibir las notificaciones cuando el usuario esta background

  // habilitamso la funcion para que la escuche
  const post = new Post()
  post.consultarTodosPost()

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
    const post = new Post()
    post.consultarTodosPost();   
  })

  $('#btnMisPost').click(() => {
    const user = firebase.auth().currentUser//Obtener el usuario que esta autenticado
    if (user) {
      const post = new Post() //crear una instancia
      post.consultarPostxUsuario(user.email)//llamamos a la funcion pasado el email del usuario
      $('#tituloPost').text('Mis Posts')

    } else {
      Materialize.toast(`Debes estar autenticado para ver tus posts`, 4000)    
    }
  })
})

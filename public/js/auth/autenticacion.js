class Autenticacion {
  autEmailPass (email, password) {
    //$('#avatar').attr('src', 'imagenes/usuario_auth.png')
    //Materialize.toast(`Bienvenido ${result.user.displayName}`, 5000)
    //$('.modal').modal('close')
   
  }

  crearCuentaEmailPass (email, password, nombres) {
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(result =>{
        //actualizar el nombre con el que el digitó
        result.user.updateProfile({
          displayName : nombres
        })

        //boton de continuar en firebase para que lo redireccione
        const configuracion = {
          url : 'http://localhost:5500/public/index.html'
        }

        //firebase lanza un correo para verificar y le pasamos la direccion
        result.user.sendEmailVerification(configuracion)
        .catch( error => {
          console.error(error) 
            Materialize.toast(error.message, 4000) //error en el mensaje y dure 4s
        })

        //evita que firebase guarde el inicio, para que guarde despues de la verificación
        firebase.auth().signOut()

        //mensaje de bienvenida
        Materialize.toast(
          `Bienvenido ${nombres}, debes realizar el proceso de verificación`,
          4000
        )
        //cerrar la ventana
        $('.modal').modal('close')
    })
    .catch( error => {
      console.error(error) 
        Materialize.toast(error.message, 4000) //error en el mensaje y dure 4s
    })
    
  }

  authCuentaGoogle () {
    //$('#avatar').attr('src', result.user.photoURL)
    //$('.modal').modal('close')
    //Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
  }

  authCuentaFacebook () {
    //$('#avatar').attr('src', result.user.photoURL)
    //$('.modal').modal('close')
    //Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
  }

  authTwitter () {
    // TODO: Crear auth con twitter
  }
}
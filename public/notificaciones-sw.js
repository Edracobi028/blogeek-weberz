importScripts('https://www.gstatic.com/firebasejs/5.5.8/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/5.5.8/firebase-messaging.js')

//declaramos las variables que necesitamos para el service worker
firebase.initializeApp({
    projectId: "blogeek-webeerz",
    messagingSenderId: "830737070776",
})

const messaging = firebase.messaging() //crear instancia

//funcion que notifica
messaging.setBackgroundMessageHandler(payload => {
    const tituloNotificacion = 'Ya tenemos un nuevo post'
    const opcionesNotificacion = {
        body: payload.data.titulo,
        icon: 'icons/icon_new_post.png',
        click_action: "https://blogeek-webeerz.firebaseapp.com"
    }
    //mostrar la notificacion
    return self.registration.showNotification(
        tituloNotificacion,
        opcionesNotificacion
    )
})


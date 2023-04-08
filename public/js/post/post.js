class Post {
  constructor () {
      // TODO inicializar firestore y settings
      
        this.db = firebase.firestore() //crear variable para definir la instancia de firebase
        //recuperar los valors datetime como timestamp
        const settings = { timestampsInSnapshots : true}
        this.db.settings(settings)

  }

  crearPost (uid, emailUser, titulo, descripcion, imagenLink, videoLink) {
    //insertamos a la base de datos
    return this.db
        .collection('posts')
        .add({
            uid : uid,
            autor : emailUser,
            titulo : titulo,
            descripcion : descripcion,
            imagenLink : imagenLink,
            videoLink : videoLink,
            fecha: firebase.firestore.FieldValue.serverTimestamp()  
        })
        .then(refDoc =>{
            console.log(`Id del post => ${refDoc.id}`) //error imprimiendo el id
        }).catch(error =>{
            console.error(`Error creando el post => ${error}`)
        })
  }

  consultarTodosPost () {
    //onSnapshot informa cualquier cambio que sufra la coleccion y guardamos en la variable querySnapshot para manipular
    this.db.collection('posts')
        .orderBy('fecha','asc')
        .orderBy('titulo','asc')
        .onSnapshot(querySnapshot => {
        $('#posts').empty()//eliminamos los post para volverlos a mostrar
        if(querySnapshot.empty){
            $('#posts').append(this.obtenerTemplatePostVacio()) //si no tiene posts obtener plantilla de post vacia
        }else{
            //mostrar todo los posts
            querySnapshot.forEach(post => {
                let postHtml = this.obtenerPostTemplate(
                    //enviar informacion
                    post.data().autor,
                    post.data().titulo,
                    post.data().descripcion,
                    post.data().videoLink,
                    post.data().imagenLink,
                    Utilidad.obtenerFecha(post.data().fecha.toDate())//dar formato de fecha
                )
                $('#posts').append(postHtml) //agregarlo a los posts
            })
        }
    })
  }

  consultarPostxUsuario (emailUser) {
    //onSnapshot informa cualquier cambio que sufra la coleccion y guardamos en la variable querySnapshot para manipular
    this.db
        .collection('posts')
        .orderBy('fecha', 'asc')
        .where('autor', "==", emailUser ) //filtro
        .onSnapshot(querySnapshot => {
        $('#posts').empty()//eliminamos los post para volverlos a mostrar
        if(querySnapshot.empty){
            $('#posts').append(this.obtenerTemplatePostVacio()) //si no tiene posts obtener plantilla de post vacia
        }else{
            //mostrar todo los posts
            querySnapshot.forEach(post => {
                let postHtml = this.obtenerPostTemplate(
                    //enviar informacion
                    post.data().autor,
                    post.data().titulo,
                    post.data().descripcion,
                    post.data().videoLink,
                    post.data().imagenLink,
                    Utilidad.obtenerFecha(post.data().fecha.toDate())//dar formato de fecha
                )
                $('#posts').append(postHtml) //agregarlo a los posts
            })
        }
    })
  }

  obtenerTemplatePostVacio () {
    return `<article class="post">
      <div class="post-titulo">
          <h5>Crea el primer Post a la comunidad</h5>
      </div>
      <div class="post-calificacion">
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-vacia" href="*"></a>
      </div>
      <div class="post-video">
          <iframe type="text/html" width="500" height="385" src='https://www.youtube.com/embed/bTSWzddyL7E?ecver=2'
              frameborder="0"></iframe>
          </figure>
      </div>
      <div class="post-videolink">
          Video
      </div>
      <div class="post-descripcion">
          <p>Crea el primer Post a la comunidad</p>
      </div>
      <div class="post-footer container">         
      </div>
  </article>`
  }

  obtenerPostTemplate (
    autor,
    titulo,
    descripcion,
    videoLink,
    imagenLink,
    fecha
  ) {
    if (imagenLink) {
      return `<article class="post">
            <div class="post-titulo">
                <h5>${titulo}</h5>
            </div>
            <div class="post-calificacion">
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-vacia" href="*"></a>
            </div>
            <div class="post-video">                
                <img id="imgVideo" src='${imagenLink}' class="post-imagen-video" 
                    alt="Imagen Video">     
            </div>
            <div class="post-videolink">
                <a href="${videoLink}" target="blank">Ver Video</a>                            
            </div>
            <div class="post-descripcion">
                <p>${descripcion}</p>
            </div>
            <div class="post-footer container">
                <div class="row">
                    <div class="col m6">
                        Fecha: ${fecha}
                    </div>
                    <div class="col m6">
                        Autor: ${autor}
                    </div>        
                </div>
            </div>
        </article>`
    }

    return `<article class="post">
                <div class="post-titulo">
                    <h5>${titulo}</h5>
                </div>
                <div class="post-calificacion">
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-vacia" href="*"></a>
                </div>
                <div class="post-video">
                    <iframe type="text/html" width="500" height="385" src='${videoLink}'
                        frameborder="0"></iframe>
                    </figure>
                </div>
                <div class="post-videolink">
                    Video
                </div>
                <div class="post-descripcion">
                    <p>${descripcion}</p>
                </div>
                <div class="post-footer container">
                    <div class="row">
                        <div class="col m6">
                            Fecha: ${fecha}
                        </div>
                        <div class="col m6">
                            Autor: ${autor}
                        </div>        
                    </div>
                </div>
            </article>`
  }
}

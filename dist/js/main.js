// Get a reference to the database service
var database = firebase.database();
var loader = document.getElementById("loader");

//escribir datos
function writeData(name, email, title, content) {
    firebase.database().ref('blog/').push({
        username: name,
        email: email,
        title: title,
        content: content
    });
}

// writeData("Benji", "benji@gmail.com", "Mi primer Post", "Este es el contenido de mi primer post");
// writeData("Benji", "benji@gmail.com", "Mi primer Post", "Este es el contenido de mi primer post");

function readData() {
    var starCountRef = database.ref('blog');
    starCountRef.on('value', function (snapshot) {
        // console.log(snapshot);
        loader.style.display = "none";
        render(snapshot);
    });
}
readData();

function render(blog) {
    var listBlog = document.getElementById("blog");
    listBlog.innerHTML = "";
    blog.forEach(function (data) {
        // console.log(data.val().title);
        listBlog.innerHTML += "<div class='card border-dark mb-3' style='max-width: 18rem;'>" +
                                    "<div class='card-header'>" + data.val().title + "</div>" +
                                    "<div class='card-body text-dark'>" +
                                        "<p class='card-text text-info'>" + data.val().content + "</p>" +
                                            '<button type="button" onclick="openModal(\'' + data.key + '\')" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">' +
                                            "Editar </button>" +
                                        '<button class="btn btn-danger" onclick="deleteData(\'' + data.key + '\')">Borrar</button>' +
                                    "</div>" +
                                "</div>"
    });

}

function saveData() {
    var title = document.getElementById("titulo");
    var content = document.getElementById("contenido");

    this.writeData("Benji", "benji@gmail.com", title.value, content.value);
    $.notify({
        title: "Dato almacenado",
        message: ":D",
        timer: 100
    })
    title.value = "";
    content.value = "";
}

function deleteData(id){
    database.ref('blog/' + id).remove();
    $.notify({
        title: "Dato borrado",
        message: ":(",
        timer: 100
    })
}

function openModal(id){
    var title = document.getElementById("edtTitulo");
    var contenido = document.getElementById("edtContenido");

    var starCountRef = database.ref('blog/' + id);
    starCountRef.on('value', function (snapshot) {
         console.log(snapshot.val());
         title.value = snapshot.val().title;
         contenido.value = snapshot.val().content;
         key.value = id
    });

}

function editData(){
    var title = document.getElementById("edtTitulo");
    var contenido = document.getElementById("edtContenido");
    var key = document.getElementById("key");

    firebase.database().ref('blog/' + key.value).set({
        username: 'Pablo',
        email: 'Pablo@gmail.com',
        title: title.value,
        content: contenido.value
    });

    $('#exampleModal').hide(true)
}

// function writeUserData(userId, name, email, imageUrl) {
//     firebase.database().ref('blog/' + userId).set({
//         username: name,
//         email: email,
//         profile_picture: imageUrl
//     });
// } 
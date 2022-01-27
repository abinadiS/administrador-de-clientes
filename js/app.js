(function(){
    let DB;
    document.addEventListener('DOMContentLoaded', () =>{
        crearDB();
    })

    //Crea la base de datos
    function crearDB(){
        const crearDB = window.indexedDB.open('crm', 1);

        crearDB.onerror = function(){
            console.log('hubo un error')
        }
        crearDB.onsuccess = function(){
            //si la base de datos se crea exitosamente se va a asignar a DB
            DB = crearDB.result;

        }

        crearDB.onupgradeneeded = function(e){
            const db = e.target.result;
            
            const objectStore = db.createObjectStore('crm', {keyPath : 'id', autoIncrement: true});

            objectStore.createIndex('nombre', 'nombre', {unique:false});
            objectStore.createIndex('email' , 'email' , {unique:true});
            objectStore.createIndex('telefono', 'telefono', {unique:false});
            objectStore.createIndex('empresa', 'empresa', {unique:false});
            objectStore.createIndex('id', 'id', {unique:true});
            
        }
    }
}());


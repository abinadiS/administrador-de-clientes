(function(){
    let idCliente;

    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const telefonoInput = document.querySelector('#telefono');
    const empresaInput = document.querySelector('#empresa');
    const formulario = document.querySelector('#formulario')
    document.addEventListener('DOMContentLoaded', ()=>{ 
        conectarDB();
        formulario.addEventListener('submit', actualizarCliente);
        const parametrosURL = new URLSearchParams(window.location.search);
        idCliente = parametrosURL.get('id');
        if(idCliente){
            setTimeout(() => {
                 obtenerCliente(idCliente);
            }, 100);
           
        }
    });
    function conectarDB(){
        const abrirConexion = window.indexedDB.open('crm', 1);

        abrirConexion.onerror = function(){
            console.log("HUBO UN ERROR")
        }
        abrirConexion.onsuccess = function(){
          DB = abrirConexion.result;
            
        }
    }
    function actualizarCliente(e){
        e.preventDefault();
        if(nombreInput.value === '' || emailInput.value === '' || (telefonoInput.value === '') || empresaInput.value === ''){
            console.log("ERROR");
            return;
        }

        //Actualizar cliente
        const clienteActualizado = {
            nombre : nombreInput.value,
            email: emailInput.value,
            empresa: empresaInput.value,
            telefono: telefonoInput.value,
            id : Number(idCliente)
        }
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');
        objectStore.put(clienteActualizado);

        transaction.oncomplete = function(){
            console.log("Editado correctamente");
        }
        transaction.onerror = function(){
            console.log("hubo un error");
        }
    }
    function obtenerCliente(id){
       const transaction = DB.transaction(['crm'], 'readwrite');
       const objectStore = transaction.objectStore('crm');
       const cliente = objectStore.openCursor();
       cliente.onsuccess = function(e){
           const cursor = e.target.result;

           if(cursor){
               
               if(cursor.value.id === Number(id)){
                llenarFormulario(cursor.value);
               }
               cursor.continue();
           }
       }
    }

    function llenarFormulario(datosClientes){
        const {nombre, email, telefono, empresa} = datosClientes;
        nombreInput.value = nombre;
        emailInput.value = email;
        empresaInput.value = empresa;
        telefonoInput.value = telefono;


    }
}());
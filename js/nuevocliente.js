(function(){
    
    const formulario = document.querySelector('#formulario');



    document.addEventListener('DOMContentLoaded', () => {
        conectarDB();
        formulario.addEventListener('submit', validarCliente);
    })

  
    function validarCliente(e){
        e.preventDefault();
        // leer todos los inputs y validar

        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if(nombre === '' || email === '' || (telefono === '') || empresa === ''){
            imprimirAlerta('Todos los campos son obligatorios','error');
            return;
        }

        //OBject literal en 
        const cliente = {
            nombre,
            email,
            telefono,
            empresa
        
        }
        cliente.id= Date.now();
        formulario.reset();
        crearNuevoCliente(cliente);
    }
    function crearNuevoCliente(cliente){
        
        const transaction = DB.transaction(["crm"], 'readwrite');
        const objectStore = transaction.objectStore('crm');

        objectStore.add(cliente);

        transaction.onerror = () =>{
            imprimirAlerta('Hubo un error');
        }
        transaction.oncomplete = () =>{
            imprimirAlerta('Agregado exitosamente');
            setTimeout(()=> {
                window.location.href = 'index.html';
            }, 2000);
        }
    }


        


















}());
//crear la conexion 

const form = document.querySelector('form');
const inputPseudo = document.getElementById('pseudo');
const inputScore = document.getElementById('score');
const btnSubmit = document.getElementById('btn_add');
const stats = document.getElementById("stats");
const list = document.querySelector('ul');

// Création container db
let db;

window.onload = () => {
    let request = window.indexedDB.open('catch_it', 1); // creation db name
    
    request.onerror = () => {
        console.log('Database failed to open');
    };
    request.onsuccess = () => {
        console.log('Database opened successfully');
       
        db = request.result; // Stocke la base de données ouverte dans la variable db
    };

    request.onupgradeneeded = (e) => {
        let db = e.target.result;
        let table = db.createObjectStore('player', {keyPath: 'id', autoIncrement:true});

        // creations fields belongs to table 
        table.createIndex('pseudo', 'pseudo', {unique: true});
        table.createIndex('score', 'score', {unique: false});

        console.log('Database setup complete');
    };

    form.onsubmit = addData;

    function addData(e){
        e.preventDefault();

        let newItem = { pseudo: inputPseudo.value, score: inputScore.value};
        let transaction = db.transaction(["player"], 'readwrite');

        let table = transaction.objectStore('player');

        var request = table.add(newItem);
        request.onsuccess = () => {
            inputPseudo.value = "";
            inputScore.value = "";
        }
        transaction.oncomplete = function() {
            console.log('Transaction completed: database modification finished.');
        }     
        transaction.onerror = function() {
            console.log('Transaction not opened due to error');
          }; 
    }

    stats.addEventListener('click',


    function display(){

        while (list.firstChild) {
            list.removeChild(list.firstChild);
          }

        let objectStore = db.transaction('player').objectStore('player');
        objectStore.openCursor().onsuccess = (e) => {
            // Récupère une référence au curseur
            let cursor = e.target.result;
            
            // S'il reste des entrées sur lesquelles itérer, on exécute ce code
            if(cursor){
                let listItem = document.createElement('li');
                let h3 = document.createElement('h3');
                let para = document.createElement('p');

                listItem.appendChild(h3);
                listItem.appendChild(para);
                list.appendChild(listItem);

                h3.textContent = cursor.value.pseudo;
                para.textContent = cursor.value.score;

                listItem.setAttribute('data-note-id', cursor.value.id);
                cursor.continue();
            }else{

                if(!list.firstChild) {
                    let listItem = document.createElement('li');
                    listItem.textContent = 'No notes stored.';
                    list.appendChild(listItem);
                  }
                  console.log('Notes all displayed');
            }
            
        }
    }
    )
}


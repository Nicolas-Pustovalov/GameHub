// "appeler" les dépendances nécessaires
const express = require('express');
const router = require('./router');
const games = require('./games.json');


const app = express();


app.use((request, response, next) => {

    response.toto = 123;
    next();
});

app.use((request, response, next) => {

    next();
});

app.use((request, response, next) => {

    response.setHeader('HeaderDemo', "truc bidon");
    next();
});

app.use((request, response, next) => {

    app.locals.gameList = games;
    // on passe au middleware suivant
    next();
});


app.use((request, response, next) => {
    const adressABloquer = "168.45.48.78";


    const ip = request.ip;



    if (adressABloquer === ip) {
        response.status(403); 
        response.send("Arrête de nous embêter, passe ton chemin, brigand !")
    } else {

        next();
    }
});


app.set('view engine', 'ejs');

app.set('views', __dirname + "/views");

app.use(express.static(__dirname + "/public"));


app.use(express.urlencoded({ extended: true }));


app.use((request, response, next) => {

    const dateDuJour = new Date().toISOString();
    console.log("La date de la requête = " + dateDuJour);
    // l'ip du client
    console.log("L'ip du client = " + request.ip);
    // le chemin :
    console.log('Le chemin =' + request.path);
    next();
})


app.use(router);

// lancer l'application
const port = 3000;
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});

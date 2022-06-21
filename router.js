
const express = require('express');
const router = express.Router();
const games = require('./games.json');


router.get('/', (request, response) => {
    response.setHeader('HeaderRouter', "router slash");

    response.render('index');
});


router.get('/game/:nomDuJeu', (request, response, next) => {

    const requestedGame = request.params.nomDuJeu;

    // on veut retrouver dans la liste des jeux, le jeu dont le nom correspond à celui passé en paramètre (requestedGame)
    let foundGame;
    for (const game of games) {
        if (game.name === requestedGame) {
            foundGame = game;
        }
    }
    if (foundGame) {
        response.render(foundGame.name, { cssSpecific: foundGame.cssFile });
    } else {
        next();
    }
});

// FORMULAIRE DE RECHERCHE :
router.get('/recherche', (request, response) => {

    // je range le mot recherché dans une variable
    const searchWord = request.query.keyword;
    
    const filteredGames = games.filter((game) => {
        const title = game.title.toLowerCase();
        const searchWordLowerCase = searchWord.toLowerCase();
        return title.includes(searchWordLowerCase);
    })

    console.log(filteredGames);


    response.render('search', { results: filteredGames });
})

router.post('/login', (request, response) => {

    console.log(request.body);

    const login = request.body.login;
    const pwd = request.body.password;
    let isLogged = false;

    if (login === "Flore-Oclock" && pwd === "cornichon") {

        isLogged = true;
    } else {

        isLogged = false;
    }
    
    response.render('welcome', {
        isLogged,
        login
    })

})

router.use((request, response, next) => {

    response.status(404);
   
    response.render('404.ejs'); 
});


module.exports = router;
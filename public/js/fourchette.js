
var max = 500; 


var searchedNumber = Math.round(Math.random() * max);


var attempt = 1;


while (enteredNumber !== searchedNumber) {

    if ( isNaN(enteredNumber) ) {
        break;
    }

    

    if (enteredNumber < searchedNumber) {
        enteredNumber = parseInt(prompt('C\'est plus'));
    }
    // S'il a saisi un nombre plus petit on lui indique que c'est moins
    else {
        enteredNumber = parseInt(prompt('C\'est moins'));
    }

    attempt += 1;
}


if (enteredNumber == searchedNumber) {

    alert('Bravo ! C\'était bien ' + searchedNumber + ' - Nombre d\'essais : ' + attempt);
} else {
    // on prévient l'utilisateur qu'il a abandonné
    alert('Abandon après ' + attempt + ' essais. Dommage !');
}

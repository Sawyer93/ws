var view = {
    displayMessege: function (msg) {
        var messege = document.querySelector('body div#messeg');
        messege.innerHTML = msg;
    },
    displayHit: function (location) {
        var element = document.getElementById(location);
        element.setAttribute('class', 'hit');
    },
    displayMiss: function (location) {
        var element = document.getElementById(location);
        element.setAttribute('class', 'miss');
    }

};

var model = {
    shipLenght: 3,
    gameBoard: 7,
    numShips: 3,
    shipSunk: 0,
    ships: [
        ship1 = { place: [0, 0, 0], hits: ['', '', ''] },
        ship2 = { place: [0, 0, 0], hits: ['', '', ''] },
        ship3 = { place: [0, 0, 0], hits: ['', '', ''] }
    ],
    fire: function (guess) {
        for (var n = 0; n < this.numShips; n++) {
            var ship = this.ships[n];
            var index = ship.place.indexOf(guess);
            if (index >= 0) {
                view.displayMessege('HIT!!!');

                ship.hits[index] = 'hit';
                view.displayHit(guess);
                if (this.isSunk(ship)) {
                    view.displayMessege('You sunk my battleship!');
                    this.shipSunk++;
                }

                return true;

            }


        }
        view.displayMessege('MISSED!');
        view.displayMiss(guess)
        return false;
    },

    isSunk: function (ship) {
        for (var i = 0; i < this.shipLenght; i++) {
            if (ship.hits[i] !== 'hit') {
                return false;
            }
        }
        return true;
    },

    generationShipLocations: function(){
        var locations;
        for(var i=0;i<this.numShips;i++){
            do {locations=this.generateShip();
        }while(this.colision(locations)){
        this.ships[i].place=locations;
        }
    }



    },
    generateShip: function(){
        var direction= Math.floor(Math.random()*2);
        var col, row;
        if(direction === 1){
            row=Math.floor(Math.random()*this.gameBoard);
            col=Math.floor(Math.random()*(this.gameBoard - this.shipLenght +1));
        }else{
            row=Math.floor(Math.random()*(this.gameBoard - this.shipLenght +1));
            col=Math.floor(Math.random()*this.gameBoard);
        }

        var newShipLocations = [];
        for(var i=0;i<this.shipLenght;i++){
            if(direction===1){
            newShipLocations.push(row+""+(col+i));
            }else{
                newShipLocations.push((row+i)+""+col);
            }

        }
        return newShipLocations;

    },

    colision: function (locations){
        for(var i=0; i<this.numShips;i++){
            var ship= this.ships[i];
            for(var j=0; j<this.shipLenght; j++){
                if(ship.place.indexOf(locations[j])>=0){
                    return true;
                }
            }
        }
        return false;
    }

    
}
var controller = {
    allGuess: 0,
    proccesGuess: function(guess){
        var location = parceGuess(guess);
        if(location){
            this.allGuess++;
            var hit= model.fire(location);
            if(hit && model.shipSunk === model.numShips){
                view.displayMessege('You Win! for '+ this.allGuess +' shoots');
            }
        }


    }
    
}

function parceGuess(guess) {
    var chars = ["A", "B", "C", "D", "E", "F", "G"];
    if (guess === null || guess.length !== 2) {
        alert('Вы ввели не корректные координаты!');
    } else {
        firstChar = guess.charAt(0);
        var row = chars.indexOf(firstChar);
        var column = guess.charAt(1);
        if (isNaN(row) || isNaN(column)){
            alert('Вы ввели не корректные координаты!')
        } else if (row < 0 || row >= model.gameBoard || column < 0 || column >= model.gameBoard) {
            alert('Вы ввели не корректные координаты!');
            
        } else {
            return row + column;
        }
            
    }
    return false;
    }
    
    function init(){
        var fireButton= document.getElementById('fireButton');
        fireButton.onclick= hendelFireButton;
        var textInput= document.getElementById('guessInput');
        textInput.onkeypress= hendelKeyPress;
        model.generationShipLocations();
    }

    function hendelFireButton(){
        var input= document.getElementById('guessInput');
        var finput= input.value;
        controller.proccesGuess(finput);
        input.value="";

    }
    function hendelKeyPress(e){
        var fireButton= document.getElementById('fireButton');
        if(e.keyCode===13){
            fireButton.click();
            return false;
        }


    }
    

    window.onload=init;

    






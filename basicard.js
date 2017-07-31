var fs = require("fs");
var inquirer = require("inquirer");
var input2 = process.argv[3].toLowerCase();
var input3 = process.argv[4];
var input4 = process.argv[5];


function basicFunction(){

    if (input2 == "random" && input4 === undefined){
        function NewCard(front, back) {
            this.front;
            this.back;
        }

        fs.readFile("log.txt", "utf8", function(err, data){
            if(err){

                console.log(err);
            } else {

                var cardArr = JSON.parse(data);

                var printCounter = 0;

                function printCount (){

                    if (printCounter <= cardArr.length) {
                        printFront();
                        printCounter++;
                        setTimeout(function(){ printCount() }, 6000);
                    }
                };
                
                function printFront() {

                    var randomCard = Math.floor(Math.random() * (cardArr.length));
                    console.log(" ");
                    console.log("------------------");

                    console.log("Front: " + cardArr[randomCard].front);
                    setTimeout(function() { console.log("Back: " + cardArr[randomCard].back) }, 5000);
                    setTimeout(function() { console.log("--------------------"), console.log(" ") ,cardArr.splice(randomCard, 1); }, 5100);
                };

                printCount();
            }
        });

    } else if  (input2 === "first-add" && input4 === undefined){

        var count = 0;
        var cardArr = [];

        function NewCard(front, back) {

            this.front = front;
            this.back = back;
        }

        var newInfo = function(){

            if (count < parseInt(input3)) {
                inquirer.prompt([{
                    name: "front",
                    message: "What is the first flashcard?"
                }, {
                    name: "back",
                    message: "What's the answer?"
                }]).then(function(answers){
                    
                    var card = new NewCard(answers.front, answers.back);
                    cardArr.push(card);
                    count++;

                    getInfo();
                });
            } else {

                fs.appendFile("log.txt", JSON.stringify(cardArr), function(err){

                    if(err) {
                        console.log(err);
                    }
                });
            };
        };

        newInfo();
    } else if (input2 === "read"  && input3 === "front") {

        var index = parseInt(input4) - 1;

        var printFront = function() {

            fs.readFile("log.txt", "utf8", function(err, data) {

                if (err) {

                    console.log(err);
                } else {

                    var parsed = JSON.parse(data);
                    console.log(" ");
                    console.log("------------------");
                    console.log("Front: " + parsed[index].front);
                    console.log("------------------");
                    console.log(" ");

                }
            });
        };

        printFront();

    } else if (input2 === "read" && input3 === "back") {

        var index = parseInt(input4) - 1;

        var printBack = function() {

            fs.readFile("log.txt", "utf8", function(err, data) {

                if (err) {

                    console.log(err);
                } else {

                    var parsed = JSON.parse(data);
                    console.log(" ");
                    
                    console.log("Back: " + parsed[index].back);
                    
                    console.log(" ");

                }
            });
        };

        printBack();

    } else {

        console.log("This is not a valid command! Please try again.");
    };

};

module.exports = basicFunction;
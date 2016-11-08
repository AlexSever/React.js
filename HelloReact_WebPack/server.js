var express = require('express');

// Create our app
var app = express();

app.use(express.static('public'));
// app.use(express.static(__dirname + "/public"));

/*
function Dog (breed) {
    this.breed = breed;
}

var buddy = new Dog ("Puppy");
Dog.prototype.bark = function() {
    console.log("woof");
}
buddy.bark();
*/

app.listen(3000, function() {
    console.log("Express server is up on port 3000");
});
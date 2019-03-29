var canvas = document.querySelector('canvas');
var context = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

var sprites = document.getElementById("sprites");
var frames = sprites.getElementsByTagName("img");
var objects = [];

// test objects
for (var i = 0; i < frames.length; i++) {
    var x = Math.random() * 600;
    var y = Math.random() * 400;
    objects.push([x, y, frames[i]]);
}
objects.push([150, 170, "Text"]);
render(objects);


function clipStart(){
    // Initiate Clip
    
    // Run Clip
    clip()
}

function levelStart(){
    // Inititate Level
    
    // Run Level
    level()
}

function clip(){
    // Stays on clip until a change happens
    if (true){clip}
    else{levelStart}
}

function level(){
    // Stays on level until a change happens
    if (true){level}
    else{clipStart}
}


function render(objects) {
    objects.forEach(function(object) {
        if (typeof object[2] == "object") {
            context.drawImage(object[2], object[0], object[1]);
        }
        else if (typeof object[2] == "string") {
            context.fillText(object[2], object[0], object[1]);
        }
    })
}

clipStart();

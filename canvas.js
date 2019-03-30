var canvas = document.querySelector('canvas');
var context = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

var objects = [];

function load(){
    var sprites = document.getElementById("sprites");
    var frames = sprites.getElementsByTagName("img");

}

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

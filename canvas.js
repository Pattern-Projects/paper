var canvas = document.querySelector('canvas');
var context = canvas.getContext("2d");
context.textStyle = "black";
canvas.width = 600;
canvas.height = 400;
window.addEventListener('keydown', this.keyDown, false);




// Debug Features
var shownames = true;
var fps = 30;

var scenes = [];
var input = {};
var scene = {};
var sceneNum = 0;
var fire = false;

function load() { //Loads in items from HTML
    // Collect all info from HTML
    var HTMLscenes = document.getElementsByTagName("scene");
    for (var i = 0; i < HTMLscenes.length; i++) {
        var scene = {};
        var beatsArray = [];
        scene.type = HTMLscenes[i].getAttribute("type");
        var beats = HTMLscenes[i].getElementsByTagName("beat");
        for (var i = 0; i < beats.length; i++) {
            var beat = {};
            var objectsArray = []; 
            beat.spriteLength = beats[i].getAttribute("spriteLength");
            var objects = beats[i].getElementsByTagName("object");
            for (var j = 0; j < objects.length; j++) {
                var object = {};
                object.x = parseInt(objects[j].getAttribute("x"), 16);
                object.y = parseInt(objects[j].getAttribute("y"), 16);
                object.name = objects[j].getAttribute("name");

                var sprites = objects[j].getElementsByTagName("img");
                object.sprites = sprites;
                objectsArray.push(object);
            }
            beat.objects = objectsArray;
            beatsArray.push(beat);
            
        }
        scene.beats = beatsArray;
        scenes.push(scene);
    }
    nextScene();
}

function nextScene() { // Initiate Scene
    scene = scenes[sceneNum];
    sceneNum++;
    action(); // Run Scene
}

var beat = 0; //Here for now
var sprite = 0;

async function action() { //Runs the scene
    var renders = [];
    var beats = scene.beats;
    var thisBeat = beats[beat];     //Issue retrieving beat at beats[beats.length] Issue exists in load
    var objects = thisBeat.objects;
    await getInput();
    
    

    sprite++;
    if (sprite >= thisBeat.spriteLength) {
        sprite = 0;
    }
    
    //Sprite index
    objects.forEach(function(object) {
        var si = parseInt(sprite / (thisBeat.spriteLength / object.sprites.length), 16);
        if(object.sprites[si].src != "")
        {
        var item = [];
        item.push(object.sprites[si]);
        item.push(object.x);
        item.push(object.y);
        item.push(object.name);
        renders.push(item);
        }
        else{
            beat++;
            sprite = 0;
        }
    });
    render(renders);

    //Need to detect button press
    //When pressed advance to next beat
    function getInput(){
    
    if (!input[38]){
        fire = false;
    }
    
    if (input[38]){
        if (!fire){
        fire = true;
        // Key Press Detected
        beat++;
        sprite = 0;
        }
    }
    
    }

    //Loop beats when too high    
    if (beat >= beats.length){
        beat = 0;
    }

    // Stays on clip until a change happens
    if (true) { setTimeout(function() { action() }, 1000 / fps) }
    else { nextScene }
    // When Button pressed
    // beat++;

}

function render(renders) { //Renderer
    context.clearRect(0, 0, canvas.width, canvas.height); //Clear Screen
    renders.forEach(function(item) { //For each item in renders array
        if (typeof item[0] == "object") { //If object, render image
            context.drawImage(item[0], item[1], item[2]);
            if (shownames) {
                context.fillText(item[3], item[1], item[2]);
            }
        }
        else if (typeof item[0] == "string") { //If string, render string
            context.fillText(item[0], item[1], item[2]);
        }
    });
}

function keyDown(e) {
    var code = e.keyCode;
    document.onkeydown = function() {
        input[e.keyCode] = true;
    }
    document.onkeyup = function() {
        input[e.keyCode] = false;
    }
}

window.onload = function() { load() }; //Run program after page loads

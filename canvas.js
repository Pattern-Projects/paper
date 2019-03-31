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
    for (var i = 0; i < HTMLscenes.length; i++) {                       //Every scene in document
        var scene = {};
        var beatsArray = [];
        scene.type = HTMLscenes[i].getAttribute("type");
        var beats = HTMLscenes[i].getElementsByTagName("beat");
        for (var j = 0; j < beats.length; j++) {                        //Every beat in scene
            var beat = {};
            var objectsArray = [];
            beat.spriteLength = beats[j].getAttribute("spriteLength");
            var objects = beats[j].getElementsByTagName("object");
            for (var k = 0; k < objects.length; k++) {                  //Every object in beat
                var object = {};
                object.x = parseInt(objects[k].getAttribute("x"), 16);
                object.y = parseInt(objects[k].getAttribute("y"), 16);
                object.name = objects[k].getAttribute("name");

                var sprites = objects[k].getElementsByTagName("img");   //Every sprite in object
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
    if (sceneNum >= scenes.length)
    {
        sceneNum = 0;
    }
    
    action(); // Run Scene
}

var beat = 0; //Here for now
var sprite = 0;

async function action() { //Runs the scene
    var renders = [];
    var beats = scene.beats;
    var thisBeat = beats[beat]; //Issue retrieving beat at beats[beats.length] Issue exists in load
    var objects = thisBeat.objects;

    await getInput();
    //Different inputs responses depending on beat
    //Here..

    //Iterate sprites, loop when too high
    sprite++;
    if (sprite >= thisBeat.spriteLength) {
        sprite = 0;
    }

    //Sprite index
    objects.forEach(function(object) {
        var spriteIndex = parseInt(sprite / (thisBeat.spriteLength / object.sprites.length), 16);
        if (object.sprites[spriteIndex].src != "") {
            var item = [];
            item.push(object.sprites[spriteIndex]);
            item.push(object.x);
            item.push(object.y);
            item.push(object.name);
            renders.push(item);
        }
        else {
            beat++;
            sprite = 0;
        }
    });
    render(renders);

    //detect button press
    //When pressed advance to next beat
    function getInput() {

        if (!input[39]) {
            fire = false;
        }

        if (input[39]) {
            if (!fire) {
                fire = true;
                // Key Press Detected
                beat++;
                sprite = 0;
            }
        }

    }

    //Loop beats when too high    
    if (beat >= beats.length) {
        beat = 0;
        sprite = 0;
        nextScene()
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

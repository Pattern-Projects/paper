var canvas = document.querySelector('canvas');
var context = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

// To test render() create objects[] array and pass to render()
// For now add boolean to obj[3]
// May be a way to tell text and image apart in future
    var sprites = document.getElementById("sprites");
    var frames = sprites.getElementsByTagName("img");
    var objects = [];
    for (var i=0; i < frames.length; i++)
    {
        var x = Math.random()*600;
        var y = Math.random()*400;
        objects.push([x, y, frames[i], true]);
            console.log(objects);
    }
    objects.push([150, 170, "Text", false]);
    
    render(objects);

function render(objects){
    objects.forEach(function(object){        
        // Can I detect difference between text and image??
        if (typeof object[2] == "object")
        {
            context.drawImage(object[2], object[0], object[1]);
            console.log(typeof object[2]);  
        }
        else if (typeof object[2] == "string"){
            context.fillText(object[2], object[0], object[1]);
            console.log(typeof object[2]);
        }
    })
}
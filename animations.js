//add mouse interaction to the animation still left


let block;
const trail = [];

function init() {
    const canvas = document.getElementById('animator');
    const ctx = canvas.getContext("2d");

    block = {
        x: 0,
        y: 0,
        width: 8,
        vwidth: 4,
        height: 20,
        vheight: 40,
        dx: 2, //change in x
        dy: 4, //change in y
        edge: "right" //initial edge of movement
    };

    draw(ctx);
}

function draw (ctx) {
    const canvas = ctx.canvas;
    const aspectRatio = canvas.width / canvas.height;
    //clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);



    switch (block.edge) {
        case "right":
            block.x += block.dx;
            if (block.x >= canvas.width - block.width / 2) {
                block.edge = "down";
                block.y += block.dy;
                
            }
            break;
        case "down":
            block.y += block.dy;
            if (block.y >= canvas.height - block.height /2) {
                block.edge= "left";
                block.x -= block.dx;
            }
            break;
        case "left":
            block.x -= block.dx
            if (block.x <= block.width /2) {
                block.edge = "up";
                block.y -= block.dy;
            }
            break;
        case "up":
            block.y -= block.dy;
            if (block.y <= block.height / 2) {
                block.edge= "right";
                block.x += block.dx;
            }
            break;
    }


    const blockHue = (Date.now() / 10) % 360; //modulate hue over literal time

    // Drawing the soft edges

    
    //drawing a trail
    for (const {x, y, color} of trail) {
        ctx.fillStyle = color;
        ctx.fillRect(x - block.width / 2, y - block.height / 2, block.width, block.height);
    }


    //storing trail block pos.
    trail.push({ x: block.x, y: block.y, color: `hsl(${blockHue}, 100%, 50%)`});

    //remove old trail keep only few frames of it
    if (trail.length > 60) {
        trail.shift();
    }
    
    //update fill for block with current color
    const blockColor = `hsl(${blockHue}, 100%, 50%)`
    ctx.fillStyle = blockColor;
    //draw the rectangle
    ctx.fillRect(block.x - block.width / 2, block.y - block.height / 2, block.width, block.height);

    //request next frame
    window.requestAnimationFrame(() => draw(ctx));

}
 init();



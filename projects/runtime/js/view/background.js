var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        
     
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth, canvasHeight,'LightBlue');
            background.addChild(backgroundFill);
            
            sky = draw.bitmap("img/skybackground.jpg");
            sky.x = 0;
            sky.y = 0;
            sky.scaleX = 2.5;
            sky.scaleY = 2.0;
            background.addChild(sky);
            // TODO: 3 - Add a moon and starfield

            for(var i = 0; i < 100; i++){
                var cloud = draw.bitmap("img/cloud.png");
cloud.x = canvasWidth * Math.random();
cloud.y = groundY * Math.random();
cloud.scaleX = 0.075;
cloud.scaleY = 0.075;
background.addChild(cloud);
            }

            var sun = draw.bitmap("img/sun.png");
            sun.x = 1100;
            sun.y = -100;
            sun.scaleX = 1.3;
            sun.scaleY = 1.3;
            background.addChild(sun);

            
            
            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            
            for (var i = 0; i < 5; ++i) {
                var buildingHeight = Math.random()*250;
                var building = draw.bitmap("img/house.png");//draw.rect(75, buildingHeight, "Red", "White", 1);
                building.x = 350 * i;
                building.y = groundY - 360
                background.addChild(building);
                buildings.push(building);
              }
            

            // TODO 4: Part 1 - Add a tree
            sign = draw.bitmap("img/stopsign.png");
            sign.x = 880;
            sign.y = 117;
            sign.scaleX = .7
            sign.scaleY = .7
            background.addChild(sign);
            
        } // end of render function - DO NOT DELETE
        var sign;
        var sky;
        var buildings = [];
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            sign.x = sign.x - 1;

            if (sign.x < -200) {
            sign.x = canvasWidth;
        }
            
            
            // TODO 5: Part 2 - Parallax
        for (var i = 0; i < buildings.length; i++){
            buildings[i].x = buildings[i].x -1;
            if (buildings[i].x < -200) {
                buildings[i].x = canvasWidth;
            }
        }    

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}

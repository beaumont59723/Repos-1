var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 

        // this data will allow us to define all of the
        // behavior of our game
        var groundY = game.groundY;
            
        
        //var levelData = [
          var levelData =  {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 800, "y": groundY },
                { "type": "sawblade", "x": 1400, "y": groundY },
                { "type": "sawblade", "x": 2250, "y": groundY },
                { "type": "bird", "x": 1050, "y": 320},
                { "type": "bird", "x": 1500, "y": 270},
                { "type": "bird", "x": 2500, "y": 320},
                { "type": "enemy", "x": 1350, "y": groundY-25},
                { "type": "enemy", "x": 2000, "y": groundY-25},
                { "type": "reward", "x": 2500, "y": groundY-25}
            ]
        };
        /*{
    name: "Robot Rampage",
    number: 2,
    speed: -3,
    gameItems: [
        { "type": "sawblade", "x": 800, "y": groundY },
        { "type": "sawblade", "x": 1400, "y": groundY },
        { "type": "sawblade", "x": 2250, "y": groundY },
        { "type": "bird", "x": 1050, "y": 320},
        { "type": "bird", "x": 1500, "y": 270},
        { "type": "bird", "x": 2500, "y": 320},
        { "type": "enemy", "x": 1350, "y": groundY-25},
        { "type": "enemy", "x": 2000, "y": groundY-25},
        { "type": "reward", "x": 2500, "y": groundY-25},
    ],
  },
];*/
for(var i = 0; i < levelData.gameItems.length; i++){

    var obj = levelData.gameItems[i];

    var x = obj.x;

    var y = obj.y;

    if(obj.type === "sawblade"){

        createSaw(x, y);

    }

    if(obj.type === "bird"){

        createBird(x, y);

    }

    if(obj.type === "enemy"){

        createEnemy(x, y);

    }

    if(obj.type === "reward"){

        createReward(x, y);

    }

    

}
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE

        function createSaw(x , y){
            var sawHitZoneSize = 23;
            var damageFromSaw = 25;
            var sawHitZone = game.createObstacle(sawHitZoneSize, damageFromSaw);
            sawHitZone.x = x;
            sawHitZone.y = y;
            game.addGameItem(sawHitZone);
            var sawImage = draw.bitmap("img/sawblade.png");
            sawImage.x = -25
            sawImage.y = -25
            sawHitZone.addChild(sawImage);   
        }

        function createBird(x , y){
            var birdHitZoneSize = 15;
            var damageFromBird = 25;
            var birdHitZone = game.createObstacle(birdHitZoneSize, damageFromBird);
            birdHitZone.x = x;
            birdHitZone.y = y;
            game.addGameItem(birdHitZone);
            var birdImage = draw.bitmap("img/realbird.png");
            birdImage.x = -20
            birdImage.y = -15
            birdHitZone.velocityX = -3
            birdHitZone.addChild(birdImage);   
        }
        

        function createEnemy(x, y) {
            var redBox = game.createGameItem("enemy", 25);
            var redSquare = draw.rect(50, 50, "red");
            redSquare.x = -25;
            redSquare.y = -25;
            redBox.addChild(redSquare);
            redBox.x = x
            redBox.y = y
            redBox.velocityX = -1
            game.addGameItem(redBox);
    
            redBox.onPlayerCollision = function (){
                game.changeIntegrity(-10)
            }
    
            redBox.onProjectileCollision = function (){
                game.increaseScore(100);
                redBox.fadeOut();
                
            }
        }

        function createReward(x, y) {
            var reward = game.createGameItem("reward", 25);
            var greenSquare = draw.rect(50, 50, "green");
            greenSquare.x = -25;
            greenSquare.y = -25;
            reward.addChild(greenSquare);
            reward.x = x
            reward.y = y
            reward.velocityX = -1
            game.addGameItem(reward);
    
            reward.onPlayerCollision = function (){
                game.changeIntegrity(-10)
            }
    
            reward.onProjectileCollision = function (){
                game.increaseScore(100);
                reward.fadeOut();
                
            }
        }

            
        // DO NOT EDIT CODE BELOW HERE
    
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
}  
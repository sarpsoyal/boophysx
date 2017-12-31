/* KNOWN ISSUES:
    -> No collision handling. */

function startGame(){
  mainArea.init();
  comp1 = new component(muts.randColor(),
                        muts.rand(10, 25),
                        muts.rand(10, 25),
                        muts.rand(10, 300),
                        muts.rand(10, 300),
                        muts.rand(-6, 6),
                        muts.rand(-6, 6),
                        0,
                        0,
                        true);
  comp2 = new component(muts.randColor(),
                        muts.rand(10, 25),
                        muts.rand(10, 25),
                        muts.rand(10, 300),
                        muts.rand(10, 300),
                        muts.rand(-6, 6),
                        muts.rand(-6, 6),
                        0,
                        0,
                        true);
  comp3 = new component(muts.randColor(),
                        muts.rand(10, 25),
                        muts.rand(10, 25),
                        muts.rand(10, 300),
                        muts.rand(10, 300),
                        muts.rand(-6, 6),
                        muts.rand(-6, 6),
                        0,
                        0,
                        true);
  // ball = new component('black', 30, 30, 0, mainArea.canvas.height/2, 5, 0, 0, 0, true);
  // thing = new component('blue', 50, 50, mainArea.canvas.width/2 + 100, mainArea.canvas.height/2, 0, 0, 0, 0, true);
  floor = new component('black', mainArea.canvas.width, 5, 0, mainArea.canvas.height-5, 0, 0, 0, 0, false);
}

//repeat this every 20ms
function updatemainArea(){
  mainArea.clear();
  for (cmpnt in components){
    components[cmpnt].newPos();
    components[cmpnt].update();
  }
}

//Component array
components = [];

//Component Object
function component(color, width, height, x, y, velX, velY, accX, accY, grav) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.accX = accX;
    this.accY = accY;
    this.grav = grav;
    ctx = mainArea.ctx;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    components.push(this);

    //redraw current state
    this.update = function() {
      ctx = mainArea.ctx;
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.newPos = function() { //calc future position
      //Handle collision
      for (obj in components){
        if (components[obj] != this && doesCollide(this, components[obj])){
          //components[obj].velX = 0;
          //components[obj].velY = 0;
          //components[obj].accX = 0;
          //components[obj].accY = 0;
          this.velX = 0;
          this.velY = 0;
          this.accX = 0;
          this.accY = 0;
        }
      }
      //handle velocity&acceleration
      if (this.grav && !doesCollide(this, floor)){
        this.accY += 0.01; //ITS GRAVITY BOI
      }
      this.velX += this.accX;
      this.velY += this.accY;
      this.x += this.velX;
      this.y += this.velY;
    }
}
//checks wheter two obejcts collide
function doesCollide(obj1, obj2){
  return Math.max(obj1.x, obj1.x + obj1.width) >= Math.min(obj2.x, obj2.x + obj2.width) &&
         Math.min(obj1.x, obj1.x + obj1.width) <= Math.max(obj2.x, obj2.x + obj2.width) &&
         Math.max(obj1.y, obj1.y + obj1.height) >= Math.min(obj2.y, obj2.y + obj2.height) &&
         Math.min(obj1.y, obj1.y + obj1.height) <= Math.max(obj2.y, obj2.y + obj2.height)
}
//game canvas object
var mainArea = {
    canvas : document.getElementById("mainCanvas"),
    init : function() {
        this.canvas.width = 400;
        this.canvas.height = 400;
        this.ctx = this.canvas.getContext("2d");
        //Every 20ms, update frame
        this.interval = setInterval(updatemainArea, 20);
    },
    clear : function() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


startGame();

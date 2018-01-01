function start(){
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

  floor = new component('black', mainArea.canvas.width, 5, 0, mainArea.canvas.height-5, 0, 0, 0, 0, false);
}

//Component array
components = [];

//Component object constructor
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

    //checks wheter two obejcts collide
    this.willCollide = function(other) {
      return Math.max(this.x + this.accX + this.velX, this.x + this.accX + this.velX + this.width) >= Math.min(other.x, other.x + other.width) &&
             Math.min(this.x + this.accX + this.velX, this.x + this.accX + this.velX + this.width) <= Math.max(other.x, other.x + other.width) &&
             Math.max(this.y + this.accY + this.velY, this.y + this.accY + this.velY + this.height) >= Math.min(other.y, other.y + other.height) &&
             Math.min(this.y + this.accY + this.velY, this.y + this.accY + this.velY + this.height) <= Math.max(other.y, other.y + other.height)
    }

    //check for a collision in next frame
    this.collides = function(other) {
      return Math.max(this.x, this.x + this.width) >= Math.min(other.x, other.x + other.width) &&
             Math.min(this.x, this.x + this.width) <= Math.max(other.x, other.x + other.width) &&
             Math.max(this.y, this.y + this.height) >= Math.min(other.y, other.y + other.height) &&
             Math.min(this.y, this.y + this.height) <= Math.max(other.y, other.y + other.height)
    }
    this.newPos = function() { //calc future position
      //Handle collision
      for (obj in components){
        if (components[obj] != this && this.willCollide(components[obj])){
          this.velX = 0;
          this.velY = 0;
          this.accX = 0;
          this.accY = 0;
        }
      }
      //handle velocity&acceleration
      if (this.grav && !this.collides(floor)){
        this.accY += 0.01; //ITS GRAVITY BOI
      }
      this.velX += this.accX;
      this.velY += this.accY;
      this.x += this.velX;
      this.y += this.velY;
    }
}

//game canvas object
var mainArea = {
    canvas : document.getElementById("mainCanvas"),
    init : function() {
        this.canvas.width = 400;
        this.canvas.height = 400;
        this.ctx = this.canvas.getContext("2d");
        //Every 20ms, update frame
        this.interval = setInterval(this.update, 20);
    },
    clear : function() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    //repeat this every 20ms
    update : function() {
      mainArea.clear();
      for (cmpnt in components){
        components[cmpnt].newPos();
        components[cmpnt].update();
      }
    }
}

start();

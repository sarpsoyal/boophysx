//Component array
components = [];

//Component object constructor
function component(color, width, height, density, x, y, velX, velY, unelas, grav, stc) {
    this.width = width;
    this.height = height;
    this.density = density;
    this.mass = (width*height)*density;
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.accX = 0;
    this.accY = 0;
    this.unelas = unelas;
    this.grav = grav;
    this.stc = stc;
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

    //checks for a collision in next frame
    this.collides = function(other) {
      return Math.max(this.x, this.x + this.width) >= Math.min(other.x, other.x + other.width) &&
             Math.min(this.x, this.x + this.width) <= Math.max(other.x, other.x + other.width) &&
             Math.max(this.y, this.y + this.height) >= Math.min(other.y, other.y + other.height) &&
             Math.min(this.y, this.y + this.height) <= Math.max(other.y, other.y + other.height)
    }

    this.collisionUnel = function(other) {
      //calculate momentum values for both objects
      localMomentumX = this.velX * this.mass;
      localMomentumY = this.velY * this.mass;
      remoteMomentumX = other.velX * other.mass;
      remoteMomentumY = other.velY * other.mass;
      //inelastic collision
      totalXMomentum = localMomentumX + remoteMomentumX;
      xVelBoth = totalXMomentum / (this.mass + other.mass);
      totalYMomentum = localMomentumY + remoteMomentumY;
      yVelBoth = totalYMomentum / (this.mass + other.mass);
      //set new velocities
      this.velX = xVelBoth;
      this.velY = yVelBoth;
      other.velX = xVelBoth;
      other.velY = yVelBoth;
    }

    this.collisionEl = function(other) {
      //fetch variables
      localMass = this.mass;
      remoteMass = other.mass;
      localVelX = this.velX;
      localVelY = this.velY;
      remoteVelX = other.velX;
      remoteVelY = other.velY;
      if ((Math.sqrt(localVelX^2)==localVelX) || !(Math.sqrt(remoteVelX^2)==remoteVelX)){ //if one positive and one negative
        //calculations for local object
        finalLocalVelX = ((localMass - remoteMass)/(localMass + remoteMass))*localVelX + ((2*remoteMass)/(localMass + remoteMass))*remoteVelX;
        finalLocalVelY = ((localMass - remoteMass)/(localMass + remoteMass))*localVelY + ((2*remoteMass)/(localMass + remoteMass))*remoteVelY;
        //calculations for remote object
        finalRemoteVelX = ((2*localMass)/(localMass + remoteMass))*localVelX - ((remoteMass - localMass)/(localMass + remoteMass))*remoteVelX;
        finalRemoteVelY = ((2*localMass)/(localMass + remoteMass))*localVelY - ((remoteMass - localMass)/(localMass + remoteMass))*remoteVelY;
      }
      else {
        //calculations for local object
        finalLocalVelX = ((localMass - remoteMass)/(localMass + remoteMass))*localVelX + ((2*remoteMass)/(localMass + remoteMass))*remoteVelX;
        finalLocalVelY = ((localMass - remoteMass)/(localMass + remoteMass))*localVelY + ((2*remoteMass)/(localMass + remoteMass))*remoteVelY;
        //calculations for remote object
        finalRemoteVelX = ((2*localMass)/(localMass + remoteMass))*localVelX + ((remoteMass - localMass)/(localMass + remoteMass))*remoteVelX;
        finalRemoteVelY = ((2*localMass)/(localMass + remoteMass))*localVelY + ((remoteMass - localMass)/(localMass + remoteMass))*remoteVelY;
      }
      //set new velocities
      this.velX = finalLocalVelX;
      this.velY = finalLocalVelY;
      other.velX = finalRemoteVelX;
      other.velY = finalRemoteVelY;
    }

    //calc future position
    this.newPos = function() {
      //handle collisions, seriously.
      for (obj in components){
        //if a collision is taking place with at least one static component
        if (components[obj] != this && this.willCollide(components[obj]) && (this.stc || components[obj].stc)){
          this.velX = 0;
          this.velY = 0;
          this.accX = 0;
          this.accY = 0;
        }
        //if a collision is taking place with nonstatic components
        if (components[obj] != this && this.collides(components[obj]) && !this.stc && !components[obj].stc){
          //Check if at least one of the objects collide inelasticly
          if (this.unelas || components[obj].unelas){
            this.collisionUnel(components[obj]);
          }
          else {
            this.collisionEl(components[obj]);
          }
        }
      }
      //handle velocity&acceleration
      if (this.grav && !this.stc){
        this.accY += 0.01; //ITS GRAVITY BOI
      }
      this.velX += this.accX;
      this.velY += this.accY;
      this.x += this.velX;
      this.y += this.velY;
    }

    //return distance to given component in the given dimension
    this.dBetween = function(dimension, other) {
      if (dimension == 'x'){
        return Math.min(other.x, other.x + other.width) - Math.max(this.x, this.x + this.width);
      }
      else if (dimension == 'y'){
        return Math.abs(other.y - this.y);
      }
    }
}

//game canvas object
var mainArea = {
    init : function(canvName) {
        this.canvas = document.getElementById(canvName);
        this.canvas.width = 700;
        this.canvas.height = 500;
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

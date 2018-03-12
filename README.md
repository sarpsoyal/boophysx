<img src="https://raw.githubusercontent.com/sarpsoyal/boophysx/master/art/boophysx.png" width="350"/>
Boophysx is a very simple library for simulating collisions of square objects using JS.

# Getting Started
### Installing 
```html
<script src="https://cdn.rawgit.com/sarpsoyal/boophysx/master/main.js"></script>
```
## Component Structure
A boophysx component takes eleven arguments that define its behaviour
```javascript
component = new component('black', //Component color
                          30,      //Component width
                          30,      //Component height
                          10,      //Component density
                          200,     //X position
                          100,      //Y position
                          5,       //Velocity on x axis
                          0,       //Velocity on y axis
                          false,   //This boolean sets the tendancy of the component to do inelasic collision
                          true,    //This booleon controls wheter the component is being effected by the global gravity
                          false);  //This boolean makes the component static (Useful for creating a ground)
```
## Usage
### Configure the canvas for boophysx usage
Add a canvas to your html file
```html
<canvas id='mainCanvas'></canvas>
```
Initialize your canvas for boophysx use with mainArea.init() command.
```javascript
mainArea.init('mainCanvas', 800, 600); //canvas name, canvas width, canvas height
```
Add your first component!
```javascript
component = new component('red', 30, 30, 1, 300, 300, 0, 0, 0, true, false);
```
## Authors
* Sarp Soyal
## License
This project is licensed under the MIT License

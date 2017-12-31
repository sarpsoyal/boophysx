/*
  A brief summary of life by Sarp Soyal
                                      */

var muts = {

  vars: {
    colors: ['red', 'black', 'yellow', 'blue', 'green', 'orange']
  },

  //Returns a random integer between given values
  rand: function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  },

  //Returns a random color from muts.vars.colors
  randColor: function() {
    return this.vars.colors[this.rand(0, this.vars.colors.length)];
  }

};

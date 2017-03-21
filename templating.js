'use strict';
var gladObjectArray = [];
function GladiatorCard(data){
  this.name = data.name;
  this.img = data.img;
  this.class = data.class;
  this.unfavored = data.unfavored;
  this.tie = data.tie;
  this.favored = data.favored;
  this.weaponOne = data.weaponOne;
  this.weaponTwo = data.weaponTwo;
  this.effectText = data.effectText;
}

GladiatorCard.prototype.toHtml = function(){
  var source = $('#gladiator-template').html();
  var template = Handlebars.compile(source);
  return template(this);
};

// portSetup();
rawData.forEach(function(i) {
  gladObjectArray.push(new GladiatorCard(i));
});
gladObjectArray.forEach(function(i) {
  $('#cardHolder').append(i.toHtml());
});
//code heavily drawn from 2nd pair programming lab

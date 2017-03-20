'use strict';
function Dice(name,sideOne,sideTwo,sideThree,sideFour,sideFive,sideSix){
  this.name = name,
  this.sideOne = sideOne,
  this.sideTwo = sideTwo,
  this.sideThree = sideThree,
  this.sideFour = sideFour,
  this.sideFive = sideFive,
  this.sideSix = sideSix,
  this.sides = [sideOne,sideTwo,sideThree,sideFour,sideFive,sideSix];
};

function Gladiator(name, diceOne, diceTwo){
  this.name = name;
  //this.school = school;
  //this.item = item;
  this.diceOne = diceOne;
  this.diceTwo = diceTwo;
  gladiators.push(this);
  gladiatorNames.push(this.name);
};

Dice.prototype.convertSides = function(amount){
  var results = [];
  for (var i = 0; i < amount; i++){
    var value = roll(1) - 1;
    //console.log(value);
    var result = this.sides[value];
    //console.log(result);
    if (Array.isArray(result)){
      result.forEach(function(j) {
        results.push(j);
      });
    } else {
      results.push(result);
    }
  }
  //console.log(results);
  return results;
};

Dice.prototype.rollDice = function(amount){
  var count = [];
  count.attack = 0;
  count.defense = 0;
  count.evasion = 0;
  count.blank = 0;
  this.convertSides(amount).forEach(function(i) {count[i] = (count[i] || 0) + 1; });
  //This line of code provided by Loxxy at http://stackoverflow.com/questions/19395257/how-to-count-duplicate-value-in-an-array-in-javascript
  //console.log(count);
  //console.log(this);
  return count;
};

Gladiator.prototype.gladRoll = function(amountOne, amountTwo){
  var one = (this.diceOne.rollDice(amountOne));
  var two = (this.diceTwo.rollDice(amountTwo));
  var total = {};
  total.attack = one.attack + two.attack;
  total.defense = one.defense + two.defense;
  total.evasion = one.evasion + two.evasion;
  total.blank = one.blank + two.blank;
  //console.log(one);
  //console.log(two);
  //console.log(total);
  return total;
};

var gladiators = [];
var gladiatorNames = [];
var sword = new Dice('Sword','blank','defense','defense','attack','attack',['attack','defense']);
var shield = new Dice('Shield','blank','evasion','attack','defense','defense',['defense','defense']);
var shortBlade = new Dice('ShortBlade','blank','evasion','evasion','attack','attack',['attack','evasion']);
var spear = new Dice('Spear','blank','defense','defense','evasion','evasion',['evasion','defense']);
var fist = new Dice('Fist','blank','evasion','defense','attack','attack',['attack','attack']);
var net = new Dice('Net','blank','defense','attack','evasion','evasion',['evasion','evasion']);
var club = new Dice('Club','blank','blank','attack','evasion','defense',['attack','evasion','defense']);
var murmillo = new Gladiator('murmillo', sword, shield);
var cestus = new Gladiator('cestus', shortBlade, fist);
var retiarius = new Gladiator('retiarius', spear, net);
var hoplomachus = new Gladiator('hoplomachus',spear, shield);
var scissor = new Gladiator('scissor', sword, fist);
var laquearius = new Gladiator('laquearius', shortBlade,net);
var trax = new Gladiator('trax', shortBlade, shield);
var barbarian = new Gladiator('barbarian', sword, net);
var monk = new Gladiator('monk', spear, fist);
var andabatae = new Gladiator('andabatae', club, club);

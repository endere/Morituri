
'use strict';
function createElement(tagType, tagIdentifier, tagIdentifiername, elementContent, sectionId){
  var element = document.createElement(tagType);
  element.setAttribute(tagIdentifier, tagIdentifiername);
  element.textContent = elementContent;
//  console.log(element);
  sectionId.appendChild(element);
  //this element creation function created by Benjamin Ayzenberg.
}
function School(attack, defense, evasion, diceOne, diceTwo){
  this.attack = attack;
  this.defense = defense;
  this.evasion = evasion;
  this.diceOne = diceOne;
  this.diceTwo = diceTwo;
};
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

function Item(){

};

function Gladiator(name, diceOne, diceTwo){
  this.name = name;
  //this.school = school;
  //this.item = item;
  this.diceOne = diceOne;
  this.diceTwo = diceTwo;
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
  console.log(one);
  console.log(two);
  console.log(total);
  return total;
};

function compare(gladA, gladB){
  var hitsA = 0;
  var attackOverFlowA = gladA.attack - gladB.defense;
  var defenseOverFlowA = gladA.defense - gladB.evasion;
  var evasionOverFlowA = gladA.evasion - gladB.attack;
  var hitsB = 0;
  var attackOverFlowB = gladB.attack - gladA.defense;
  var defenseOverFlowB = gladB.defense - gladA.evasion;
  var evasionOverflowB = gladB.evasion - gladA.attack;
  if (attackOverFlowA > 0){
    hitsA += attackOverFlowA;
  }
  if (defenseOverFlowA > 0){
    hitsA += defenseOverFlowA;
  }
  if (evasionOverFlowA > 0){
    hitsA += evasionOverFlowA;
  }
  if (attackOverFlowB > 0){
    hitsB += attackOverFlowB;
  }
  if (defenseOverFlowB > 0){
    hitsB += defenseOverFlowB;
  }
  if (attackOverFlowB > 0){
    hitsB += defenseOverFlowB;
  }
  console.log('Gladiator A hit ' + hitsA + ' times!');
  console.log('Gladiator B hit ' + hitsB + ' times!');
}

function roll(amount){
  var results = [];
  for (var i = 0; i < amount; i++){
    var number = Math.floor(Math.random() * ((6 - 1) + 1) + 1);
    results.push(number);
  }
  //console.log(results);
  return results;
};
function gatherData(amount){
  var sides = [1,2,3,4,5,6];
  var results = roll(amount);
  for (var i = 0; i < sides.length; i++){
    var currentSide = sides[i];
    var count = 0;
    for(var j = 0; j < amount; j++){
      if (results[j] === sides[i]){
        count += 1;
      }
    }
    console.log('Side ' + sides[i] + ' was rolled ' + count + ' times!');
    var percentage = ((count / amount) * 100);
    console.log('That is ' + percentage + '% of the total!');
  }
}
//gatherData(100000);
var sword = new Dice('Sword','blank','defense','defense','attack','attack',['attack','defense']);
var shield = new Dice('Shield','blank','evasion','attack','defense','defense',['defense','defense']);
var shortBlade = new Dice('ShortBlade','blank','evasion','evasion','attack','attack',['attack','evasion']);
var spear = new Dice('Spear','blank','defense','defense','evasion','evasion',['evasion','defense']);
var fist = new Dice('Fist','blank','evasion','defense','attack','attack',['attack','attack']);
var net = new Dice('Net','blank','defense','attack','evasion','evasion',['evasion','evasion']);
var murmillo = new Gladiator('Murmillo',sword, shield);
var cestus = new Gladiator('Cestus', shortBlade, fist);
var retiarius = new Gladiator('Retiarius', spear, net);
//console.log('the sword rolled ' + sword.rollDice(1));
//console.log('the shield rolled ' + shield.rollDice(20));
//shield.rollDice(5);
// console.log(murmillo);
// console.log(murmillo.name);
// console.log(murmillo.diceOne.name);
// console.log(murmillo.diceTwo.name);
compare(murmillo.gladRoll(1000,1000), cestus.gladRoll(1000,1000));
compare(retiarius.gladRoll(1000,1000), cestus.gladRoll(1000,1000));
//console.log(murmillo.total);
// var sword1 = sword.rollDice(1000);
// var shortBlade1 = shortBlade.rollDice(1000);
// var spear1 = spear.rollDice(1000);
// compare(sword1, shortBlade1);
// compare(sword1, spear1);
// compare(shortBlade1, spear1);

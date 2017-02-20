
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
  this.defesnse = defense;
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

function Gladiator(){
  this.name = name;
  this.school = school;
  this.item = item;
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
  this.convertSides(amount).forEach(function(i) {count[i] = (count[i] || 0) + 1; });
  //This line of code provided by Loxxy at http://stackoverflow.com/questions/19395257/how-to-count-duplicate-value-in-an-array-in-javascript
  console.log(count);
};

function compare(gladA, gladB){
  var hitsA = 0;
  var attackOverFlowA = 0;
  var defenseOverFlowA = 0;
  var evasionOverflowA = 0;
  var hitsB = 0;
  var attackOverFlowB = 0;
  var defenseOverFlowB = 0;
  var evasionOverflowB = 0;
  for (var i = 0; i < gladA.length; i++){
    for (var j = 0; j < gladB.length; j++){
      if (gladA[i] === 'attack'){

      }
    }
  }
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
//for (var j = 0; j < sides.length; j ++){

//}
//gatherData(100000);
var sword = new Dice('sword','blank','defense','defense','attack','attack',['attack','defense']);
var shield = new Dice('shield','blank','evasion','attack','defense','defense',['defense','defense']);
//console.log('the sword rolled ' + sword.rollDice(1));
//console.log('the shield rolled ' + shield.rollDice(20));
sword.rollDice(1000000);
shield.rollDice(1000000);

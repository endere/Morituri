
'use strict';

function createElement(tagType, tagIdentifier, tagIdentifiername, elementContent, sectionId){
  var element = document.createElement(tagType);
  element.setAttribute(tagIdentifier, tagIdentifiername);
  element.textContent = elementContent;
//  console.log(element);
  sectionId.appendChild(element);
  //this element creation function created by Benjamin Ayzenberg.
}
function CreateSchool(attack, defense, evasion, diceOne, diceTwo){
  this.attack = attack;
  this.defesnse = defense;
  this.evasion = evasion;
  this.diceOne = diceOne;
  this.diceTwo = diceTwo;
};
function CreateDice(){

};

function CreateItem(){

};

function CreateGladiator(){
  this.name = name;
  this.school = school;
  this.item = item;
};
// CreateDice.prototype.roll = function
function roll(amount){
  var results = [];
  for (var i = 0; i < amount; i++){
    var number = Math.floor(Math.random() * ((6 - 1) + 1) + 1);
    results.push(number);
  }
  console.log(results);
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
gatherData(1000);

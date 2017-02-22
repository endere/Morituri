
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
  //console.log(one);
  //console.log(two);
  //console.log(total);
  return total;
};

function compare(gladA, gladB,carryOverA,carryOverB){
  var hitsA = 0;
  //console.log('B has base evasion of ' + gladB.evasion + ' but ' + carryOverB + ' is about to be added!');
  gladA.evasion += carryOverA;
  gladB.evasion += carryOverB;
  //console.log('Now B has evasion ' + gladB.evasion);
  var attackOverFlowA = gladA.attack - gladB.defense;
  var defenseOverFlowA = gladA.defense - gladB.evasion;
  var evasionOverFlowA = gladA.evasion - gladB.attack;
  var hitsB = 0;
  var attackOverFlowB = gladB.attack - gladA.defense;
  var defenseOverFlowB = gladB.defense - gladA.evasion;
  var evasionOverFlowB = gladB.evasion - gladA.attack;
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
  if (evasionOverFlowB > 0){
    hitsB += evasionOverFlowB;
  }
  var numbers = [hitsA, hitsB, attackOverFlowA, defenseOverFlowA, evasionOverFlowA, attackOverFlowB, defenseOverFlowB, evasionOverFlowB];
  //console.log('Gladiator A hit ' + hitsA + ' times!');
  //console.log('Gladiator B hit ' + hitsB + ' times!');
  return numbers;
}
function fight(fightAmount,gladA,diceOneA,diceTwoA,hpA,overFlowA,gladB,diceOneB,DiceTwoB,hpB,overFlowB){
  var firstWins = 0;
  var otherWins = 0;
  var ties = 0;
  for (var n = 0; n < fightAmount; n++){
    var healthA = hpA;
    var healthB = hpB;
    var carryOverA = 0;
    var carryOverB = 0;
    while (healthA > 0 && healthB > 0){
      var numbers = compare(gladA.gladRoll(diceOneA,diceTwoA),gladB.gladRoll(diceOneB,DiceTwoB),carryOverA,carryOverB);
      carryOverA = 0;
      carryOverB = 0;
      //console.log('A has base damage of ' + numbers[0]);
      //console.log('B has base damage of ' + numbers[1]);
      for (var x = 0; x < numbers[2] && x < overFlowA; x++){
        numbers[0] += 1;
        //console.log('A deals one more from overflow!');
      }
      for (var x = 0; x < numbers[3] && x < overFlowA; x++){
        numbers[1] -= 1;
        //console.log('A reduces 1 damage from overflow!');
      }
      for (var x = 0; x < numbers[4] && x < overFlowA; x++){
        carryOverA += 1;
        //console.log('A carries one evasion over from overflow!');
      }
      for (var x = 0; x < numbers[5] && x < overFlowB; x++){
        numbers[1] += 1;
        //console.log('B deals one more from overflow!');
      }
      for (var x = 0; x < numbers[6] && x < overFlowB; x++){
        numbers[0] -= 1;
        //console.log('B reduces 1 damage from overflow!');
      }
      for (var x = 0; x < numbers[7] && x < overFlowB; x++){
        carryOverB += 1;
        //console.log('B carries one evasion over from overflow!');
      }
      if (numbers[1] > 0){
        healthA -= numbers[1];
      }
      if (numbers[0] > 0){
        healthB -= numbers[0];
      }
      // console.log('B does ' + numbers[1]);
      // console.log('A does ' + numbers[0]);
      // console.log('A: ' + healthA);
      // console.log('B: ' + healthB);
      // console.log('round end');
    }
    if (healthA > healthB){
      firstWins += 1;
    } else if (healthB === healthA){
      ties += 1;
    } else if(healthB > healthA){
      otherWins += 1;
    }
  }
  console.log(fightAmount);
  console.log('The first gladiator won ' + firstWins + ' times!');
  console.log('That is ' + ((firstWins / fightAmount) * 100) + '%');
  console.log('The second won ' + otherWins + ' times!');
  console.log('That is ' + ((otherWins / fightAmount) * 100) + '%');
  console.log('There were ' + ties + ' ties!');
  console.log('That is ' + ((ties / fightAmount) * 100) + '%');
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

var sword = new Dice('Sword','blank','defense','defense','attack','attack',['attack','defense']);
var shield = new Dice('Shield','blank','evasion','attack','defense','defense',['defense','defense']);
var shortBlade = new Dice('ShortBlade','blank','evasion','evasion','attack','attack',['attack','evasion']);
var spear = new Dice('Spear','blank','defense','defense','evasion','evasion',['evasion','defense']);
var fist = new Dice('Fist','blank','evasion','defense','attack','attack',['attack','attack']);
var net = new Dice('Net','blank','defense','attack','evasion','evasion',['evasion','evasion']);
var club = new Dice('Club','blank','blank','attack','evasion','defense',['attack','evasion','defense']);
var murmillo = new Gladiator('Murmillo',sword, shield);
var cestus = new Gladiator('Cestus', shortBlade, fist);
var retiarius = new Gladiator('Retiarius', spear, net);
var hoplomachus = new Gladiator('hoplomachus',spear, shield);
var scissor = new Gladiator('Scissor', sword, fist);
var laquearius = new Gladiator('Laquearius', shortBlade,net);
var clubmillo = new Gladiator('Clubmillo', club,shield);

//fight(100000,murmillo,1,1,5,0,laquearius,1,1,5,0);

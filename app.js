
'use strict';
function createElement(tagType, tagIdentifier, tagIdentifiername, elementContent, sectionId){
  var element = document.createElement(tagType);
  element.setAttribute(tagIdentifier, tagIdentifiername);
  element.textContent = elementContent;
//  console.log(element);
  sectionId.appendChild(element);
  //this element creation function created by Benjamin Ayzenberg.

}
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
function fight(fightAmount,gladA,diceOneA,diceTwoA,hpA,overFlowA,gladB,diceOneB,diceTwoB,hpB,overFlowB, singleFight){
  var firstWins = 0;
  var otherWins = 0;
  var ties = 0;
  var finalResults = [];
  for (var n = 0; n < fightAmount; n++){
    var healthA = hpA;
    var healthB = hpB;
    var carryOverA = 0;
    var carryOverB = 0;
    while (healthA > 0 && healthB > 0){
      var numbers = compare(gladA.gladRoll(diceOneA,diceTwoA),gladB.gladRoll(diceOneB,diceTwoB),carryOverA,carryOverB);
      carryOverA = 0;
      carryOverB = 0;
      //console.log('A has base damage of ' + numbers[0]);
      //console.log('B has base damage of ' + numbers[1]);
      for (var x = 0; x < numbers[2] && x < overFlowA; x++){
        numbers[0] += 1;
        //console.log('A deals one more from overflow!');
      }
      for (var x = 0; x < numbers[3] && x < overFlowA; x++){
        //numbers[1] -= 1;
        //console.log('A reduces 1 damage from overflow!');
        healthA += 1;
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
        //numbers[0] -= 1;
        healthB += 1;
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
  // console.log(fightAmount);
  // console.log('The first gladiator won ' + firstWins + ' times!');
  // console.log('That is ' + ((firstWins / fightAmount) * 100) + '%');
  // console.log('The second won ' + otherWins + ' times!');
  // console.log('That is ' + ((otherWins / fightAmount) * 100) + '%');
  // console.log('There were ' + ties + ' ties!');
  // console.log('That is ' + ((ties / fightAmount) * 100) + '%');
  if (document.getElementById('tableRow')){
    var axed = document.getElementById('tableRow');
    axed.parentNode.removeChild(axed);
  }
  if (singleFight === true){
    createElement('tr', 'id', 'tableRow', '', document.getElementById('holder'));
    createElement('li', 'class', 'results', 'The first gladiator won ' + firstWins, document.getElementById('tableRow'));
    createElement('li', 'class', 'results', 'That is ' + round(((firstWins / fightAmount) * 100), 2) + '%', document.getElementById('tableRow'));
    createElement('li', 'class', 'results', 'The second gladiator won ' + otherWins, document.getElementById('tableRow'));
    createElement('li', 'class', 'results', 'That is ' + round(((otherWins / fightAmount) * 100), 2) + '%', document.getElementById('tableRow'));
    createElement('li', 'class', 'results', 'There were ' + ties + 'ties!', document.getElementById('tableRow'));
    createElement('li', 'class', 'results', 'That is ' + round(((ties / fightAmount) * 100), 2) + '%', document.getElementById('tableRow'));
  }
  finalResults.push(firstWins);
  finalResults.push(otherWins);
  finalResults.push(ties);
  return finalResults;
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
function round(value, decimals){
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
  // Rounding function found at http://www.jacklmoore.com/notes/rounding-in-javascript/
  //by Jack Moore
}
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
//var clubmillo = new Gladiator('clubmillo', club,shield);
console.log(gladiators);
console.log(gladiatorNames);
//fight(100000,murmillo,1,1,5,0,laquearius,1,1,5,0);

var gladFormEl = document.getElementById('new-gladiator-form');
gladFormEl.addEventListener('submit', handleSubmit);
var tableFormEl = document.getElementById('dataTableForm');
tableFormEl.addEventListener('submit', tableCraft);

function handleSubmit(event){
  event.preventDefault();
  event.stopPropagation();
  console.log('test');
  console.log(event.target.amount.value);
  console.log(event.target.gladiatorA.value);
  console.log(event.target.diceOneA.value);
  console.log(event.target.diceTwoA.value);
  console.log(event.target.healthA.value);
  console.log(event.target.overflowA.value);
  console.log(event.target.gladiatorB.value);
  console.log(event.target.diceOneB.value);
  console.log(event.target.diceTwoB.value);
  console.log(event.target.healthB.value);
  console.log(event.target.overflowB.value);

  var amount = (event.target.amount.value);
  var gladiatorA = (event.target.gladiatorA.value);
  var diceOneA = (event.target.diceOneA.value);
  var diceTwoA = (event.target.diceTwoA.value);
  var healthA = (event.target.healthA.value);
  var overflowA = (event.target.overflowA.value);
  var gladiatorB = (event.target.gladiatorB.value);
  var diceOneB = (event.target.diceOneB.value);
  var diceTwoB = (event.target.diceTwoB.value);
  var healthB = (event.target.healthB.value);
  var overflowB = (event.target.overflowB.value);
  for (var i = 0; i < gladiatorNames.length; i++){
    if (gladiatorA === gladiatorNames[i]){
      gladiatorA = gladiators[i];
    }
  }
  for (var i = 0; i < gladiatorNames.length; i++){
    if (gladiatorB === gladiatorNames[i]){
      gladiatorB = gladiators[i];
    }
  }
  console.log(gladiatorA);
  fight(amount,gladiatorA,diceOneA,diceTwoA,healthA,overflowA,gladiatorB,diceOneB,diceTwoB,healthB,overflowB,true);
}
function tableCraft(event){
  event.preventDefault();
  event.stopPropagation();
  var yaxisTotals = [];
  var amount = (event.target.amount.value);
  var diceOneA = (event.target.diceOneA.value);
  var diceTwoA = (event.target.diceTwoA.value);
  var healthA = (event.target.healthA.value);
  var overflowA = (event.target.overflowA.value);
  var diceOneB = (event.target.diceOneB.value);
  var diceTwoB = (event.target.diceTwoB.value);
  var healthB = (event.target.healthB.value);
  var overflowB = (event.target.overflowB.value);
  if (document.getElementById('tableHolder')){
    var axed = document.getElementById('tableHolder');
    axed.parentNode.removeChild(axed);
  }
  createElement('table', 'id', 'tableHolder', '', document.getElementById('holderOfTables'));
  createElement('thead', 'id', 'head', '', document.getElementById('tableHolder'));
  createElement('th', 'class', 'header', 'Attacking\\defending', document.getElementById('head'));
  for (var i = 0; i < gladiatorNames.length; i++){
    createElement('th', 'class', 'header', gladiatorNames[i], document.getElementById('head'));
  }
  createElement('th', 'class', 'header', 'Win%', document.getElementById('head'));
  createElement('th', 'class', 'header', 'Loss%', document.getElementById('head'));
  createElement('th', 'class', 'header', 'Tie%', document.getElementById('head'));
  for (var j = 0; j < gladiatorNames.length; j++){
    var sumWins = 0;
    var sumLosses = 0;
    var sumTies = 0;
    createElement('tr', 'id', gladiatorNames[j], '', document.getElementById('tableHolder'));
    createElement('td', 'class', 'header', gladiatorNames[j], document.getElementById(gladiatorNames[j]));
    for (var n = 0; n < gladiators.length; n++){
      var dataPoints = fight(amount,gladiators[j],diceOneA,diceTwoA,healthA,overflowA,gladiators[n],diceOneB,diceTwoB,healthB,overflowB,false);
      sumWins += dataPoints[0];
      sumLosses += dataPoints[1];
      sumTies += dataPoints[2];
      createElement('td', 'class', 'dataPoint', round(((dataPoints[0] / amount) * 100), 2) + '%', document.getElementById(gladiatorNames[j]));
    }
    createElement('td', 'class', 'result', round(((sumWins / (amount * gladiatorNames.length)) * 100), 2) + '%', document.getElementById(gladiatorNames[j]));
    createElement('td', 'class', 'result', round(((sumLosses / (amount * gladiatorNames.length)) * 100), 2) + '%', document.getElementById(gladiatorNames[j]));
    createElement('td', 'class', 'result', round(((sumTies / (amount * gladiatorNames.length)) * 100), 2) + '%', document.getElementById(gladiatorNames[j]));
  }
}

// }
// createElement('tr', 'id', 'dataRow', '', document.getElementById('tableHolder'));
// createElement('tr', 'id', 'dataRow', '', document.getElementById('tableHolder'));
// createElement('li', 'class', 'results', 'The first gladiator won ' + firstWins, document.getElementById('tableRow'));
// createElement('li', 'class', 'results', 'That is ' + round(((firstWins / fightAmount) * 100), 2) + '%', document.getElementById('tableRow'));
// createElement('li', 'class', 'results', 'The second gladiator won ' + otherWins, document.getElementById('tableRow'));
// createElement('li', 'class', 'results', 'That is ' + round(((otherWins / fightAmount) * 100), 2) + '%', document.getElementById('tableRow'));
// createElement('li', 'class', 'results', 'There were ' + ties + 'ties!', document.getElementById('tableRow'));
// createElement('li', 'class', 'results', 'That is ' + round(((ties / fightAmount) * 100), 2) + '%', document.getElementById('tableRow'));

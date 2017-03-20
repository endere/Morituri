'use strict';
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

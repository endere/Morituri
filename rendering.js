'use strict';
function createElement(tagType, tagIdentifier, tagIdentifiername, elementContent, sectionId){
  var element = document.createElement(tagType);
  element.setAttribute(tagIdentifier, tagIdentifiername);
  element.textContent = elementContent;
  //  console.log(element);
  sectionId.appendChild(element);
  //this element creation function created by Benjamin Ayzenberg.
}

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
    createElement('th', 'class', 'header', gladiatorNames[j], document.getElementById(gladiatorNames[j]));
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

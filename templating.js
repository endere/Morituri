'use strict';
var gladObjectArray = [];
function GladiatorCard(data){
  switch(data.class){
  case 'Murmillo':
    this.payOuts = ['Retiarius', 'Hoplomachus', 'Murmillo', 'Laquearius', 'Scissor', 'Cestus','Murmillo'];
    break;
  case 'Retiarius':
    this.payOuts = ['Cestus', 'Laquearius', 'Retiarius', 'Scissor', 'Murmillo', 'Hoplomachus','Retiarius'];
    break;
  case 'Cestus':
    this.payOuts = ['Murmillo', 'Scissor', 'Hoplomachus', 'Cestus','Retiarius','Laquearius','Cestus'];
    break;
  case 'Laquearius':
    this.payOuts = ['Scissor', 'Cestus', 'Laquearius', 'Murmillo','Retiarius','Hoplomachus','Laquearius'];
    break;
  case 'Scissor':
    this.payOuts = ['Murmillo', 'Hoplomachus', 'Retiarius', 'Scissor','Laquearius','Cestus','Scissor'];
    break;
  case 'Hoplomachus':
    this.payOuts = ['Retiarius', 'Laquearius', 'Hoplomachus', 'Cestus','Murmillo','Scissor','Hoplomachus'];
    break;
  default:
    this.payOuts = ['Balance','Balance','Balance','Balance','Balance','Balance', data.class,];
    break;
  }
  for (var i = 0; i < this.payOuts.length; i++) {
    var gladIcon;
    var gladiatorPayOut;
    switch(this.payOuts[i]){
    case 'Murmillo':
      gladiatorPayOut = 'Murmillo';
      gladIcon = 'Icons/murmillo icon.png';
      break;
    case 'Retiarius':
      gladiatorPayOut = 'Retiarius';
      gladIcon = 'Icons/Retiarius icon.png';
      break;
    case 'Cestus':
      gladiatorPayOut = 'Cestus';
      gladIcon = 'Icons/cestus glad icon.png';
      break;
    case 'Laquearius':
      gladiatorPayOut = 'Laquearius';
      gladIcon = 'Icons/Laquearius icon.png';
      break;
    case 'Scissor':
      gladiatorPayOut = 'Scissor';
      gladIcon = 'Icons/scissor glad icon.png';
      break;
    case 'Hoplomachus':
      gladiatorPayOut = 'Hoplomachus';
      gladIcon = 'Icons/hoplomachus icon.png';
      break;
    default:
      gladiatorPayOut = this.payOuts[i];
      gladIcon = 'Icons/balance icon.png';
    }
    switch(i){
    case 0:
      this.unfavoredOne = gladiatorPayOut;
      this.unfavoredOneImg = gladIcon;
      break;
    case 1:
      this.unfavoredTwo = gladiatorPayOut;
      this.unfavoredTwoImg = gladIcon;
      break;
    case 2:
      this.tieOne = gladiatorPayOut;
      this.tieOneImg = gladIcon;
      break;
    case 3:
      this.tieTwo = gladiatorPayOut;
      this.tieTwoImg = gladIcon;
      break;
    case 4:
      this.favoredOne = gladiatorPayOut;
      this.favoredOneImg = gladIcon;
      break;
    case 5:
      this.favoredTwo = gladiatorPayOut;
      this.favoredTwoImg = gladIcon;
      break;
    case 6:
      this.class = gladiatorPayOut;
      this.classIcon = gladIcon;
      break;
    }
  }
  this.name = data.name;
  this.img = data.img;
  this.unfavored = data.unfavored;
  this.tie = data.tie;
  this.favored = data.favored;
  this.weaponOne = data.weaponOne;
  switch(this.weaponOne){
  case 'sword':
    this.weaponOneImg = 'Icons/sword emblem.png';
    break;
  case 'spear':
    this.weaponOneImg = 'Icons/spear icon.png';
    break;
  case 'shortBlade':
    this.weaponOneImg = 'Icons/shortblade icon.png';
    break;
  case 'club':
    this.weaponOneImg = 'Icons/Club icon.png';
    break;
  }
  this.weaponTwo = data.weaponTwo;
  switch(this.weaponTwo){
  case 'shield':
    this.weaponTwoImg = 'Icons/shield icon.png';
    break;
  case 'net':
    this.weaponTwoImg = 'Icons/net.png';
    break;
  case 'fist':
    this.weaponTwoImg = 'Icons/scissor icon.png';
    break;
  case 'club':
    this.weaponTwoImg = 'Icons/Club icon.png';
    break;
  }
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

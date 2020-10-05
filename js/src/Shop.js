import { getTierLists } from "./utils/shop.js"
import { 
  getRandomHeroByTier, 
  purchaseHeroByName, 
  sellHeroByName,
  getHeroByName
} from "./utils/heroes.js";

var shop = document.querySelector('#shop'),
    stats = document.querySelector('#stats'),
    bench = document.querySelector('#bench');

var slots = shop.querySelectorAll('slot'),
    btn_reroll = shop.querySelector('#reroll'),
    btn_upgrade = shop.querySelector('#upgrade'),
    stats_round = stats.querySelector('#round'),
    stats_timer = stats.querySelector('#timer'),
    stats_gold = stats.querySelector('#gold');

btn_reroll.addEventListener('click', () => reroll(2));

btn_upgrade.addEventListener('click', upgrade);

let each_prepare = 5000;
let each_combat = 10000;

var current_round = 1;
var current_level = 1;
var current_gold = 0;
var credit = 1;
var owned_heroes = [];

var snapshot_gold;

var levels = [
  1,
  2,
  3,
  5,
  15,
  20,
  25,
  35,
  40,
  45
];

var possiblities = [
  // tier (1-5)
  [80, 20, 0, 0, 0], // level 1
  [70, 30, 0, 0, 0], // level 2
  [60, 25, 15, 0, 0], // level 3
  [40, 40, 20, 0, 0], // level 4
  [35, 40, 25, 0, 0], // level 5
  [27, 35, 35, 3, 0], // level 6
  [23, 25, 40, 12, 0], // level 7
  [15, 23, 35, 20, 7], // level 8
  [12, 18, 30, 25, 15], // level 9
  [8, 15, 25, 35, 17], // level 10
];

setTimeout(function () {
  updateGold(5);
  reroll(0);
  round_start();
}, 300);

function updateGold(g) {
  current_gold += Number(g);
  stats_gold.innerText = '$ ' + current_gold;
  return current_gold;
}

function fadeIn(el, s) {
  s = s || .5;
  el.style.opacity = 0;   
  el.style.transition = 'ease ' + s + 's all';
  setTimeout(() => el.style.opacity = 1, 100);
}

function fadeOut(el, s) {
  s = s || .5;
  el.childNodes.forEach(c => {
    c.style.transition = 'ease ' + s + 's all';
    c.style.opacity = 0;
  });
  
  setTimeout(() => el.remove(), (s * 1000) + 100);
}

function updateOwnHeroes() {
  var _s1 = {};
  var _s2 = {};
  var _s3 = {};
  
  var _q = [];

  for (var i in owned_heroes) {
    var hero = owned_heroes[i];
    var name = hero.name;
    _s1[name] = Number(_s1[name] || 0) + 1;
    if (_s1[name] >= 3) {
      _s1[name] = 0;
      _s2[name] = Number(_s2[name] || 0) + 1;
      _q.push(hero);
      if (_s2[name] >= 3) {
        _s2[name] = 0;
        _s3[name] = 1;
      }
    }
  }
  
  /*_q.forEach(h => {
    var o = owned_heroes.filter(x => x.name === h.name);
    o.slice(0, 2).forEach(e => {
      e.el.remove()
    });
  })*/
  
  //console.log(_s1, _s2, _s3);
}

function addHero(hero) {
  var el = document.createElement('span');
  var img = document.createElement('img');
  
  img.alt = hero.name;
  img.src = hero.portrait;
  
  el.id = JSON.stringify(hero);
  el.addEventListener('click', sellHero);
  
  el.appendChild(img);
  bench.appendChild(el);
  fadeIn(el);
  //updateOwnHeroes();
  return hero;
}

function buyHero() {
  var _hero = JSON.parse(this.id);
  var name = _hero.name;
  
  if (current_gold < _hero.tier) {
    alert('not enough gold to purchase');
    return;
  }
  
  updateGold(-_hero.tier);

  var hero = purchaseHeroByName(name);
  owned_heroes.push(addHero(hero));
  this.remove();
  //fadeOut(this, 1);
}

function sellHero() {
  this.disabled = true;
  var _hero = JSON.parse(this.id);
  var name = _hero.name;
  //var name = this.getAttribute('data-hero'); 
  var hero = sellHeroByName(name);
  //updateOwnHeroes();
  var i = owned_heroes.indexOf(hero);
  delete owned_heroes[i];
  owned_heroes = owned_heroes.filter(n => typeof n != 'undefined');
  updateGold(_hero.tier);
  //fadeOut(this, 1);
  this.remove();
}

function round_start() {
  var title = `Round ${current_round}`;
  snapshot_gold = current_gold;
  stats_round.textContent = title;
  countdown(stats_timer, each_combat);
  setTimeout(round_end, each_combat);
  setTimeout(function () {
    stats_round.textContent = `Combat Round ${current_round}`;
  }, 2600);
}

function round_end() {
  current_round++;
  credit++;
  
  updateGold(7);
  
  if (snapshot_gold >= 10) {
    var interest = Math.floor(snapshot_gold / 10);
    (interest > 3) && (interest = 3);
    updateGold(interest);
  }
  
  stats_gold.innerText = `$ ${current_gold}`
  
  update();
  reroll(0);

  var title = `Preparing to round ${current_round}`;
  stats_round.textContent = title;
  countdown(stats_timer, each_prepare);
  setTimeout(round_start, each_prepare);
}

var intervalRef;

function countdown(el, time) {
  if (intervalRef) {
    clearInterval(intervalRef);
    intervalRef = null;
  }
  
  el.textContent = time / 1000;

  intervalRef = setInterval(function () {
    var t = Number(el.textContent);
    
    if (t < 1) {
      clearInterval(intervalRef);
      intervalRef = null;
      return;
    }
    
    el.textContent = t - 1;
  }, 1000)
}

function addHeroCard(hero) {
  var card = document.createElement('span');
  var cost = document.createElement('p');
  var img = document.createElement('img');
  //card.innerHTML = `<center><span id="hero-name">${hero.name}</span><br>$ ${hero.tier}</center>`;
  img.src = hero.portrait;
  img.alt = hero.name;
  
  cost.innerText = `$ ${hero.tier}`;
  
  card.id = JSON.stringify(hero);
  card.addEventListener('click', buyHero);
  card.appendChild(img);
  card.appendChild(cost);
  return card;
}

function reroll(cost) {
  if (cost) {
    if (current_gold < cost) {
      alert('Not enough gold to reroll.');
      return;
    }
    updateGold(-cost);
  }
  var possiblity = possiblities[current_level - 1];
  var tier_lists = getTierLists(possiblity);
  
  for (var i in tier_lists) {
    var slot = slots[i],
        tier = tier_lists[i];
    var hero = getRandomHeroByTier(tier);
    
    slot.childNodes.length && 
      slot.childNodes.forEach(child => child.remove());
    
    var card = addHeroCard(hero);
    
    slot.appendChild(card);
    fadeIn(card, .2);
  }
}

function upgrade() {
  if (current_gold < 5) {
    alert('Not enough gold to upgrade.');
    return;
  }
  // current_level++;
  updateGold(-5);
  credit+=5;
  update();
}

function update() {
  var c = 0;
  for (let i in levels) {
    c+=levels[i];
    // console.log(c, credit, i)
    if (credit < c) {  
      current_level = i;
      document.querySelector('#stats #level').textContent = current_level;
      return;
    }
  }
}

export default {
  
};
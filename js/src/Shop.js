import { getTierLists } from "./utils/shop.js"
import { 
  getRandomHeroByTier, 
  purchaseHeroByName, 
  sellHeroByName,
  getHeroByName
} from "./utils/heroes.js";

let stats = {
  gold: null,
  timer: null,
  round: null,
  rank: null,
};

let player;

let slots, bench;

export function set_elements(el) {
  slots = el.shop.querySelectorAll('slot');
  stats.round = el.stats.querySelector('#round');
  stats.timer = el.stats.querySelector('#timer');
  stats.gold = el.stats.querySelector('#gold');
  bench = el.bench;
}

export function set_player(account) {
  player = account;
  window.player = account;
}

let each_prepare = 30000/2;
let each_combat = 60000/2;

var snapshot_gold;

function addHero(hero) {
  var el = document.createElement('span');
  var img = document.createElement('img');
  
  img.alt = hero.name;
  img.src = hero.portrait;
  
  el.id = JSON.stringify(hero);
  el.addEventListener('click', sellHero);
  
  el.appendChild(img);
  bench.appendChild(el);

  return hero;
}

function buyHero() {
  var _hero = JSON.parse(this.id);
  var name = _hero.name;
  
  if (player.gold.hasLessThan(_hero.tier)) {
    alert('not enough gold to purchase');
    return;
  }

  var hero = purchaseHeroByName(name);
  
  player.heroes.add(addHero(hero));
  player.gold.subtract(_hero.tier, 'Purchased Hero [' + name + ']');
  
  this.remove();
}

function sellHero() {
  var _hero = JSON.parse(this.id);
  var name = _hero.name;
  var hero = sellHeroByName(name);
  player.heroes.remove(_hero);
  player.gold.add(_hero.tier, 'Refunded hero: ' + name);
  this.remove();
}

export function round_start() {
  var title = `Round ${player.round}`;
  snapshot_gold = player.gold.balance;
  stats.round.textContent = title;
  countdown(stats.timer, each_combat);
  setTimeout(round_end, each_combat);
  setTimeout(function () {
    stats.round.textContent = `Combat Round ${player.round}`;
  }, 1400);
}

export function round_end(is_start = false) {
  if (is_start) {
    player.gold.add(5, 'Game started');
  } else {
    var base_gold = 4;
    var lvl = Number(player.level);
    var bonus = 0;
    if (lvl > 5) {
      bonus = 3;
    } else
    if (lvl < 3) {
      bonus = lvl - 1;
    } else {
      bonus = 2;
    }
    player.gold.add(base_gold + bonus, 'Round ended');
    player.round.increment();
  }
     
  player.level.increment();

  if (snapshot_gold && snapshot_gold >= 10) {
    var interest = Math.floor(snapshot_gold / 10);
    (interest > 3) && (interest = 3);
    player.gold.add(interest, 'Interest');
  }
  
  reroll(0);

  var title = `Preparing to round ${player.round}`;
  stats.round.textContent = title;
  countdown(stats.timer, each_prepare);
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

export function reroll(cost=0) {
  if (cost) {
    if (player.gold < cost) {
      alert('Not enough gold to reroll.');
      return;
    }
    player.gold.subtract(cost);
  }
  
  var tier_lists = getTierLists(player.level.odd);
  
  for (var i in tier_lists) {
    var slot = slots[i],
        tier = tier_lists[i];
    var hero = getRandomHeroByTier(tier);
    
    slot.childNodes.length && 
      slot.childNodes.forEach(child => child.remove());
    
    var card = addHeroCard(hero);
    
    slot.appendChild(card);
  }
}

function upgrade() {
  if (player.gold.hasLessThan(5)) {
    alert('Not enough gold to upgrade.');
    return;
  }
  player.level.increase(5, 'upgraded');
  player.gold.subtract(5, 'upgraded');
}

function update() {
  var c = 0;
  for (let i in levels) {
    c+=levels[i];
    // console.log(c, credit, i)
    if (credit < c) {  

      document.querySelector('#stats #level').textContent = current_level;
      return;
    }
  }
}
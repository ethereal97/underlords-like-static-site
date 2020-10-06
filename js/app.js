import { 
  set_elements, 
  set_player, 
  round_end,
  reroll
} from './src/Shop.js';

import Player from './src/Player.js';

const 
  shop = document.querySelector('#shop'),
  controls = document.querySelector('#controls'),
  stats = document.querySelector('#stats'),
  bench = document.querySelector('#bench');

let name = prompt('Enter your name', sessionStorage.getItem('name') || '');

if (!name) {
  throw new Error('You must enter your name');
}

sessionStorage.setItem('user_name', name);

let player = new Player(1, name, 'Boss I');

stats.querySelector('#name').textContent = name;

controls.querySelector('#reroll').addEventListener('click', function() {
  reroll(2);
});

controls.querySelector('#upgrade').addEventListener('click', function() {
  if (player.gold < 5) {
    alert('Not enough gold to upgrade level');
    return;
  }
  player.gold.subtract(5, 'upgraded');
  player.level.increase(5, 'upgraded');
});

player.level.onchange(function() {
  stats.querySelector('#level').textContent = this.level;
  stats.querySelector('#exp #now').textContent = this.currentExp;
  stats.querySelector('#exp #next').textContent = this.nextExp;
  
});

player.gold.onchange(function() {
  stats.querySelector('#gold').textContent = `$ ${this.balance}`;
})

set_elements({
  shop,
  controls,
  stats,
  bench
})

set_player(player);

//player.level.level = 1;

//reroll(0);
//player.gold.add(5);
round_end(5);
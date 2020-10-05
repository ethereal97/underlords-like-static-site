var heroes = [
  {
    name: 'Abaddon',
    tier: 3
  },
  {
    name: 'Alchemist',
    tier: 3
  },
  {
    name: 'Anti-Mage',
    tier: 1
  },
  {
    name: 'Axe',
    tier: 5
  },
  {
    name: 'Batrider',
    tier: 1
  },
  {
    name: 'Beastmaster',
    tier: 3
  },
  {
    name: 'Bounty Hunter',
    tier: 1
  },
  {
    name: 'Bristleback',
    tier: 2
  },
  {
    name: 'Chaos Knight',
    tier: 2
  },
  {
    name: 'Crystal Maiden',
    tier: 1
  },
  {
    name: 'Dazzle',
    tier: 1
  },
  {
    name: 'Death Prophet',
    tier: 4
  },
  {
    name: 'Doom',
    tier: 4
  },
  {
    name: 'Dragon Knight',
    tier: 5
  },
  {
    name: 'Drow Ranger',
    tier: 1
  },
  {
    name: 'Earth Spirit',
    tier: 2
  },
  {
    name: 'Ember Spirit',
    tier: 3
  },
  {
    name: 'Enchantress',
    tier: 1
  },
  {
    name: 'Faceless Void',
    tier: 5
  },
  {
    name: 'Juggernaut',
    tier: 2
  },
  {
    name: 'Keeper of the Light',
    tier: 5
  },
  {
    name: 'Kunkka',
    tier: 2
  },
  {
    name: 'Lich',
    tier: 1
  },
  {
    name: 'Lifestealer',
    tier: 3
  },
  {
    name: 'Lina',
    tier: 4
  },
  {
    name: 'Lone Druid',
    tier: 4
  },
  {
    name: 'Lycan',
    tier: 3
  },
  {
    name: 'Legion Commander',
    tier: 2
  },
  {
    name: 'Luna',
    tier: 2
  },
  {
    name: 'Magnus',
    tier: 1
  },
  {
    name: 'Medusa',
    tier: 5
  },
  {
    name: 'Meepo',
    tier: 2
  },
  {
    name: 'Mirana',
    tier: 4
  },
  {
    name: 'Nature\'s Prophet',
    tier: 2
  },
  {
    name: 'Omniknight',
    tier: 3
  },
  {
    name: 'Pangolier',
    tier: 4
  },
  {
    name: 'Puck',
    tier: 3
  },
  {
    name: 'Pudge',
    tier: 2
  },
  {
    name: 'Phantom Assassin',
    tier: 1
  },
  {
    name: 'Rubick',
    tier: 4
  },
  {
    name: 'Queen of Pain',
    tier: 2
  },
  {
    name: 'Shadow Demon',
    tier: 1
  },
  {
    name: 'Shadow Shaman',
    tier: 3
  },
  {
    name: 'Slark',
    tier: 3
  },
  {
    name: 'Snapfire',
    tier: 1
  },
  {
    name: 'Spectre',
    tier: 3
  },
  {
    name: 'Spirit Breaker',
    tier: 2
  },
  {
    name: 'Storm Spirit',
    tier: 2
  },
  {
    name: 'Sven',
    tier: 4
  },
  {
    name: 'Templar Assassin',
    tier: 4
  },
  {
    name: 'Terrorblade',
    tier: 3
  },
  {
    name: 'Tidehunter',
    tier: 4
  },
  {
    name: 'Treant Protector',
    tier: 3
  },
  {
    name: 'Troll Warlord',
    tier: 5
  },
  {
    name: 'Tusk',
    tier: 1
  },
  {
    name: 'Vengeful Spirit',
    tier: 1
  },
  {
    name: 'Venomancer',
    tier: 1
  },
  {
    name: 'Viper',
    tier: 4
  },
  {
    name: 'Void Spirit',
    tier: 4
  },
  {
    name: 'Windranger',
    tier: 2
  },
  {
    name: 'Wraith King',
    tier: 5
  }
];

var hero_pools = [
  /* List of Tier 1 */
  [],
  
  /* List of Tier 2 */
  [],
  
  /* List of Tier 3 */
  [],
  
  /* List of Tier 4 */
  [],
  
  /* List of Tier 5 */
  []
];

var pool = [
  30, 20, 18, 12, 10
];

for (let i in heroes) {
  var hero = heroes[i];
  var n = hero.tier - 1;
  var x = hero.name.split(' ').join('_');
  
  hero.portrait = `${BASE_URL}/img/h/${x.replace("'", '_')}_portrait_icon.png`;
  for (var x=0; x<pool[n]; x++) {
    hero_pools[n].push(hero);
  }
}

export function getRandomHeroByTier(tier, reload=false) {
  var n = tier - 1;
  var x = Math.floor(Math.random() * hero_pools[n].length);
  var r = hero_pools[n][x];
  reload && console.log(r);
  return r || getRandomHeroByTier(tier, true);
}

export function purchaseHeroByName(name) {
  var hero = getHeroByName(name);
  
  if (!hero) {
    console.warn('Hero not found:', name);
    return null;
  }
  
  var n = hero.tier - 1;
  var i = hero_pools[n].indexOf(hero);
  
  var returnValue = hero_pools[n][i];
  
  delete hero_pools[n][i];
  
  hero_pools[n] = hero_pools[n].filter(n => typeof n != 'undefined');
  // console.log(hero_pools[n]);
  
  return returnValue;
}

export function getHeroByName(name) {
  return heroes.filter(x => x.name === name)[0];
}

export function sellHeroByName(name) {
  var hero = getHeroByName(name);
  if (!hero) {
    console.warn('Hero not found:', name);
    return null;
  }
  var n = hero.tier - 1;
  hero_pools[n].push(hero);
  return hero;
}
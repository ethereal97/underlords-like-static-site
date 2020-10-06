import Gold from './Gold.js';
import Level from './Level.js';
import Round from './Round.js';
import Heroes from './Heroes.js';


export default class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.gold = new Gold;
    this.level = new Level;
    this.heroes = new Heroes;
    this.round = new Round;
  }
}
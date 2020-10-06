export default class Heroes {
  constructor() {
    this.owned = {};
    this.units = {};
    this.stats = {};
  }
  
  add(hero) {
    var {
      name,
      tier
    } = hero;
   
    this.owned[name] = Number(this.owned[name] || 0) + 1
   
    if (!this.stats[name]) {
      this.stats[name] = hero;
    }
   
    var evolved = Math.floor(this.owned[name] / 3);
    
    this.units[name] = (evolved >= 3) ? [1, 0, 0] : [0, evolved, this.owned[name] - (evolved * 3)];
  }
  
  remove(hero) {
    var {
      name,
      tier
    } = hero;
    
    if (!(name in this.owned) || !(this.owned[name])) {
      console.error(`Hero ${name} does not exist.`);
      return;
    }
    
    this.owned[name]--;
    
    if (this.owned[name] <= 0) {
      delete this.owned[name];
    }
  }
}
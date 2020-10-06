const levels = [
  {
    level: 1,
    exp: 1,
    odd: [80, 20, 0, 0, 0]
  },
  {
    level: 2,
    exp: 1,
    odd: [70, 25, 5, 0, 0]
  },
  {
    level: 3,
    exp: 5,
    odd: [60, 25, 15, 0, 0]
  },
  {
    level: 4,
    exp: 15,
    odd: [40, 40, 20, 0, 0]
  },
  {
    level: 5,
    exp: 20,
    odd: [35, 40, 25, 0, 0]
  },
  {
    level: 6,
    exp: 25,
    odd: [25, 35, 35, 5, 0]
  },
  {
    level: 7,
    exp: 35,
    odd: [20, 25, 40, 15, 0]
  },
  {
    level: 8,
    exp: 40,
    odd: [15, 23, 35, 20, 7]
  },
  {
    level: 9,
    exp: 45,
    odd: [12, 18, 30, 25, 15]
  },
  {
    level: 10,
    exp: null,
    odd: [8, 12, 25, 35, 30]
  }
];

export default class Level {
  constructor() {
    this._onchanged = [];
    this._logged = [];
    this.currentLevel = 0;
    this.currentExp = 0;
    this.currentOdd = [0, 0, 0, 0, 0];
    this.nextExp = 0;
  }
  
  set level(lvl) {
    var lvl = levels.filter(({level}) => level === lvl)[0];
    this.currentLevel = lvl.level;
    this.nextExp = lvl.exp;
    this.currentOdd = lvl.odd;
  }
  
  get level() {
    return Number(this.currentLevel);
  }
  
  get odd() {
    return this.currentOdd;
  }
  
  onchange(callback) {
    this._onchanged.push(callback);
  }
  
  increment(message) {
    this.currentExp++;
    this.log(message || 'exp+1');
    this.resolve();
  }
  
  increase(exp, message) {
    this.currentExp += Number(exp);
    this.log(message || 'exp+' + exp);
    this.resolve();
  }
  
  log(message) {
    var time = new Date;
    var level = this.currentLevel;
    var exp = this.currentExp;
    this._logged.push({
      time,
      level,
      exp,
      message
    });
  }
  
  resolve() {
    if (this.currentExp === this.nextExp) {
      this.currentExp = 0;
      this.level++;
    } else
    if (this.currentExp > this.nextExp) {
      this.currentExp = this.currentExp - this.nextExp;
      this.level++;
    }
    this._onchanged.forEach(cb => cb.call(this));
  }
  
  toString() {
    return Number(this.currentLevel);
  }
}
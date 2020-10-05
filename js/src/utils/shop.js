export function getTierLists(possiblity) {
  var tier = [], 
      results = [];
  
  for (var i in possiblity) {
    var n = possiblity[i];
    
    for (var x=0; x<n; x++) {
      tier.push(Number(i) + 1);
    }
  }
  
  for (var i=0; i<5;i++) {
    results.push(
      tier[Math.floor(Math.random() * tier.length)]
    )
  }
  
  return results;
}


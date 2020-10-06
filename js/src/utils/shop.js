export function getTierLists(odd) {
  var tier = [], 
      results = [];
  
  for (var i in odd) {
    var n = odd[i];
    
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


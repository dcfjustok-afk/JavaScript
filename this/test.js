var obj = { 
  user: 'yupi', 
  print: function(){ 
    this.user = 'yupi2'
    console.log(this.user); 
  } 
} 
obj.print()
let newObj = new obj.print()

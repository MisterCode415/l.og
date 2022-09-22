'use strict';

const AdvancedConsole = function() {
  this.replace = () => {
    try {
      process.stdout.clearLine()
      process.stdout.cursorTo(0)
      process.stdout.write(`${arguments[0]}`)    
    } catch(e) {}
  }
  
  this.write = () => {
    console.log(...arguments)
  }
  
  this.log = () =>{
    if(arguments[0]=='sticky') {
      try{
      process.stdout.clearLine()
      process.stdout.cursorTo(0)
      process.stdout.write(`${arguments[1]}`)
      } catch(e) {}
    }
    if(arguments[0]=='line') console.log(...arguments)
  }
  this.line = () => {
    console.log()
  }
}


// this will be epic
class Logger {
  timesCalledInInstance=0
  og() {
    if(!arguments[0]) {
      console.log(`pin ${this.timesCalledInInstance}`)
      return
    } else {
      console.log(...arguments)
    }
    this.timesCalledInInstance++
  }
  og_error() {
    console.error(...arguments)
    this.timesCalledInInstance++
  }
  og_trace() {
    console.dir(...arguments)
    this.timesCalledInInstance++
  }
  og_dispatch() {
    console.log(...arguments)
    this.timesCalledInInstance++
  }
}
const l = new Logger()
const ac = new AdvancedConsole();

module.exports.l = l
module.exports.ac = ac
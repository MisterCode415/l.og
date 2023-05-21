"use strict";
const fs = require("fs");

const AdvancedConsole = function () {
  this.replace = (...arg1) => {
    try {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(`${arg1}`);
    } catch (e) {}
  };

  this.write = (text, ...args) => {
    console.log(text, ...args);
  };

  this.log = (which, arg1) => {
    if (which == "sticky") {
      try {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(`${arg1}`);
      } catch (e) {}
    }
    if (which == "line") console.log(arguments);
  };
  this.line = () => {
    console.log();
  };
};

// this will be epic
function Logger() {
  let timesCalledInInstance = 0;
  const inRange = (current) => {
    return true;
  };
  function newRange() {
    const temp = new Date();
    temp.setDate(temp.getDate() + 1);
    const future = temp.toISOString().split(`T`)[0];
    const now = new Date().toISOString().split(`T`)[0];
    return `_${now}_${future}`;
  }
  function write(which) {
    if (process.env.REPORTING === `true`) {
      let final = ``; // always a new line :D
      for (var z = 1; z < arguments.length; z++) {
        if (typeof arguments[z] === `object`)
          final += ` ${JSON.stringify(arguments[z])} | `;
        else if (arguments[z]) final += `${arguments[z]} | `;
      }
      final += `\n`;
      // get directory of files and sort by date
      // if the last file is older than 1 day, create a new file
      // if the last file is newer than 1 day, use it
      const dir = fs.readdirSync(process.env.LOG_FILE_PATH);
      let DATE_RANGE;
      if (!dir.length) {
        // make a new one
        DATE_RANGE = newRange();
      } else {
        const latestFile = dir.sort().reverse()[0];
        const currentRange = latestFile.split(`_`);
        if (!currentRange.length) {
          // maybe a file from another process leaked in and it doesn't have the right naming convention
          // make a new one
          DATE_RANGE = newRange();
        } else {
          // we have to check if the current range is in the range or make a new file cut off
          DATE_RANGE =
            !currentRange || inRange(currentRange) ? newRange() : currentRange;
        }
      }
      fs.writeFileSync(
        `${process.env.LOG_FILE_PATH}runlog${DATE_RANGE}.log`,
        ` ${new Date().toISOString()} :: ${
          process.env.APPLICATION
        } :: ${which.toUpperCase()} >> ${final}`,
        { flag: "a+" }
      );
    }
  }
  function og() {
    if (!arguments[0]) {
      console.log(`pin ${timesCalledInInstance++}`);
    }
    if(!SILENT_MODE)
      console.log(...arguments);
    if (process.env.REPORTING === `true`) {
      write(`log`, ...arguments);
    }
  }
  function og_error() {
    if(!SILENT_MODE)
      console.error(...arguments);
    if (process.env.REPORTING === `true`) {
      write(`error`, ...arguments);
    }
  }
  function og_trace() {
    if(!SILENT_MODE)
      console.dir(...arguments);
    if (process.env.REPORTING === `true`) {
      write(`trace`, ...arguments);
    }
  }
  function og_dispatch() {
    if(!SILENT_MODE)
      console.log(...arguments);
    if (process.env.REPORTING === `true`) {
      write(`dispatch`, ...arguments);
    }
  }
  return {
    inRange: inRange,
    newRange: newRange,
    write: write,
    og: og,
    og_error: og_error,
    og_trace: og_trace,
    og_dispatch: og_dispatch,
  };
}

const LoggerSingleton = (function () {
  let instance;
  function createInstance() {
    const object = new Logger();
    return object;
  }
  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

module.exports.l = LoggerSingleton.getInstance();

module.exports.ac = new AdvancedConsole();

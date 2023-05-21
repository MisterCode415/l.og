# l.og
l.og is a shortcut library for console.log...four is three times less than twelve, save some time in your life and l.og(`it`). Also nice to route logs to different places as needed per deployment, environment, or other use case.

## Config
Add an application alias to your .env or other shell environment file. This will be used to identify your application in the logs. Helpful if you ever want to write many apps to one log.
```
APPLICATION=your-app-name
SILENCE=true|false
REPORTING=true|false
LOG_FILE_PATH=/path/to/your/logs/
```
### Config Defaults
Variables are optional and will default to the values above if not set. 
Silence is off by default so logs will print to console. 
Reporting is off by default so logs will not write to file.
Log file path is set to ./logs/ by default, it will throw an error if this isn't set to a correct, existing folder location with enabled write permissions.

## Classes
### Logger
A convenience wrapper for console.log. Spreads are arguments to console.`method` (log, error, dir) with this signature. 
```
l.og(arg1,arg2,...)
l.og_error(arg1,arg2,...)
l.og_dir(arg1,arg2,...) 
```
Also for a situation where its helpful tracing through a race condition, or other anomalies, calling without parameters will drop enumerated log pins in the output stream:
```
const arg1 = {
  foo:'bar'
}

l.og()
l.og(arg1)
l.og()
// prints 
// `pin 1`
// Object({foo:'bar'})
// `pin 3`
```
will result in an enumerated console.log, indicating how many times
the logger has been executing in the call stack.

#### Aliasing
Take advatage of tagging modules, or other parts of your application with an alias. This will prefix all logs with the alias, and is helpful for identifying where logs are coming from in a multi-module application. 
```
l.og(`Instance 8675309`, `your log event strain or`, {shapes:'objects'}, 'etc');
```
will log to console as:
```
2023-05-19T01:04:23.508Z your-application-name : Instance 8675309 : your log event strain or {"shapes":"objects"} etc
```

#### Writing to a log file 
There are many cases where you would want to capture a log event in a file, be it difficulty reproducing a bug, gleaning an error, or you want to capture a log for 
another type of analysis. Writing to log file is a great way to do this if you need flexibility. Enable and configure logging to file with the environment variables: 
```
REPORTING=true
LOG_FILE_PATH=/path/to/your/logs/
```
logs will collect in the directory specified by `LOG_FILE_PATH` with the name `runlog_YYYY-DD-MM_YYYY-DD-MM.log`, and will automatically handle the date chrun, and will always append (a+).

#### SILENCE MODE
In production you dont want console.logs, its notorious and endearing...but not helpful. Silence mode will turn off console logs, but will still write to file if enabled.


### AdvancedConsole
A tool for writing outputs to the same line, or a new line without the cruft in your primary code. One line > three lines to output something. 
```
import {ac} from AdvancedConsole
// prints new line of content
ac.log(`line`,{data:...})

// maintains single line of content and replaces content 
ac.log(`sticky`,{data:...})
```

# l.og
l.og is a shortcut library for console.log...four is three times less than twelve, save some time in your life and l.og(`it`). Also nice to route logs to different places as needed per deployment, environment, or other use case.

## Classes
### Logger
A convenience wrapper for console.log. Spreads are arguments to console.`method` (log, error, dir) with this signature. 
```
l.og(arg1,arg2,...)
l.og_error(arg1,arg2,...)
l.og_dir(arg1,arg2,...)
```

### AdvancedConsole
A tool for writing outputs to the same line, or a new line without the cruft in your primary code. One line > three lines to output something. 
```
import {ac} from AdvancedConsole
// prints new line of content
ac.log(`line`,{data:...})

// maintains single line of content and replaces content 
ac.log(`sticky`,{data:...})
```

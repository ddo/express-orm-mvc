var path = require('path');
var fs   = require('fs');

/*
    List all js file

    @param {String} dir
    @param fn
*/
exports.listJSFiles = function(dir, callback) {
    //read all file in dir
    fs.readdir(dir, function (err, files) {
        if (err) return callback(err);

        var js_files = [];

        for(var i = 0; i < files.length; i++) {
            var file = files[i];

            //is file ?
            if(!fs.statSync(path.normalize(path.join(dir, file))).isFile())
                continue;

            //is js file ?
            if(path.extname(file) === '.js')
                js_files.push(file);
        }
        callback(null, js_files);
    });
};

/*
    Get the caller path dir then append file name
    
    @param {String} file_name

    @return {String} caller path join file name
*/
exports.getCallerPath = function(file_name) {
    return path.join(path.dirname(getCaller().filename), file_name);
};

/*
    @api private
*/
function getStack() {
    // Save original Error.prepareStackTrace
    var origPrepareStackTrace = Error.prepareStackTrace;

    // Override with function that just returns `stack`
    Error.prepareStackTrace = function (_, stack) {
        return stack;
    };

    // Create a new `Error`, which automatically gets `stack`
    var err = new Error();

    // Evaluate `err.stack`, which calls our new `Error.prepareStackTrace`
    var stack = err.stack;

    // Restore original `Error.prepareStackTrace`
    Error.prepareStackTrace = origPrepareStackTrace;

    // Remove superfluous function call on stack
    stack.shift(); // getStack --> Error

    return stack;
}

/*
    @api private
*/
function getCaller() {
    var stack = getStack();

    // Remove superfluous function calls on stack
    stack.shift();
    stack.shift();

    // Return caller's caller
    return stack[1].receiver;
}
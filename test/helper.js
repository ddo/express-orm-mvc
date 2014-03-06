var helper = require('../lib/_helper');
var expect = require('chai').expect;

describe("Helper Test", function() {
    describe("#listJSFiles", function() {
        it("list all js files", function(done) {
            helper.listJSFiles(__dirname, function(err, files) {
                expect(err).to.be.a('null');
                expect(files).to.be.instanceof(Array);
                done();
            });
        });
    });

    describe("#remoteDirname", function() {
        it("correct remote dirname", function() {
            expect(helper.remoteDirname()).to.be.contain('/node_modules/mocha/lib');
        });
    });
});

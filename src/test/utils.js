const expect = require('chai').expect;

module.exports = {
    expectException: (name) => {
        return (func) => {
            try {
                func();
            } catch (e) {
                expect(e.name).to.be.equal(name);
            }
        };
    },
};

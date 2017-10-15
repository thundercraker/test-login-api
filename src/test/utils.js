const expect = require('chai').expect;

module.exports = {
    expectException: (type, cause) => {
        return (func) => {
            try {
                func();
            } catch (e) {
                if (e.type === undefined) throw e;
                expect(e.type).to.be.equal(type);
                if (cause !== undefined) {
                    expect(e.cause).to.be.equal(cause);
                }
            }
        };
    },
};

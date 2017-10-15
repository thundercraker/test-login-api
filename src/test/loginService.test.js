const expect = require('chai').expect;
const expectEx = require('./utils.js').expectException('ValidationException');
const loginService = require('../main/services/loginService.js');

const longText = '_______________________________________________' +
                    '_______________________________________________';

describe('Login Service', () => {
    describe('hashPassword', () => {
        const a = loginService.hashPassword('aaaaa');
        const b = loginService.hashPassword('aaaaa');
        expect(a.salt).to.be.not.equal(b.salt);
        expect(a.hash).to.be.not.equal(b.hash);
    });
    describe('login', () => {
        it('should complain on empty username', () => {
            expectEx(() => loginService.login('', 'aaa'));
        });
        it('should complain on non-string username', () => {
            expectEx(() => loginService.login(42, 'aaa'));
        });
        it('should complain on special chars username', () => {
            expectEx(() => loginService.login('#^&%', 'aaa'));
        });
        it('should complain on long username', () => {
            expectEx(() => loginService.login(longText, 'aaa'));
        });
        it('should complain on empty password', () => {
            expectEx(() => loginService.login('aaa', ''));
        });
        it('should complain on non-string password', () => {
            expectEx(() => loginService.login('aaa', 42));
        });
        it('should complain on special chars password', () => {
            expectEx(() => loginService.login('aaa', '#^&%'));
        });
        it('should complain on long password', () => {
            expectEx(() => loginService.login('aaa', longText));
        });
    });
});


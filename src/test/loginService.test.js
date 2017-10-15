const expect = require('chai').expect;
const expectEx = require('./utils.js').expectException('ValidationException');
const {getHash, LoginService} =
    require('../main/services/loginService.js');

const longText = '_______________________________________________' +
                    '_______________________________________________';
const hash = 'f0a215a8dbcf4ec874515051da62f8ab388555a15d1a2a29b7b2d5d304f38e68';
const salt = 'salty';

const fakeDB = {
    getAuthInfo: (id, type) => {
        if (type === 1) {
            return {
                auth: hash + '/' + salt,
            };
        }
        return null;
    },
};
const loginService = new LoginService(fakeDB);

describe('Login Service', () => {
    describe('getHash', () => {
        const a = getHash('aaaaa', 'salt');
        const b = getHash('aaaaa', 'salt');
        expect(a).to.be.equal(b);
        const c = getHash('aaaaa', 'salty');
        expect(a).to.be.not.equal(c);
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
        it('should not login', () => {
            loginService.login('aaa', 'bb');
        });
        it('should login', () => {
            loginService.login('aaa', 'bbb');
        });
    });
});


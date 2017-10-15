const expect = require('chai').expect;

const ExceptionID = require('../main/exceptions.js').ExceptionID;
const expectEx = require('./utils.js').expectException;
const LoginService = require('../main/services/loginService.js');

const longText = '_______________________________________________' +
                    '_______________________________________________';
const hash = '9d2ac96d39cb002a971d429bb8f426b3fae094ff24be279a6599a5526bf7d102';
const salt = 'salty';

const fakeDB = {
    getAuthInfoByUsernameAndType: (id, type) => {
        return new Promise((res, rej) => {
            if (type === 1) {
                res({
                    r_auth: hash + '/' + salt,
                });
            }
            rej();
        });
    },
    updateLastLogin: (id) => { },
};
const loginService = new LoginService(fakeDB);

describe('Login Service', () => {
    describe('login', () => {
        it('should complain on empty username', () => {
            expectEx(ExceptionID.ArgumentTooShort)(
                () => loginService.login('', 'aaaaaa'));
        });
        it('should complain on non-string username', () => {
            expectEx(ExceptionID.ArgumentMustBeAString)(
                () => loginService.login(42, 'aaaaaa'));
        });
        it('should complain on special chars username', () => {
            expectEx(ExceptionID.ArgumentHasSpecialChar)(
                () => loginService.login('#^&%&*^%', 'aaaaaa'));
        });
        it('should complain on long username', () => {
            expectEx(ExceptionID.ArgumentTooLong)(
                () => loginService.login(longText, 'aaaaaa'));
        });
        it('should complain on empty password', () => {
            expectEx(ExceptionID.ArgumentTooShort)(
                () => loginService.login('aaaaaa', ''));
        });
        it('should complain on non-string password', () => {
            expectEx(ExceptionID.ArgumentMustBeAString)(
                () => loginService.login('aaaaaa', 42));
        });
        it('should complain on special chars password', () => {
            expectEx(ExceptionID.ArgumentHasSpecialChar)(
                () => loginService.login('aaaaaa', '#^&%&^"%$'));
        });
        it('should complain on long password', () => {
            expectEx(ExceptionID.ArgumentTooLong)(
                () => loginService.login('aaaaaa', longText));
        });
        it('should not login', (done) => {
            loginService.login('aaaaaa', 'bbbbbb').then((result) => {
                expect(result).to.be.false;
                done();
            }, (err) => {
                expect.fail(err);
            });
        });
        it('should login', (done) => {
            loginService.login('aaaaaa', 'bbbccc').then((result) => {
                expect(result).to.be.true;
                done();
            }, (err) => expect.fail(err));
        });
    });
});


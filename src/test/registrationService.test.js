const expect = require('chai').expect;

const ExceptionID = require('../main/exceptions.js').ExceptionID;
const expectEx = require('./utils.js').expectException;
const RegistrationSvc = require('../main/services/registrationService.js');

const fakeDB = {
    register: () => {

    },
};

const svc = new RegistrationSvc(fakeDB);

const exNonStr = expectEx(ExceptionID.ArgumentMustBeAString);
const exSpecial = expectEx(ExceptionID.ArgumentHasSpecialChar);
const exShort = expectEx(ExceptionID.ArgumentTooShort);
const exLong = expectEx(ExceptionID.ArgumentTooLong);

const longText = '_______________________________________________' +
                    '_______________________________________________';

describe('Registration Service', () => {
    describe('register', () => {
        it('should complain about empty string', () => {
            exNonStr(() => svc.register({username: null}));
            exNonStr(() => svc.register({username: 'user93', password: null}));
            exNonStr(() => svc.register({username: 'user93',
                password: 'pass93', firstname: null}));
            exNonStr(() => svc.register({username: 'user93', password: 'pass93',
                firstname: 'firstname', lastname: null}));
        });
        it('should complain about special char in string', () => {
            exSpecial(() => svc.register({username: 'user9*'}));
            exSpecial(() => svc.register({
                username: 'user93',
                password: '"""""""'}));
            exSpecial(() => svc.register({
                username: 'user93',
                password: 'pass93',
                firstname: '(*)'}));
            exSpecial(() => svc.register({
                username: 'user93',
                password: 'pass93',
                firstname: 'firstname',
                lastname: '090**'}));
        });
        it('should complain about short string', () => {
            exShort(() => svc.register({username: ''}));
            exShort(() => svc.register({username: 'user93', password: ''}));
            exShort(() => svc.register({username: 'user93',
                password: 'pass93', firstname: ''}));
            exShort(() => svc.register({username: 'user93', password: 'pass93',
                firstname: 'firstname', lastname: ''}));
        });
        it('should complain about long string', () => {
            exLong(() => svc.register({username: longText}));
            exLong(() => svc.register({
                username: 'user93',
                password: longText}));
            exLong(() => svc.register({username: 'user93',
                password: 'pass93', firstname: longText}));
            exLong(() => svc.register({username: 'user93', password: 'pass93',
                firstname: 'firstname', lastname: longText}));
        });
        it('should register', () => {
            expect(svc.register({username: 'user93', password: 'pass93',
                firstname: 'firstname', lastname: 'lastname'}))
                .to.be.true;
        });
    });
});

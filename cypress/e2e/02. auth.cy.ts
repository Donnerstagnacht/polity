import {ProfileTest} from "../fixtures/profile";
import {Size, Sizes} from "../fixtures/size";
import {userCreatedByCypress} from "../fixtures/user";

const newUser: ProfileTest = userCreatedByCypress;
Sizes.forEach((size: Size): void => {
    describe(`Auth tests with screen size ${size.width} show that users can `, () => {
        beforeEach((): void => {
            cy.viewport(size.width, size.height)
            cy.clearLocalStorage()
        })

        it('sign up.', (): void => {
            const randomNumber: number = Math.floor(Math.random() * 10000000);
            newUser.email = 'test' + randomNumber + '@gmail.com';
            cy.visit('landing/signup');
            cy.get('input')
            .clear()
            cy.getDataCy('email')
            .type(newUser.email)
            cy.getDataCy('password')
            .clear()
            cy.getDataCy('password')
            .type(newUser.password)
            cy.getDataCy('signup')
            .click()
            cy.url().should('contain', 'sign-in')
        })

        it('sign in.', (): void => {
            cy.signIn(newUser);
            cy.url().should('contain', 'profile')
        })

        // // TODO: test broken? Think it works
        // it('load auth session from local storage.', (): void => {
        //     cy.signIn(profile1);
        //     cy.visit('profile');
        //     cy.visit('profile');
        // })

        it('sign out.', (): void => {
            cy.signIn(newUser);
            cy.signOut(newUser)
        })
    })
})
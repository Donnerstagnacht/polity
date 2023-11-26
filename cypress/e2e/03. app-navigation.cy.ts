import {Size, Sizes} from "../fixtures/size";
import {ProfileTest} from "../fixtures/profile";
import {seedReadUser2} from "../fixtures/user";

const profile1: ProfileTest = seedReadUser2;

Sizes.forEach((size: Size): void => {
    describe(`App navigation tests with screen size ${size.width} show that users can `, () => {

        beforeEach((): void => {
            cy.viewport(size.width, size.height)
            cy.signIn(profile1);
        })

        it('navigate to SEARCH tab.', (): void => {
            cy.getDataCy('nav-search', 'nav-search-desktop')
            .filter(':visible')
            .first()
            .click()
            cy.getDataCy('search-instruction')
            .shouldBeVisible()
        })

        it('navigate to NEW tab.', (): void => {
            cy.getDataCy('nav-new', 'nav-new-desktop')
            .filter(':visible')
            .first()
            .click()
            cy.contains('new works')
            // cy.getDataCy('search-instruction')
            // .shouldBeVisible()
        })

        it('navigate to OFFICE tab.', (): void => {
            cy.getDataCy('nav-office', 'nav-office-desktop')
            .filter(':visible')
            .first()
            .click()

            cy.contains('Benachrichtigungen')
            .shouldBeVisible()
        })

        it('navigate to HOME tab.', (): void => {
            cy.navigateToHome();
        })

        it('navigate to PROFILE tab.', (): void => {
            cy.getDataCy('nav-home', 'nav-home-desktop')
            .filter(':visible')
            .first()
            .click()
            cy.getDataCy('home-to-profile')
            .shouldBeVisible()
            .click()
            cy.getDataCy('profileImage')
            .shouldBeVisible()
        })
    })
})

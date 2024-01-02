import {Size, Sizes} from "../fixtures/size";
import {AUTH_DATA1, AuthData} from "../../seed_and_test_data/01_test_auth";

const profile1: AuthData = AUTH_DATA1;

Sizes.forEach((size: Size): void => {
    describe(`App navigation tests with screen size ${size.width} show that users can `, (): void => {
        before(() => {
        })

        beforeEach((): void => {
            cy.viewport(size.width, size.height)
            cy.visit('landing/sign-in');
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

import {Size, Sizes} from "../fixtures/size";

Sizes.forEach((size: Size): void => {
    describe(`Landing page tests with screen size ${size.width} show that users can `, (): void => {
        before((): void => {
        })

        beforeEach((): void => {
            cy.viewport(size.width, size.height)
            cy.visit('/landing')
        })

        it('load the landing page.', (): void => {
            cy.getDataCy('sign-in')
            .shouldBeVisible()
            .contains('LOGIN')
            cy.getDataCy('signup')
            .shouldBeVisible()
            .contains('SIGNUP')
        })

        it('navigate to the sign-in page.', (): void => {
            cy.getDataCy('sign-in')
            .click()
            cy.getDataCy('sign-in-instruction')
            .click()
            cy.getDataCy('sign-in-instruction')
            .shouldBeVisible()
            .contains('Login in deinen Account')
        })

        it('navigate to the signup page.', (): void => {
            cy.getDataCy('signup')
            .click({multiple: true})
            cy.getDataCy('signup-instruction')
            .shouldBeVisible()
            .contains('Erstelle einen neuen Account.')
        })

        it('navigate to the sign-in page through nav bar.', (): void => {
            cy.getDataCy('nav-sign-in', 'nav-sign-in-desktop')
            .filter(':visible')
            .first()
            .click({multiple: true})
            cy.getDataCy('sign-in-instruction')
            .shouldBeVisible()
            .contains('Login in deinen Account.')
        })

        it('navigate to the signup page through nav bar.', (): void => {
            cy.getDataCy('nav-sign-up', 'nav-sign-up-desktop')
            .filter(':visible')
            .first()
            .click()
            cy.getDataCy('signup-instruction')
            .shouldBeVisible()
            .contains('Erstelle einen neuen Account.')
        })

        it('navigate to the home page through nav bar.', (): void => {
            cy.getDataCy('nav-landing', 'nav-landing-desktop')
            .filter(':visible')
            .first()
            .click()
            cy.getDataCy('welcome-instruction')
            .shouldBeVisible()
            .contains('Erstelle einen Account oder log dich ein.')
        })
    })
})

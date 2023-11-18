import {Size, Sizes} from "../fixtures/size";
import {ProfileTest} from "../../src/app/features/profile/types-and-interfaces/profile";
import {seedProfileFollowingUser} from "../fixtures/user";

const profile1: ProfileTest = seedProfileFollowingUser;

Sizes.forEach((size: Size): void => {
    describe(`App navigation tests with screen size ${size.width} show that users can `, () => {

        beforeEach((): void => {
            cy.viewport(size.width, size.height)
            cy.signIn(profile1);
        })

        it('can open notification tabs.', (): void => {
            cy.getDataCy('nav-office', 'nav-office-desktop')
            .shouldBeVisible()
            .click()

            cy.getDataCy('nav-notifications', 'nav-notifications-desktop')
            .shouldBeVisible()
            .click()

            cy.getDataCy('notifications-headline')
            .shouldBeVisible()

        })

        it('receives notification once someone follows a user and notification resets if viewed.', (): void => {
            cy.getDataCy('notification-counter-badge')
            .shouldBeVisible()
            .contains(8)

            cy.getDataCy('nav-office', 'nav-office-desktop')
            .shouldBeVisible()
            .click()

            cy.getDataCy('nav-notifications', 'nav-notifications-desktop')
            .shouldBeVisible()
            .click()

            cy.getDataCy('follow-user-notification')
            .shouldBeVisible()

            cy.getDataCy('notification-counter-badge')
            .should('not.be.visible')

        })

        it('can filter notifications for follow type', (): void => {
            cy.getDataCy('nav-office', 'nav-office-desktop')
            .shouldBeVisible()
            .click()

            cy.getDataCy('nav-notifications', 'nav-notifications-desktop')
            .shouldBeVisible()
            .click()

            cy.getDataCy('follow-by-user-notification')
            .shouldBeVisible()
            .click()

            cy.getDataCy('follow-user-notification')
            .shouldBeVisible()
        })
    })
});

import {Size, Sizes} from "../fixtures/size";
import {ProfileTest} from "../../src/app/features/profile/types-and-interfaces/profile";
import {userCreatedByCypress} from "../fixtures/user";

const loggedInUser: ProfileTest = userCreatedByCypress;

// ATTENTION: tests depends on previous tests
Sizes.forEach((size: Size): void => {
    describe(`App navigation tests with screen size ${size.width} show that users can `, () => {

        beforeEach((): void => {
            cy.viewport(size.width, size.height)
            cy.signIn(loggedInUser);
        })

        it('see an onboarding tutorial if they sign in the first time', () => {
            cy.getDataCy('tutorial-welcome-first-time')
            .shouldBeVisible()

            cy.getDataCy('tutorial-skip')
            .shouldBeVisible()

            cy.getDataCy('tutorial-see-around-first')
            .shouldBeVisible()

            cy.getDataCy('tutorial-start')
            .shouldBeVisible()
            .click()
        })

        it('do a tutorial about their profile settings', () => {
            cy.getDataCy('tutorial-profile-settings')
            .shouldBeVisible()

            cy.getDataCy('tutorial-start-profile-settings')
            .shouldBeVisible()
            .click()
        })

        it('can save their tutorial progress and load their progress', () => {
            cy.getDataCy('tutorial-see-around-first')
            .shouldBeVisible()
            .click()

            cy.signOut(loggedInUser)
            cy.signIn(loggedInUser)

            cy.getDataCy('tutorial-welcome-back')
            .shouldBeVisible()

            cy.getDataCy('tutorial-start-search')
            .shouldBeVisible()
            .click()
        })

        it('do a tutorial about searching users and follow them', () => {
            cy.getDataCy('tutorial-search')
            .shouldBeVisible()

            cy.getDataCy('tutorial-start-search')
            .shouldBeVisible()
            .click()

            cy.getDataCy('tutorial-follow')
            .shouldBeVisible()

            cy.getDataCy('tutorial-start-follow')
            .shouldBeVisible()
            .click()

        })

        it('can reject the tutorial and will not see it again ', () => {
            cy.getDataCy('tutorial-skip')
            .shouldBeVisible()
            .click()

            cy.getDataCy('tutorial-welcome-back')
            .should('not.exist')

            cy.signOut(loggedInUser)
            cy.signIn(loggedInUser)

            cy.getDataCy('tutorial-welcome-back')
            .should('not.exist')
        })

        it('can open the tutorial from profile settings again ', () => {
            // cy. navigate to profile-edit tab

            cy.getDataCy('tutorial-restart')
            .shouldBeVisible()
            .click()

            cy.getDataCy('tutorial-welcome-back')
            .shouldBeVisible()
        })
    })
})

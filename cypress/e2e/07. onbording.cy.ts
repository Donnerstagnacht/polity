import {Size, Sizes} from "../fixtures/size";
import {ProfileTest} from "../fixtures/profile";
import {userCreatedByCypress} from "../fixtures/user";

const newUser: ProfileTest = userCreatedByCypress;

// ATTENTION: tests depends on previous tests
Sizes.forEach((size: Size): void => {
    describe(`App navigation tests with screen size ${size.width} show that users can `, () => {

        before((): void => {
            cy.signUp(newUser).then((value) => {
                newUser.email = value
            })
        })

        beforeEach((): void => {
            cy.viewport(size.width, size.height)
            cy.signIn(newUser);
            cy.intercept('POST', 'https://abcwkgkiztruxwvfwabf.supabase.co/rest/v1/rpc/select_assistant')
            .as('loadAssistant')

            cy.wait(['@loadAssistant'])
        })

        it('see an assistant-welcome-dialog tutorial if they sign in the first time', (): void => {

            cy.getDataCy('assistant-welcome-dialog')
            .shouldBeVisible()
            .click()

            cy.getDataCy('welcome-first-name')
            .scrollIntoView()

            cy.getDataCy('welcome-first-name')
            .type(newUser.first_name as string)

            cy.getDataCy('welcome-last-name')
            .scrollIntoView()

            cy.getDataCy('welcome-last-name')
            .type(newUser.last_name as string)

            cy.getDataCy('step1navigateToProfileStep')
            .shouldBeVisible()

            cy.getDataCy('step1closeTutorial')
            .shouldBeVisible()
            .click()
        })

        it('can save their tutorial progress and load their progress', (): void => {
            cy.getDataCy('assistant-profile-dialog')
            .shouldBeVisible()
            .click()

            cy.getDataCy('welcome-name-headline')
            .shouldBeVisible()
        })

        it('do a tutorial about their profile settings', () => {
            cy.getDataCy('assistant-profile-dialog')
            .shouldBeVisible()
            .click()

            cy.getDataCy('welcome-name-headline')
            .shouldBeVisible()

            cy.getDataCy('step2closeAndSkipTutorial')
            .scrollIntoView()

            cy.getDataCy('step2navigateToProfilePage')
            .scrollIntoView()
            .click()

            cy.getDataCy('assistant-search-dialog')
            .shouldBeVisible()
            .click()
        })

        it('do a tutorial about searching users and follow them', (): void => {
            cy.getDataCy('assistant-search-dialog')
            .shouldBeVisible()
            .click()

            cy.getDataCy('tutorial-search-headline')
            .shouldBeVisible()
            .click()

            cy.getDataCy('step3closeAndSkipTutorial')
            .scrollIntoView()
            // .shouldBeVisible() somehow it is overflown and cypress can not detect it even it is visible

            cy.getDataCy('step3navigateToSearchPage')
            .scrollIntoView()
            // .shouldBeVisible() somehow it is overflown and cypress can not detect it even it is visible
            .click()

            cy.getDataCy('search-instruction')
            .shouldBeVisible()
        })

        it('can open the tutorial from profile settings again ', (): void => {
            cy.navigateToHome()

            cy.getDataCy('home-to-profile')
            .shouldBeVisible()
            .click()

            cy.getDataCy('nav-profile-edit', 'nav-profile-edit-desktop')
            .filter(':visible')
            .first()
            .click()

            cy.getDataCy('toggle-assistant-headline')
            .shouldBeVisible()
            .contains('Zeige Tutorials')

            cy.getDataCy('toggle-assistant')
            .shouldBeVisible()
            .click()

            cy.getDataCy('assistant-profile-dialog')
            .shouldBeVisible()
        })

        it('can reject the tutorial and will not see it again ', () => {
            cy.getDataCy('assistant-profile-dialog')
            .shouldBeVisible()
            .click()

            cy.getDataCy('welcome-name-headline')
            .shouldBeVisible()

            cy.getDataCy('step2navigateToProfilePage')
            .scrollIntoView()

            cy.getDataCy('step2closeAndSkipTutorial')
            .scrollIntoView()
            .click()

            cy.getDataCy('assistant-profile-dialog')
            .should('not.exist')
        })
    })
})

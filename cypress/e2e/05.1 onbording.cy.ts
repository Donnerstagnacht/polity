import {Size, Sizes} from "../fixtures/size";
import {ProfileTest} from "../fixtures/profile";
import {userCreatedByCypress} from "../fixtures/user";

const newUser: ProfileTest = userCreatedByCypress;

// ATTENTION: tests depends on previous tests
Sizes.forEach((size: Size): void => {
    describe(`Onboarding tests with screen size ${size.width} show that users can `, () => {

        before((): void => {
            cy.visit('landing/sign-up');

            cy.signUp(newUser).then((value) => {
                newUser.email = value
            })
        })

        beforeEach((): void => {
            cy.viewport(size.width, size.height)
            cy.visit('landing/sign-in');
            cy.signIn(newUser);
            cy.interceptSupabaseCall('select_assistant')
            .as('loadAssistant')
            cy.interceptSupabaseCall('select_user')
            .as('loadUser')
            cy.wait(['@loadAssistant', '@loadUser'])
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

            cy.interceptSupabaseCall('update_last_tutorial').as('lastTutorial')
            cy.getDataCy('step2navigateToProfilePage')
            .scrollIntoView()
            .click()
            cy.wait(['@lastTutorial'])

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

            cy.interceptSupabaseCall('update_skip_tutorial').as('skipTutorial')
            cy.interceptSupabaseCall('update_last_tutorial').as('lastTutorial')
            cy.getDataCy('step3navigateToSearchPage')
            .scrollIntoView()
            // .shouldBeVisible() somehow it is overflown and cypress can not detect it even it is visible
            .click()
            cy.wait(['@skipTutorial', '@lastTutorial'])

            cy.getDataCy('search-instruction')
            .shouldBeVisible()
        })

        it('can open the tutorial from profile settings again ', (): void => {
            // cy.pause()
            cy.navigateToHome()

            cy.getDataCy('home-to-profile')
            .shouldBeVisible()
            .click()

            cy.getDataCy('nav-profile-edit', 'nav-profile-edit-desktop')
            .filter(':visible')
            .first()
            .click()

            // cy.pause()
            cy.getDataCy('toggle-assistant-headline')
            .shouldBeVisible()
            .contains('Zeige Tutorials')

            cy.interceptSupabaseCall('update_skip_tutorial').as('skipTutorial')
            cy.interceptSupabaseCall('update_last_tutorial').as('lastTutorial')

            cy.getDataCy('toggle-assistant')
            .shouldBeVisible()
            .click()
            cy.wait(['@skipTutorial', '@lastTutorial'])

            cy.contains('reactivate')
            .should('be.visible')

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

            cy.interceptSupabaseCall('update_skip_tutorial').as('skipTutorial')
            cy.interceptSupabaseCall('update_last_tutorial').as('lastTutorial')

            cy.getDataCy('step2closeAndSkipTutorial')
            .scrollIntoView()
            .click()
            cy.wait(['@skipTutorial', '@lastTutorial'])
            cy.contains('You can reactivate')
            .should('be.visible')

            cy.getDataCy('assistant-profile-dialog')
            .should('not.exist')
        })
    })
})

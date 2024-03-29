import {Size, Sizes} from "../fixtures/size";
import {AUTH_DATA1, AUTH_DATA2, AUTH_DATA3, AUTH_DATA4, AuthData} from "../../seed_and_test_data/01_test_auth";
import {Profile, PROFILE1} from "../../seed_and_test_data/02_test_profiles";

const userFirstLoginDoingWelcomeTutorialAuth: AuthData = AUTH_DATA1;
const userFirstLoginDoingWelcomeTutorialProfile: Profile = PROFILE1;

const userDoingProfileTutorialAuth: AuthData = AUTH_DATA2;

const userDoingSearchTutorialAuth: AuthData = AUTH_DATA3;

const userRestartingTutorialAuth: AuthData = AUTH_DATA4;

Sizes.forEach((size: Size): void => {
    describe(`Onboarding tests with screen size ${size.width} show that users can `, (): void => {

        before((): void => {
        })

        beforeEach((): void => {
            cy.viewport(size.width, size.height)
            cy.visit('landing/sign-in');
        })

        it('see an assistant-welcome-dialog tutorial if they sign in the first time', (): void => {
            cy.resetSupabase()
            cy.signIn(userFirstLoginDoingWelcomeTutorialAuth);
            cy.interceptSupabaseCall('select_assistant')
            .as('loadAssistant')
            cy.interceptSupabaseCall('select_user')
            .as('loadUser')
            cy.wait(['@loadAssistant', '@loadUser'])

            cy.getDataCy('assistant-welcome-dialog')
            .shouldBeVisible()
            .click()

            cy.getDataCy('welcome-first-name')
            .scrollIntoView()

            cy.getDataCy('welcome-first-name')
            .type(userFirstLoginDoingWelcomeTutorialProfile.first_name as string)

            cy.getDataCy('welcome-last-name')
            .scrollIntoView()

            cy.getDataCy('welcome-last-name')
            .type(userFirstLoginDoingWelcomeTutorialProfile.last_name as string)

            cy.getDataCy('step1navigateToProfileStep')
            .shouldBeVisible()

            cy.getDataCy('step1closeTutorial')
            .shouldBeVisible()
            .click()
        })

        it('can save their tutorial progress and load their progress', (): void => {
            cy.signIn(userFirstLoginDoingWelcomeTutorialAuth);
            cy.interceptSupabaseCall('select_assistant')
            .as('loadAssistant')
            cy.interceptSupabaseCall('select_user')
            .as('loadUser')
            cy.wait(['@loadAssistant', '@loadUser'])

            cy.getDataCy('assistant-profile-dialog')
            .shouldBeVisible()
            .click()

            cy.getDataCy('welcome-name-headline')
            .shouldBeVisible()
        })

        it('do a tutorial about their profile settings', (): void => {
            cy.resetSupabase()
            cy.signIn(userDoingProfileTutorialAuth);
            cy.interceptSupabaseCall('select_assistant')
            .as('loadAssistant')
            cy.interceptSupabaseCall('select_user')
            .as('loadUser')
            cy.wait(['@loadAssistant', '@loadUser'])

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
            cy.resetSupabase()
            cy.signIn(userDoingSearchTutorialAuth);
            cy.interceptSupabaseCall('select_assistant')
            .as('loadAssistant')
            cy.interceptSupabaseCall('select_user')
            .as('loadUser')
            cy.wait(['@loadAssistant', '@loadUser'])

            cy.getDataCy('assistant-search-dialog')
            .shouldBeVisible()
            .click()

            cy.getDataCy('tutorial-search-headline')
            .shouldBeVisible()
            .click()

            cy.getDataCy('step3closeAndSkipTutorial')
            .scrollIntoView()

            cy.interceptSupabaseCall('update_skip_tutorial').as('skipTutorial')
            cy.interceptSupabaseCall('update_last_tutorial').as('lastTutorial')
            cy.getDataCy('step3navigateToSearchPage')
            .scrollIntoView()
            .click()
            cy.wait(['@skipTutorial', '@lastTutorial'])

            cy.getDataCy('search-instruction')
            .shouldBeVisible()
        })

        it('can open the tutorial from profile settings again ', (): void => {
            cy.resetSupabase()
            cy.signIn(userRestartingTutorialAuth);
            cy.interceptSupabaseCall('select_assistant')
            .as('loadAssistant')
            cy.interceptSupabaseCall('select_user')
            .as('loadUser')
            cy.wait(['@loadAssistant', '@loadUser'])

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

        it('can reject the tutorial and will not see it again ', (): void => {
            cy.resetSupabase()
            cy.signIn(userDoingProfileTutorialAuth);
            cy.interceptSupabaseCall('select_assistant')
            .as('loadAssistant')
            cy.interceptSupabaseCall('select_user')
            .as('loadUser')
            cy.wait(['@loadAssistant', '@loadUser'])

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

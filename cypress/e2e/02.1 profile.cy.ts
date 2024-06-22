import {Size, Sizes} from '../fixtures/size';
import {AUTH_DATA7, AuthData} from '../../seed_and_test_data/01_test_auth';
import {Profile, PROFILE2, PROFILE7} from '../../seed_and_test_data/02_test_profiles';

const userWhoEditsItsProfileAuthData: AuthData = AUTH_DATA7;
const userWhoEditsItsProfileProfileData: Profile = PROFILE7;
const userWhosProfileIsChecked: Profile = PROFILE2;

Sizes.forEach((size: Size): void => {
    describe(`Profile tests with screen size ${size.width} show that users can `, (): void => {

        before((): void => {
            cy.resetSupabase();
        });

        beforeEach((): void => {
            cy.viewport(size.width, size.height);
            cy.visit('landing/sign-in');
            cy.signIn(userWhoEditsItsProfileAuthData);
        });

        const newFirstName: string = userWhoEditsItsProfileProfileData.first_name as string + Math.random();
        const newlastName: string = userWhoEditsItsProfileProfileData.last_name as string + Math.random();

        it('edit its own profile data.', (): void => {
            cy.getDataCy('nav-profile-edit', 'nav-profile-edit-desktop')
              .filter(':visible')
              .first()
              .click();
            cy.getDataCy('edit-instruction')
              .shouldBeVisible();

            cy.interceptSupabaseCall('profiles_update').as('updateProfile');
            cy.getDataCy('first-name').clear();
            cy.getDataCy('first-name').type(newFirstName);
            cy.getDataCy('last-name').clear();
            cy.getDataCy('last-name').type(newFirstName);
            cy.getDataCy('update').click();

            cy.contains('Profile updated!')
              .should('be.visible');
            cy.wait('@updateProfile');
        });

        it('view its own profile.', (): void => {
            cy.getDataCy('first-name')
              .shouldBeVisible()
              .contains(newFirstName)
              .contains(newFirstName);
        });

        it('change its profile image.', (): void => {
            cy.interceptSupabaseCall('profiles_read_notification_settings').as('readNotificationSettings');

            cy.getDataCy('nav-profile-edit', 'nav-profile-edit-desktop')
              .filter(':visible')
              .first()
              .click();
            cy.getDataCy('edit-instruction')
              .shouldBeVisible();

            cy.wait('@readNotificationSettings');

            //TODO not working
            // cy.getDataCy('uploaded-image')
            //   .shouldBeVisible()
            //   .selectFile('cypress/fixtures/test_profile_img_upload_file.png', {action: 'drag-drop'});
            //
            // cy.getDataCy('loading');
            //
            // cy.getDataCy('uploaded-image')
            //   .shouldBeVisible();

            cy.getDataCy('nav-profile-wiki', 'nav-profile-wiki-desktop')
              .filter(':visible')
              .first()
              .click();

            //    TODO: Add a more specific test how to check that the image upload worked
            // https://stackoverflow.com/questions/50283857/using-cypress-how-would-i-write-a-simple-test-to-check-that-a-logo-image-exists
            // cy.getDataCy('profile-image')
            //   .shouldBeVisible();
        });

        it('view other user profiles', (): void => {
            cy.openSearchTab();
            cy.getDataCy('search').type(userWhosProfileIsChecked.first_name as string);
            cy.getDataCy('user-search-results')
              .find('polity-search-profile-result')
              .shouldBeVisible()
              .contains(userWhosProfileIsChecked.first_name as string)
              .click();
            cy.getDataCy('first-name')
              .shouldBeVisible()
              .contains(userWhosProfileIsChecked.first_name as string);
            cy.getDataCy('first-name')
              .shouldBeVisible()
              .contains(userWhosProfileIsChecked.last_name as string);
        });

        it('not edit other users profiles', (): void => {
            cy.openSearchTab();
            cy.getDataCy('search').type(userWhosProfileIsChecked.first_name as string);
            cy.getDataCy('user-search-results')
              .find('polity-search-profile-result')
              .shouldBeVisible()
              .contains(userWhosProfileIsChecked.first_name as string)
              .click();
            cy.getDataCy('nav-profile-edit', 'nav-profile-edit-desktop')
              .should('not.exist');
        });
    });
});

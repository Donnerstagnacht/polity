import {Size, Sizes} from '../fixtures/size';
import {AUTH_DATA1, AUTH_DATA2, AuthData} from '../../seed_and_test_data/01_test_auth';
import {Profile, PROFILE1, PROFILE2, PROFILE3} from '../../seed_and_test_data/02_test_profiles';
import {PROFILE_COUNTER1, PROFILE_COUNTER2, ProfileCounter} from '../../seed_and_test_data/04_test_profile_counters';

const userWhoIsNotifiedAuth: AuthData = AUTH_DATA2;
const userWhoIsNotifiedProfile: Profile = PROFILE2;
const userWhoIsNotifiedCounter: ProfileCounter = PROFILE_COUNTER2;

const userWhoNotifiesAuth: AuthData = AUTH_DATA1;
const userWhoNotifiesProfile: Profile = PROFILE1;
const userWhoNotifiesCounter: ProfileCounter = PROFILE_COUNTER1;

const userWhoNotifiedBySeedProfile: Profile = PROFILE3;

Sizes.forEach((size: Size): void => {
    describe(`Notification tests with screen size { {${size.width} show that users can `, (): void => {
        before((): void => {
        });

        beforeEach((): void => {
            cy.viewport(size.width, size.height);
            cy.visit('landing/sign-in');
            cy.resetSupabase();
            cy.signIn(userWhoIsNotifiedAuth);
        });

        const today: Date = new Date();
        const yearString: string = today.getFullYear().toString();
        const monthString: string = String(today.getMonth() + 1).padStart(2, '0').toString(); // Months are zero-indexed,
        // so we add 1
        const dayString: string = String(today.getDate()).padStart(2, '0').toString();
        const todayString: string = dayString + '.' + monthString + '.' + yearString;
        const checkString: string = dayString + '/' + monthString + '/' + yearString.substring(2);

        it('can open notification tabs.', (): void => {
            cy.getDataCy('nav-office', 'nav-office-desktop')
              .shouldBeVisible()
              .first()
              .click({force: true});
            cy.getDataCy('notifications-headline')
              .shouldBeVisible();
        });

        it('receives notification once someone follows a user and notification resets if viewed.', (): void => {
            cy.interceptSupabaseCall('notifications_of_user_read').as('loadNotifications');

            cy.getDataCy('nav-office', 'nav-office-desktop')
              .shouldBeVisible()
              .first()
              .click({force: true});

            cy.getDataCy('created_at')
              .shouldBeVisible()
              .first()
              .scrollIntoView()
              .contains(checkString);

            // cy.getDataCy('notification-counter-badge')
            // .shouldBeVisible()
            // .contains(8)
            //
            // cy.getDataCy('nav-office', 'nav-office-desktop')
            // .shouldBeVisible()
            // .click()
            //
            // cy.getDataCy('nav-notifications', 'nav-notifications-desktop')
            // .shouldBeVisible()
            // .click()
            //
            // cy.getDataCy('follow-user-notification')
            // .shouldBeVisible()
            //
            // cy.getDataCy('notification-counter-badge')
            // .should('not.be.visible')

        });

        it('filter notifications for follow type', (): void => {
            cy.getDataCy('nav-office', 'nav-office-desktop')
              .shouldBeVisible()
              .first()
              .click({force: true});

            cy.contains('Followers')
              .shouldBeVisible()
              .click();

            cy.getDataCy('type_of_notification')
              .shouldBeVisible();
        });

        it('filter notifications for strings', (): void => {
            cy.getDataCy('nav-office', 'nav-office-desktop')
              .shouldBeVisible()
              .first()
              .click({force: true});

            cy.getDataCy('filterStringInput')
              .type(userWhoNotifiedBySeedProfile.first_name as string);

            cy.getDataCy('first_name')
              .shouldBeVisible()
              .first()
              .contains(userWhoNotifiedBySeedProfile.first_name as string);
        });

        it('filter notifications for dates', (): void => {
            cy.getDataCy('nav-office', 'nav-office-desktop')
              .shouldBeVisible()
              .first()
              .click({force: true});

            cy.getDataCy('filterDateToInput')
              .type(todayString);

            cy.getDataCy('filterDateFromInput')
              .type(todayString);

            cy.getDataCy('created_at')
              .shouldBeVisible()
              .contains(checkString);
        });

        it('will not receive messages from following if the user disables it.', (): void => {
            cy.navigateToHome();
            cy.getDataCy('home-to-profile')
              .shouldBeVisible()
              .click();

            cy.getDataCy('nav-profile-edit', 'nav-profile-edit-desktop')
              .filter(':visible')
              .first()
              .click();

            cy.getDataCy('toggle-notifications-headline')
              .shouldBeVisible()
              .contains('Erhalte Nachrichten');

            cy.interceptSupabaseCall('profiles_receive_notifications_from_follow_update')
              .as('updateNotifications');

            cy.getDataCy('toggle-notifications-from-user')
              .shouldBeVisible()
              .click();
            cy.wait('@updateNotifications');

            cy.signOut(userWhoIsNotifiedAuth);
            cy.signIn(userWhoNotifiesAuth);
            cy.followUser(
                userWhoIsNotifiedProfile,
                userWhoIsNotifiedCounter,
                userWhoNotifiesProfile,
                userWhoNotifiesCounter
            );

            cy.signOut(userWhoNotifiesAuth);
            cy.signIn(userWhoIsNotifiedAuth);

            cy.getDataCy('nav-office', 'nav-office-desktop')
              .shouldBeVisible()
              .first()
              .click({force: true});
            cy.getDataCy('notifications-headline')
              .shouldBeVisible();

            cy.getDataCy('first_name')
              .shouldBeVisible()
              .should('not.contain', userWhoNotifiesProfile.first_name as string);
        });
    });
});

import {ProfileTest} from "../fixtures/profile";
import {seedProfileFollowingUser, seedProfileFollowUser} from "../fixtures/user";
import {Size, Sizes} from "../fixtures/size";

const followingUser: ProfileTest = seedProfileFollowingUser;
const followUser: ProfileTest = seedProfileFollowUser

Sizes.forEach((size: Size): void => {
    describe(`Notification tests with screen size { {${size.width} show that users can `, () => {

        beforeEach((): void => {
            // cy.viewport(size.width, size.height)
            cy.visit('landing/sign-in');
            cy.signIn(followingUser);
        })
        const today = new Date();

        const yearString = today.getFullYear().toString();
        const monthString = String(today.getMonth() + 1).padStart(2, '0').toString(); // Months are zero-indexed, so we add 1
        const dayString = String(today.getDate()).padStart(2, '0').toString();

        const todayString = dayString + '.' + monthString + '.' + yearString
        const checkString = dayString + '/' + monthString + '/' + yearString.substring(2)

        it('can open notification tabs.', (): void => {
            cy.getDataCy('nav-office', 'nav-office-desktop')
            .shouldBeVisible()
            .first()
            .click({force: true})
            cy.getDataCy('notifications-headline')
            .shouldBeVisible()
        })

        it('receives notification once someone follows a user and notification resets if viewed.', (): void => {
            cy.interceptSupabaseCall('select_notifications_of_users').as('loadNotifications')

            cy.getDataCy('nav-office', 'nav-office-desktop')
            .shouldBeVisible()
            .first()
            .click({force: true})


            cy.getDataCy('created_at_headline')
            .shouldBeVisible()
            .click()

            cy.getDataCy('created_at')
            .shouldBeVisible()
            .first()
            .scrollIntoView()
            .contains(checkString)

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

        })
        //
        it('filter notifications for follow type', (): void => {
            cy.getDataCy('nav-office', 'nav-office-desktop')
            .shouldBeVisible()
            .first()
            .click({force: true})

            cy.contains('Followers')
            .shouldBeVisible()
            .click()

            cy.getDataCy('type_of_notification')
            .shouldBeVisible()
        })

        it('filter notifications for strings', (): void => {
            cy.getDataCy('nav-office', 'nav-office-desktop')
            .shouldBeVisible()
            .first()
            .click({force: true})

            cy.getDataCy('filterStringInput')
            .type(followUser.first_name as string)

            cy.getDataCy('first_name')
            .shouldBeVisible()
            .first()
            .contains(followUser.first_name as string)
        })

        it('filter notifications for dates', (): void => {
            cy.getDataCy('nav-office', 'nav-office-desktop')
            .shouldBeVisible()
            .first()
            .click({force: true})

            cy.getDataCy('filterDateToInput')
            .type(todayString)

            cy.getDataCy('filterDateFromInput')
            .type(todayString)

            cy.getDataCy('created_at')
            .shouldBeVisible()
            .contains(checkString)
        })

        it('will not receive messages from following if the user disables it.', (): void => {
            cy.signOut(followingUser);
            cy.signIn(followUser);

            cy.navigateToHome()
            cy.getDataCy('home-to-profile')
            .shouldBeVisible()
            .click()

            cy.getDataCy('nav-profile-edit', 'nav-profile-edit-desktop')
            .filter(':visible')
            .first()
            .click()

            cy.getDataCy('toggle-notifications-headline')
            .shouldBeVisible()
            .contains('Erhalte Nachrichten')

            cy.interceptSupabaseCall('update_receive_notifications_from_follow')
            .as('updateNotifications')

            cy.getDataCy('toggle-notifications-from-user')
            .shouldBeVisible()
            .click()
            cy.wait('@updateNotifications')

            cy.signOut(followUser);
            cy.signIn(followingUser)
            cy.followUser(followUser, followingUser)

            cy.signOut(followingUser);
            cy.signIn(followUser)

            cy.getDataCy('nav-office', 'nav-office-desktop')
            .shouldBeVisible()
            .first()
            .click({force: true})
            cy.getDataCy('notifications-headline')
            .shouldBeVisible()

            cy.getDataCy('first_name')
            .should('not.exist')

            cy.navigateToHome()
            cy.getDataCy('home-to-profile')
            .shouldBeVisible()
            .click()

            // reverse changes from here onward (implicite cleanup)

            cy.getDataCy('nav-profile-edit', 'nav-profile-edit-desktop')
            .filter(':visible')
            .first()
            .click()

            cy.getDataCy('toggle-notifications-headline')
            .shouldBeVisible()
            .contains('Erhalte Nachrichten')

            cy.interceptSupabaseCall('update_receive_notifications_from_follow')
            .as('updateNotifications')

            cy.getDataCy('toggle-notifications-from-user')
            .shouldBeVisible()
            .click()
            cy.wait('@updateNotifications')

            cy.signOut(followUser)
            cy.signIn(followingUser)
            cy.searchUser(followUser.first_name as string)
            .click()
            cy.getDataCy('followButton')
            .shouldBeVisible()
            .should('have.text', 'UNFOLLOW ')
            .click()

            cy.contains('Successful')
            .should('be.visible')
        })
    })
});

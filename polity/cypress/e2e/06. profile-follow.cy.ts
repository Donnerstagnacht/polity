import {ProfileTest} from "../../src/app/features/profile/types-and-interfaces/profile";
import {seedProfileFollowingUser, seedProfileFollowUser, seedReadUser2} from "../fixtures/user";
import {Size, Sizes} from "../fixtures/size";

const readUser: ProfileTest = seedReadUser2;
const followUser: ProfileTest = seedProfileFollowUser;
const followingUser: ProfileTest = seedProfileFollowingUser

// ATTENTION
// These test depend on the search and auth tests.
// These test depend on each other, e.g. unfollow test only work if follow test works

Sizes.forEach((size: Size): void => {
    describe(`Profile follow tests with screen size ${size.width} show that users can `, () => {
        beforeEach((): void => {
            cy.signIn(followUser);
        })

        it('view other users followers and followings', () => {
            cy.searchUser(readUser.first_name as string)
            .click()

            cy.getDataCy('first-name')
            .shouldBeVisible()
            .contains(readUser.first_name as string)

            cy.getDataCy('followerCounter')
            .shouldBeVisible()
            .contains(readUser.follower_counter)

            cy.getDataCy('followingCounter')
            .shouldBeVisible()
            .contains(readUser.following_counter)
        })

        it('follow other users', () => {
            cy.followUser(followingUser, followUser);
        })

        it('unfollow another user', () => {
            cy.searchUser(followingUser.first_name as string)
            .click()

            cy.intercept('POST', 'https://qwetlgmbngpopdcgravw.supabase.co/rest/v1/rpc/check_if_following').as('isFollowing')
            cy.intercept('POST',
                'https://qwetlgmbngpopdcgravw.supabase.co/rest/v1/rpc/select_following_counter')
            .as('followingCounter')
            cy.wait(['@followingCounter', '@isFollowing'])

            cy.getDataCy('first-name')
            .shouldBeVisible()
            .contains(followingUser.first_name as string)

            cy.intercept('POST',
                'https://qwetlgmbngpopdcgravw.supabase.co/rest/v1/rpc/unfollow_transaction')
            .as('unfollowTransaction')

            cy.getDataCy('followProfileButton')
            .shouldBeVisible()
            .should('have.text', 'UNFOLLOW')
            .click()

            cy.wait('@unfollowTransaction')

            cy.getDataCy('followProfileButton')
            .shouldBeVisible()
            .should('have.text', 'FOLLOW')

            cy.getDataCy('followerCounter')
            .shouldBeVisible()
            .contains(readUser.follower_counter)   // add -1 if this test does not depend on following test to pass

            cy.searchUser(followUser.first_name as string)
            .click()

            cy.getDataCy('first-name')
            .shouldBeVisible()
            .contains(followUser.first_name as string)

            cy.getDataCy('followingCounter')
            .shouldBeVisible()
            .contains(readUser.following_counter)  // add -1 if this test does not depend on following test to pass
        })

        it('remove a following from management tab', () => {
            cy.followUser(followingUser, followUser);
            cy.navigateToHome();
            cy.contains(followUser.first_name as string)
            .click();

            cy.intercept('POST', 'https://qwetlgmbngpopdcgravw.supabase.co/rest/v1/rpc/select_following_of_user').as('loadFollowingOfUser')
            cy.getDataCy('nav-follower-edit')
            .shouldBeVisible()
            .click()
            cy.wait(['@loadFollowingOfUser'])

            cy.getDataCy('show-followings')
            .shouldBeVisible()
            .click()

            cy.getDataCy('following-first-name')
            .shouldBeVisible()
            .contains(followingUser.first_name as string)

            cy.intercept('POST', 'https://qwetlgmbngpopdcgravw.supabase.co/rest/v1/rpc/unfollow_transaction').as('unfollowUser')
            cy.getDataCy('following-remove')
            //  cy.contains(followingUser.first_name)
            // .find('[data-cy="following-remove"]')
            .first()
            .shouldBeVisible()
            .click()
            cy.wait('@unfollowUser')

            cy.contains(followingUser.first_name as string)
            .should('not.exist')
        })

        it('remove a follower from management tab', () => {
            cy.followUser(followingUser, followUser);
            cy.signOut(followUser)
            cy.signIn(followingUser)
            cy.navigateToHome();
            cy.contains(followingUser.first_name as string)
            .click();

            cy.intercept('POST', 'https://qwetlgmbngpopdcgravw.supabase.co/rest/v1/rpc/select_follower_of_user').as('loadFollowerOfUser')
            cy.getDataCy('nav-follower-edit')
            .shouldBeVisible()
            .click()
            cy.wait(['@loadFollowerOfUser'])

            cy.getDataCy('show-follower')
            .shouldBeVisible()
            .click()

            cy.getDataCy('follower-first-name')
            .shouldBeVisible()
            .contains(followUser.first_name as string)

            cy.intercept('POST', 'https://qwetlgmbngpopdcgravw.supabase.co/rest/v1/rpc/unfollow_transaction').as('unfollowUser')
            cy.getDataCy('follower-remove')
            // cy.contains(followUser.first_name)
            // .find('[data-cy="follower-remove"]')
            .shouldBeVisible()
            .first()
            .click()
            cy.wait(['@unfollowUser'])

            cy.contains(followUser.first_name as string)
            .should('not.exist')
        })
    })
})

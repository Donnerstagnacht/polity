import {Size, Sizes} from "../fixtures/size";
import {AUTH_DATA1, AUTH_DATA2, AUTH_DATA3, AuthData} from "../../seed_and_test_data/01_test_auth";
import {Profile, PROFILE1, PROFILE2, PROFILE3} from "../../seed_and_test_data/02_test_profiles";
import {
    PROFILE_COUNTER1,
    PROFILE_COUNTER2,
    PROFILE_COUNTER3,
    ProfileCounter
} from "../../seed_and_test_data/04_test_profile_counters";

const userWhoFollowsAuth: AuthData = AUTH_DATA1;
const userWhoFollowsProfile: Profile = PROFILE1;
const userWhoFollowsCounter: ProfileCounter = PROFILE_COUNTER1;

const userWhoIsFollowedAuth: AuthData = AUTH_DATA2;
const userWhoIsFollowedProfile: Profile = PROFILE2;
const userWhoIsFollowedCounter: ProfileCounter = PROFILE_COUNTER2;

const userWhoIsUnFollowedAuth: AuthData = AUTH_DATA3;
const userWhoIsUnFollowedProfile: Profile = PROFILE3;
const userWhoIsUnFollowedCounter: ProfileCounter = PROFILE_COUNTER3;

// ATTENTION
// These test depend on the search and auth tests.
// These test depend on each other, e.g. unfollow test only work if follow test works

Sizes.forEach((size: Size): void => {
    describe(`Profile follow tests with screen size ${size.width} show that users can `, () => {
        before((): void => {
        })

        beforeEach((): void => {
            cy.viewport(size.width, size.height)
            cy.resetSupabase()
            cy.visit('landing/sign-in');
            cy.signIn(userWhoFollowsAuth);
        })

        it('view other users followers and followings', (): void => {
            cy.searchUser(userWhoIsFollowedProfile.first_name as string)
            .click()

            cy.getDataCy('first-name')
            .shouldBeVisible()
            .contains(userWhoIsFollowedProfile.first_name as string)

            cy.getDataCy('followerCounter')
            .shouldBeVisible()
            .contains(userWhoIsFollowedCounter.follower_counter)

            cy.getDataCy('followingCounter')
            .shouldBeVisible()
            .contains(userWhoIsFollowedCounter.following_counter)
        })

        it('follow other users', (): void => {
            cy.followUser(
                userWhoIsFollowedProfile,
                userWhoIsFollowedCounter,
                userWhoFollowsProfile,
                userWhoFollowsCounter
            );
        })

        it('unfollow another user', (): void => {

            cy.interceptSupabaseCall('select_user')
            .as('selectUser')
            cy.interceptSupabaseCall('check_if_following')
            .as('isFollowing')
            cy.interceptSupabaseCall('select_following_counter')
            .as('followingCounter')

            cy.searchUser(userWhoIsUnFollowedProfile.first_name as string)
            .click()
            cy.wait(['@followingCounter', '@isFollowing', '@selectUser'])

            cy.getDataCy('first-name')
            .shouldBeVisible()
            .contains(userWhoIsUnFollowedProfile.first_name as string)

            cy.interceptSupabaseCall('unfollow_transaction')
            .as('unfollowTransaction')

            cy.getDataCy('followButton')
            .shouldBeVisible()
            .should('have.text', 'UNFOLLOW ')
            .click()

            cy.wait('@unfollowTransaction')
            cy.contains('Successful unfollowed')
            .should('be.visible')

            cy.getDataCy('followButton')
            .shouldBeVisible()
            .should('have.text', 'FOLLOW ')

            cy.getDataCy('followerCounter')
            .shouldBeVisible()
            .contains(userWhoIsUnFollowedCounter.follower_counter - 1)

            cy.searchUser(userWhoFollowsProfile.first_name as string)
            .click()

            cy.getDataCy('first-name')
            .shouldBeVisible()
            .contains(userWhoFollowsProfile.first_name as string)

            cy.getDataCy('followingCounter')
            .shouldBeVisible()
            .contains(userWhoFollowsCounter.following_counter - 1)
        })

        it('remove a following from management tab', (): void => {
            cy.navigateToHome();
            cy.contains(userWhoFollowsProfile.first_name as string)
            .click();

            cy.interceptSupabaseCall('select_following_of_user').as('loadFollowingOfUser')

            cy.getDataCy('nav-follower-edit')
            .shouldBeVisible()
            .click()
            cy.wait(['@loadFollowingOfUser'])

            cy.getDataCy('show-followings')
            .shouldBeVisible()
            .click()

            cy.interceptSupabaseCall('unfollow_transaction').as('unfollowUser')

            cy.getDataCy('following_first_name')
            .shouldBeVisible()
            .contains(userWhoIsUnFollowedProfile.first_name as string)
            .next()
            .children()
            .first()
            .click()
            cy.wait('@unfollowUser')

            cy.contains(userWhoIsUnFollowedProfile.first_name as string)
            .should('not.exist')
        })

        it('remove a follower from management tab', () => {
            cy.navigateToHome();

            cy.getDataCy('home-to-profile')
            .shouldBeVisible()
            .click();

            cy.interceptSupabaseCall('select_follower_of_user').as('loadFollowerOfUser')
            cy.getDataCy('nav-follower-edit')
            .shouldBeVisible()
            .click()
            cy.wait(['@loadFollowerOfUser'])

            cy.getDataCy('show-follower')
            .shouldBeVisible()
            .click()

            cy.interceptSupabaseCall('remove_follower_transaction').as('unfollowUser')
            cy.getDataCy('follower_first_name')
            .shouldBeVisible()
            .contains(userWhoIsUnFollowedProfile.first_name as string)
            .next()
            .children()
            .first()
            .click()
            cy.wait(['@unfollowUser'])

            cy.contains(userWhoIsUnFollowedProfile.first_name as string)
            .should('not.exist')
        })
    })
})

import {Size, Sizes} from '../fixtures/size';
import {AUTH_DATA2, AUTH_DATA3, AUTH_DATA7, AuthData} from '../../seed_and_test_data/01_test_auth';
import {Profile, PROFILE2, PROFILE3, PROFILE7} from '../../seed_and_test_data/02_test_profiles';
import {
    PROFILE_COUNTER2,
    PROFILE_COUNTER3,
    PROFILE_COUNTER7,
    ProfileCounter
} from '../../seed_and_test_data/04_test_profile_counters';

const userWhoFollowsAuth: AuthData = AUTH_DATA7;
const userWhoFollowsProfile: Profile = PROFILE7;
const userWhoFollowsCounter: ProfileCounter = PROFILE_COUNTER7;

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
    describe(`Profile follow tests with screen size ${size.width} show that users can `, (): void => {
        before((): void => {
        });

        beforeEach((): void => {
            cy.viewport(size.width, size.height);
            cy.resetSupabase();
            cy.visit('landing/sign-in');
            cy.signIn(userWhoFollowsAuth);
        });

        it('view other users followers and followings', (): void => {
            cy.searchUser(userWhoIsFollowedProfile.first_name as string)
              .click();

            cy.getDataCy('first-name')
              .shouldBeVisible()
              .contains(userWhoIsFollowedProfile.first_name as string);

            cy.getDataCy('follower-counter')
              .shouldBeVisible()
              .contains(userWhoIsFollowedCounter.follower_counter);

            cy.getDataCy('following-counter')
              .shouldBeVisible()
              .contains(userWhoIsFollowedCounter.following_counter);
        });

        it('follow other users', (): void => {
            cy.followUser(
                userWhoIsFollowedProfile,
                userWhoIsFollowedCounter,
                userWhoFollowsProfile,
                userWhoFollowsCounter
            );
        });

        it('unfollow another user', (): void => {

            cy.interceptSupabaseCall('profiles_read')
              .as('readProfile');
            cy.interceptSupabaseCall('check_if_user_follows_profile')
              .as('isFollowing');
            cy.interceptSupabaseCall('profile_counters_read')
              .as('following-counter');

            cy.searchUser(userWhoIsUnFollowedProfile.first_name)
              .click();
            cy.wait(['@following-counter', '@isFollowing', '@readProfile']);

            cy.getDataCy('first-name')
              .shouldBeVisible()
              .contains(userWhoIsUnFollowedProfile.first_name);

            cy.interceptSupabaseCall('unfollow_profile_transaction')
              .as('unfollowTransaction');

            cy.getDataCy('follow-button')
              .shouldBeVisible()
              .should('have.text', 'UNFOLLOW ')
              .click();

            cy.wait('@unfollowTransaction');
            cy.contains('Successful unfollowed')
              .should('be.visible');

            cy.getDataCy('follow-button')
              .shouldBeVisible()
              .should('have.text', 'FOLLOW ');

            cy.getDataCy('follower-counter')
              .shouldBeVisible()
              .contains(userWhoIsUnFollowedCounter.follower_counter - 1);

            cy.searchUser(userWhoFollowsProfile.first_name)
              .click();

            cy.getDataCy('first-name')
              .shouldBeVisible()
              .contains(userWhoFollowsProfile.first_name);

            cy.getDataCy('following-counter')
              .shouldBeVisible()
              .contains(userWhoFollowsCounter.following_counter - 1);
        });

        it('remove a following from management tab', (): void => {
            cy.navigateToHome();
            cy.interceptSupabaseCall('check_if_user_follows_profile')
              .as('isFollowing');
            cy.interceptSupabaseCall('profile_counters_read')
              .as('following-counter');
            cy.interceptSupabaseCall('profiles_read')
              .as('user');
            cy.contains(userWhoFollowsProfile.first_name)
              .click();
            cy.wait(['@isFollowing', '@following-counter', '@user']);

            cy.interceptSupabaseCall('profile_followers_of_user_read').as('loadFollowerOfUser');

            console.log('size width', size.width);
            console.log('sizes[2] width', Sizes[2].width);

            if (size.width === Sizes[2].width) {
                cy.getDataCy('nav-follower-edit-desktop')
                  .shouldBeVisible()
                  .click();
            } else {
                cy.getDataCy('nav-follower-edit')
                  .shouldBeVisible()
                  .click();
            }
            cy.wait(['@loadFollowerOfUser']);

            cy.getDataCy('show-followings')
              .shouldBeVisible()
              .click();

            cy.interceptSupabaseCall('unfollow_profile_transaction').as('unfollowUser');

            cy.getDataCy('following_first_name')
              .shouldBeVisible()
              .contains(userWhoIsUnFollowedProfile.first_name)
              .next()
              .children()
              .first()
              .click();
            cy.wait('@unfollowUser');

            cy.contains(userWhoIsUnFollowedProfile.first_name)
              .should('not.exist');
        });

        it('remove a follower from management tab', (): void => {
            cy.navigateToHome();
            cy.interceptSupabaseCall('check_if_user_follows_profile')
              .as('isFollowing');
            cy.interceptSupabaseCall('profile_counters_read')
              .as('following-counter');
            cy.interceptSupabaseCall('profiles_read')
              .as('user');
            cy.getDataCy('home-to-profile')
              .shouldBeVisible()
              .click();
            cy.wait(['@isFollowing', '@following-counter', '@user']);

            cy.interceptSupabaseCall('profile_followers_of_user_read').as('loadFollowerOfUser');
            if (size.width === Sizes[2].width) {
                cy.getDataCy('nav-follower-edit-desktop')
                  .shouldBeVisible()
                  .click();
            } else {
                cy.getDataCy('nav-follower-edit')
                  .shouldBeVisible()
                  .click();
            }
            cy.wait(['@loadFollowerOfUser']);

            cy.getDataCy('show-follower')
              .shouldBeVisible()
              .click();

            cy.interceptSupabaseCall('remove_follower_of_authenticated_user_transaction').as('unfollowUser');
            cy.getDataCy('follower_first_name')
              .shouldBeVisible()
              .contains(userWhoIsUnFollowedProfile.first_name)
              .next()
              .children()
              .first()
              .click();
            cy.wait(['@unfollowUser']);

            cy.contains(userWhoIsUnFollowedProfile.first_name)
              .should('not.exist');
        });
    });
});

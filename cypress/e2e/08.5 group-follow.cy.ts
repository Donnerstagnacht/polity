import {AUTH_DATA1, AUTH_DATA2, AuthData} from '../../seed_and_test_data/01_test_auth';
import {Profile, PROFILE1, PROFILE2} from '../../seed_and_test_data/02_test_profiles';
import {PROFILE_COUNTER1, ProfileCounter} from '../../seed_and_test_data/04_test_profile_counters';
import {Group, GROUP2, GROUP3} from '../../seed_and_test_data/07_test_groups';
import {GROUP_COUNTER2, GROUP_COUNTER3, GroupCounter} from '../../seed_and_test_data/11_test_group_counters';
import {Size, Sizes} from '../fixtures/size';

const userWhoFollowsAuth: AuthData = AUTH_DATA1;
const userWhoFollowsProfile: Profile = PROFILE1;
const userWhoFollowsCounter: ProfileCounter = PROFILE_COUNTER1;

const groupAdminAuth: AuthData = AUTH_DATA2;
const groupAdminProfile: Profile = PROFILE2;

const groupWhichIsFollowed: Group = GROUP3;
const groupWhichIsFollowedCounter: GroupCounter = GROUP_COUNTER3;

const groupWhichIsUnFollowed: Group = GROUP2;
const groupWhichIsUnFollowedCounter: GroupCounter = GROUP_COUNTER2;

Sizes.forEach((size: Size): void => {
    describe(`Group follow tests with screen size ${size.width} show `, (): void => {
        before((): void => {
        });

        beforeEach((): void => {
            // cy.viewport(size.width, size.height)
            cy.resetSupabase();
            cy.visit('landing/sign-in');
        });

        it('that users can view other groups followers and followings', (): void => {
            cy.signIn(userWhoFollowsAuth);
            cy.searchGroup(groupWhichIsFollowed.name)
              .click();

            cy.getDataCy('first-name')
              .shouldBeVisible()
              .contains(groupWhichIsFollowed.name);

            cy.getDataCy('follower-counter')
              .shouldBeVisible()
              .contains(groupWhichIsFollowedCounter.follower_counter);

            // cy.getDataCy('following-counter')
            // .shouldBeVisible()
            // .contains(groupWhichIsFollowedCounter.following_counter)
        });

        it('that users can follow other groups', (): void => {
            cy.signIn(userWhoFollowsAuth);
            cy.followGroup(
                groupWhichIsFollowed,
                groupWhichIsFollowedCounter,
                userWhoFollowsProfile,
                userWhoFollowsCounter
            );
        });

        it('that users can unfollow another groups', (): void => {
            cy.signIn(userWhoFollowsAuth);

            cy.interceptSupabaseCall('group_read')
              .as('readGroup');
            cy.interceptSupabaseCall('check_if_user_follows_group')
              .as('checkIfFollowingGroup');
            cy.interceptSupabaseCall('group_counters_read')
              .as('readGroupCounter');

            cy.searchGroup(groupWhichIsUnFollowed.name)
              .click();
            cy.wait(['@readGroup', '@checkIfFollowingGroup', '@readGroupCounter']);

            cy.getDataCy('first-name')
              .shouldBeVisible()
              .contains(groupWhichIsUnFollowed.name);

            cy.interceptSupabaseCall('unfollow_group_transaction')
              .as('unfollowGroupTransaction');

            cy.getDataCy('follow-button')
              .shouldBeVisible()
              .should('have.text', 'UNFOLLOW ')
              .click();

            cy.wait('@unfollowGroupTransaction');
            cy.contains('Successful unfollowed')
              .should('be.visible');

            cy.getDataCy('follow-button')
              .shouldBeVisible()
              .should('have.text', 'FOLLOW ');

            cy.getDataCy('follower-counter')
              .shouldBeVisible()
              .contains(groupWhichIsUnFollowedCounter.follower_counter - 1);

            cy.searchUser(userWhoFollowsProfile.first_name)
              .click();

            cy.getDataCy('first-name')
              .shouldBeVisible()
              .contains(userWhoFollowsProfile.first_name);

            cy.getDataCy('following-counter')
              .shouldBeVisible()
              .contains(userWhoFollowsCounter.following_counter - 1);
        });

        it('that users can remove a following from management tab', (): void => {
            cy.signIn(userWhoFollowsAuth);

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

            cy.interceptSupabaseCall('profile_followings_of_user_read').as('loadFollowingsOfUser');

            console.log('size width', size.width);
            console.log('sizes[2] width', Sizes[2].width);

            cy.getDataCy('nav-follower-edit', 'nav-follower-edit-desktop')
              .filter(':visible')
              .click();
            // cy.wait(['@loadFollowingOfUser'])

            cy.getDataCy('show-following-groups')
              .shouldBeVisible()
              .click();

            cy.interceptSupabaseCall('unfollow_group_transaction').as('unfollowGroupUser');

            cy.getDataCy('following_group_name')
              .shouldBeVisible()
              .contains(groupWhichIsUnFollowed.name)
              .next()
              .children()
              .first()
              .click();
            cy.wait('@unfollowGroupUser');

            cy.contains(groupWhichIsUnFollowed.name)
              .should('not.exist');
        });

        it('that group admins can remove a follower from management tab', (): void => {
            cy.signIn(groupAdminAuth);

            cy.searchGroup(groupWhichIsUnFollowed.name);
            cy.getDataCy('group-search-results')
              .contains(groupWhichIsUnFollowed.name)
              .first()
              .click();

            cy.getDataCy('nav-group-edit', 'nav-group-edit-desktop')
              .filter(':visible')
              .first()
              .click();

            cy.interceptSupabaseCall('followers_of_group_read')
              .as('readFollowersOfGroup');

            cy.getDataCy('editGroupFollower')
              .click();

            cy.wait('@readFollowersOfGroup');

            cy.interceptSupabaseCall('remove_group_follower_transaction')
              .as('removeGroupFollowerTransaction');

            cy.getDataCy('follower_first_name')
              .shouldBeVisible()
              .contains(userWhoFollowsProfile.first_name)
              .next()
              .children()
              .first()
              .click();

            cy.wait('@removeGroupFollowerTransaction');

            cy.contains(userWhoFollowsProfile.first_name)
              .should('not.exist');
        });

    });
});

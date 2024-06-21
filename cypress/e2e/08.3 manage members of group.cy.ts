import {AUTH_DATA2, AuthData} from '../../seed_and_test_data/01_test_auth';
import {Profile, PROFILE10, PROFILE2, PROFILE4, PROFILE6, PROFILE9} from '../../seed_and_test_data/02_test_profiles';
import {Group, GROUP1} from '../../seed_and_test_data/07_test_groups';
import {Size, Sizes} from '../fixtures/size';

const signedInUserAuth: AuthData = AUTH_DATA2;
const profileSignedInUser: Profile = PROFILE2;
const removedUser: Profile = PROFILE4;
const groupToBeSearched: Group = GROUP1;
const removedInvitationUser: Profile = PROFILE6;
const declinedRequestUser: Profile = PROFILE9;
const acceptedRequestUser: Profile = PROFILE10;
const searchedUser: Profile = PROFILE4;

Sizes.forEach((size: Size): void => {
    describe(`Feature tests with screen size show that users can ${size.width}`, (): void => {
        before((): void => {

        });

        beforeEach((): void => {
            cy.resetSupabase();
            cy.viewport(size.width, size.height);
            cy.visit('landing/sign-in');
            cy.signIn(signedInUserAuth);
        });

        it(' board members can remove a group member', (): void => {
            cy.searchGroup(groupToBeSearched.name);
            cy.getDataCy('group-search-results')
              .contains(groupToBeSearched.name)
              .first()
              .click();

            cy.getDataCy('nav-group-edit', 'nav-group-edit-desktop')
              .filter(':visible')
              .first()
              .click();

            cy.getDataCy('editGroupMember')
              .click();

            cy.interceptSupabaseCall('leave_group_by_membership_id_transaction')
              .as('leaveGroupMemberTransaction');

            cy.getDataCy('member_first_name')
              .shouldBeVisible()
              .contains(removedUser.first_name)
              .next()
              .children()
              .first()
              .click();

            cy.wait('@leaveGroupMemberTransaction');

            cy.contains(removedUser.first_name)
              .should('not.exist');

            // check group member counter
            cy.searchGroup(groupToBeSearched.name);

            cy.getDataCy('group-search-results')
              .contains(groupToBeSearched.name)
              .first()
              .click();

            cy.getDataCy('member-counter')
              .shouldBeVisible()
              .should('have.text', '4');

            cy.searchUser(removedUser.first_name);

            cy.getDataCy('user-search-results')
              .contains(removedUser.first_name)
              .first()
              .click();

            cy.getDataCy('membership-counter')
              .shouldBeVisible()
              .should('have.text', '2');
        });

        it(' board members can remove an invitation', (): void => {
            cy.searchGroup(groupToBeSearched.name);
            cy.getDataCy('group-search-results')
              .contains(groupToBeSearched.name)
              .first()
              .click();
            cy.getDataCy('nav-group-edit', 'nav-group-edit-desktop')
              .filter(':visible')
              .first()
              .click();
            cy.getDataCy('editGroupMember')
              .click();
            cy.interceptSupabaseCall('read_group_member_invitations')
              .as('readGroupMemberInvitations');
            cy.getDataCy('show-group-invitations')
              .click();
            cy.wait('@readGroupMemberInvitations');

            cy.interceptSupabaseCall('delete_group_member_invitation_by_id')
              .as('deleteGroupMemberInvitationById');
            cy.getDataCy('group_invitation_name')
              .shouldBeVisible()
              .contains(removedInvitationUser.first_name)
              .next()
              .children()
              .first()
              .click();
            cy.wait('@deleteGroupMemberInvitationById');
            cy.contains(removedInvitationUser.first_name)
              .should('not.exist');
        });

        it(' board members can invite a new member', (): void => {
            cy.searchGroup(groupToBeSearched.name);
            cy.getDataCy('group-search-results')
              .contains(groupToBeSearched.name)
              .first()
              .click();
            cy.getDataCy('nav-group-edit', 'nav-group-edit-desktop')
              .filter(':visible')
              .first()
              .click();
            cy.getDataCy('editGroupMember')
              .click();
            cy.interceptSupabaseCall('read_group_member_invitations')
              .as('readGroupMemberInvitations');
            cy.getDataCy('show-group-invitations')
              .click();
            cy.wait('@readGroupMemberInvitations');

            cy.interceptSupabaseCall('search_user').as('searchUser');
            cy.getDataCy('search-profile-bar')
              .type(searchedUser.first_name + ' ' + searchedUser.last_name);
            cy.wait('@searchUser');

            cy.getDataCy('search-profile-barResults')
              .click();

            cy.getDataCy('user_first_name')
              .shouldBeVisible()
              .contains(searchedUser.first_name)
              .next()
              .children();

            cy.getDataCy('show-member')
              .click();
            cy.interceptSupabaseCall('read_group_member_invitations')
              .as('readGroupMemberInvitations');
            cy.getDataCy('show-group-invitations')
              .click();
            cy.wait('@readGroupMemberInvitations');

            cy.contains(searchedUser.first_name)
              .shouldBeVisible();
        });

        it(' board members can accept a group membership request', (): void => {
            cy.searchGroup(groupToBeSearched.name);
            cy.getDataCy('group-search-results')
              .contains(groupToBeSearched.name)
              .first()
              .click();
            cy.getDataCy('nav-group-edit', 'nav-group-edit-desktop')
              .filter(':visible')
              .first()
              .click();
            cy.getDataCy('editGroupMember')
              .click();
            cy.interceptSupabaseCall('read_group_member_requests')
              .as('readGroupMemberRequests');
            cy.getDataCy('show-group-requests')
              .click();
            cy.wait('@readGroupMemberRequests');

            cy.interceptSupabaseCall('accept_group_membership_request_transaction')
              .as('acceptGroupMembershipRequestTransaction');
            cy.getDataCy('group_request_name')
              .shouldBeVisible()
              .contains(acceptedRequestUser.first_name)
              .next()
              .children()
              .first()
              .click();
            cy.wait('@acceptGroupMembershipRequestTransaction');
            cy.contains(acceptedRequestUser.first_name)
              .should('not.exist');

            cy.getDataCy('show-member')
              .click();

            cy.contains(acceptedRequestUser.first_name)
              .shouldBeVisible();
        });

        it(' board members can decline a group membership request', (): void => {
            cy.searchGroup(groupToBeSearched.name);
            cy.getDataCy('group-search-results')
              .contains(groupToBeSearched.name)
              .first()
              .click();
            cy.getDataCy('nav-group-edit', 'nav-group-edit-desktop')
              .filter(':visible')
              .first()
              .click();
            cy.getDataCy('editGroupMember')
              .click();
            cy.interceptSupabaseCall('read_group_member_requests')
              .as('readGroupMemberRequests');
            cy.getDataCy('show-group-requests')
              .click();
            cy.wait('@readGroupMemberRequests');

            cy.interceptSupabaseCall('delete_group_member_request')
              .as('deleteGroupMemberRequest');
            cy.getDataCy('group_request_name')
              .shouldBeVisible()
              .contains(declinedRequestUser.first_name)
              .next()
              .children()
              .first()
              .next()
              .click();
            cy.wait('@deleteGroupMemberRequest');
            cy.contains(declinedRequestUser.first_name)
              .should('not.exist');
        });
    });
});

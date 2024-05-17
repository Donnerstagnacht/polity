import {AUTH_DATA1, AUTH_DATA2, AUTH_DATA6, AUTH_DATA9, AuthData} from "../../seed_and_test_data/01_test_auth";
import {Profile, PROFILE1, PROFILE6, PROFILE9} from "../../seed_and_test_data/02_test_profiles";
import {Group, GROUP1, GROUP2, GROUP3} from "../../seed_and_test_data/07_test_groups";

const signedInUserAuthForLeave: AuthData = AUTH_DATA1;
const signedInUserProfileForLeave: Profile = PROFILE1;

const signedInUserAuthForWithdraw: AuthData = AUTH_DATA9;
const signedInUserProfileForWithdraw: Profile = PROFILE9;

const signedInUserAuthForInvitation: AuthData = AUTH_DATA6;
const signedInUserProfileForInvitation: Profile = PROFILE6;

const otherUser: AuthData = AUTH_DATA2;
const groupToBeLeft: Group = GROUP1;

const groupToWithdrawRequestFrom: Group = GROUP2;
const groupWithInvitationToDecide: Group = GROUP3;

// Sizes.forEach((size: Size): void => {
// ${size.width}
describe(`Manage group memberships of user tests with screen size  show that  `, (): void => {
    before((): void => {

    })

    beforeEach((): void => {
        cy.resetSupabase()
        // cy.viewport(size.width, size.height)
        cy.visit('landing/sign-in');
    })

    // it(' users can see their group memberships on their group overview page and leave a group', (): void => {
    //     cy.signIn(signedInUserAuthForLeave);
    //     cy.navigateToEditGroupMembershipsOfUser(signedInUserProfileForLeave.first_name)
    //
    //     cy.getDataCy('show-group-memberships')
    //     .shouldBeVisible()
    //     .click()
    //
    //     cy.interceptSupabaseCall('leave_group_by_membership_id_transaction')
    //     .as('leaveGroupMemberTransaction')
    //
    //     cy.getDataCy('group_name')
    //     .shouldBeVisible()
    //     .contains(groupToBeLeft.name)
    //     .next()
    //     .next() // needs to be removed if group profile images are displayed
    //     .children()
    //     .first()
    //     .click()
    //
    //     cy.wait('@leaveGroupMemberTransaction')
    //
    //     cy.contains(groupToBeLeft.name)
    //     .should('not.exist')
    //
    //     // check group member counter
    //     cy.searchGroup(groupToBeLeft.name)
    //
    //     cy.getDataCy('group-search-results')
    //     .contains(groupToBeLeft.name)
    //     .first()
    //     .click()
    //
    //     cy.getDataCy('memberCounter')
    //     .shouldBeVisible()
    //     .should('have.text', '4')
    //     // check user membership counter
    //
    //     cy.searchUser(signedInUserProfileForLeave.first_name)
    //
    //     cy.getDataCy('user-search-results')
    //     .contains(signedInUserProfileForLeave.first_name)
    //     .first()
    //     .click()
    //
    //     cy.getDataCy('membershipCounter')
    //     .shouldBeVisible()
    //     .should('have.text', '2')
    // })
    //
    // it(' users can see their group requests on their group overview page and withdraw a request', (): void => {
    //     cy.signIn(signedInUserAuthForWithdraw);
    //     cy.navigateToEditGroupMembershipsOfUser(signedInUserProfileForWithdraw.first_name)
    //
    //     cy.getDataCy('show-group-requests')
    //     .shouldBeVisible()
    //     .click()
    //
    //     cy.interceptSupabaseCall('delete_group_member_request_by_id')
    //     .as('deleteGroupMemberRequest')
    //
    //     cy.getDataCy('group_request_name')
    //     .shouldBeVisible()
    //     .contains(groupToBeLeft.name)
    //     .next()
    //     .next() // needs to be removed if group profile images are displayed
    //     .children()
    //     .first()
    //     .click()
    //
    //     cy.wait('@deleteGroupMemberRequest')
    //
    //     cy.contains(groupToBeLeft.name)
    //     .should('not.exist')
    // })

    // it(' users can see their group invitations on their group overview page and accept an invitation', (): void => {
    //     cy.signIn(signedInUserAuthForInvitation)
    //     cy.navigateToEditGroupMembershipsOfUser(signedInUserProfileForInvitation.first_name)
    //
    //     cy.getDataCy('show-group-invitations')
    //     .shouldBeVisible()
    //     .click()
    //
    //     cy.interceptSupabaseCall('accept_group_invitation_by_id_transaction')
    //     .as('acceptGroupInvitationById')
    //
    //     cy.getDataCy('group_invitation_name')
    //     .shouldBeVisible()
    //     .contains(groupToBeLeft.name)
    //     .next()
    //     .next() // needs to be removed if group profile images are displayed
    //     .children()
    //     .first()
    //     .click()
    //
    //     cy.wait('@acceptGroupInvitationById')
    //
    //     cy.contains(groupToBeLeft.name)
    //     .should('not.exist')
    //
    //     cy.interceptSupabaseCall('read_groups_of_user')
    //     .as('groupsOfUser')
    //
    //     cy.getDataCy('show-group-memberships')
    //     .shouldBeVisible()
    //     .click()
    //
    //     cy.wait('@groupsOfUser')
    //
    //     cy.contains(groupToBeLeft.name)
    //     .shouldBeVisible()
    //
    //     cy.searchGroup(groupToBeLeft.name)
    //
    //     cy.getDataCy('group-search-results')
    //     .contains(groupToBeLeft.name)
    //     .first()
    //     .click()
    //
    //     cy.getDataCy('memberCounter')
    //     .shouldBeVisible()
    //     .should('have.text', '6')
    //     // check user membership counter
    //
    //     cy.searchUser(signedInUserProfileForInvitation.first_name)
    //
    //     cy.getDataCy('user-search-results')
    //     .contains(signedInUserProfileForInvitation.first_name)
    //     .first()
    //     .click()
    //
    //     cy.getDataCy('membershipCounter')
    //     .shouldBeVisible()
    //     .should('have.text', '1')
    // })

    // it(' users can see their group invitations on their group overview page and decline an invitation', (): void => {
    //     cy.signIn(signedInUserAuthForInvitation)
    //     cy.navigateToEditGroupMembershipsOfUser(signedInUserProfileForInvitation.first_name)
    //
    //     cy.getDataCy('show-group-invitations')
    //     .shouldBeVisible()
    //     .click()
    //
    //     cy.interceptSupabaseCall('delete_group_member_invitation_by_id')
    //     .as('deleteGroupMemberInvitationById')
    //
    //     cy.getDataCy('group_invitation_name')
    //     .shouldBeVisible()
    //     .contains(groupToBeLeft.name)
    //     .next()
    //     .next() // needs to be removed if group profile images are displayed
    //     .children()
    //     .first()
    //     .next()
    //     .click()
    //
    //     cy.wait('@deleteGroupMemberInvitationById')
    //
    //     cy.contains(groupToBeLeft.name)
    //     .should('not.exist')
    // })


    // it(' users can leave a group from the groups page if they are member', (): void => {
    //     cy.signIn(signedInUserAuthForLeave);
    //
    //     cy.searchUser(signedInUserProfileForLeave.first_name)
    //
    //     cy.getDataCy('user-search-results')
    //     .contains(signedInUserProfileForLeave.first_name)
    //     .first()
    //     .click()
    //
    //     cy.getDataCy('membershipCounter')
    //     .shouldBeVisible()
    //     .should('have.text', '3')
    //
    //     cy.interceptSupabaseCall('read_group_columns')
    //     .as('readGroupColumns')
    //     cy.interceptSupabaseCall('check_group_membership_status')
    //     .as('checkGroupMembershipStatus')
    //
    //     cy.searchGroup(groupToBeLeft.name)
    //     cy.getDataCy('group-search-results')
    //     .contains(groupToBeLeft.name)
    //     .first()
    //     .click()
    //
    //     cy.wait(['@readGroupColumns', '@checkGroupMembershipStatus'])
    //     cy.getDataCy('memberCounter')
    //     .shouldBeVisible()
    //     .should('have.text', '5')
    //
    //     cy.interceptSupabaseCall('leave_group_member_transaction')
    //     .as('leaveGroupMemberTransaction')
    //
    //     cy.getDataCy('requestButton')
    //     .contains('Leave Group')
    //     .click()
    //
    //     cy.wait('@leaveGroupMemberTransaction')
    //
    //     cy.getDataCy('memberCounter')
    //     .shouldBeVisible()
    //     .should('have.text', '4')
    //
    //     cy.searchUser(signedInUserProfileForLeave.first_name)
    //
    //     cy.getDataCy('user-search-results')
    //     .contains(signedInUserProfileForLeave.first_name)
    //     .first()
    //     .click()
    //
    //     cy.getDataCy('membershipCounter')
    //     .shouldBeVisible()
    //     .should('have.text', '2')
    //
    // })

    // it(' users can withdraw a group request from the groups page if they have requested membership' +
    //     ' page', (): void => {
    //     cy.signIn(signedInUserAuthForWithdraw);
    //
    //     cy.searchGroup(groupToWithdrawRequestFrom.name)
    //
    //     cy.interceptSupabaseCall('read_group_columns')
    //     .as('groupColumns')
    //
    //     cy.interceptSupabaseCall('check_group_membership_status')
    //     .as('groupMembershipStatus')
    //
    //     cy.getDataCy('group-search-results')
    //     .contains(groupToWithdrawRequestFrom.name)
    //     .first()
    //     .click()
    //
    //     cy.wait(['@groupColumns', '@groupMembershipStatus'])
    //
    //     cy.interceptSupabaseCall('delete_group_member_request')
    //     .as('deleteGroupMemberRequest')
    //
    //     cy.getDataCy('requestButton')
    //     .contains('Withdraw request')
    //     .click()
    //
    //     cy.wait('@deleteGroupMemberRequest')
    //
    //     cy.getDataCy('requestButton')
    //     .contains('Request Membership')
    //
    //     cy.navigateToEditGroupMembershipsOfUser(signedInUserProfileForWithdraw.first_name)
    //
    //     cy.getDataCy('show-group-requests')
    //     .shouldBeVisible()
    //     .click()
    //
    //     cy.contains(groupToWithdrawRequestFrom.name)
    //     .should('not.exist')
    // })

    it(' users can accept a group invitation from the groups page if they were invited', (): void => {
        cy.signIn(signedInUserAuthForInvitation)

        cy.searchGroup(groupWithInvitationToDecide.name)
        cy.signIn(signedInUserAuthForWithdraw);

        cy.searchGroup(groupWithInvitationToDecide.name)

        cy.interceptSupabaseCall('read_group_columns')
        .as('groupColumns')

        cy.interceptSupabaseCall('check_group_membership_status')
        .as('groupMembershipStatus')

        cy.getDataCy('group-search-results')
        .contains(groupWithInvitationToDecide.name)
        .first()
        .click()

        cy.wait(['@groupColumns', '@groupMembershipStatus'])

        cy.interceptSupabaseCall('accept_group_invitation_transaction')
        .as('acceptGroupInvitationTransaction')

        cy.getDataCy('requestButton')
        //TODO
        .contains('Answer invitation')
        .click()

        cy.wait('@acceptGroupInvitationTransaction')

        cy.getDataCy('requestButton')
        .contains('Leave Group')

        cy.getDataCy('membershipCounter')
        .shouldBeVisible()
        .should('have.text', '6')

        cy.navigateToEditGroupMembershipsOfUser(signedInUserProfileForInvitation.first_name)

        cy.getDataCy('show-group-memberships')
        .shouldBeVisible()
        .click()

        cy.contains(groupWithInvitationToDecide.name)
        .shouldBeVisible()

        cy.searchUser(signedInUserProfileForInvitation.first_name)

        cy.getDataCy('user-search-results')
        .contains(signedInUserProfileForInvitation.first_name)
        .first()
        .click()

        cy.getDataCy('membershipCounter')
        .shouldBeVisible()
        .should('have.text', '1')

    })

    // it(' users can decline a group invitation from the groups page if they were invited', (): void => {
    //     cy.signIn(signedInUserAuthForInvitation)
    // })

})
// });

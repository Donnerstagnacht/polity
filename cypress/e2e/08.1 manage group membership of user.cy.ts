import {AUTH_DATA1, AUTH_DATA2, AuthData} from "../../seed_and_test_data/01_test_auth";
import {Profile, PROFILE1} from "../../seed_and_test_data/02_test_profiles";
import {Group, GROUP1} from "../../seed_and_test_data/07_test_groups";

const signedInUserAuth: AuthData = AUTH_DATA1;
const otherUser: AuthData = AUTH_DATA2;
const signedInUserProfile: Profile = PROFILE1;
const groupToBeLeft: Group = GROUP1;

// Sizes.forEach((size: Size): void => {
// ${size.width}
describe(`Manage group memberships of user tests with screen size  show that  `, (): void => {
    before((): void => {

    })

    beforeEach((): void => {
        cy.resetSupabase()
        // cy.viewport(size.width, size.height)
        cy.visit('landing/sign-in');
        cy.signIn(signedInUserAuth);
    })

    it(' users can see their group memberships on their group overview page', (): void => {
        cy.navigateToEditGroupMembershipsOfUser(signedInUserProfile.first_name)

        cy.getDataCy('show-group-memberships')
        .shouldBeVisible()
        .click()

        cy.interceptSupabaseCall('leave_group_by_membership_id_transaction')
        .as('leaveGroupMemberTransaction')

        cy.getDataCy('group_name')
        .shouldBeVisible()
        .contains(groupToBeLeft.name)
        .next()
        .next() // needs to be removed if group profile images are displayed
        .children()
        .first()
        .click()

        cy.wait('@leaveGroupMemberTransaction')

        cy.contains(groupToBeLeft.name)
        .should('not.exist')

        // check group member counter
        // check user membership counter
    })
    //
    // it(' users can see their group requests on their group overview page', (): void => {
    //     cy.navigateToEditGroupMembershipsOfUser(signedInUserProfile.first_name)
    //
    // })
    //
    // it(' users can see their group invitations on their group overview page', (): void => {
    //     cy.navigateToEditGroupMembershipsOfUser(signedInUserProfile.first_name)
    //
    // })
    //
    // it(' users can leave a group from their group overview page', (): void => {
    //     cy.navigateToEditGroupMembershipsOfUser(signedInUserProfile.first_name)
    //
    // })
    //
    // it(' users can withdraw a group request from their group overview page', (): void => {
    //     cy.navigateToEditGroupMembershipsOfUser(signedInUserProfile.first_name)
    //
    // })
    //
    // it(' users can accept a group invitation from their group overview page', (): void => {
    //     cy.navigateToEditGroupMembershipsOfUser(signedInUserProfile.first_name)
    //
    // })
    //
    // it(' users can decline a group invitation from their group overview page', (): void => {
    //     cy.navigateToEditGroupMembershipsOfUser(signedInUserProfile.first_name)
    //
    // })
    //
    // it(' users can leave a group from the groups page if they are member', (): void => {
    //
    // })
    //
    // it(' users can withdraw a group request from the groups page if they have requested membership' +
    //     ' page', (): void => {
    //
    // })
    //
    // it(' users can accept a group invitation from the groups page if they were invited', (): void => {
    //
    // })
    //
    // it(' users can decline a group invitation from the groups page if they were invited', (): void => {
    //
    // })

})
// });

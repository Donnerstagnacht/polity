import {Size, Sizes} from "../fixtures/size";
import {AUTH_DATA2, AuthData} from "../../seed_and_test_data/01_test_auth";
import {Profile, PROFILE2, PROFILE4} from "../../seed_and_test_data/02_test_profiles";
import {Group, GROUP1} from "../../seed_and_test_data/07_test_groups";

const signedInUserAuth: AuthData = AUTH_DATA2;
const profileSignedInUser: Profile = PROFILE2;
const removedUser: Profile = PROFILE4;
const groupToBeSearched: Group = GROUP1;

Sizes.forEach((size: Size): void => {
    describe(`Feature tests with screen size ${size.width} show that users can `, (): void => {
        before((): void => {

        })

        beforeEach((): void => {
            cy.resetSupabase()
            cy.viewport(size.width, size.height)
            cy.visit('landing/sign-in');
            cy.signIn(signedInUserAuth);
        })

        // it(' board members can remove a group member', (): void => {
        //     cy.searchGroup(groupToBeSearched.name);
        //     cy.getDataCy('group-search-results')
        //     .contains(groupToBeSearched.name)
        //     .first()
        //     .click()
        //
        //     cy.getDataCy('nav-group-edit', 'nav-group-edit-desktop')
        //     .first()
        //     .click()
        //
        //     cy.getDataCy('editGroupMember')
        //     .click()
        //
        //     cy.interceptSupabaseCall('leave_group_by_membership_id_transaction')
        //     .as('leaveGroupMemberTransaction')
        //
        //     cy.getDataCy('member_first_name')
        //     .shouldBeVisible()
        //     .contains(removedUser.first_name)
        //     .next()
        //     .children()
        //     .first()
        //     .click()
        //
        //     cy.wait('@leaveGroupMemberTransaction')
        //
        //     cy.contains(removedUser.first_name)
        //     .should('not.exist')
        //
        //     // check group member counter
        //     cy.searchGroup(groupToBeSearched.name)
        //
        //     cy.getDataCy('group-search-results')
        //     .contains(groupToBeSearched.name)
        //     .first()
        //     .click()
        //
        //     cy.getDataCy('memberCounter')
        //     .shouldBeVisible()
        //     .should('have.text', '4')
        //
        //     cy.searchUser(removedUser.first_name)
        //
        //     cy.getDataCy('user-search-results')
        //     .contains(removedUser.first_name)
        //     .first()
        //     .click()
        //
        //     cy.getDataCy('membershipCounter')
        //     .shouldBeVisible()
        //     .should('have.text', '2')
        // })

        it(' board members can invite a group member', (): void => {


        })

        // it(' board members can accept a group membership request', (): void => {
        //
        // })
        //
        // it(' board members can decline a group membership request', (): void => {
        //
        // })
    })
});

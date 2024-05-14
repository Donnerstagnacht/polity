import {AUTH_DATA1, AUTH_DATA2, AuthData} from "../../seed_and_test_data/01_test_auth";
import {Profile, PROFILE2} from "../../seed_and_test_data/02_test_profiles";

const signedInUserAuth: AuthData = AUTH_DATA1;
const otherUser: AuthData = AUTH_DATA2;
const searchedUser: Profile = PROFILE2;

// Sizes.forEach((size: Size): void => {

//  ${size.width}
describe(`Feature create group tests with screen size  show that `, (): void => {

    before((): void => {
        // cy.resetSupabase()
    })

    beforeEach((): void => {
        // cy.viewport(size.width, size.height)
        cy.visit('landing/sign-in');
        cy.signIn(signedInUserAuth);
    })

    it('users can create a new group.', async (): Promise<void> => {
        cy.getDataCy('nav-new', 'nav-new-desktop')
        .filter(':visible')
        .first()
        .click()

        cy.getDataCy('createGroup')
        .shouldBeVisible()
        .click()

        let randomNumber: number = Math.floor(Math.random() * 10000000);
        const groupName: string = 'testName' + randomNumber;

        randomNumber = Math.floor(Math.random() * 10000000);
        const groupDescription: string = 'test' + randomNumber;

        cy.getDataCy('groupNameInput')
        .type(groupName)

        cy.getDataCy('levelRegional')
        .click()

        cy.getDataCy('groupDescriptionInput')
        .type(groupDescription)

        cy.interceptSupabaseCall('search_user').as('searchUser')
        cy.getDataCy('inviteMemberToNewGroup')
        .type(searchedUser.first_name + ' ' + searchedUser.last_name)
        cy.wait('@searchUser')
        // TODO test implementation

        cy.getDataCy('inviteMemberSearchResult')
        .click()

        cy.getDataCy('user_first_name')
        .shouldBeVisible()
        .contains(searchedUser.first_name)
        .next()
        .children()

        cy.getDataCy('createGroupButton')
        .click()
    })

    // it('the new group is added on the home menu and can be visited', async (): Promise<void> => {
    //
    // })

    // it('the group creator should be added as admin to the new group.', async (): Promise<void> => {
    //     // TODO test implementation
    // })
    //
    // it('the group creator should be added as admin to the new group.', async (): Promise<void> => {
    //     // TODO test implementation
    // })
    //
    // it('the groups statistics shows one group member.', async (): Promise<void> => {
    //     // TODO test implementation
    // })
    //
    // it('the group wiki shows name and level.', async (): Promise<void> => {
    //     // TODO test implementation
    // })
    //
    // it('the group wiki shows name and level.', async (): Promise<void> => {
    //     // TODO test implementation
    // })
    //
    // it('a group with the same name can not be created twice.', async (): Promise<void> => {
    //     // TODO test implementation
    // })
})
// });

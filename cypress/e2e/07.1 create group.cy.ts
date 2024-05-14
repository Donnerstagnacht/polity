import {AUTH_DATA1, AUTH_DATA2, AuthData} from "../../seed_and_test_data/01_test_auth";

const signedInUserAuth: AuthData = AUTH_DATA1;
const otherUser: AuthData = AUTH_DATA2;

// Sizes.forEach((size: Size): void => {

//  ${size.width}
describe(`Feature create group tests with screen size  show that `, (): void => {

    before((): void => {
        cy.resetSupabase()
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

        const randomNumber: number = Math.floor(Math.random() * 10000000);
        const groupName: string = 'test' + randomNumber;
        // TODO test implementation
    })

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

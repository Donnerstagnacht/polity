import {Size, Sizes} from "../fixtures/size";
import {AUTH_DATA1, AUTH_DATA2, AuthData} from "../../seed_and_test_data/01_test_auth";

const signedInUserAuth: AuthData = AUTH_DATA1;
const otherUser: AuthData = AUTH_DATA2;

Sizes.forEach((size: Size): void => {
    describe(`Feature create group tests with screen size ${size.width} show that `, (): void => {
        before((): void => {

        })

        beforeEach((): void => {
            cy.resetSupabase()
            cy.viewport(size.width, size.height)
            cy.visit('landing/sign-in');
            cy.signIn(signedInUserAuth);
        })

        it('users can create a new group.', async (): Promise<void> => {
            // TODO test implementation
        })

        it('the group creator should be added as admin to the new group.', async (): Promise<void> => {
            // TODO test implementation
        })

        it('the group creator should be added as admin to the new group.', async (): Promise<void> => {
            // TODO test implementation
        })

        it('the groups statistics shows one group member.', async (): Promise<void> => {
            // TODO test implementation
        })

        it('the group wiki shows name and level.', async (): Promise<void> => {
            // TODO test implementation
        })

        it('the group wiki shows name and level.', async (): Promise<void> => {
            // TODO test implementation
        })

        it('a group with the same name can not be created twice.', async (): Promise<void> => {
            // TODO test implementation
        })
    })
});

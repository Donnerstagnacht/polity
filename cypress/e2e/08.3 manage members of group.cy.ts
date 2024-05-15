import {Size, Sizes} from "../fixtures/size";
import {AUTH_DATA1, AUTH_DATA2, AuthData} from "../../seed_and_test_data/01_test_auth";

const signedInUserAuth: AuthData = AUTH_DATA1;
const otherUser: AuthData = AUTH_DATA2;

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

        it(' board members can remove a group member', (): void => {

        })

        it(' board members can invite a group member', (): void => {

        })

        it(' board members can accept a group membership request', (): void => {

        })

        it(' board members can decline a group membership request', (): void => {

        })
    })
});

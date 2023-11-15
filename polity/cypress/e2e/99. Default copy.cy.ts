import {Size, Sizes} from "../fixtures/size";
import {ProfileTest} from "../../src/app/features/profile/types-and-interfaces/profile";
import {userCreatedByCypress} from "../fixtures/user";

const profile1: ProfileTest = userCreatedByCypress;

Sizes.forEach((size: Size): void => {
    describe(`App navigation tests with screen size ${size.width} show that users can `, () => {

        beforeEach((): void => {
            cy.viewport(size.width, size.height)
            cy.signIn(profile1);
        })
    })
})


npx supabase gen types typescript --project-id "qwetlgmbngpopdcgravw" --schema public > types/supabase.ts

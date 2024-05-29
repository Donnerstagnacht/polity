import {supabaseAuthenticatedClient} from "../../src/app/auth/supabase-authenticated-client";
import {AUTH_DATA1, AUTH_DATA5, AUTH_DATA8, AuthData} from "../../seed_and_test_data/01_test_auth";
import {POSTGRES_ERRORS} from "../fixtures/postgres_errors";
import {Group, GROUP3} from "../../seed_and_test_data/07_test_groups";
import {AuthTokenResponse} from "@supabase/supabase-js";
import {GROUP_MEMBER_REQUEST1, GroupMemberRequest} from "../../seed_and_test_data/09_test_group_member_requests";
import {GroupMemberInvitation, groupMemberInvitation4} from "../../seed_and_test_data/10_test_group_member_invitations";

const leaveSignedInUserAuth: AuthData = AUTH_DATA8;
const leaveGroup: Group = GROUP3;

const requestJoinedGroupSignedInUserAuth: AuthData = AUTH_DATA1;
const requestJoinedGroup: Group = GROUP3;

const withdrawSignedInUserAuth: AuthData = AUTH_DATA5;
const withdrawnMembershipId: GroupMemberRequest = GROUP_MEMBER_REQUEST1;

const invitationSignedInUserAuth: AuthData = AUTH_DATA1;
const invitationId: GroupMemberInvitation = groupMemberInvitation4;

// ATTENTION: These negative tests might not work by 100% because postgres row level security does return emtpy sets
// instead of row level securities errors. Therefore, an empty set can signal that incorrect test data was used or
// seeded (incorrect test) or row level security denied access data as expected (correct test). This is only
// relevant for select, delete and update.
describe(`Negative api tests for the group membership of a user management show that `, async (): Promise<void> => {
    let user_id: string | undefined;
    let token: string | undefined;

    before(async (): Promise<void> => {
    })

    beforeEach(async (): Promise<void> => {
        // cy.resetSupabase()
    })

    it('a non authenticated user can not leave groups.', async (): Promise<void> => {
        const response = await supabaseAuthenticatedClient
        .rpc('leave_group_member_transaction', {group_id_in: leaveGroup.id})
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.oneOf([POSTGRES_ERRORS.noPermission, POSTGRES_ERRORS.function_not_existing])
    })

    it('a non authenticated user can not request group memberships.', async (): Promise<void> => {
        const response = await supabaseAuthenticatedClient
        .rpc('create_group_member_request', {group_id_in: leaveGroup.id})
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.oneOf([POSTGRES_ERRORS.noPermission, POSTGRES_ERRORS.function_not_existing])
    })

    it('a non authenticated user can not withdraw group memberships.', async (): Promise<void> => {
        const response = await supabaseAuthenticatedClient
        .rpc('delete_group_member_request', {group_id_in: leaveGroup.id})
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.oneOf([POSTGRES_ERRORS.noPermission, POSTGRES_ERRORS.function_not_existing])
    })

    it('a non authenticated user can not accept group invitations.', async (): Promise<void> => {
        const response = await supabaseAuthenticatedClient
        .rpc('accept_group_invitation_transaction', {group_id_in: leaveGroup.id})
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.oneOf([POSTGRES_ERRORS.noPermission, POSTGRES_ERRORS.function_not_existing])
    })

    it('a non authenticated user can not decline group invitations.', async (): Promise<void> => {
        const response = await supabaseAuthenticatedClient
        .rpc('delete_group_member_invitation', {group_id_in: leaveGroup.id})
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.oneOf([POSTGRES_ERRORS.noPermission, POSTGRES_ERRORS.function_not_existing])
    })

    it('an authenticated user can not leave groups, he is not a member of.', async (): Promise<void> => {
        const authResponse: AuthTokenResponse = await supabaseAuthenticatedClient.auth.signInWithPassword(
            {
                email: leaveSignedInUserAuth.email,
                password: leaveSignedInUserAuth.password,
            }
        )
        user_id = authResponse.data.user?.id
        token = authResponse.data.session?.access_token
        expect(user_id).to.be.not.null
        expect(token).to.be.not.null

        const response = await supabaseAuthenticatedClient
        .rpc('leave_group_member_transaction', {group_id_in: leaveGroup.id})
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.undefined
    })

    it('an authenticated user can not request groups, the user already joined.', async (): Promise<void> => {
        const authResponse: AuthTokenResponse = await supabaseAuthenticatedClient.auth.signInWithPassword(
            {
                email: requestJoinedGroupSignedInUserAuth.email,
                password: requestJoinedGroupSignedInUserAuth.password,
            }
        )
        user_id = authResponse.data.user?.id
        token = authResponse.data.session?.access_token
        expect(user_id).to.be.not.null
        expect(token).to.be.not.null

        const response = await supabaseAuthenticatedClient
        .rpc('create_group_member_request', {group_id_in: requestJoinedGroup.id})
        expect(response.data).to.be.null
        console.log(response.error)
        expect(response.error?.code).to.be.oneOf([POSTGRES_ERRORS.noPermission, POSTGRES_ERRORS.function_not_existing])
    })

    it('an authenticated user can not request group memberships in behalf of other users.', async (): Promise<void> => {
        // given by definition because users can not specify user_id in api
    })

    it('an authenticated user can not read group requests in behalf of other users.', async (): Promise<void> => {
        // given by definition because users can not specify user_id in api
    })

    it('an authenticated user can not withdraw group memberships in behalf of other users.', async (): Promise<void> => {
        const authResponse: AuthTokenResponse = await supabaseAuthenticatedClient.auth.signInWithPassword(
            {
                email: withdrawSignedInUserAuth.email,
                password: withdrawSignedInUserAuth.password,
            }
        )
        user_id = authResponse.data.user?.id
        token = authResponse.data.session?.access_token
        expect(user_id).to.be.not.null
        expect(token).to.be.not.null

        const response = await supabaseAuthenticatedClient
        .rpc('delete_group_member_request_by_id', {request_id: withdrawnMembershipId.id})
        expect(response.data?.id).to.be.null
        console.log(response.error)
        expect(response.error?.code).to.be.undefined
    })


    it('an authenticated user can not read group memberships in behalf of other users.', async (): Promise<void> => {
        // given by definition because users can not specify user_id in api
    })


    it('an authenticated user can not accept group invites in behalf of other users.', async (): Promise<void> => {
        cy.resetSupabase()
        const authResponse: AuthTokenResponse = await supabaseAuthenticatedClient.auth.signInWithPassword(
            {
                email: invitationSignedInUserAuth.email,
                password: invitationSignedInUserAuth.password,
            }
        )
        user_id = authResponse.data.user?.id
        token = authResponse.data.session?.access_token
        expect(user_id).to.be.not.null
        expect(token).to.be.not.null

        const response = await supabaseAuthenticatedClient
        .rpc('accept_group_invitation_by_id_transaction', {
            invitation_id: invitationId.id
        })
        expect(response.data?.id).to.be.undefined
        console.log(response.error)
        expect(response.error?.code).to.be.oneOf([POSTGRES_ERRORS.noPermission, POSTGRES_ERRORS.function_not_existing])
    })

    it('an authenticated user can not decline group invites in behalf of other users.', async (): Promise<void> => {
        cy.resetSupabase()
        const authResponse: AuthTokenResponse = await supabaseAuthenticatedClient.auth.signInWithPassword(
            {
                email: invitationSignedInUserAuth.email,
                password: invitationSignedInUserAuth.password,
            }
        )
        user_id = authResponse.data.user?.id
        token = authResponse.data.session?.access_token
        expect(user_id).to.be.not.null
        expect(token).to.be.not.null

        const response = await supabaseAuthenticatedClient
        .rpc('delete_group_member_invitation_by_id', {
            invitation_id: invitationId.id
        })
        expect(response.data?.id).to.be.null
        console.log(response.error)
        expect(response.error?.code).to.be.undefined
    })

    it('an authenticated user can not read group invites in behalf of other users.', async (): Promise<void> => {
        // given by definition because users can not specify user_id in api
    })
})

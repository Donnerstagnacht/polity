import {supabaseAuthenticatedClient} from '../../src/app/auth/supabase-authenticated-client';
import {AUTH_DATA1, AUTH_DATA7, AuthData} from '../../seed_and_test_data/01_test_auth';
import {AuthTokenResponse} from '@supabase/supabase-js';
import {Group, GROUP1, GROUP3} from '../../seed_and_test_data/07_test_groups';
import {GROUP_MEMBER1, GroupMember} from '../../seed_and_test_data/08_test_group_member';
import {GROUP_MEMBER_REQUEST1, GroupMemberRequest} from '../../seed_and_test_data/09_test_group_member_requests';
import {GroupMemberInvitation, groupMemberInvitation1} from '../../seed_and_test_data/10_test_group_member_invitations';
import {Profile, PROFILE2} from '../../seed_and_test_data/02_test_profiles';
import {POSTGRES_ERRORS} from '../fixtures/postgres_errors';

const nonMemberUser: AuthData = AUTH_DATA7;
const nonMemberGroup: Group = GROUP3;

const memberUser: AuthData = AUTH_DATA1;
const memberGroup: Group = GROUP1;

const membership: GroupMember = GROUP_MEMBER1;
const request: GroupMemberRequest = GROUP_MEMBER_REQUEST1;
const invitation: GroupMemberInvitation = groupMemberInvitation1;

const invitedUser: Profile = PROFILE2;

describe(`Negative api tests for the group membership management of a group show that `, async (): Promise<void> => {
    let user_id: string | undefined;
    let token: string | undefined;

    beforeEach(async (): Promise<void> => {
        cy.resetSupabase();
    });

    it('non members can not read a groups members', async (): Promise<void> => {
        const authResponse: AuthTokenResponse = await supabaseAuthenticatedClient.auth.signInWithPassword(
            {
                email: nonMemberUser.email,
                password: nonMemberUser.password
            }
        );
        user_id = authResponse.data.user?.id;
        token = authResponse.data.session?.access_token;
        expect(user_id).to.be.not.null;
        expect(token).to.be.not.null;

        const response = await supabaseAuthenticatedClient
        .rpc('group_members_read', {_group_id: nonMemberGroup.id});
        expect(response.data).to.be.an('array').empty;
        expect(response.error?.code).to.be.undefined;
    });

    it('non board members can not not remove group members', async (): Promise<void> => {
        const authResponse: AuthTokenResponse = await supabaseAuthenticatedClient.auth.signInWithPassword(
            {
                email: memberUser.email,
                password: memberUser.password
            }
        );
        user_id = authResponse.data.user?.id;
        token = authResponse.data.session?.access_token;
        expect(user_id).to.be.not.null;
        expect(token).to.be.not.null;

        const response = await supabaseAuthenticatedClient
        .rpc('leave_group_by_membership_id_transaction', {_membership_id: membership.id});
        expect(response.data).to.be.null;
        expect(response.error?.code).to.be.undefined;
    });


    it('non board members can not read group membership requests', async (): Promise<void> => {
        const authResponse: AuthTokenResponse = await supabaseAuthenticatedClient.auth.signInWithPassword(
            {
                email: memberUser.email,
                password: memberUser.password
            }
        );
        user_id = authResponse.data.user?.id;
        token = authResponse.data.session?.access_token;
        expect(user_id).to.be.not.null;
        expect(token).to.be.not.null;

        const response = await supabaseAuthenticatedClient
        .rpc('group_member_request_read_ones', {_group_id: memberGroup.id});
        expect(response.data).to.be.an('array').empty;
        expect(response.error?.code).to.be.undefined;
    });

    it('non board members can not accept group membership requests', async (): Promise<void> => {
        cy.resetSupabase();
        const authResponse: AuthTokenResponse = await supabaseAuthenticatedClient.auth.signInWithPassword(
            {
                email: memberUser.email,
                password: memberUser.password
            }
        );
        user_id = authResponse.data.user?.id;
        token = authResponse.data.session?.access_token;
        expect(user_id).to.be.not.null;
        expect(token).to.be.not.null;

        const response = await supabaseAuthenticatedClient
        .rpc('accept_group_membership_request_transaction', {_request_id: memberGroup.id});
        expect(response.data).to.be.null;
        expect(response.error?.code).to.be.oneOf([POSTGRES_ERRORS.noPermission, POSTGRES_ERRORS.function_not_existing]);
    });

    it('non board members can not decline group membership requests', async (): Promise<void> => {
        cy.resetSupabase();
        const authResponse: AuthTokenResponse = await supabaseAuthenticatedClient.auth.signInWithPassword(
            {
                email: memberUser.email,
                password: memberUser.password
            }
        );
        user_id = authResponse.data.user?.id;
        token = authResponse.data.session?.access_token;
        expect(user_id).to.be.not.null;
        expect(token).to.be.not.null;

        const response = await supabaseAuthenticatedClient
        .rpc('group_member_requests_delete_by_id', {_request_id: memberGroup.id});
        expect(response.data).to.be.null;
        expect(response.error?.code).to.be.undefined;
    });


    it('non board members can not read a groups invitations', async (): Promise<void> => {
        const authResponse: AuthTokenResponse = await supabaseAuthenticatedClient.auth.signInWithPassword(
            {
                email: memberUser.email,
                password: memberUser.password
            }
        );
        user_id = authResponse.data.user?.id;
        token = authResponse.data.session?.access_token;
        expect(user_id).to.be.not.null;
        expect(token).to.be.not.null;

        const response = await supabaseAuthenticatedClient
        .rpc('group_member_invitations_read', {_group_id: memberGroup.id});
        expect(response.data).to.be.an('array').empty;
        expect(response.error?.code).to.be.undefined;
    });

    it('non board members can not invite new members', async (): Promise<void> => {
        const authResponse: AuthTokenResponse = await supabaseAuthenticatedClient.auth.signInWithPassword(
            {
                email: memberUser.email,
                password: memberUser.password
            }
        );
        user_id = authResponse.data.user?.id;
        token = authResponse.data.session?.access_token;
        expect(user_id).to.be.not.null;
        expect(token).to.be.not.null;

        const response = await supabaseAuthenticatedClient
        .rpc('group_member_invitations_create', {
            _group_id: memberGroup.id,
            _member_id: invitedUser.id
        });
        expect(response.data).to.be.null;
        expect(response.error?.code).to.be.undefined;
    });
});

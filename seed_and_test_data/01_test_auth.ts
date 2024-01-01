import * as jsonData from './01_auth.json';

export type AuthData = {
    instance_id: any,
    id: string,
    aud: string,
    role: string,
    email: string,
    encrypted_password: string,
    email_confirmed_at?: Date | string | undefined,
    invited_at?: Date | string | undefined,
    confirmation_token?: any,
    confirmation_sent_at?: Date | string | undefined,
    recovery_token?: any,
    recovery_sent_at?: Date | string | undefined,
    email_change_token_new?: any,
    email_change?: any,
    email_change_sent_at?: Date | string | undefined,
    last_sign_in_at?: Date | string | undefined,
    raw_app_meta_data?: any,
    raw_user_meta_data?: any,
    is_super_admin?: boolean | string | undefined,
    created_at?: Date | string | undefined,
    updated_at?: Date | string | undefined,
    phone?: any,
    phone_confirmed_at?: Date | string,
    phone_change?: any,
    phone_change_token?: any,
    phone_change_sent_at?: Date | string | undefined,
    confirmed_at?: Date | string | undefined,
    email_change_token_current?: any,
    email_change_confirm_status?: any,
    banned_until?: Date | string | undefined,
    reauthentication_token?: any,
    reauthentication_sent_at?: Date | string | undefined,
    is_sso_user?: boolean | string | undefined,
    deleted_at?: Date | string | undefined
}

const Persons: AuthData[] = jsonData;

const AUTH_DATA1: AuthData = Persons[0];
const AUTH_DATA2: AuthData = Persons[1];
const AUTH_DATA3: AuthData = Persons[2];
const AUTH_DATA4: AuthData = Persons[3];
const AUTH_DATA5: AuthData = Persons[4];
const AUTH_DATA6: AuthData = Persons[5];
const AUTH_DATA7: AuthData = Persons[6];
const AUTH_DATA8: AuthData = Persons[7];
const AUTH_DATA9: AuthData = Persons[8];
const AUTH_DATA10: AuthData = Persons[9];

export {
    AUTH_DATA1,
    AUTH_DATA2,
    AUTH_DATA3,
    AUTH_DATA4,
    AUTH_DATA5,
    AUTH_DATA6,
    AUTH_DATA7,
    AUTH_DATA8,
    AUTH_DATA9,
    AUTH_DATA10
};

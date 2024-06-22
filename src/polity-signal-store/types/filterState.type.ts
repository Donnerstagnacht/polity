import {TuiDay} from '@taiga-ui/cdk';
import {DatabaseAuthenticatedOverwritten} from '../../../supabase/types/supabase.authenticated.modified';
import {SupabaseObjectReturn} from '../../../supabase/types/supabase.authenticated.shorthand-types';

export type FilterState<FunctionName extends keyof DatabaseAuthenticatedOverwritten['authenticated']['Functions']> = {
    filterByStringState: {
        filterByString: boolean
        stringSearchKeys: (keyof SupabaseObjectReturn<FunctionName>)[],
        searchString: string,
    },
    filterByTagState?: {
        filterByTag: boolean,
        tagSearchKeys?: keyof SupabaseObjectReturn<FunctionName>,
        tagValues?: SupabaseObjectReturn<FunctionName>[keyof SupabaseObjectReturn<FunctionName>][],
    },
    filterByDateRangeState?: {
        filterByDateRange: boolean,
        dateSearchKey?: keyof SupabaseObjectReturn<FunctionName>,
        startDate?: Date | TuiDay,
        endDate?: Date | TuiDay
    }
}

export type FilterByStringState<StoredObject> = {
    filterByString: boolean,
    stringSearchKeys?: (keyof StoredObject)[],
    searchString?: string,
}

export type FilterByTagState<StoredObject> = {
    filterByTag: boolean | undefined,
    tagSearchKeys?: keyof StoredObject | undefined,
    tagValues?: StoredObject[keyof StoredObject][],
}

export type FilterByDateRangeState<StoredObject> = {
    filterByDateRange: boolean | undefined,
    dateSearchKey?: keyof StoredObject | undefined,
    startDate?: Date | TuiDay | undefined,
    endDate?: Date | TuiDay | undefined
}

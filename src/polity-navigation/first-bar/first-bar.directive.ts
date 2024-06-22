import {Directive, input, InputSignal} from '@angular/core';
import {NavigationItem} from '../types-and-interfaces/navigationItem';
import {NAVIGATION_ITEMS_SIGNED_OUT} from '../navigation-item';
import {SupabaseObjectReturn} from '../../../supabase/types/supabase.authenticated.shorthand-types';

@Directive({
    selector: '[polityFirstBar]',
    standalone: true
})
export class FirstBarDirective {
    /**
     * Takes an array of menuItems as input
     *
     * @Input items: Item[]. Default is signed out items.
     */
    public items: InputSignal<NavigationItem[]> = input<NavigationItem[]>(NAVIGATION_ITEMS_SIGNED_OUT);
    public notificationBadge: InputSignal<SupabaseObjectReturn<'unread_notifications_counter_read'> | null> = input<SupabaseObjectReturn<'unread_notifications_counter_read'> | null>({
        profile_id_: '',
        unread_notifications_counter_: 0
    });
    protected activeItemIndex: number = 1;

}

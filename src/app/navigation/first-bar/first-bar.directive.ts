import {Directive, Input, signal, Signal} from '@angular/core';
import {NavigationItem} from '../types-and-interfaces/navigationItem';
import {NAVIGATION_ITEMS_SIGNED_OUT} from '../navigation-item';
import {SupabaseObjectReturn} from '../../../../supabase/types/supabase.authenticated.shorthand-types';

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
    @Input({required: true}) public items: NavigationItem[] = NAVIGATION_ITEMS_SIGNED_OUT;
    @Input() public notificationBadge: Signal<SupabaseObjectReturn<'read_unread_notifications_counter'> | null> = signal({
        profile_id_: '',
        unread_notifications_counter_: 0
    });
    protected activeItemIndex: number = 1;

}

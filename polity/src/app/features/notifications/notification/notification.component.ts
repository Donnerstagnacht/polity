import {Component, signal, WritableSignal} from '@angular/core';
import {NotificationsStoreService} from "../services/notifications-store.service";
import {NotificationsService} from "../services/notifications.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Functions} from "../../../../../supabase/types/supabase.shorthand-types";
import {TuiDay} from "@taiga-ui/cdk";

type filterTag = { text: string, value: string }

@Component({
    selector: 'polity-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.less'],
})
export class NotificationComponent {
    protected notifications: WritableSignal<Functions<'select_notifications_of_users'>> = signal([]);
    protected isNotificationsLoading: WritableSignal<boolean> = signal(true)
    protected showFilter: boolean = true;
    protected readonly filterTypes: filterTag[] = [
        {
            text: 'Followers',
            value: 'follow_from_user'
        },
        {
            text: 'Groups',
            value: 'follow_from_group'
        }
    ];
    protected combinedForm: FormGroup;

    constructor(
        private readonly notificationsService: NotificationsService,
        private readonly notificationStoreService: NotificationsStoreService,
        private readonly formBuilder: FormBuilder
    ) {
        this.combinedForm = this.formBuilder.group({
            filterStringForm: this.formBuilder.group({
                searchString: [],
            }),
            filterDateRangeForm: this.formBuilder.group({
                from: [],
                to: [],
            }),
            filterTypesForm: this.formBuilder.group({
                filters: [],
            })
        })
        this.isNotificationsLoading = this.notificationStoreService.notifications.loading.getLoading();
        this.combinedForm.valueChanges.subscribe(
            () => this.onCombinedFormChange()
        )
    }

    onCombinedFormChange(): void {
        const stringFilter = this.combinedForm.get('filterStringForm')?.value.searchString;

        const typeFilter: filterTag[] = this.combinedForm.get('filterTypesForm')?.value.filters;
        const typeKeyValues: string[] = typeFilter?.map((obj: filterTag) => obj['value']);

        const dateFilterFrom: TuiDay = this.combinedForm.get('filterDateRangeForm')?.value.from;
        const dateFilterTo: TuiDay = this.combinedForm.get('filterDateRangeForm')?.value.to;

        console.log('dateFilterFrom', dateFilterFrom)
        console.log('toAsNativeDate', dateFilterTo)

        let filterByString: boolean = false;
        let filterByType: boolean = false;
        let filterByDate: boolean = false;

        if (stringFilter) {
            filterByString = true;
        }
        if (typeKeyValues && typeKeyValues.length > 0) {
            filterByType = true;
        }
        if (dateFilterFrom && dateFilterTo) {
            filterByDate = true;
        }

        if (!filterByString && !typeKeyValues && !filterByDate) {
            this.notificationStoreService.notifications.resetFilteredEntities()
        }

        this.notificationStoreService.notifications.filterArray(
            filterByString,
            ['first_name', 'last_name'],
            stringFilter,

            filterByType,
            'type_of_notification',
            typeKeyValues,

            filterByDate,
            'created_at',
            dateFilterFrom,
            dateFilterTo
        )
    }

    async ngOnInit(): Promise<void> {
        await this.notificationsService.selectNotifications()
        this.notifications = this.notificationStoreService.notifications.getEntities();
    }

    protected clearFilter(): void {
        this.combinedForm.reset()
        this.notificationStoreService.notifications.resetFilteredEntities()
    }

    protected toggleShowFilter(): void {
        if (!this.showFilter) {
            console.log('activate filter')
        }
        this.showFilter = !this.showFilter
    }
}

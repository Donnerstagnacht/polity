import {Component, signal, WritableSignal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FunctionTableReturn} from "../../../../../supabase/types/supabase.shorthand-types";
import {TuiDay} from "@taiga-ui/cdk";
import {IInfiniteScrollEvent, InfiniteScrollModule} from "ngx-infinite-scroll";
import {CommonModule} from "@angular/common";
import {FilterHeadlineComponent} from "../../../ui/polity-filter/filter-headline/filter-headline.component";
import {FilterStringComponent} from "../../../ui/polity-filter/filter-string/filter-string.component";
import {FilterDateRangeComponent} from "../../../ui/polity-filter/filter-date-range/filter-date-range.component";
import {FilterTagsComponent} from "../../../ui/polity-filter/filter-tags/filter-tags.component";
import {FilterClearComponent} from "../../../ui/polity-filter/filter-clear/filter-clear.component";
import {
    TableFourIconTextTagDateComponent
} from "../../../ui/polity-table/table-four-icon-text-tag-date/table-four-icon-text-tag-date.component";
import {NotificationsActionService} from "../action-store-services/notifications.action.service";
import {NotificationsStoreService} from "../action-store-services/notifications.store.service";
import {Filter_TYPES, filterTag} from "../constants-types-interfaces/notificationFilterTypes";

@Component({
    selector: 'polity-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.less'],
    standalone: true,
    imports: [
        CommonModule,
        FilterHeadlineComponent,
        FilterStringComponent,
        ReactiveFormsModule,
        FilterDateRangeComponent,
        FilterTagsComponent,
        FilterClearComponent,
        InfiniteScrollModule,
        TableFourIconTextTagDateComponent
    ]
})
export class NotificationComponent {
    public combinedForm: FormGroup;
    protected throttle: number = 300;
    protected scrollDistance: number = 1;
    protected scrollUpDistance: number = 2;
    protected notifications: WritableSignal<FunctionTableReturn<'select_notifications_of_users'>> = signal([]);
    protected isNotificationsLoading: WritableSignal<boolean> = signal(true);
    protected showFilter: boolean = true;
    protected readonly filterTypes: filterTag[] = Filter_TYPES;

    constructor(
        private readonly notificationsService: NotificationsActionService,
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
        this.notificationsService.resetNotificationCounter()
    }

    async ngOnInit(): Promise<void> {
        await this.notificationsService.selectNotifications()
        this.notifications = this.notificationStoreService.notifications.getObjects();
    }

    protected onScrollDown(event: IInfiniteScrollEvent): void {
        this.notificationStoreService.notifications.onScrollToBottom()
    }

    protected clearFilter(): void {
        this.combinedForm.reset()
        this.notificationStoreService.notifications.resetDisplayedObjects()
    }

    protected toggleShowFilter(): void {
        this.showFilter = !this.showFilter
    }

    private onCombinedFormChange(): void {
        const stringFilter = this.combinedForm.get('filterStringForm')?.value.searchString;

        const typeFilter: filterTag[] = this.combinedForm.get('filterTypesForm')?.value.filters;
        const typeKeyValues: string[] = typeFilter?.map((obj: filterTag) => obj['value']);

        const dateFilterFrom: TuiDay = this.combinedForm.get('filterDateRangeForm')?.value.from;
        const dateFilterTo: TuiDay = this.combinedForm.get('filterDateRangeForm')?.value.to;

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
            this.notificationStoreService.notifications.resetDisplayedObjects()
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
}

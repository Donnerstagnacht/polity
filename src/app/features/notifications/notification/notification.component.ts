import {Component, inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TuiDay} from '@taiga-ui/cdk';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {CommonModule} from '@angular/common';
import {FilterHeadlineComponent} from '../../../ui/polity-filter/filter-headline/filter-headline.component';
import {FilterStringComponent} from '../../../ui/polity-filter/filter-string/filter-string.component';
import {FilterDateRangeComponent} from '../../../ui/polity-filter/filter-date-range/filter-date-range.component';
import {FilterTagsComponent} from '../../../ui/polity-filter/filter-tags/filter-tags.component';
import {FilterClearComponent} from '../../../ui/polity-filter/filter-clear/filter-clear.component';
import {
    TableFourIconTextTagDateComponent
} from '../../../ui/polity-table/table-four-icon-text-tag-date/table-four-icon-text-tag-date.component';
import {Filter_TYPES, filterTag} from '../constants-types-interfaces/notificationFilterTypes';
import {NotificationsStore} from '../store/notification-store.service';

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
    protected showFilter: boolean = true;
    protected readonly filterTypes: filterTag[] = Filter_TYPES;
    protected readonly signal = signal;
    protected notificationsStore: NotificationsStore = inject(NotificationsStore);

    constructor(
        private readonly formBuilder: FormBuilder
    ) {
        this.combinedForm = this.formBuilder.group({
            filterStringForm: this.formBuilder.group({
                searchString: []
            }),
            filterDateRangeForm: this.formBuilder.group({
                from: [],
                to: []
            }),
            filterTypesForm: this.formBuilder.group({
                filters: []
            })
        });
        this.combinedForm.valueChanges.subscribe(
            () => this.onCombinedFormChange()
        );
        this.notificationsStore.resetCounter();
    }

    async ngOnInit(): Promise<void> {
        this.notificationsStore.read();
        this.notificationsStore.subscribeToRealtimeNotifications();
    }

    async ngOnDestroy(): Promise<void> {
        this.notificationsStore.unsubscribeToRealtimeNotifications();
    }


    protected clearFilter(): void {
        this.combinedForm.reset();
        this.notificationsStore.resetState();
    }

    protected toggleShowFilter(): void {
        this.showFilter = !this.showFilter;
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
            this.notificationsStore.resetState();
        }

        this.notificationsStore.setFilterState(
            {
                filterByString: filterByString,
                stringSearchKeys: ['first_name_', 'last_name_'],
                searchString: stringFilter,

                filterByTag: filterByType,
                tagSearchKeys: 'type_of_notification_',
                tagValues: typeKeyValues,

                filterByDateRange: filterByDate,
                dateSearchKey: 'created_at_',
                startDate: dateFilterFrom,
                endDate: dateFilterTo
            }
        );
    }
}

import {Component, inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TuiDay} from '@taiga-ui/cdk';
import {CommonModule} from '@angular/common';
import {
    TableFourIconTextTagDateComponent
} from '@polity-ui/polity-table/table-four-icon-text-tag-date/table-four-icon-text-tag-date.component';
import {Filter_TYPES, filterTag} from '../notificationFilter.type';
import {FilterHeadlineComponent} from '@polity-ui/polity-filter/filter-headline/filter-headline.component';
import {FilterStringComponent} from '@polity-ui/polity-filter/filter-string/filter-string.component';
import {FilterDateRangeComponent} from '@polity-ui/polity-filter/filter-date-range/filter-date-range.component';
import {FilterTagsComponent} from '@polity-ui/polity-filter/filter-tags/filter-tags.component';
import {FilterClearComponent} from '@polity-ui/polity-filter/filter-clear/filter-clear.component';
import {NotificationsStore} from '@polity-office/notification-state/notification-store.service';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

@Component({
    selector: 'polity-notification',
    templateUrl: './notification.page.html',
    styleUrls: ['./notification.page.less'],
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
export class NotificationPage {
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
        this.notificationsStore.resetFilterState();
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
            this.notificationsStore.resetFilterState();
        }

        this.notificationsStore.setFilterState(
            {
                filterByStringState: {
                    filterByString: filterByString,
                    stringSearchKeys: ['first_name_', 'last_name_'],
                    searchString: stringFilter
                },
                filterByTagState: {
                    filterByTag: filterByType,
                    tagSearchKeys: 'type_of_notification_',
                    tagValues: typeKeyValues
                },
                filterByDateRangeState: {
                    filterByDateRange: filterByDate,
                    dateSearchKey: 'created_at_',
                    startDate: dateFilterFrom,
                    endDate: dateFilterTo
                }
            }
        );
    }
}

import {Component} from '@angular/core';
import {StepperRightComponent} from "../../../navigation/stepper-right/stepper-right.component";
import {StepperTopComponent} from "../../../navigation/stepper-top/stepper-top.component";
import {SecondBarTopComponent} from "../../../navigation/second-bar-top/second-bar-top.component";
import {AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {
    TuiDataListWrapperModule,
    TuiFieldErrorPipeModule,
    TuiInputModule,
    TuiInputTagModule,
    TuiRadioBlockModule
} from "@taiga-ui/kit";
import {
    TuiButtonModule,
    TuiErrorModule,
    TuiGroupModule,
    TuiHintModule,
    TuiSvgModule,
    TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {AsyncPipe} from "@angular/common";
import {NgxPageScrollModule} from "ngx-page-scroll";
import {AutoscrollDirective} from "../../../navigation/autoscroll.directive";
import {StepperItem} from "../../../navigation/types-and-interfaces/stepper-item";
import {CreateGroupService} from "../../new/action-store-services/create-group.service";
import {delay, Observable, of, startWith, Subject, switchMap} from "rxjs";

const databaseMockData: readonly string[] = [
    'John Cleese',
    'Eric Idle',
    'Michael Palin',
    'Terry Gilliam',
    'Terry Jones',
    'Graham Chapman',
];

@Component({
    selector: 'polity-group-new',
    standalone: true,
    imports: [
        StepperRightComponent,
        StepperTopComponent,
        SecondBarTopComponent,
        FormsModule,
        ReactiveFormsModule,
        TuiInputModule,
        TuiTextfieldControllerModule,
        TuiHintModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiSvgModule,
        AsyncPipe,
        TuiButtonModule,
        NgxPageScrollModule,
        AutoscrollDirective,
        TuiSvgModule,
        TuiRadioBlockModule,
        TuiGroupModule,
        TuiInputTagModule,
        TuiDataListWrapperModule
    ],
    templateUrl: './group-new.component.html',
    styleUrl: './group-new.component.less'
})
export class GroupNewComponent {
    value = [];
    protected createGroupForm: FormGroup<{
        name: FormControl<string | null>,
        level: FormControl<string | null>
        description: FormControl<string | null>,
        members: FormControl<string | null>
    }> = new FormGroup({
        name: new FormControl('', Validators.required),
        level: new FormControl('', Validators.required),
        description: new FormControl(''),
        members: new FormControl('')
    })
    protected menuItems: StepperItem[] = [
        {
            title: 'Name',
            icon: 'normal'
        },
        {
            title: 'Level',
            icon: 'normal'
        },
        {
            title: 'Description',
            icon: 'normal'
        },
        {
            title: 'Members',
            icon: 'pass'
        },
        {
            title: 'Inaugural-Meeting',
            icon: 'pass'
        }
    ]
    private readonly search$ = new Subject<string>();
    readonly items$ = this.search$.pipe(
        switchMap(search =>
            this.serverRequest(search).pipe(startWith<readonly string[] | null>(null)),
        ),
        startWith(databaseMockData),
    );

    constructor(private createGroupService: CreateGroupService) {
    }

    ngOnInit(): void {
        this.createGroupForm.valueChanges.subscribe((value) => {
            this.updateMenuItemIcon('name', 0);
            this.updateMenuItemIcon('level', 1);
            this.updateMenuItemIcon('description', 2);
            this.updateMenuItemIcon('members', 3);
            this.updateMenuItemIcon('Inaugural-Meeting', 4);
        })
    }

    onSearchChange(search: string): void {
        this.search$.next(search);
    }

    protected onCreateGroup(): void {
        this.createGroupService.createGroup(this.createGroupForm.value)
        this.createGroupForm.reset()
    }

    private updateMenuItemIcon(controlName: string, index: number): void {
        const control: AbstractControl<any, any> | null = this.createGroupForm.get(controlName);

        if (control?.valid) {
            this.menuItems[index].icon = 'pass';
        } else {
            this.menuItems[index].icon = 'error';
        }
    }

    /**
     * Server request emulation
     */
    private serverRequest(search: string): Observable<readonly string[]> {
        const result = databaseMockData.filter(item =>
            item.toLowerCase().includes(search.toLowerCase()),
        );

        return of(result).pipe(delay(Math.random() * 1000 + 500));
    }
}

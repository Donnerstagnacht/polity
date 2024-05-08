import {Component, signal, WritableSignal} from '@angular/core';
import {TuiFileLike, TuiInputFilesModule} from "@taiga-ui/kit";
import {from, Observable, of, Subject, switchMap} from "rxjs";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ProfileActionService} from "../action-store-services/profile.action.service";
import {ProfileStoreService} from "../action-store-services/profile.store.service";
import {SupabaseObjectReturn} from "../../../../../supabase/types/supabase.shorthand-types";

@Component({
    selector: 'polity-profile-image-upload',
    templateUrl: './profile-image-upload.component.html',
    styleUrls: ['./profile-image-upload.component.less'],
    imports: [
        TuiInputFilesModule,
        ReactiveFormsModule,
        CommonModule
    ],
    standalone: true
})
export class ProfileImageUploadComponent {
    protected isProfileLoading: WritableSignal<boolean> = signal(true)
    protected imageControl: FormControl<any> = new FormControl();
    protected rejectedFiles$: Subject<TuiFileLike | null> = new Subject<TuiFileLike | null>();
    protected loadingFiles$: Subject<TuiFileLike | null> = new Subject<TuiFileLike | null>();
    protected loadedFiles$: Observable<TuiFileLike | null> = this.imageControl.valueChanges.pipe(
        switchMap(file => (file ? this.returnRequestAsObservable(file) : of(null))),
    );
    protected profileWriteable: WritableSignal<SupabaseObjectReturn<'read_user'> | null | undefined>;
    private avatarUrl: string = '';

    constructor(
        private readonly profileStoreService: ProfileStoreService,
        private readonly profileService: ProfileActionService
    ) {
        this.isProfileLoading = this.profileStoreService.profile.loading.getLoading()
        this.profileWriteable = this.profileStoreService.profile.getObject()
    }

    returnRequestAsObservable(file: TuiFileLike): Observable<TuiFileLike | null> {
        const request: Promise<TuiFileLike | null> = this.makeRequest(file)
        const requestAsObservable: Observable<TuiFileLike | null> = from(request)
        return requestAsObservable;
    }

    async makeRequest(file: TuiFileLike): Promise<TuiFileLike | null> {
        this.loadingFiles$.next(file);
        const fileExtension: string | undefined = file.name.split('.').pop()
        const filePath: string = `${Math.random()}.${fileExtension}`
        try {
            const response: {
                data: { path: string };
                error: null
            } | {
                data: null;
                error: Error
            } = await this.profileService.uploadImage(filePath, file);

            if (response.error) {
                throw Error
            } else {
                try {
                    const privateUrl: string | undefined = await this.profileService.getSignedImageUrl(response.data.path);
                    try {
                        await this.profileService.updateProfileImage(response.data.path);
                    } catch (error) {
                    } finally {
                        const profile: SupabaseObjectReturn<"read_user"> = {
                            profile_image: privateUrl
                        } as SupabaseObjectReturn<'read_user'>;
                        this.profileStoreService.profile.mutateObject(profile);
                    }
                } catch (error) {
                }
            }
            return file;
        } catch (error) {
            this.rejectedFiles$.next(file);
            return null;
        } finally {
            this.loadingFiles$.next(null)
            return null;
        }
    }

    protected clearRejected(): void {
        this.removeFile();
        this.rejectedFiles$.next(null);
    }

    protected removeFile(): void {
        this.imageControl.setValue(null);
    }

    protected onReject(file: TuiFileLike | readonly TuiFileLike[]): void {
        this.rejectedFiles$.next(file as TuiFileLike);
    }
}

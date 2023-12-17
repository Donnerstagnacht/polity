import {Component, signal, WritableSignal} from '@angular/core';
import {TuiFileLike, TuiInputFilesModule} from "@taiga-ui/kit";
import {from, Observable, of, Subject, switchMap} from "rxjs";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Profile} from "../../../../../cypress/fixtures/profile";
import {CommonModule} from "@angular/common";
import {ProfileActionService} from "../action-store-services/profile.action.service";
import {ProfileStoreService} from "../action-store-services/profile.store.service";
import {FunctionSingleReturn} from "../../../../../supabase/types/supabase.shorthand-types";

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
        switchMap(file => (file ? this.makeRequest(file) : of(null))),
    );
    protected profileWriteable: WritableSignal<Profile | null | undefined>;
    private avatarUrl: string = '';

    constructor(
        private readonly profileStoreService: ProfileStoreService,
        private readonly profileService: ProfileActionService
    ) {
        this.isProfileLoading = this.profileStoreService.profile.loading.getLoading()
        this.profileWriteable = this.profileStoreService.profile.getObject()
    }

    protected makeRequest(file: TuiFileLike): Observable<TuiFileLike | null> {
        this.loadingFiles$.next(file);
        const fileExtension: string | undefined = file.name.split('.').pop()
        const filePath: string = `${Math.random()}.${fileExtension}`

        console.log('before request')
        const response: Promise<TuiFileLike | null> = this.profileService.uploadImage(filePath, file)
        .then((response: { data: { path: string }, error: null } | { data: null, error: Error }) => {
            if (response.error) {
                console.log('error', response.error)
                throw Error
            } else {
                // const publicBucket: {
                //     data: { publicUrl: string }
                // } = this.profileService.getPublicBucket(response.data.path)
                // console.log('public bucket', publicBucket)
                // this.avatarUrl = publicBucket.data.publicUrl;
                // console.log('public bucket', publicBucket)
                this.profileService.getSignedImageUrl(response.data.path).then((privateUrl) => {
                    console.log('fetched privateUrl', privateUrl)
                    this.profileService.updateProfileImage(response.data.path).then((): void => {
                        //TODO double check
                        const profile = {
                            // profile_image: this.avatarUrl
                            profile_image: privateUrl
                        } as FunctionSingleReturn<'select_user'>
                        this.profileStoreService.profile.mutateObject(profile)
                    })
                });
            }
            return file;
        })
        .catch((): null => {
            this.rejectedFiles$.next(file);
            return null;
        })
        .finally((): null => {
            this.loadingFiles$.next(null)
            return null;
        });
        return from(response)
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

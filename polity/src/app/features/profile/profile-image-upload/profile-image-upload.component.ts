import {Component, WritableSignal} from '@angular/core';
import {TuiFileLike} from "@taiga-ui/kit";
import {from, Observable, of, Subject, switchMap} from "rxjs";
import {FormControl} from "@angular/forms";
import {ProfileService} from "../services/profile.service";
import {Profile} from "../types-and-interfaces/profile";
import {ProfileStoreService} from "../services/profile-store.service";
import {UiStoreService} from "../../../core/services/ui-store.service";

@Component({
    selector: 'polity-profile-image-upload',
    templateUrl: './profile-image-upload.component.html',
    styleUrls: ['./profile-image-upload.component.less']
})
export class ProfileImageUploadComponent {
    protected control = new FormControl();
    protected rejectedFiles$: Subject<TuiFileLike | null> = new Subject<TuiFileLike | null>();
    protected loadingFiles$: Subject<TuiFileLike | null> = new Subject<TuiFileLike | null>();
    protected loadedFiles$: Observable<TuiFileLike | null> = this.control.valueChanges.pipe(
        switchMap(file => (file ? this.makeRequest(file) : of(null))),
    );
    protected profileWriteable: WritableSignal<Profile | null | undefined>;
    private avatarUrl: string = '';

    constructor(
        private readonly profileStoreService: ProfileStoreService,
        private readonly profileService: ProfileService,
        private readonly UIStoreService: UiStoreService
    ) {
        this.profileWriteable = this.profileStoreService.selectProfile()
    }

    protected makeRequest(file: TuiFileLike): Observable<TuiFileLike | null> {
        this.UIStoreService.setLoading(true);
        this.loadingFiles$.next(file);
        const fileExtension: string | undefined = file.name.split('.').pop()
        const filePath: string = `${Math.random()}.${fileExtension}`

        const response: Promise<TuiFileLike | null> = this.profileService.uploadImage(filePath, file)
        .then((response: { data: { path: string }, error: null } | { data: null, error: Error }) => {
            if (response.error) {
                throw Error
            } else {
                const publicBucket: {
                    data: { publicUrl: string }
                } = this.profileService.getPublicBucket(response.data.path)
                this.avatarUrl = publicBucket.data.publicUrl;
                this.profileService.updateProfileImage(this.avatarUrl).then((): void => {
                    this.profileStoreService.mutateProfileImageURL(this.avatarUrl)
                })
            }
            return file;
        })
        .catch((): null => {
            this.rejectedFiles$.next(file);
            return null;
        })
        .finally((): null => {
            this.loadingFiles$.next(null)
            this.UIStoreService.setLoading(false);
            return null;
        });
        return from(response)
    }

    protected clearRejected(): void {
        this.removeFile();
        this.rejectedFiles$.next(null);
    }

    protected removeFile(): void {
        this.control.setValue(null);
    }

    protected onReject(file: TuiFileLike | readonly TuiFileLike[]): void {
        this.rejectedFiles$.next(file as TuiFileLike);
    }
}

import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {TuiFileLike, TuiInputFilesModule} from '@taiga-ui/kit';
import {from, Observable, of, Subject, switchMap} from 'rxjs';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {uploadImage} from '@polity-signal-store/imageFeature';
import {ImageComponent} from '@polity-ui/polity-image/image/image.component';
import {LoadingState} from '@polity-signal-store/types/loadingState.type';

@Component({
    selector: 'polity-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.less'],
    imports: [
        TuiInputFilesModule,
        ReactiveFormsModule,
        CommonModule,
        ImageComponent
    ],
    standalone: true
})
export class ImageUploadComponent {
    public bucketName: InputSignal<string> = input.required();
    public loadingState: InputSignal<LoadingState> = input.required();
    public imgSrc: InputSignal<string> = input.required();
    public imgStoragePath: OutputEmitterRef<string> = output();

    protected imageControl: FormControl<any> = new FormControl();
    protected rejectedFiles$: Subject<TuiFileLike | null> = new Subject<TuiFileLike | null>();
    protected loadingFiles$: Subject<TuiFileLike | null> = new Subject<TuiFileLike | null>();
    protected loadedFiles$: Observable<TuiFileLike | null> = this.imageControl.valueChanges.pipe(
        switchMap(file => (file ? this.returnRequestAsObservable(file) : of(null)))
    );

    returnRequestAsObservable(file: TuiFileLike): Observable<TuiFileLike | null> {
        const request: Promise<TuiFileLike | null> = this.makeRequest(file);
        const requestAsObservable: Observable<TuiFileLike | null> = from(request);
        return requestAsObservable;
    }

    async makeRequest(file: TuiFileLike): Promise<TuiFileLike | null> {
        this.loadingFiles$.next(file);
        const fileExtension: string | undefined = file.name.split('.').pop();
        const filePath: string = `${Math.random()}.${fileExtension}`;

        try {
            const response: {
                data: { path: string };
                error: null
            } | {
                data: null;
                error: Error
            } = await uploadImage(filePath, this.bucketName(), file);

            if (response.error) {
                throw Error;
            } else {
                this.imgStoragePath.emit(response.data.path);
            }
            return file;
        } catch (error) {
            this.rejectedFiles$.next(file);
            return null;
        } finally {
            this.loadingFiles$.next(null);
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

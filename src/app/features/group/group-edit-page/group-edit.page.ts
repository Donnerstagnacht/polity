import {Component, inject} from '@angular/core';
import {ImageUploadComponent} from '@polity-ui/polity-image/image-upload/image-upload.component';
import {ProfileEditForm} from '@polity-profile/profile-ui/profile-edit/profile-edit.form';
import {GroupStore} from '@polity-group/state/group.store.';
import {GroupEditForm} from '@polity-group/group-ui/group-edit/group-edit.form';

@Component({
    selector: 'polity-group-edit',
    standalone: true,
    imports: [
        ImageUploadComponent,
        ProfileEditForm,
        GroupEditForm
    ],
    templateUrl: './group-edit.page.html',
    styleUrl: './group-edit.page.less'
})
export class GroupEditPage {
    protected groupStore: GroupStore = inject(GroupStore);

    protected async onEdit(newGroupData: any): Promise<void> {
        await this.groupStore.update(newGroupData);
    }

    protected async onUpdateGroupImage(imgStoragePath: string): Promise<void> {
        await this.groupStore.update({img_url_: imgStoragePath});
    }
}

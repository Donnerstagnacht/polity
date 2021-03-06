import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FollowingService } from '../services/following.service';

@Component({
  selector: 'app-follower-management',
  templateUrl: './follower-management.component.html',
  styleUrls: ['./follower-management.component.scss'],
  providers: [MessageService]
})
export class FollowerManagementComponent implements OnInit {
  columns: any[] = [];
  followers: any[] = [];
  followings: any[] = [];
  titleFollower: string = 'Follower';
  titleFollowings: string = 'Followings';
  noDataFollower: string = 'Du hast noch keine Follower.';
  noDataFollowings: string = 'Du folgst noch niemanden.';

  filterString: string = '';
  constructor(
    private followingService: FollowingService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getAllFollower();
    this.getAllFollowing();
  }

  getAllFollower(): void {
    this.followingService.getAllFollower()
    .then((followers) => {
      this.followers = [];
      followers.data.forEach((profile: any) => {
        let id: any = profile.profiles.id;
        let name: any = profile.profiles.name;
        let avatar_url: any = profile.profiles.avatar_url;
        this.followers.push({
          'id': id,
          'name': name,
          'avatar_url': avatar_url
        });
      });
    })
    .catch((error) => {
      this.messageService.add({severity:'success', summary: 'Fehler beim laden. ' + error});
    });
  }

        /**review**/
  getAllFollowing(): void {
    this.followingService.getAllFollowing()
    .then((followings) => {
      this.followings = [];
      followings.data.forEach((profile: any) => {
        let id: any = profile.profiles.id;
        let name: any = profile.profiles.name;
        let avatar_url: any = profile.profiles.avatar_url;
        this.followings.push({
          'id': id,
          'name': name,
          'avatar_url': avatar_url
        });

      });
    })
    .catch((error) => {
      this.messageService.add({severity:'success', summary: 'Fehler beim laden. ' + error});
    });
  }

  onRemoveFollower(uuid: string): void {
    this.followingService.removeFollowerTransaction(uuid)
    .then(() => {
      this.getAllFollowing();
      this.messageService.add({severity:'success', summary: 'Follower entfernt.'});
    })
    .catch((error: any) =>  {
      this.messageService.add({severity:'error', summary: error})
    })
  }

  onUnFollow(uuid: string): void {
    this.followingService.unfollowTransaction(uuid)
    .then(() => {
      this.getAllFollower();
      this.messageService.add({severity:'success', summary: 'Du folgst der Person nicht mehr.'});
    })
    .catch((error) => {
      this.messageService.add({severity:'success', summary: error});
    })
  }
}

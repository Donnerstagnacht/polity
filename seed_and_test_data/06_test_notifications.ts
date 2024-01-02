import * as jsonData from './06_notifications.json';

export type Notification = {
    sender: string,
    receiver: string,
    type_of_notification: string,
    read_by_receiver: string | boolean
}

const Notifications: Notification[] = jsonData;

const NOTIFICATION1: Notification = Notifications[0]
const NOTIFICATION2: Notification = Notifications[1]
const NOTIFICATION3: Notification = Notifications[2]
const NOTIFICATION4: Notification = Notifications[3]
const NOTIFICATION5: Notification = Notifications[4]
const NOTIFICATION6: Notification = Notifications[5]
const NOTIFICATION7: Notification = Notifications[6]
const NOTIFICATION8: Notification = Notifications[7]
const NOTIFICATION9: Notification = Notifications[8]
const NOTIFICATION10: Notification = Notifications[9]

export {
    NOTIFICATION1,
    NOTIFICATION2,
    NOTIFICATION3,
    NOTIFICATION4,
    NOTIFICATION5,
    NOTIFICATION6,
    NOTIFICATION7,
    NOTIFICATION8,
    NOTIFICATION9,
    NOTIFICATION10
};

import firebase from '@firebase/app';
import '@firebase/storage';

export default class FirebaseHelper {
  private _storage = firebase.storage!();
  private _storageRef = this._storage.ref();

  public getDownloadUrl = (file: string) => {
    try {
      return this._storageRef.child(file).getDownloadURL();
    } catch (err) {
      throw err;
    }
  };

  public getJson = async (file: string) => {
    try {
      const url = await this.getDownloadUrl(file);
      const res = await fetch(url);
      if (res.ok) {
        return res.json();
      } else {
        throw res.statusText;
      }
    } catch (err) {
      throw err;
    }
  };
}

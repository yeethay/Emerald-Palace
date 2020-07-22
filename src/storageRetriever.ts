import firebase from '@firebase/app';
import '@firebase/storage';

const storageRetriever = async (fileName: string) => {
  try {
    const storage = firebase.storage!();
    const storageRef = storage.ref();
    const storageUrl = await storageRef.child(fileName).getDownloadURL();
    const res = await fetch(storageUrl);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default storageRetriever;

import firebase from 'firebase';

import Firebase from './firebase';

const uploadImage = (id, imageUri) => {
  const ext = imageUri.split('.').pop();
  const filename = `${id}.${ext}`;

  return new Promise((resolve, reject) => {
    fetch(imageUri)
      .then((response) => response.blob())
      // TODO: Provide image compression algorithm
      .then((imageBlob) => {
        const ref = Firebase.storage.ref(`images/${filename}`);
        const uploadTask = ref.put(imageBlob);
        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            // const progress = snapshot.bytesTransferred / snapshot.totalBytes;
          },
          (error) => reject(error),
          () => {
            resolve(ref.getDownloadURL());
          },
        );
      });
  });
};

export default uploadImage;

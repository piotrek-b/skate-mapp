import firebase from 'firebase';

const uploadImage = (id, imageUri) => {
  const ext = imageUri.split('.').pop();
  const filename = `${id}.${ext}`;

  return new Promise((resolve, reject) => {
    fetch(imageUri)
      .then((response) => response.blob())
      .then((imageBlob) => {
        const ref = firebase.storage().ref(`images/${filename}`);
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

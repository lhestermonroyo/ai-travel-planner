import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';
import { format } from 'date-fns';

const uploadAvatar = async (imageData: any, email: string) => {
  try {
    const imgUri = imageData.assets[0].uri;
    const date = format(new Date(), 'yyyy-MM-dd-HH-mm-ss');
    const file = `avatars/${email}-${date}.jpg`;

    const blobFile = await (await fetch(imgUri)).blob();
    const storageRef = ref(storage, file);
    const snapshot = await uploadBytes(storageRef, blobFile);

    return await getDownloadURL(snapshot.ref);
  } catch (error) {
    console.log('uploadAvatar [error]', error);
  }
};

const uploadTripRatingPhotos = async (photos: any[], tripId: string) => {
  try {
    const uploadPromises = photos.map(async (photo: any) => {
      const date = format(new Date(), 'yyyy-MM-dd-HH-mm-ss');
      const file = `trips/ratings/${tripId}/${photo.fileName}-${date}.jpg`;

      const blobFile = await (await fetch(photo.uri)).blob();
      const storageRef = ref(storage, file);
      const snapshot = await uploadBytes(storageRef, blobFile);

      return await getDownloadURL(snapshot.ref);
    });

    return await Promise.all(uploadPromises);
  } catch (error) {
    console.log('uploadTripPhotos [error]', error);
  }
};

export default { uploadAvatar, uploadTripRatingPhotos };

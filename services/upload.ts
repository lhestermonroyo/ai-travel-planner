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

export default { uploadAvatar };

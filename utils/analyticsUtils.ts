import { doc, getDoc, setDoc, increment } from 'firebase/firestore';
import { db } from './firebaseConfig';

const ANALYTICS_COLLECTION = 'analytics';
const USER_STATS_DOC = 'userStats';

export const incrementUserCount = async () => {
  const userStatsRef = doc(db, ANALYTICS_COLLECTION, USER_STATS_DOC);

  try {
    const userStatsDoc = await getDoc(userStatsRef);

    if (userStatsDoc.exists()) {
      // If the document exists, increment the count
      await setDoc(userStatsRef, { totalUsers: increment(1) }, { merge: true });
    } else {
      // If the document doesn't exist, create it with an initial count of 1
      await setDoc(userStatsRef, { totalUsers: 1 });
    }

    console.log('User count incremented successfully');
  } catch (error) {
    console.error('Error incrementing user count:', error);
  }
};

export const getUserCount = async (): Promise<number> => {
  const userStatsRef = doc(db, ANALYTICS_COLLECTION, USER_STATS_DOC);

  try {
    const userStatsDoc = await getDoc(userStatsRef);

    if (userStatsDoc.exists()) {
      return userStatsDoc.data().totalUsers || 0;
    } else {
      return 0;
    }
  } catch (error) {
    console.error('Error getting user count:', error);
    return 0;
  }
};

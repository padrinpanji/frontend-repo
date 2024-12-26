import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "utils/firebaseConfig";

type Filters = {
  field: string;
  value: string;
};

const fetchDataFromFirestore = async (
  collectionName: string,
  filters?: Filters
) => {
  try {
    const collRef = collection(db, collectionName);

    let q = collRef;
    if (filters?.field && filters?.value) {
      q = query(collRef, where(filters.field, "==", filters.value)) as any;
    }

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => doc.data());

    return data;
  } catch (error) {
    console.error(`Error fetching data from ${collectionName}:`, error);
    throw new Error("Error fetching data from Firestore.");
  }
};

export default fetchDataFromFirestore;

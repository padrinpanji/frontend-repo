const fetchFirebaseSimulatorData = async (routing: string) => {
  try {
    const apiHost = process.env.NEXT_PUBLIC_FIREBASE_SIMULATOR_API_HOST;
    const firebaseProjectID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

    const res = await fetch(
      `${apiHost}${firebaseProjectID}/us-central1/${routing}`
    );

    return await res.json();
  } catch (error) {
    console.error("Error fetching firebase simulator data: ", error);
    return [];
  }
};

export default fetchFirebaseSimulatorData;

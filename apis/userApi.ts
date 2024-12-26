import fetchDataFromFirestore from "helpers/firebaseFirestore.helper";

const fetchUserData = async () => {
  try {
    const usersData = await fetchDataFromFirestore("users");
    return usersData;
  } catch (error) {
    console.error("Error fetching user data: ", error);
    return [];
  }
};

export default fetchUserData;

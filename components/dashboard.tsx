"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";

import { useRouter } from "next/navigation";
import { auth } from "utils/firebaseConfig";
import UserInfo from "./userInfo";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import fetchUserData from "apis/userApi";
import fetchFirebaseSimulatorData from "apis/firebaseSimulatorApi";
import useDashboardStore from "store/store";
import {
  setFirebaseData,
  setFirebaseError,
  setFirebaseLoading,
  setFirebaseSimulatorData,
  setFirebaseSimulatorError,
  setFirebaseSimulatorLoading,
} from "store/action";
import { UserData } from "store/types";

const Dashboard = () => {
  const router = useRouter();
  const {
    state: {
      isFirebaseLoading,
      isFirebaseSimulatorLoading,
      firebaseUsers,
      firebaseSimulatorUsers,
      firebaseError,
      firebaseSimulatorError,
    },
    dispatch,
  } = useDashboardStore();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/login");
      }
    });

    return unsubscribe;
  }, [router]);

  const handleClickFirebase = async () => {
    dispatch(setFirebaseLoading(true));
    dispatch(setFirebaseError(""));

    try {
      const userData = await fetchUserData();
      setTimeout(() => {
        dispatch(setFirebaseData(userData as UserData[]));
      }, 1000);
    } catch (err) {
      dispatch(setFirebaseError("Failed to fetch firebase data"));
    } finally {
      setTimeout(() => {
        dispatch(setFirebaseLoading(false));
      }, 1000);
    }
  };

  const handleClickFirebaseSimulator = async () => {
    dispatch(setFirebaseSimulatorLoading(true));
    dispatch(setFirebaseSimulatorError(""));

    try {
      const fetchedData = await fetchFirebaseSimulatorData("dummyUserData");

      setTimeout(() => {
        dispatch(
          setFirebaseSimulatorData(fetchedData as unknown as UserData[])
        );
      }, 1000);
    } catch (err) {
      dispatch(
        setFirebaseSimulatorError("Failed to fetch firebase simulator data")
      );
    } finally {
      setTimeout(() => {
        dispatch(setFirebaseSimulatorLoading(false));
      }, 1000);
    }
  };

  if (!user) return <></>;

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        className="container mx-auto p-4"
      >
        <UserInfo user={user} />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="medium"
          sx={{ mt: 2 }}
          onClick={handleClickFirebase}
        >
          {isFirebaseLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Fetch Data"
          )}
        </Button>

        {firebaseError && (
          <Typography color="error" variant="body2" sx={{ marginBottom: 2 }}>
            {firebaseError}
          </Typography>
        )}

        {firebaseUsers && firebaseUsers.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {Object.keys(firebaseUsers[0]).map((key) => (
                      <TableCell key={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {firebaseUsers.map((item, index) => (
                    <TableRow key={index}>
                      {Object.values(item).map((value, idx) => (
                        <TableCell key={idx}>{value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        marginTop={2}
        className="container mx-auto p-4"
      >
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="medium"
          sx={{ mt: 2 }}
          onClick={handleClickFirebaseSimulator}
        >
          {isFirebaseSimulatorLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Fetch Data From Firebase Simulator"
          )}
        </Button>

        {firebaseSimulatorError && (
          <Typography color="error" variant="body2" sx={{ marginBottom: 2 }}>
            {firebaseSimulatorError}
          </Typography>
        )}

        {firebaseSimulatorUsers && firebaseSimulatorUsers.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {Object.keys(firebaseSimulatorUsers[0]).map((key) => (
                      <TableCell key={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {firebaseSimulatorUsers.map((item, index) => (
                    <TableRow key={index}>
                      {Object.values(item).map((value, idx) => (
                        <TableCell key={idx}>{value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </Box>
    </>
  );
};

export default Dashboard;

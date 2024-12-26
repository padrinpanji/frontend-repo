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

type Data = {
  email: string;
  name: string;
};

const Dashboard = () => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [firebaseLoading, setFirebaseLoading] = useState(false);
  const [firebaseSimulatorLoading, setFirebaseSimulator] = useState(false);
  const [error, setError] = useState<string>("");
  const [firebaseData, setFirebaseData] = useState<Data[]>([]);
  const [firebaseSimulatorData, setFirebaseSimulatorData] = useState<Data[]>(
    []
  );

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
    setFirebaseLoading(true);
    setError("");

    try {
      const fetchedData = await fetchUserData();
      setTimeout(() => {
        setFirebaseData(fetchedData as Data[]);
      }, 1000);
    } catch (err) {
      setError("Failed to fetch firebase data");
    } finally {
      setTimeout(() => {
        setFirebaseLoading(false);
      }, 1000);
    }
  };

  const handleClickFirebaseSimulator = async () => {
    setFirebaseSimulator(true);
    setError("");

    try {
      const fetchedData = await fetchFirebaseSimulatorData("dummyUserData");

      setTimeout(() => {
        setFirebaseSimulatorData(fetchedData as Data[]);
      }, 1000);
    } catch (err) {
      setError("Failed to fetch firebase simulator data");
    } finally {
      setTimeout(() => {
        setFirebaseSimulator(false);
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
          {firebaseLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Fetch Data"
          )}
        </Button>

        {error && (
          <Typography color="error" variant="body2" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}

        {firebaseData.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {Object.keys(firebaseData[0]).map((key) => (
                      <TableCell key={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {firebaseData.map((item, index) => (
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
          {firebaseSimulatorLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Fetch Data From Firebase Simulator"
          )}
        </Button>

        {error && (
          <Typography color="error" variant="body2" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}

        {firebaseSimulatorData.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {Object.keys(firebaseSimulatorData[0]).map((key) => (
                      <TableCell key={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {firebaseSimulatorData.map((item, index) => (
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

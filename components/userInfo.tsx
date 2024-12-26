"use client";

import { Paper, Typography, Button, Box } from "@mui/material";
import { signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "utils/firebaseConfig";

const UserInfo = ({ user }: { user: User }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login"); // Redirect to login after logout
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="row"
      gap={16}
      marginBottom={"3rem"}
      className="container mx-auto p-4"
    >
      <Typography variant="body1">Welcome, {user?.email || "User"}!</Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default UserInfo;

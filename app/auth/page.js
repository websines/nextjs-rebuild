"use client";

import supabase from "@/lib/SupabaseClient";
import { Container, Typography } from "@mui/material";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const AuthPage = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Authentication
      </Typography>
      <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
    </Container>
  );
};

export default AuthPage;

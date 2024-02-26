// AuthProvider.js
"use client";
import React, { useState, useEffect, createContext, useContext } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uwixomogyvygqonywfqz.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3aXhvbW9neXZ5Z3Fvbnl3ZnF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA0MTgzNjQsImV4cCI6MjAxNTk5NDM2NH0.hAb1Q6wiv4JbAPLprFAeopOa3-Eizf9w8Hasg7JCmvo";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      setLoading(true);
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
      setLoading(false);
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.error === "PASSWORD_RECOVERY") {
          setUser(null);
        } else if (session?.event === "SIGNED_IN") {
          setUser(session.user);
        } else if (session?.event === "SIGNED_OUT") {
          setUser(null);
        }
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    return supabase.auth.signIn({ email, password });
  };

  const signOut = async () => {
    return supabase.auth.signOut();
  };

  const value = {
    user,
    isLoading: loading,
    login,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

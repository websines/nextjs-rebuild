import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import { theme } from "@/Providers/ThemeProviderSELF";
import { ThemeProvider } from "@mui/material";

const queryClient = new QueryClient();

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Curarts",
  description: "WIP",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <QueryClientProvider client={queryClient}> */}
      <ThemeProvider theme={theme}>
        <body className={inter.className}>
          <Header />
          {children}
        </body>
        <Footer />
      </ThemeProvider>
      {/* </QueryClientProvider> */}
    </html>
  );
}

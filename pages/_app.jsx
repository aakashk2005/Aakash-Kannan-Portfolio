import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

import Layout from "../components/Layout";
import LoadingScreen from "../components/LoadingScreen";
import Transition from "../components/Transition";
import { AppProvider } from "../context/AppContext";
import { Analytics } from "@vercel/analytics/react";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = useCallback(() => setIsLoading(false), []);

  return (
    <AppProvider>
      {/* Cinematic loading overlay — unmounts after exit animation */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen key="loader" onComplete={handleLoadComplete} />
        )}
      </AnimatePresence>

      {/* Main app — fades + unblurs in after loading */}
      <motion.div
        className="font-sora h-full"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isLoading ? 0 : 1,
          filter: isLoading ? "blur(10px)" : "blur(0px)",
        }}
        transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
      >
        <Layout>
          <AnimatePresence mode="wait">
            <motion.div key={router.route} className="h-full">
              <Transition />
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </Layout>
      </motion.div>
      <Analytics />
    </AppProvider>
  );
}

export default MyApp;

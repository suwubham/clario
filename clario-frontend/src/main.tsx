import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ClerkProvider } from '@clerk/react'
const PUBLISHABLE_KEY = "pk_test_ZHJpdmluZy1zaHJpbXAtMy5jbGVyay5hY2NvdW50cy5kZXYk";
createRoot(document.getElementById("root")!).render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <App />
    </ClerkProvider>
);

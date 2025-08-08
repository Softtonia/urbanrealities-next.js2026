// components/ProtectedRoute.js
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; ;
import { useSiteSettings } from "./mycontext/siteSettingContext";

export default function ProtectedRoute({ children }) {
    const {token} = useSiteSettings();
    const [isChecking, setIsChecking] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            router.replace("/auth/login"); // Redirect if no token
        } else {
            setIsChecking(false); // Allow rendering
        }
    }, [router]);

    if (isChecking) {
        return <div>Loading...</div>; // or your loader spinner
    }

    return children;
}

import PageLayout from "@/components/PageLayout";
import MembersSection from "@/components/MembersSection";
import { useEffect, useState } from "react";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "@/lib/firebase";

const MembersPage = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const loadCount = async () => {
      try {
        // try server count (may require billing), fallback to client-side count
        const snap = await getCountFromServer(collection(db, "members"));
        setCount(snap.data().count);
      } catch (e) {
        try {
          const { getDocs } = await import("firebase/firestore");
          const snap = await getDocs(collection(db, "members"));
          setCount(snap.size);
        } catch (err) {
          console.error(err);
          setCount(null);
        }
      }
    };
    loadCount();
  }, []);

  return (
    <PageLayout>
      <div className="container px-4 py-6">
        <div className="mb-4 text-sm text-muted-foreground">সদস্য সংখ্যা: {count ?? "লোড হচ্ছে..."}</div>
      </div>
      <MembersSection />
    </PageLayout>
  );
};

export default MembersPage;

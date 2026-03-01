import PageLayout from "@/components/PageLayout";
import { useEffect, useMemo, useState } from "react";
import {
  collection,
  doc,
  getCountFromServer,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { db, auth } from "@/lib/firebase";

type AnyDoc = Record<string, any> & { id: string };

const ADMIN_EMAIL = "mdmahbubsite@gmail.com";

export default function AdminPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // login form
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState<string | null>(null);
  const [loginBusy, setLoginBusy] = useState(false);

  // data
  const [donations, setDonations] = useState<AnyDoc[]>([]);
  const [joins, setJoins] = useState<AnyDoc[]>([]);
  const [members, setMembers] = useState<AnyDoc[]>([]);
  const [memberCount, setMemberCount] = useState(0);

  const [tab, setTab] = useState<"donations" | "joins" | "members">("donations");
  const [search, setSearch] = useState("");

  const isAuthed = !!userEmail;
  const isAdmin = userEmail?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  // Auth gate
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUserEmail(u?.email ?? null);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  // if logged in but not admin -> force logout (so they can't even stay signed in here)
  useEffect(() => {
    if (authLoading) return;
    if (isAuthed && !isAdmin) {
      signOut(auth).catch(() => {});
    }
  }, [authLoading, isAuthed, isAdmin]);

  // Live data (only when admin)
  useEffect(() => {
    if (!isAdmin) return;

    const dQ = query(collection(db, "donations"), orderBy("createdAt", "desc"));
    const jQ = query(collection(db, "joinRequests"), orderBy("createdAt", "desc"));
    const mQ = query(collection(db, "members"), orderBy("createdAt", "desc"));

    const unsub1 = onSnapshot(dQ, (snap) => {
      setDonations(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    const unsub2 = onSnapshot(jQ, (snap) => {
      setJoins(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    const unsub3 = onSnapshot(mQ, (snap) => {
      setMembers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    (async () => {
      try {
        const agg = await getCountFromServer(collection(db, "members"));
        setMemberCount(agg.data().count);
      } catch {}
    })();

    return () => {
      unsub1();
      unsub2();
      unsub3();
    };
  }, [isAdmin]);

  const fmtTime = (t: any) => {
    try {
      return t?.toDate?.()?.toLocaleString?.() ?? "—";
    } catch {
      return "—";
    }
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return { donations, joins, members };

    const contains = (obj: AnyDoc, keys: string[]) =>
      keys.some((k) => String(obj?.[k] ?? "").toLowerCase().includes(q));

    return {
      donations: donations.filter((d) => contains(d, ["name", "phone", "trxId", "method", "status"])),
      joins: joins.filter((j) => contains(j, ["name", "phone", "area", "reason", "status"])),
      members: members.filter((m) => contains(m, ["name", "phone", "area", "status"])),
    };
  }, [donations, joins, members, search]);

  // Actions
  const approveJoin = async (j: AnyDoc) => {
    const joinRef = doc(db, "joinRequests", j.id);
    const memberRef = doc(db, "members", j.id);

    await setDoc(
      memberRef,
      {
        name: j.name ?? "",
        phone: j.phone ?? "",
        area: j.area ?? "",
        reason: j.reason ?? "",
        status: "active",
        sourceJoinId: j.id,
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );

    await updateDoc(joinRef, { status: "approved", approvedAt: serverTimestamp() });
  };

  const rejectJoin = async (j: AnyDoc) => {
    await updateDoc(doc(db, "joinRequests", j.id), {
      status: "rejected",
      rejectedAt: serverTimestamp(),
    });
  };

  const removeMember = async (m: AnyDoc) => {
    await deleteDoc(doc(db, "members", m.id));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginErr(null);
    setLoginBusy(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      const em = cred.user.email ?? "";
      if (em.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        await signOut(auth);
        setLoginErr("This account is not authorized for admin.");
        return;
      }
      setPassword("");
    } catch (err: any) {
      setLoginErr(err?.message ?? "Login failed");
    } finally {
      setLoginBusy(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  // UI states
  if (authLoading) {
    return (
      <PageLayout>
        <div className="container px-4 py-10">
          <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
            Checking login...
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!isAuthed || !isAdmin) {
    return (
      <PageLayout>
        <div className="container px-4 py-10">
          <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-6">
            <h1 className="text-2xl font-black">Admin Login</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Email + password দিয়ে ঢুকো (only admin email allowed)।
            </p>

            <form onSubmit={handleLogin} className="mt-5 space-y-3">
              <div>
                <label className="text-xs text-muted-foreground">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  autoComplete="email"
                  className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-foreground/20"
                  placeholder="admin email"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  autoComplete="current-password"
                  className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-foreground/20"
                  placeholder="password"
                  required
                />
              </div>

              {loginErr && (
                <div className="rounded-xl border border-border bg-background px-4 py-3 text-sm">
                  {loginErr}
                </div>
              )}

              <button
                disabled={loginBusy}
                className="w-full px-5 py-2.5 rounded-xl border border-border bg-foreground text-background disabled:opacity-60"
              >
                {loginBusy ? "Logging in..." : "Login"}
              </button>

              <p className="text-xs text-muted-foreground">
                Allowed admin: <span className="font-semibold">{ADMIN_EMAIL}</span>
              </p>
            </form>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container px-4 py-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Admin Panel</h1>
            <p className="text-sm text-muted-foreground">
              Logged in as <span className="font-semibold">{userEmail}</span>
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <div className="rounded-2xl border border-border bg-card px-4 py-3">
              <div className="text-xs text-muted-foreground">Donations</div>
              <div className="text-xl font-extrabold">{donations.length}</div>
            </div>
            <div className="rounded-2xl border border-border bg-card px-4 py-3">
              <div className="text-xs text-muted-foreground">Members</div>
              <div className="text-xl font-extrabold">{memberCount}</div>
            </div>

            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl border border-border bg-card"
              title="Logout"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setTab("donations")}
              className={`px-4 py-2 rounded-xl border ${
                tab === "donations" ? "bg-foreground text-background" : "bg-card border-border"
              }`}
            >
              Donations
            </button>
            <button
              onClick={() => setTab("joins")}
              className={`px-4 py-2 rounded-xl border ${
                tab === "joins" ? "bg-foreground text-background" : "bg-card border-border"
              }`}
            >
              Join Requests
            </button>
            <button
              onClick={() => setTab("members")}
              className={`px-4 py-2 rounded-xl border ${
                tab === "members" ? "bg-foreground text-background" : "bg-card border-border"
              }`}
            >
              Members
            </button>
          </div>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name / phone / area..."
            className="w-full md:w-[360px] rounded-xl border border-border bg-card px-4 py-2 outline-none focus:ring-2 focus:ring-foreground/20"
          />
        </div>

        {/* Content */}
        <div className="mt-6 grid gap-3">
          {tab === "donations" && (
            <>
              {filtered.donations.length === 0 ? (
                <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
                  No donations yet.
                </div>
              ) : (
                filtered.donations.map((d) => (
                  <div key={d.id} className="rounded-2xl border border-border bg-card p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-base font-bold">
                          ৳{d.amount ?? "—"}{" "}
                          <span className="text-xs font-normal text-muted-foreground">
                            • {d.method ?? "Donation"}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {d.name ? `${d.name} • ` : ""}
                          {d.phone ?? ""}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {d.trxId ? `Trx: ${d.trxId} • ` : ""}
                          {fmtTime(d.createdAt)}
                        </div>
                      </div>

                      <span className="text-xs rounded-full border border-border px-3 py-1 text-muted-foreground">
                        {d.status ?? "received"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {tab === "joins" && (
            <>
              {filtered.joins.length === 0 ? (
                <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
                  No join requests yet.
                </div>
              ) : (
                filtered.joins.map((j) => (
                  <div key={j.id} className="rounded-2xl border border-border bg-card p-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0">
                        <div className="text-base font-extrabold truncate">{j.name ?? "—"}</div>
                        <div className="text-sm text-muted-foreground">
                          Phone: {j.phone ?? "—"} • Area: {j.area ?? "—"}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{j.reason ?? "—"}</div>
                        <div className="text-xs text-muted-foreground mt-2">
                          Status: <span className="font-semibold">{j.status ?? "pending"}</span> •{" "}
                          {fmtTime(j.createdAt)}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => approveJoin(j)}
                          className="px-4 py-2 rounded-xl border border-border bg-foreground text-background"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => rejectJoin(j)}
                          className="px-4 py-2 rounded-xl border border-border bg-card"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {tab === "members" && (
            <>
              {filtered.members.length === 0 ? (
                <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
                  No members yet.
                </div>
              ) : (
                filtered.members.map((m) => (
                  <div key={m.id} className="rounded-2xl border border-border bg-card p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-base font-extrabold">{m.name ?? "—"}</div>
                        <div className="text-sm text-muted-foreground">
                          Phone: {m.phone ?? "—"} • Area: {m.area ?? "—"}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{fmtTime(m.createdAt)}</div>
                      </div>

                      <button
                        onClick={() => removeMember(m)}
                        className="px-4 py-2 rounded-xl border border-border bg-card"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
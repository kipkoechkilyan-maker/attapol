import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

interface UserAccount {
  id: string;
  account_type: string;
  balance: number;
  surveys_per_day: number;
  min_withdrawal: number;
  surveys_completed_today: number;
  last_survey_date: string | null;
  phone_number: string;
}

interface Profile {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone_number: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  account: UserAccount | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshAccount: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  account: null,
  loading: true,
  signOut: async () => {},
  refreshAccount: async () => {},
  refreshProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [account, setAccount] = useState<UserAccount | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("first_name, last_name, email, phone_number")
      .eq("user_id", userId)
      .maybeSingle();
    setProfile(data);
  };

  const fetchAccount = async (userId: string) => {
    const { data } = await supabase
      .from("user_accounts")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();
    setAccount(data);
  };

  const refreshAccount = async () => {
    if (user) await fetchAccount(user.id);
  };

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id);
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          // Use setTimeout to avoid Supabase client deadlock
          setTimeout(async () => {
            await fetchProfile(session.user.id);
            await fetchAccount(session.user.id);
            setLoading(false);
          }, 0);
        } else {
          setProfile(null);
          setAccount(null);
          setLoading(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id).then(() =>
          fetchAccount(session.user.id).then(() => setLoading(false))
        );
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    setAccount(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, profile, account, loading, signOut, refreshAccount, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

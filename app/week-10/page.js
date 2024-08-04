
import { useUserAuth } from "./_utils/auth-context";
import { useState, useEffect } from "react";

const Page = () => {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user !== null) setLoading(false);
  }, [user]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName} ({user.email})</p>
          <button onClick={firebaseSignOut}>Logout</button>
          <a href="/week-8/shopping-list">Go to Shopping List</a>
        </div>
      ) : (
        <button onClick={gitHubSignIn}>Login with GitHub</button>
      )}
    </div>
  );
};

export default Page;

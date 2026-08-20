import { redirect } from "react-router";
import { account } from "~/appwrite/client";
import { storeUserData } from "~/appwrite/auth";

export async function clientLoader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");
  const secret = url.searchParams.get("secret");

  if (userId && secret) {
    await account.createSession(userId, secret);
    await storeUserData();
    return redirect("/dashboard");
  }

  return null;
}

const Home = () => {
  return <div>Home</div>;
};

export default Home;

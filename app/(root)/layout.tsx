import Header from "@/components/Header";
import AiChatbot from "@/components/AiChatbot";
import { getAuth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const auth = await getAuth();
  if (!auth) {
    redirect("/sign-in");
  }

  let session = null;
  try {
    session = await auth.api.getSession({ headers: await headers() });
  } catch (error) {
    console.error("Session fetch error:", error);
  }

  if (!session?.user) {
    redirect("/sign-in");
  }

  const user: User = {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
  };

  return (
    <main className="min-h-screen text-gray-400 relative">
      <Header user={user} />
      <div className="container py-10">{children}</div>
      <AiChatbot />
    </main>
  );
};

export default layout;

import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function SettingsPage() {
  const session = await auth();
  return (
    <div className="min-h-screen p-4">
      <p>{JSON.stringify(session)}</p>
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <form
        action={async () => {
          "use server";

          await signOut({
            redirectTo: "/auth/login",
          });
        }}
      >
        <Button type="submit" size={"lg"}>
          Sign Out
        </Button>
      </form>
    </div>
  );
}

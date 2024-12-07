import LoginButton from "../components/auth/login-button";
import { Button } from "../components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-y-6 justify-center">
      <div className="text-center ">
        <h1 className="text-4xl drop-shadow-md font-bold">🔒 Authentication</h1>
        <p className="text-lg mt-3 text-muted-foreground">
          This is an example of how to use Next.js with NextAuth(Authjs).
        </p>
      </div>
      <div>
        <LoginButton mode="model">
          <Button variant={"default"} size={"lg"}>
            Sign in
          </Button>
        </LoginButton>
      </div>
    </div>
  );
}

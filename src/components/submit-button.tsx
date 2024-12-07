import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export default function SubmitButton({
  children,
  pendingLabel,
}: {
  children: React.ReactNode;
  pendingLabel: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      className="w-full disabled:animate-spin "
      disabled={pending}
      type="submit"
    >
      {pending ? pendingLabel : children}
    </Button>
  );
}

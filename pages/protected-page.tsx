import Link from "components/link";
import { useSession } from "next-auth/react";

export default function ProtectedPage(): JSX.Element {
  const { data: session } = useSession();

  return (
    <>
      <div>Hello authenticated mister {session?.user?.email}</div>

      <div>
        <Link href="/">Back to home</Link>
      </div>
    </>
  );
}

ProtectedPage.auth = true;

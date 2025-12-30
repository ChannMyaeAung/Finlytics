import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

export const Auth = () => {
  return (
    <div className="sign-in-container">
      <SignedOut>
        <Button variant={"outline"}>
          <SignUpButton mode="modal" />
        </Button>
        <Button variant={"outline"}>
          <SignInButton mode="modal" />
        </Button>
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

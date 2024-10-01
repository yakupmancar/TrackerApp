import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

const Header = () => {
  const { user } = useUser();

  return (
    <div className="py-4 mb-5 font-semibold">
      <div className="max-w-6xl mx-auto flex justify-end">
        <div>
          <SignedOut>
            <div className="flex gap-3">
              <SignUpButton className="hover:underline" mode="modal" />
              |
              <SignInButton className="hover:underline" mode="modal" />
            </div>
          </SignedOut>

          <div className="flex items-center gap-2">
            <SignedIn>
              <UserButton />
              {user?.firstName}
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

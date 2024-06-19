import { SignInButton, StatusAPIResponse } from "@farcaster/auth-kit";

export default function CustomSignInButton() {
  const onSignInSuccess = (res: StatusAPIResponse) => {
    if (res.state === "completed") {
      console.log("request: ", res);
      localStorage.setItem("connectedUser", JSON.stringify(res));
    }
  };

  const onSignOut = () => {
    localStorage.removeItem("connectedUser");
  };

  return <SignInButton onSuccess={onSignInSuccess} onSignOut={onSignOut} />;
}

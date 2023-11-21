import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignIn
        appearance={{
          baseTheme: dark,
        }}
      />
    </Suspense>
  );
}

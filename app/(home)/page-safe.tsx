import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ClaimLinkForm from "@/modules/home/components/claim-link-form";

// Loading component
function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading TreeBio...</p>
      </div>
    </div>
  );
}

// Fallback component for errors
function ErrorFallback() {
  return (
    <div className="min-h-screen">
      <main className="flex flex-col max-w-4xl mx-auto px-4 sm:px-6">
        <section className="text-center space-y-8 py-16 sm:py-24 lg:py-32">
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-zinc-700 dark:text-zinc-100">
              Everything you are.
              <br />
              <span className="text-[#41B313]">In one simple link.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
              Join 70M+ people using TreeBio for their link in bio. One link to
              help you share everything you create, curate and sell from your
              social media profiles.
            </p>
          </div>

          <div className="pt-4">
            <Link href="/sign-in">
              <Button size="lg" className="px-8 py-3 text-lg font-medium cursor-pointer">
                Get Started
              </Button>
            </Link>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="max-w-md mx-auto">
            <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
              <ClaimLinkForm />
            </Suspense>
          </div>
        </section>
      </main>
    </div>
  );
}

// Main component wrapped with error boundary
export default function HomePage() {
  return (
    <Suspense fallback={<Loading />}>
      <HomePageContent />
    </Suspense>
  );
}

// Separate component to handle async operations
async function HomePageContent() {
  try {
    // Import the async functions dynamically to prevent build-time errors
    const { onBoardUser } = await import("@/modules/auth/actions");
    const { getCurrentUsername } = await import("@/modules/profile/actions");
    
    try {
      const user = await onBoardUser();
      const profile = await getCurrentUsername();
      
      // If user is not authenticated, redirect to sign-in
      if (!user?.success) {
        const { redirect } = await import("next/navigation");
        return redirect("/sign-in");
      }

      return (
        <div className="min-h-screen">
          <main className="flex flex-col max-w-4xl mx-auto px-4 sm:px-6">
            <section className="text-center space-y-8 py-16 sm:py-24 lg:py-32">
              <div className="space-y-6">
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-zinc-700 dark:text-zinc-100">
                  Everything you are.
                  <br />
                  <span className="text-[#41B313]">In one simple link.</span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
                  Join 70M+ people using TreeBio for their link in bio. One link to
                  help you share everything you create, curate and sell from your
                  social media profiles.
                </p>
              </div>

              <div className="pt-4">
                {user.success && profile?.username ? (
                  <Link href="/admin/my-tree">
                    <Button size="lg" className="px-8 py-3 text-lg font-medium cursor-pointer">
                      TreeBio Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link href="/admin">
                    <Button size="lg" className="px-8 py-3 text-lg font-medium cursor-pointer">
                      Get Started
                    </Button>
                  </Link>
                )}
              </div>
            </section>

            <section className="pb-16 md:pb-24">
              <div className="max-w-md mx-auto">
                <ClaimLinkForm />
              </div>
            </section>
          </main>
        </div>
      );
    } catch (error) {
      console.error("❌ Error loading home page data:", error);
      return <ErrorFallback />;
    }
  } catch (importError) {
    console.error("❌ Error importing modules:", importError);
    return <ErrorFallback />;
  }
}

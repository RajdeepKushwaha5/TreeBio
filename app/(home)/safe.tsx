import { Button } from "@/components/ui/button";
import Link from "next/link";

// This is a completely static page with no database calls
export default function SafeHomePage() {
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

          <div className="pt-4 space-y-4">
            <div>
              <Link href="/sign-in">
                <Button size="lg" className="px-8 py-3 text-lg font-medium cursor-pointer mr-4">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="outline" size="lg" className="px-8 py-3 text-lg font-medium cursor-pointer">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="max-w-md mx-auto text-center">
            <div className="p-6 border rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Get Started Today</h2>
              <p className="text-muted-foreground mb-4">
                Create your personalized link in bio page in minutes.
              </p>
              <Link href="/sign-up">
                <Button className="w-full">
                  Create Your TreeBio
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

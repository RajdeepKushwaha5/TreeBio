export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import ShortenerPageClient from "./shortener-client";

export default function ShortenerPage() {
  return <ShortenerPageClient />;
}

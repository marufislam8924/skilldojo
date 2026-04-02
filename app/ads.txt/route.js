export async function GET() {
  const publisherId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ACCOUNT;
  const account = publisherId?.startsWith("ca-pub-") ? publisherId.replace("ca-pub-", "") : "";

  const body = account
    ? `google.com, pub-${account}, DIRECT, f08c47fec0942fa0\n`
    : "# Missing NEXT_PUBLIC_GOOGLE_ADSENSE_ACCOUNT\n";

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

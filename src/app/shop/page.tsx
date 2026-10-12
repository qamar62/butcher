import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ShopClient from "./ShopClient";

export const metadata: Metadata = { title: "Shop fresh halal meat" };

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ category?: string; q?: string }> }) {
  const sp = await searchParams;
  return (
    <>
      <PageHero title="Our Shop" crumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]} />
      <ShopClient key={`${sp.category ?? ""}-${sp.q ?? ""}`} initialCategory={sp.category ?? "all"} initialQuery={sp.q ?? ""} />
    </>
  );
}

import Sidebar from "@/components/navbar/Sidebar";
import Script from "next/script";

export default function FeaturesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-screen flex">
      <Script
        strategy="beforeInteractive"
        src={`https://maps.gomaps.pro/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
      />
      <Sidebar />
      <div className="grow">{children}</div>
    </div>
  );
}

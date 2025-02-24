import Sidebar from "@/components/navbar/Sidebar";
import Script from "next/script";

export default function FeaturesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-screen flex">
      <Sidebar />
      <div className="grow">{children}</div>
    </div>
  );
}

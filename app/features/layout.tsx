import Sidebar from "@/components/navbar/Sidebar";
import SmallSideBar from "@/components/navbar/SmallSideBar";

export default function FeaturesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-[100dvh] w-[100dvw] flex relative">
      <Sidebar />
      <SmallSideBar />
      <div className="grow">{children}</div>
    </div>
  );
}

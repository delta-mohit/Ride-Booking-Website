import Image from "next/image";
import SignupCard from "@/components/signup/SignupCard";

const Page = () => {
  return (
    <div className="h-screen w-screen flex">
      <div className="grow h-full flex justify-center items-center bg-gray-100 dark:bg-gray-900">
        <SignupCard />
      </div>
      <div className="w-[55%] h-full hidden lg:block">
        <Image
          src="/bg_city.jpg"
          height={500}
          width={500}
          alt="bg-image"
          className="w-full h-full"
        />
      </div>
    </div>
  );
};
export default Page;

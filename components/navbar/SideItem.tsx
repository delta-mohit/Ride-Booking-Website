import Link from "next/link";

const SideItem = ({
  href,
  icon,
  text,
  isOpen,
}: {
  href: string;
  icon: JSX.Element;
  text: string;
  isOpen: boolean;
}) => {
  return (
    <Link
      href={href}
      className={`flex items-center w-full py-3 ${
        isOpen ? "px-4" : ""
      } rounded-lg cursor-pointer hover:bg-orange-500 text-white space-x-5`}
    >
      {/* Ensure the icon is centered when closed */}
      <div
        className={`flex items-center ${
          !isOpen ? "justify-center w-full" : ""
        }`}
      >
        {icon}
      </div>

      {/* Show text only when open */}
      {isOpen && (
        <span className="text-sm font-medium whitespace-nowrap">{text}</span>
      )}
    </Link>
  );
};

export default SideItem;

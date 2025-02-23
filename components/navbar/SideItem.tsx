const SideItem = ({
  icon,
  text,
  isOpen,
}: {
  icon: JSX.Element;
  text: string;
  isOpen: boolean;
}) => {
  return (
    <div
      className={`flex w-full min-h-[60px] py-3 px-4 rounded-lg cursor-pointer hover:bg-[#649b92] text-white space-x-5`}
    >
      {/* Ensure the icon is centered when closed */}
      <div
        className={`flex items-center -translate-y-1 ${
          !isOpen ? "justify-center w-full" : ""
        }`}
      >
        {icon}
      </div>

      {/* Show text only when open */}
      {isOpen && <span className="text-lg whitespace-nowrap">{text}</span>}
    </div>
  );
};

export default SideItem;

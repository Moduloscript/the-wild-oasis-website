import SideNavigation from "../_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[16rem_1fr] w-full h-full gap-4 md:gap-12">
      <div className="p-4 md:p-0">
        <SideNavigation />
      </div>
      <div className="py-4 px-4 md:py-1 md:px-0">
        {children}
      </div>
    </div>
  );
}

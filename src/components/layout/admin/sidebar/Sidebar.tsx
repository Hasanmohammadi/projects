import clsx from 'clsx';

interface HeaderPropsI {
  children: React.ReactNode;
  className?: string;
}

function Sidebar({ children, className }: HeaderPropsI) {
  return (
    <div
      className={clsx(
        className,
        'w-[inherit] h-screen border bg-white border-gray-200',
      )}
    >
      {children}
    </div>
  );
}

export default Sidebar;

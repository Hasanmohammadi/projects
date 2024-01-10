import clsx from 'clsx';

interface HeaderPropsI {
  children: React.ReactNode;
  className?: string;
}

function Header({ children, className }: HeaderPropsI) {
  return (
    <div
      className={clsx(
        className,
        'py-3 px-8 border-green-800-500 border w-4/5 border-l-0 fixed z-[101] bg-white',
      )}
    >
      {children}
    </div>
  );
}

export default Header;

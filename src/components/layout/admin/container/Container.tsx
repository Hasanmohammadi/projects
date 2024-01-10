import ContainerStyled from './Container.style';

interface ContainerPropsI {
  children: React.ReactNode;
}
export default function Container({ children }: ContainerPropsI) {
  return <ContainerStyled className="p-8 ">{children}</ContainerStyled>;
}

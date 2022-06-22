import "./header.scss";

interface HeaderProps {
  headerText: string;
}
export const Header = ({ headerText }: HeaderProps) => {
  return (
    <header className="header">
      <div className="header__title">
        <h1>{headerText}</h1>
      </div>
    </header>
  );
};

export default Header;

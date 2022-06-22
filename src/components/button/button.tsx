import "./button.scss";

interface ButtonContainerProps {
  position: "left" | "center" | "right";
  children: React.ReactNode;
}

export const ButtonContainer = ({
  position,
  children,
}: ButtonContainerProps) => {
  return (
    <div className="btnContainer" style={{ justifyContent: position }}>
      {children}
    </div>
  );
};

interface ButtonProps {
  buttonText: string;
  buttonClass: "primary" | "secondary";
  onClick: () => {};
}

export const Button = ({ buttonText, buttonClass, onClick }: ButtonProps) => {
  return (
    <button
      className={
        buttonClass === "primary" ? "btn btn--primary" : "btn btn--secondary"
      }
      onClick={() => {
        onClick();
      }}
    >
      {buttonText}
    </button>
  );
};

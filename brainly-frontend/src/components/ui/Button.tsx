interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick: () => void;
  fullWidth?: boolean;
}

export const Button = (props: ButtonProps) => {
  const variantStyles = {
    "primary":"bg-purple-600 text-white",
    "secondary":"bg-purple-300 text-purple-600"
  };
  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      onClick={props.onClick}
      className={`
        ${variantStyles[props.variant]}
        ${sizeStyles[props.size]}
        flex items-center gap-2 rounded-lg font-medium`}>
      {props.startIcon && <span>{props.startIcon}</span>}
      {props.text}
    </button>
  );
};

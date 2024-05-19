import Button, { ButtonProps } from '@mui/material/Button';
import { CustomButtonProps } from "../../types";

const CustomButton = ({
    color,
    variant,
    size,
    title,
    sx,
    index,
    onClick,
    onMouseOver,
    onMouseLeave,
    disabled,
    startIcon,
    endIcon,
    type,
    form,
    fullWidth,
}: CustomButtonProps) => {
    const mergedSx = { ...sx };
    return (
      <Button
        key={index}
        color={color as ButtonProps["color"]}
        variant={variant as ButtonProps["variant"]}
        onClick={onClick}
        sx={mergedSx}
        size={size}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        disabled={disabled}
        startIcon={startIcon}
        type={type}
        endIcon={endIcon}
        form={form}
        fullWidth={fullWidth}
      >
        {title}
      </Button>
    );
  };
  
  export default CustomButton;
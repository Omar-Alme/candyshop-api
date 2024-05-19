import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { Controller, RegisterOptions } from "react-hook-form";

interface textFieldProps {
    name: string;
    label: string;
    placeholder: string;
    rules?: RegisterOptions;
    control?: any;
    helperText?: string | undefined;
    type?: string;
    size?: "small" | "medium";
    defaultValue?: string | number;
    fullWidth?: boolean;
    multiline?: boolean;
    minRows?: string | number;
    InputProps?: {
        endAdornment?: React.ReactNode;
    };
}

const CustomTextField: React.FC<textFieldProps> = (props) => {
    const {
        name,
        label,
        placeholder,
        rules,
        control,
        helperText,
        type,
        size,
        defaultValue,
        fullWidth,
        multiline,
        minRows,
        InputProps,
    } = props;

    return (
        <div>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <TextField
                        {...field}
                        id={name}
                        name={name}
                        helperText={helperText}
                        value={field.value}
                        onChange={field.onChange}
                        label={label}
                        placeholder={placeholder}
                        type={type}
                        size={size}
                        FormHelperTextProps={{ sx: { color: "red" } }}
                        defaultValue={defaultValue}
                        fullWidth={fullWidth}
                        multiline={multiline}
                        minRows={minRows}
                        InputProps={InputProps}
                    />
                )}
            />
        </div>
        );
};

export default CustomTextField;
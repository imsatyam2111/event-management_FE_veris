import React from "react";

interface InputTextProps {
    title: string;
    inputElement: React.ReactNode;
}

const InputText = React.memo(({ title, inputElement }: InputTextProps) => {
    return (
        <div className="flex flex-col items-start w-full space-y-2">
            <h3 className="text-sm font-semibold text-black/80">{title}</h3>
            {inputElement}
        </div>
    );
});

export default InputText;

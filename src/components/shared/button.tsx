type ButtonSize = "xs" | "s" | "base" | "medium" | "large"

export interface ButtonProps {
    backgroundColor?: string;
    size?: ButtonSize;
    label: string;
    onClick?: () => void;
    isDisabled?: boolean;
    icon?: React.ReactElement;
}

export const Button = ({
    
}: ButtonProps) => {



    return (
        <button >
            {/* <fa-icon class="add-icon" icon="plus"></fa-icon> */}
            New Case
        </button>
    )
}

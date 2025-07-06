
export const Button = ({
    children,
    variant = "default",
    size = "md",
    className = "",
    type = "button",
    ...props
}) => {
    const variants = {
        default: "bg-black text-white hover:bg-gray-800",
        outline: "border border-black text-black bg-white hover:bg-gray-100"
    };

    const sizes = {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-5 py-3 text-lg"
    };

    return (
        <button
            type={type}
            className={`inline-flex items-center justify-center rounded-md transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

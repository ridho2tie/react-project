export const Input = ({ type = "text", placeholder = "", className = "", ...props }) => (
    <input
        type={type}
        placeholder={placeholder}
        className={`border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black ${className}`}
        {...props}
    />
);

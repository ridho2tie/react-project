export const Checkbox = ({ id, className = "", ...props }) => (
    <input
        id={id}
        type="checkbox"
        className={`w-4 h-4 accent-black ${className}`}
        {...props}
    />
);

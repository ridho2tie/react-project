// File: src/Error/Error403.jsx
import ErrorPage from "./ErrorPage";
export default function Error403() {
  return (
    <ErrorPage
      errorCode="403"
      title="Forbidden"
      message="You don’t have permission to view this page."
      image="/img/Error.png"
    />
  );
}
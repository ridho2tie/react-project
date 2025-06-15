import ErrorPage from "./ErrorPage";
export default function Error400() {
  return (
    <ErrorPage
      errorCode="400"
      title="Bad Request"
      message="The server could not understand the request due to invalid syntax."
      image="/img/Error.png"
    />
  );
}
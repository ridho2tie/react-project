import ErrorPage from "./ErrorPage";
export default function Error401() {
  return (
    <ErrorPage
      errorCode="401"
      title="Unauthorized"
      message="You are not authorized to access this page."
      image="/img/Error.png"
    />
  );
}
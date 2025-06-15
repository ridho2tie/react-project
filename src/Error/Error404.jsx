import ErrorPage from "./ErrorPage";
export default function Error404() {
  return (
    <ErrorPage
      errorCode="404"
      title="Page Not Found"
      message="Sorry, the page you are looking for does not exist."
      image="/img/Error.png"
    />
  );
}
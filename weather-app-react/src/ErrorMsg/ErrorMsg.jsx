import Alert from "react-bootstrap/Alert";

const ErrorMsg = () => {
  return (
    <>
      {["danger"].map((variant) => (
        <Alert key={variant} variant={variant}>
          !!!Please Enter a valid Name of the Place.
        </Alert>
      ))}
    </>
  );
};

export default ErrorMsg;

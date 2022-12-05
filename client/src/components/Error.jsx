import Alert from "react-bootstrap/Alert";

const Error = (props) => {
  return <Alert variant={props.variant || "info"}>{props.children}</Alert>;
};

export default Error;

import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function ButtonBack({ destination = -1 }) {
  const navigate = useNavigate();
  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        navigate(destination);
      }}
    >
      &larr; Back
    </Button>
  );
}

import { useContext } from "react";
import AlertContext from "../Context/Alert/AlertContext";

const useRequest = () => {
  const { showAlert } = useContext(AlertContext);

  const checkRequest = (status, error, success, callback, errCallback = () => { }) => {
    if (status === 200) {
      callback();
      if (success) showAlert("success", success);
    } else {
      errCallback();
      if (error) showAlert("danger", error);
    }
  };

  return checkRequest;
};

export default useRequest;

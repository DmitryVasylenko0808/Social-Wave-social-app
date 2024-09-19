import { removeAlert, removeAll, setAlert } from "../redux/alerts.slice";
import { useAppDispatch, useAppSelector } from "../redux/store";

export const useAlerts = () => {
  const alerts = useAppSelector((state) => state.alerts);
  const dispatch = useAppDispatch();

  const info = (message: string) => {
    dispatch(setAlert({ type: "info", message }));
  };

  const success = (message: string) => {
    dispatch(setAlert({ type: "success", message }));
  };

  const error = (message: string) => {
    dispatch(setAlert({ type: "error", message }));
  };

  const remove = (id: string) => {
    dispatch(removeAlert(id));
  };

  const clearAll = () => {
    dispatch(removeAll());
  };

  return {
    items: alerts,
    info,
    success,
    error,
    remove,
    clearAll,
  };
};

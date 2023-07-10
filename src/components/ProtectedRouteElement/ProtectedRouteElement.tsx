import {FC, ReactComponentElement} from 'react'
import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../services/store";

interface IProtectedRouteElement {
  onlyUnAuth?: boolean
  component: ReactComponentElement<any>
}

const ProtectedRouteElement: FC<IProtectedRouteElement> = ({ onlyUnAuth = false, component}) => {
  const checkAuth = useSelector((state: RootState) => state.user.checkAuth);
  const email = useSelector((state: RootState) => state.user.user.email);
  const location = useLocation();

  if (!checkAuth) {
    return null;
  }

  if (onlyUnAuth && email) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !email) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = ProtectedRouteElement;

export const OnlyUnAuth:FC<IProtectedRouteElement> = ({ component }) => (
  <ProtectedRouteElement onlyUnAuth component={component} />
);
import React, { useEffect } from "react";
import Nav from "../components/Nav";
import NoStore from "../components/Store/NoStore";
import HasStore from "../components/Store/HasStore";
import { useSelector, useDispatch } from "react-redux";
import { getStoreAction } from "../redux/store/store-action";
import { Redirect } from "react-router-dom";
const YourStore = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { id: storeId, name: storeName } = user.store;

  useEffect(() => {
    if (user.token.length > 0) dispatch(getStoreAction(user.token));
  }, [dispatch, user.token]);

  const renderComponent = storeId === null ? <NoStore /> : <HasStore />;

  return (
    <>
      <Nav searchBar={props.searchBar} />
      {renderComponent}
      {!user.isAuthenticated && <Redirect to="/" />}
    </>
  );
};

export default YourStore;

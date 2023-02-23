import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderComponent from "./Component";
import { action } from "../modules/util";

const HeaderContainer = () => {
  const aTagInfo = useSelector((state) => state.util.info);
  const dark = useSelector((state) => state.util.dark);
  const dispatch = useDispatch();

  const setDarkFunc = () => {
    dispatch(action.setDark(!dark));
  };
  return (
    <HeaderComponent
      setDarkFunc={setDarkFunc}
      dark={dark}
      aTagInfo={aTagInfo}
    ></HeaderComponent>
  );
};

export default HeaderContainer;

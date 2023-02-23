import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { action } from "../modules/util.js";

const MouseEventComponent = () => {
  const info = useSelector((state) => state.util.info);
  const dark = useSelector((state) => state.util.dark);
  const dispatch = useDispatch();
  function mouseEnterInfoCheck() {
    window.addEventListener("mouseover", (e) => {
      if (e.target.tagName == "A") {
        const targetWidth = e.target.getBoundingClientRect().width;
        dispatch(
          action.setInfo({
            data: e.target.innerText,
            position: { x: e.pageX - targetWidth / 2, y: e.pageY },
          })
        );
      } else {
        dispatch(
          action.setInfo({
            data: "",
            position: { x: info.position.x, y: info.position.y },
          })
        );
      }
    });
  }

  useEffect(() => {
    mouseEnterInfoCheck();
  }, []);

  return (
    <Box position={info.position} dark={dark}>
      {info.data}
    </Box>
  );
};

export default MouseEventComponent;

const Box = styled.div`
  position: absolute;
  padding: 5px;
  background-color: ${({ dark }) => {
    if (dark) return "#f0f0f0";
    else return "#0f0f0f";
  }};
  color: ${({ dark }) => {
    if (dark) return "#0f0f0f";
    else return "#f0f0f0";
  }};
  left: ${({ position }) => {
    return position.x + "px";
  }};
  top: ${({ position }) => {
    return +position.y - 50 + "px";
  }};
`;

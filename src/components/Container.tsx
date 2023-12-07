import type { CSSProperties } from "react";

export type FCProps = {
  children?: JSX.Element | JSX.Element[] | null | boolean;
  style?: CSSProperties;
};

const Container = (props: FCProps) => (
  <div
    style={{
      flex: 1,
      display: "flex",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    }}
    {...props}
  ></div>
);

export default Container;

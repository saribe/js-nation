import { CSSProperties } from "react";

type Props = { onClick: () => void; muted: boolean };

const style: CSSProperties = {
  bottom: 16,
  height: 32,
  left: 16,
  pointerEvents: "all",
  position: "absolute",
  width: 32,
};

export const AudioIcon = ({ onClick, muted }: Props) => (
  <img
    onClick={onClick}
    src={`/audio-${muted ? "off" : "on"}.svg`}
    alt="Theme audio"
    style={style}
  />
);

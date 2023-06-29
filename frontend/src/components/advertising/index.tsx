import "./index.css";

export default function advertising({ side }: { side: "left" | "right" }) {
  return <div className={`advertising advertising-${side}`}></div>;
}

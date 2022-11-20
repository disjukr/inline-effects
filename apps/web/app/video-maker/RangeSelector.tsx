import * as React from "react";
import { getTrackBackground, Range, useThumbOverlap } from "react-range";

const colors = ["#ccc", "#7D4CDB", "#ccc"];

const RangeSelector: React.FC<
  Omit<
    Range["props"],
    | "renderTrack"
    | "renderThumb"
    | "disabled"
    | "allowOverlap"
    | "draggableTrack"
    | "direction"
    | "rtl"
  >
> = (props) => {
  const { values, min, max } = props;
  const rangeRef: any = React.useRef<Range>();
  return (
    <Range
      {...props}
      ref={rangeRef}
      renderTrack={({ props, children }) => (
        <div
          onMouseDown={props.onMouseDown}
          onTouchStart={props.onTouchStart}
          style={{
            ...props.style,
            height: "36px",
            display: "flex",
            width: "100%",
          }}
        >
          <div
            ref={props.ref}
            style={{
              height: "5px",
              width: "100%",
              borderRadius: "4px",
              background: getTrackBackground({
                values,
                colors,
                min,
                max,
              }),
              alignSelf: "center",
            }}
          >
            {children}
          </div>
        </div>
      )}
      renderThumb={({ props, isDragged, index }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "42px",
            width: "42px",
            borderRadius: "4px",
            backgroundColor: "#FFF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 2px 6px #AAA",
          }}
        >
          <ThumbLabel
            rangeRef={rangeRef.current}
            values={values}
            index={index}
          />
          <div
            style={{
              height: "16px",
              width: "5px",
              backgroundColor: isDragged ? colors[index] : "#CCC",
            }}
          />
        </div>
      )}
    />
  );
};

export default RangeSelector;

const ThumbLabel = ({
  rangeRef,
  values,
  index,
}: {
  rangeRef: Range | null;
  values: number[];
  index: number;
}) => {
  const [labelValue, style] = useThumbOverlap(rangeRef, values, index, 1);
  return (
    <div
      data-label={index}
      style={{
        display: "block",
        position: "absolute",
        top: "-28px",
        color: "#fff",
        fontWeight: "bold",
        fontSize: "14px",
        fontFamily: "Arial,Helvetica Neue,Helvetica,sans-serif",
        padding: "4px",
        borderRadius: "4px",
        backgroundColor: "#7D4CDB",
        whiteSpace: "nowrap",
        ...(style as React.CSSProperties),
      }}
    >
      {labelValue as string}
    </div>
  );
};

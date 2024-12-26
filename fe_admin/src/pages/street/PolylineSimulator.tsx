interface PolylineSimulatorProps {
  color: string;
  opacity: number;
  weight: number;
  setColor: (color: string) => void;
  setOpacity: (opacity: number) => void;
  setWeight: (weight: number) => void;
}

const PolylineSimulator = ({
  color,
  opacity,
  weight,
  setColor,
  setOpacity,
  setWeight
}: PolylineSimulatorProps) => {
  return (
    <div className="flex flex-col gap-4 p-4 max-w-full mx-auto">
      {/* <h2 className="text-lg font-bold">Cấu hình tuyến đường</h2> */}
      <div className="flex flex-row gap-2">
        <label className="flex items-center gap-2">
          <span className="font-medium">Màu:</span>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-10 h-10 border rounded bg-white p-1"
          />
        </label>
        <label className="flex items-center gap-2">
          <span className="font-medium md:text-nowrap	">Độ trong suốt:</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={opacity}
            onChange={(e) => setOpacity(parseFloat(e.target.value))}
            className="w-full"
          />
          <span className="w-10 text-center">{opacity}</span>
        </label>
        <label className="flex items-center gap-2">
          <span className="font-medium">Độ dày:</span>
          <select
            value={weight}
            onChange={(e) => setWeight(parseInt(e.target.value))}
            className="border rounded px-2 py-1"
          >
            {[1, 2, 3, 5, 7, 10].map((w) => (
              <option key={w} value={w}>
                {w}px
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-4">
        <h3 className="text-base font-medium">Xem trước:</h3>
        <div
          className="rounded-full my-2"
          style={{
            backgroundColor: color,
            opacity: opacity,
            height: `${weight}px`,
            width: "100%"
          }}
        ></div>
      </div>
    </div>
  );
};

export default PolylineSimulator;

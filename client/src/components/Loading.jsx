import { PulseLoader } from "react-spinners";
const Loading = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <PulseLoader color="#2563eb" loading speedMultiplier={1} />
    </div>
  );
};

export default Loading;

import { CirclesWithBar } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="w-full flex-center">
      <CirclesWithBar
        height="100"
        width="100"
        color="pink"
        outerCircleColor="pink"
        innerCircleColor="pink"
        barColor="pink"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loading;


import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
export interface Props {
    heading: string,
    button: () => JSX.Element;
  }
function Rxheader(props: Props) {
  return (
    <div className="w-full h-[10%]  flex items-end justify-center border-b-2 border-gr">
      <div className="w-[95%] h-[90%] flex items-center justify-between">
        <div className="flex items-center justify-between w-full h-full">
          <div className="flex w-[20%]">
            <div className="w-[20%] flex">
              <div className="rounded-full flex  bg-gr w-10 h-10 flex items-center justify-center text-black">
                <ArrowBackIosIcon className="ml-1" style={{ fontSize: "17px"}} />
              </div>
            </div>
            <div className="text-2xl flex justify-center items-center">{props.heading}</div>
          </div>
        </div>
        <div className="flex items-center justify-end w-[10%] ">{props.button()}</div>
      </div>
    </div>
  );
}

export default Rxheader;

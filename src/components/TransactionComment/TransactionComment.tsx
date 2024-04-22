import Image from "next/image"
import { useEffect, useRef } from "react"

interface TransactionCommentProps {
  comment: string,
  show: boolean,
  setCommentState: Function
}

const TransactionComment: React.FC<TransactionCommentProps> = ({ comment, show, setCommentState }) => {
  const ref = useRef<null | HTMLDivElement>(null)

  const handleOutSideClick = (event: MouseEvent) => {

    if (!ref.current) {
      return;
    }

    if (!ref.current.contains(event.target as Node)) {
      setCommentState(false)
    }
  };

  useEffect(() => {

    if (show) {
      window.addEventListener("mousedown", handleOutSideClick);
    }

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref, show]);

  return (
  <div ref={ref} className={`${show ? "block" : "hidden"} fixed border-black border rounded-md p-2 bg-white top-2/4 left-2/4 space-x-translate-[50%] space-y-translate-[50%] min-w-40 max-w-[70]`}>
    <div className="flex justify-between">
      <h3 className="underline">Comment</h3>
      <button onClick={() => {setCommentState(false)}} className="h-5">
        <Image 
          src="/icons/close-icon.svg"
          alt="Close icon"
          width={20}
          height={20}
        />
      </button>
    </div>
    <p>{comment}</p>
  </div>
)
}
export default TransactionComment
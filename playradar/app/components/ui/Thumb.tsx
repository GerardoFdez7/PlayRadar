import Image from "next/image";

interface ThumbProps {
    selected: boolean;
    index: number;
    onClick: () => void;
    imageSrc: string;
    altText: string;
  }

const Thumb = ({ selected, onClick, imageSrc, altText }: ThumbProps) => {
    return (
      <div
        className={`flex-[0_0_23%] min-w-0 cursor-pointer rounded-lg overflow-hidden ${
          selected ? "border-1 border-primary border-opacity-75 border" : ""
        }`}
        onClick={onClick}
      >
        <div className="relative aspect-video">
          <Image
            src={imageSrc}
            alt={altText}
            fill
          />
          <div
            className={`absolute hover:opacity-0 inset-0 bg-black/50 transition-opacity duration-300 ${
              selected ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>
      </div>
    );
  };

  export default Thumb;
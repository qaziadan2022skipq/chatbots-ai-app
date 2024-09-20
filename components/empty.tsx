import Image from "next/image";

interface EmptyProps {
  label: string;
}

export const Empty = ({ label }: EmptyProps) => {
  return (
    <div className="h-full flex flex-col items-center justify-center mt-32">
      <div className="relative h-36 w-56 mb-4">
        <Image
        alt="Empty"
        fill
        src="/main-logo.png"
        />
      </div>
      <p className="text-sky-500 font-bold text-md text-center">{label}</p>
    </div>
  );
};
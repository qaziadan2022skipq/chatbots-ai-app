import Image from "next/image";

interface EmptyProps {
  label: string;
}

export const Empty = ({ label }: EmptyProps) => {
  return (
    <div className="h-full flex flex-col items-center justify-center mt-32">
      <div className="relative h-52 w-48 mb-4">
        <Image
        alt="Empty"
        fill
        src="/bot.png"
        />
      </div>
      <p className="text-zinc-500 font-bold text-md text-center">{label}</p>
    </div>
  );
};
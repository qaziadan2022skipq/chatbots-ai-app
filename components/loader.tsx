import Image from "next/image"

export const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
        <div className="w-16 h-16 realtive animate-spin">
            <Image
            alt="Logo"
            fill
            src="/spinner.png"
            />
        </div>
        <p className="text-sm text-muted-foreground">Bot is thinking...</p>
    </div>
  )
}
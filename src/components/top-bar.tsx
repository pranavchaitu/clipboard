import { ModeToggle } from "./mode-toggle";

export function TopBar() {
    return <>
        <div className="mb-4 w-full flex justify-between items-center bg-transparent backdrop-blur-2xl">
            <div className="flex gap-2 items-center">
                <img src="/logo.svg" alt="logo" width={20} height={20}/>
                <span className="font-bold">CopyThings</span>
            </div>
            <div>
                <ModeToggle />
            </div>
        </div>
    </>
}   
import { ModeToggle } from "./mode-toggle";

export function TopBar() {
    return <>
        <div className="w-full flex justify-between items-center p-4 bg-transparent backdrop-blur-2xl">
            <div>
                Copy-paster
            </div>
            <div>
                <ModeToggle />
            </div>
        </div>
    </>
}   
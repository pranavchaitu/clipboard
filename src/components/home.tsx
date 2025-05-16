import { useEffect, useRef, useState } from "react"
import { Input } from "./ui/input"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { AnimatedGradientText } from "./animated-gradient-text"
import { cn } from "../lib/utils"

type ThingType = {
    id : string,
    thing : string,
    time : number
}

export function Home() {
    const [things, setThings] = useState<ThingType[]>([])
    const inputRef = useRef<HTMLInputElement>(null)
    const duration = 60

    useEffect(() => {
        fetch("http://localhost:3001/things")
          .then(res => res.json())
          .then(async (data) => {
            const curTime = Date.now()
            let thing : ThingType
            const validThings : ThingType[] = []
            for(thing of data) {
                const remainingTime = (curTime - thing.time)
                if(remainingTime > (duration * 1000)) {
                    console.log(thing)
                    await fetch(`http://localhost:3001/things/${thing.id}`,{
                        method : "DELETE"
                    })
                } else {
                    thing.time = Math.floor(remainingTime / 1000)
                    validThings.push(thing)
                }
            }
            setThings(validThings)
            // setThings(data.filter((thing : ThingType) => curTime - thing.time < duration))
          })
    }, [])
    async function addThing() {
        try {            
            const newThing = inputRef?.current?.value!
            if(!newThing.trim()) {
                return toast.error("enter something yaar!")
            }
            await fetch("http://localhost:3001/things",{
                method : "POST",
                body : JSON.stringify({
                    thing : newThing,
                    time : Date.now()
                })
            })
            return toast.success('added new thing')
        } catch (error) {
            return toast.error('error adding new thing')
        }
    }   
    

    function handleKeyPress(e : any) {
        if(e.key == "Enter") {   
            addThing()
        }
    }

    return <div className="">
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input ref={inputRef} onKeyDown={e => handleKeyPress(e)} type="text" placeholder="Enter the thing" />
            <Button type="submit" className="cursor-pointer" onClick={addThing}>Add</Button>
        </div>
        <br />
        <div className="flex justify-start">
            <AnimatedGradientText>
            <span
                className={cn(
                `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                )}
            >
                live
            </span>
            <span className="relative flex h-3 w-3 ml-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="absolute inline-flex h-3 w-3 rounded-full bg-green-500"></span>
            </span>
            </AnimatedGradientText>
        </div>
        <br />
        <ul className="space-y-2">
            {things.map((i,idx) => (
                <li className="rounded flex gap-2" key={idx}>
                    <Button className="cursor-pointer" onClick={() => {
                        navigator.clipboard.writeText(i.thing)
                        toast.success("Thing copied!")
                    }}>{i.thing.slice(0,50)}{i.thing.length >= 50 && "..." }</Button>
                    <Button variant={"destructive"}>{Math.floor((duration - i.time)/2)} sec</Button>
                </li>
            ))}
        </ul>
    </div>
}
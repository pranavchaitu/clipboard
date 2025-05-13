import { useEffect, useRef, useState } from "react"
import { Input } from "./ui/input"
import { toast } from "sonner"
import { Button } from "./ui/button"

type ThingType = {
    id : string,
    thing : string
}

export function Home() {
    const [things, setThings] = useState<ThingType[]>([])
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        fetch("http://localhost:3001/todos")
          .then(res => res.json())
          .then(data => setThings(data))
    }, [])

    function addThing() {
        toast('here')
        try {            
            const newThing = inputRef?.current?.value!
            if(!newThing.trim()) {
                return toast.error("enter something yaar!")
            }
            setThings([...things, {
                id : 'spmeth0',
                text : newThing
            }])
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
            <Input ref={inputRef} onKeyDown={e => handleKeyPress(e)} type="text" placeholder="enter the thing" />
            <Button type="submit" className="cursor-pointer" onClick={addThing}>Add</Button>
        </div>

        <br />
        THINGS : 
        <br />
        <ul className="ml-4 space-y-2">
            {things.map((i,idx) => (
                <li className="rounded  " key={idx}> - {i}</li>
            ))}
        </ul>
    </div>
}

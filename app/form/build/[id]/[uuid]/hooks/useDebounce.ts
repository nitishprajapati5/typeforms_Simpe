"use client"
import { useEffect, useRef } from "react";
import { debounce } from "lodash";

export function UseDebouncedHook<T>(
  callback: (data: T) => void,
  delay = 500
) {
    const debounceRef = useRef<ReturnType<typeof debounce> | null>(null)

    if(debounceRef.current == null){
        debounceRef.current = debounce(
            (data:T) => {
                callback(data)
            },
            delay
        );
    }

    useEffect(() => {
        return () => {
            if(debounceRef.current){
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                debounceRef.current?.cancel
            }
        };
    },[])

    return debounceRef
}

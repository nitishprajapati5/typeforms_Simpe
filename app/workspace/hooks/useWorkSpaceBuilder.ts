import { useState } from "react"

export const useWorkSpaceBuilder = () => {
    const [isDialogOpen,setDialogOpen] = useState<boolean>(false)
    const [workSpaceName,setWorkSpaceName] = useState<string>("WorkSpace Name")
    const [isWorkSpaceDialogOpen,setWorkSpaceDialogOpen] = useState<boolean>(false)
    

    return {
        isDialogOpen,
        setDialogOpen,
        workSpaceName,
        setWorkSpaceName,
        isWorkSpaceDialogOpen,
        setWorkSpaceDialogOpen
    };
}
"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import FormAddCar from "../FormAddCar/FormAddCar"

export default function ButtonAddCar() {
    const [openDialog, setOpenDialog] = useState(false)


    return (
        <Dialog open={openDialog}>
            <DialogTrigger>
                <Button variant="outline" onClick={() => setOpenDialog(true)}>
                    Agregar <PlusCircle className="ml-2" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogDescription>
                        <FormAddCar setOpenDialog={setOpenDialog} />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

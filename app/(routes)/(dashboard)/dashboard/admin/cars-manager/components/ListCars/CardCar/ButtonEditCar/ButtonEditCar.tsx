"use client"
import { ButtonEditCarProps } from "./ButtonEditCar.types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Pencil } from "lucide-react"
import { useState } from "react"


export default function ButtonEditCar(props: ButtonEditCarProps) {
    const { carData } = props
    const { openDialog, setOpenDialog } = useState(false)
    return (
        <Dialog open={openDialog}>
            <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setOpenDialog(true)} >
                    Editar
                    <Pencil className="w-4 h-4 ml-2" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogDescription>

                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

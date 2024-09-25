"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formSchema } from "./FormAddCar.form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UploadButton } from "@/utils/uploadthing"
import { useState } from "react"
import { FormAddCarProps } from "./FormAddCar.types"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"


export default function FormAddCar(props: FormAddCarProps) {
    const { setOpenDialog } = props
    const [photoUploaded, setPhotoUploaded] = useState(false)
    const router = useRouter()
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            brand: "",
            name: "",
            downPayment: "",
            year: "",
            transmission: "",
            doors: "",
            engine: "",
            price: "",
            type: "",
            color: "",
            condition: "",
            isPublish: false
        },
    })

    const { isValid } = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setOpenDialog(false)
        try {
            await axios.post("/api/car", values)
            toast({ title: "Auto Agregado!", variant: "default" })
            router.refresh()
        } catch (error) {
            toast({ title: "Algo pasó!", variant: "destructive" })
            console.log(error)
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-6 lg:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="brand"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Marca</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre del vehiculo</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="color"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Color</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="red">rojo</SelectItem>
                                        <SelectItem value="grey">gris</SelectItem>
                                        <SelectItem value="black">negro</SelectItem>
                                        <SelectItem value="white">blanco</SelectItem>
                                        <SelectItem value="blue">azúl</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="year"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Año</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="doors"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Puertas</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="1">1</SelectItem>
                                        <SelectItem value="2">2</SelectItem>
                                        <SelectItem value="3">3</SelectItem>
                                        <SelectItem value="4">4</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="engine"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Motor</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="gasoil">Gasolina</SelectItem>
                                        <SelectItem value="diesel">Diesel</SelectItem>
                                        <SelectItem value="gas">Gas</SelectItem>
                                        <SelectItem value="hybrid">Híbrido</SelectItem>
                                        <SelectItem value="electric">Eléctrico</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tipo de coche</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="sedan">Sedán</SelectItem>
                                        <SelectItem value="suv">SUV</SelectItem>
                                        <SelectItem value="hatch">Hatch</SelectItem>
                                        <SelectItem value="furgon">Furgón</SelectItem>
                                        <SelectItem value="pickup">Pickup</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="transmission"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Transmisión</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="automatic">Automático</SelectItem>
                                        <SelectItem value="manual">Manual</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="condition"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Condición</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="new">Nuevo</SelectItem>
                                        <SelectItem value="used">Usado</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* <FormField
                        control={form.control}
                        name="photo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Imagen del vehículo</FormLabel>
                                <FormControl>
                                    {photoUploaded ?
                                        <p className="text-sm">Imagen subida</p> : (
                                            <UploadButton className="rounded-lg bg-slate-600/20 text-slate-800 outline-dotted outline-3 cursor-pointer"
                                                {...field}
                                                endpoint="photo"
                                                onClientUploadComplete={(res) => {
                                                    form.setValue("photo", res?.[0].url)
                                                    setPhotoUploaded(true)
                                                }}
                                                //TODO: Revisar esta parte
                                                onUploadError={(error: Error) => {
                                                    console.log(error)
                                                }}
                                            />
                                        )}
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Precio $</FormLabel>
                                <FormControl>
                                    <Input placeholder="" type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="downPayment"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Adelanto $</FormLabel>
                                <FormControl>
                                    <Input placeholder="" type="number"{...field} />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" className="w-full mt-5" disabled={!isValid}>Agregar</Button>
            </form>
        </Form>
    )
}

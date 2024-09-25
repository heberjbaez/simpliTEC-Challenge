"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Fuel, Gauge, Trash, Users, Wrench, Gem, Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CardCarProps } from "./CardCar.type";
import ButtonEditCar from "./ButtonEditCar/ButtonEditCar";

export default function CardCar(props: CardCarProps) {
    const { car } = props;

    //TODO: agregar imagen
    return (
        <div className="relative p-1 bg-white rounded-lg shadow-md hover:shadow-lg">
            <Image
                className="rounded-lg"
                src="data:image/jpeg;base64,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"
                alt={car.name}
                width={400}
                height={600}
            />
            <div className="relative p-3">
                <div className="flex flex-col mb-3 gap-x-4">
                    <p className="text-xl min-h-16 lg:min-h-fit">
                        {car.brand} {car.name}
                    </p>
                    <p>${car.price}</p>
                    <p>Adelanto: ${car.price}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-x-4">
                    <p className="flex items-center">
                        <Gem className="h-4 w-4 mr-2" strokeWidth={1} />

                        {car.type}
                    </p>

                    <p className="flex items-center">
                        <Wrench className="h-4 w-4 mr-2" strokeWidth={1} />
                        <p>{car.transmission}</p>
                    </p>

                    <p className="flex items-center">
                        <Users className="h-4 w-4 mr-2" strokeWidth={1} />
                        <p>{car.doors}</p>
                    </p>

                    <p className="flex items-center">
                        <Fuel className="h-4 w-4 mr-2" strokeWidth={1} />
                        <p>{car.engine}</p>
                    </p>

                    <p className="flex items-center">
                        <Gauge className="h-4 w-4 mr-2" strokeWidth={1} />
                        <p>{car.year}</p>
                    </p>
                </div>
                <div className="flex justify-between mt-3 gap-x-4">
                    <Button variant="outline" onClick={() => console.log("delete")}>
                        Eliminar <Trash className="w-4 h-4 ml-2" />
                    </Button>
                    <ButtonEditCar carData={car} />
                </div>

                {car.isPublish ? (
                    <Button
                        className="w-full mt-3"
                        variant="outline"
                        onClick={() => console.log("Publicado")}
                    >
                        Publicar
                        <Upload className="w-4 h-4 ml-2" />
                    </Button>
                ) : (
                    <Button className="w-full mt-3" onClick={() => console.log("No publicado")}>
                        Despublicar
                        <Upload className="w-4 h-4 ml-2" />
                    </Button>
                )}
            </div>
        </div>
    );
}

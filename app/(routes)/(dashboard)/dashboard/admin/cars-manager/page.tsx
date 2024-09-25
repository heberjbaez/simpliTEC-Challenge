import { redirect } from "next/navigation";
import ButtonAddCar from "./components/ButtonAddCar/ButtonAddCar";
import ListCars from "./components/ListCars/ListCars";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export default async function CarsManagerPage() {
    const { userId } = auth()

    if (userId) {
        return redirect("/")
    }


    //TODO Acá tambien le deberia mandar el userId, dentro de where
    const car = await db.car.findMany()



    return (
        <div>
            <div className="flex justify-between">
                <ButtonAddCar />
            </div>
            <ListCars cars={car} />
        </div>
    )
}

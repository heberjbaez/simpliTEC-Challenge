import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    try {
        // const { userId } = auth()
        const data = await req.json()
        console.log(data)
        // if (!userId) {
        //     return new NextResponse("Unauthorized", { status: 401 })
        // }

        //TODO Acá tambien le deberia mandar el userId, dentro de data
        const car = await db.car.create({
            data: {
                ...data
            }
        })

        return NextResponse.json(car)
    }
    catch (error) {
        console.log("CAR", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
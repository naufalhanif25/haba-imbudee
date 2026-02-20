"use client";

import { Suspense } from "react";
import BuatSuratClient from "./buat-surat";

export default function Dashboard() {
    return (
        <Suspense>
            <BuatSuratClient />
        </Suspense>
    )
}
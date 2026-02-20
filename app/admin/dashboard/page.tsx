"use client";

import { Suspense } from "react";
import DashboardClient from "./dashboard";

export default function Dashboard() {
    return (
        <Suspense>
            <DashboardClient />
        </Suspense>
    )
}
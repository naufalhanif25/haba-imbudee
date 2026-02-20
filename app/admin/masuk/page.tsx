"use client";

import { 
    ArrowRight,
    LogIn,
    ArrowLeft
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PulseLoader } from "react-spinners";
import axios, { AxiosError } from "axios";
import { LoginResponse } from "@/app/api/masuk/route";
import FormEntry from "@/components/form-entry";

type LoginIconProps = {
    color: string,
    strokeWidth: number
}

type AdminAccount = {
    username: string;
    password: string;
}

export default function Login() {
    const router = useRouter();

    const loginIconProps: LoginIconProps = {
        color: "white",
        strokeWidth: 2
    }
    
    const [account, setAccount] = useState<AdminAccount>({
        username: "",
        password: ""
    });

    const [showErrMsg, setShowErrMsg] = useState<boolean>(false);
    const [errMsg, setErrMsg] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const login = async () => {
        setIsLoading(true);

        try {
            await axios.post("/api/masuk", {
                username: account.username,
                password: account.password
            });
            
            setIsLoading(false);
            router.push("/admin/dashboard");
        } catch (error: any) {
            const data = (error as AxiosError).response?.data as LoginResponse;

            setIsLoading(false);
            setErrMsg(data.message);
            setShowErrMsg(true);

            setTimeout(() => {
                setShowErrMsg(false);
            }, 1000);
        }
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-white px-16">
            <div className="rounded-xl border-2 p-8 max-w-120 w-full flex flex-col items-center justify-center gap-6">
                <div className="flex flex-col items-center justify-center gap-4">
                    <span className="p-4 rounded-lg bg-emerald-500">
                        <LogIn 
                            {...loginIconProps}
                            size={24}
                            />
                    </span>
                    <span className="flex flex-col items-center justify-center gap-2">
                        <h1 className="text-2xl font-bold">
                            Masuk
                        </h1>
                        <p className="text-md text-gray-600">
                            Masuk ke dashboard Admin Desa
                        </p>
                    </span>
                </div>
                <div className="w-full h-fit flex flex-col items-center justify-center gap-4">
                    <FormEntry 
                        title="Nama pengguna"
                        type="text"
                        parentClassName="w-full h-full"
                        className="p-2 border-2 rounded-lg text-md outline-2 outline-transparent focus:outline-emerald-500"
                        placeholder="Masukkan nama pengguna"
                        onChange={(event) => setAccount((prev) => ({
                            ...prev,
                            username: event.target.value
                        }))}
                        required
                    />
                    <FormEntry 
                        title="Kata sandi"
                        type="text"
                        parentClassName="w-full h-full"
                        className="p-2 border-2 rounded-lg text-md outline-2 outline-transparent focus:outline-emerald-500"
                        placeholder="Masukkan kata sandi (min. 8 karakter)"
                        onChange={(event) => setAccount((prev) => ({
                            ...prev,
                            password: event.target.value
                        }))}
                        minLength={8}
                        required
                        hideText
                    />
                    {showErrMsg && (
                        <span className="w-full h-fit flex items-center justify-center rounded-md bg-red-100 py-2 px-4">
                            <p className="w-full h-fit text-center text-sm text-red-500">
                                {errMsg}
                            </p>
                        </span>
                    )}
                </div>
                <button 
                    className="p-2 mt-2 max-h-12 h-12 max-w-36 w-full rounded-lg bg-emerald-500 hover:bg-emerald-600 transition duration-100 flex items-center justify-center text-white text-md text-medium gap-2"
                    onClick={login}
                >
                    {!isLoading ? (
                        <>
                            Masuk
                            <ArrowRight 
                                {...loginIconProps}
                                size={20} 
                            />
                        </>
                    ) : (
                        <PulseLoader 
                            color="white"
                            size={6}
                        />
                    )}
                </button>
            </div>
            <span 
                className="fixed top-8 left-8 p-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 transition duration-100 cursor-pointer w-fit h-fit"
                onClick={() => router.back()}
            >
                <ArrowLeft 
                    {...loginIconProps}
                    size={24}
                />
            </span>
        </div>
    )
}
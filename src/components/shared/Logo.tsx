import Image from "next/image";
import React from "react";

export default function Logo() {
    return (
        <div className="flex items-center gap-2 shrink-0">
            <div>
                <Image
                    src="/mainLogo.png"
                    className=""
                    width={35}
                    height={35}
                    alt="Picture of the Logo"
                />
            </div>

            <span className="font-bold text-slate-900 tracking-tight text-sm md:text-base">
                Health<span className="text-indigo-600">Sync</span>
            </span>
        </div>
    );
}

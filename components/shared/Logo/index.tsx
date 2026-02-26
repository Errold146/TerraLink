import Image from "next/image";
import Link from "next/link";

export function Logo() {
    return (
        <div>
            <Link href={'/'}>
                <Image 
                    src="/logo.png"
                    alt="Logo TerraLink"
                    width={80}
                    height={80}
                    priority
                    className="w-auto h-auto"
                />
            </Link>
        </div>
    )
}

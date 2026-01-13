import Image from "next/image";
import Link from "next/link";


export default function Logo() {
  return (
    <Link href="/" aria-label="Go to home page" className="inline-flex items-center">
      <Image
        src={`/images/logo.png`}
        alt="Digital Signal Processing home"
        className="h-24 w-24 object-contain sm:h-32 sm:w-32 md:h-16 md:w-16"
        priority
        width={700}
        height={700}
      />
    </Link>
  );
}

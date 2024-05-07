import Image from "next/image";
import { Inter } from "next/font/google";
import { Lists } from "../components/Lists";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="bg-admin-back">
      <Lists />
    </div>
  );
}

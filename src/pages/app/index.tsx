import Navbar from "@/components/app/Navbar";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiStackshareLine } from "react-icons/ri";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";

export default function MainApp() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.replace("/");
  }

  return status !== "authenticated" ? (
    <>Loading...</>
  ) : (
    <>
      <Head>
        <title>GBooks</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <div className="container py-3 px-4 mx-auto gap-4 mt-10">
          <div className="grid grid-cols-4 gap-4">
            <MainCard
              icon={<HiOutlineSquare3Stack3D size={20} />}
              title="Projects"
              subtitle="Manage your github projects and track your progress."
            />
            <MainCard
              icon={<RiStackshareLine size={20} />}
              title="Workflows"
              subtitle="Manage workflow and progress"
            />
          </div>
        </div>
      </main>
    </>
  );
}

interface MainCardProps {
  title: string;
  path?: string;
  subtitle: string;
  onClick?: () => void;
  icon?: JSX.Element;
}

function MainCard(props: MainCardProps) {
  return (
    <Link href={props.path ?? "#"} onClick={props.onClick}>
      <div className="p-5 min-h-[130px] rounded-sm bg-white shadow-md outline outline-1 outline-gray-200">
        <div className="flex items-center gap-2">
          {props.icon}
          <h1 className="text-xl font-semibold">{props.title}</h1>
        </div>
        <p>{props.subtitle}</p>
      </div>
    </Link>
  );
}

import Navbar from "@/components/app/Navbar";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiStackshareLine } from "react-icons/ri";
import AppLayout from "@/components/app/AppLayout";

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
      <AppLayout component={<CardsGrid />} />
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

function CardsGrid() {
  return (
    <div className="gap-4">
      <div className="grid grid-cols-3 gap-4">
        <MainCard
          icon={<RiStackshareLine size={20} />}
          title="Repositories"
          path="/app/repositories"
          subtitle="Manage your github repositories and track actions/workflows."
        />
        {/* <MainCard
          icon={<RiStackshareLine size={20} />}
          title="Workflows"
          subtitle="Manage workflow and progress"
        /> */}
      </div>
    </div>
  );
}

function MainCard(props: MainCardProps) {
  return (
    <Link href={props.path ?? "#"} onClick={props.onClick}>
      <div className="p-5 min-h-[130px] flex-col  outline outline-1 outline-gray-200 flex px-5 py-3 text-gray-700 mb-5 border border-gray-200 rounded-lg bg-gray-50">
        <div className="flex items-center gap-2">
          {props.icon}
          <h1 className="text-xl font-semibold">{props.title}</h1>
        </div>
        <p>{props.subtitle}</p>
      </div>
    </Link>
  );
}

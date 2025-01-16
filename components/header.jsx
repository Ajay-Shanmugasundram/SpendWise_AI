import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { LayoutDashboard, PenBox } from "lucide-react";

const header = () => {
  return (
    <>
      <div className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <nav className=" mx-auto px-4 py-4 justify-between  flex items-center ">
          <Link href="/">
            <Image
              src={"/Banner.png"}
              alt="Spendwise AI"
              width={200}
              height={60}
              className="h-12  object-contain"
            ></Image>
          </Link>

          <div className="flex items-center space-x-4">
            <SignedIn>
              <Link
                href={"/dashboard"}
                className="text-gray-600 hover:text-blue-600 flex items-center  gap-2"
              >
                <Button variant="outline">
                  <LayoutDashboard size={18}></LayoutDashboard>
                  <span className="hidden md:inline">Dashboard</span>
                </Button>
              </Link>
              <Link
                href={"/transaction/Create"}
                className=" flex items-center  gap-2"
              >
                <Button>
                  <PenBox size={18}></PenBox>
                  <span className="hidden md:inline">Add Transaction</span>
                </Button>
              </Link>
            </SignedIn>

            <SignedOut>
              <SignInButton forceRedirectUrl="/dashboard">
                <Button variant="outline">Login</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton appearance={{
                elements:{
                  avatarBox:"w-11 h-11"
                }
              }} />
            </SignedIn>
          </div>
        </nav>
      </div>
    </>
  );
};

export default header;

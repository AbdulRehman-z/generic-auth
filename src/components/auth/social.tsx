"use client";

import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Separator } from "../ui/separator";
export default function Socail() {
  return (
    <div className="w-full flex flex-col gap-3 items-center justify-between ">
      <div className="grid grid-cols-2 gap-4 w-full">
        <Button className="w-full [&_svg]:size-6 py-4" variant={"outline"}>
          <FcGoogle />
          Google
        </Button>
        <Button className="w-full [&_svg]:size-6 py-4" variant={"outline"}>
          <FaGithub />
          Github
        </Button>
      </div>
      <div className="relative mt-4 w-full">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-lg">
          <span className="bg-background px-3 text-muted-foreground">or</span>
        </div>
      </div>
    </div>
  );
}

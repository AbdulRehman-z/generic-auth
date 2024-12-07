import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import BackButton from "./backButton";
import Header from "./header";
import Socail from "./social";

type CardWrapperProps = {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  titleFooter: string;
  titleHeader: string;
};

export default function CardWrapper({
  children,
  backButtonHref,
  backButtonLabel,
  titleHeader,
  titleFooter,
  headerLabel,
  showSocial,
}: CardWrapperProps) {
  return (
    <Card className="bg-card/95 w-[500px] flex flex-col items-center">
      <div className="w-full flex flex-col items-center rounded-xl">
        <div className="bg-card w-full shadow px-8 py-2 rounded-xl">
          <CardHeader className="space-y-6">
            <Header titleHeader={titleHeader} label={headerLabel} />
          </CardHeader>
          {showSocial && (
            <CardFooter className="pb-3">
              <Socail />
            </CardFooter>
          )}
          <CardContent className="w-full">{children}</CardContent>
        </div>
        <CardFooter className="flex justify-center w-full py-6">
          <BackButton
            titleFooter={titleFooter}
            href={backButtonHref}
            label={backButtonLabel}
          />
        </CardFooter>
      </div>
    </Card>
  );
}

import { OctagonX } from "lucide-react";

export type NotAuthorizedPageProps = {
  header?: string;
  body?: string;
};

export default function NotAuthorizedPage(props: NotAuthorizedPageProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <OctagonX className=" text-accent w-[10%] h-auto" strokeWidth={1.5} />
      <p className="font-bold">{props.header || "Yetkiniz bulunmamaktadır."}</p>
      <p className="font-thin text-sm">
        {props.body || "Bu sayfayı görüntülemek için yetkiniz bulunmamaktadır."}
      </p>
    </div>
  );
}

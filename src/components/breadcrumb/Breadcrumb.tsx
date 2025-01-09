"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type BreadCrumbPathCondition = {
  name: string;
  path: string;
};

export type BreadcrumbProps = {
  pathConditions?: BreadCrumbPathCondition[];
};

export default function Breadcrumb(props: BreadcrumbProps) {
  const [path, setPath] = useState<string[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    setPath(pathname.split("/").filter((item) => item !== ""));
  }, [pathname]);

  return (
    <div className="flex flex-row gap-1">
      {path.length > 1 &&
        path.map((item, index) => {
          const name = props.pathConditions?.find(
            (condition) => condition.path === item
          )?.name;

          const href = path.slice(0, index + 1).join("/");
          return (
            <div key={index + "-container"} className="flex flex-row gap-1">
              {index > 0 && <p key={index + "-seperator"}>&gt;</p>}
              <Link
                key={index}
                href={"/" + href}
                className={`text-blue-500 ${
                  path.length - 1 == index ? "font-bold" : "font-light"
                }`}
              >
                {name ? name : item}
              </Link>
            </div>
          );
        })}
    </div>
  );
}

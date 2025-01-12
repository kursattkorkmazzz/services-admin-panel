"use client";
import { cx } from "class-variance-authority";
import Image from "next/image";
import { useEffect, useState } from "react";
import isURL from "validator/lib/isURL";

export type AvatarImageProps = {
  photo_url?: string;
  type?: "rectangle" | "circle";
  width?: number;
  height?: number;
  className?: string;
};
export default function AvatarImage(props: AvatarImageProps) {
  const [validURL, setValidURL] = useState<boolean>(false);

  useEffect(() => {
    if (!props.photo_url) {
      return;
    }
    if (isURL(props.photo_url)) {
      setValidURL(true);
    }
  }, [props.photo_url]);

  return (
    validURL && (
      <Image
        className={cx(
          "object-cover",
          props.type === "circle" ? "rounded-full" : "rounded-sm",
          props.className
        )}
        src={props.photo_url || "/images/no-img.jpg"}
        alt="Kullanıcı resmi"
        style={{
          width: props.width ? props.width : "70px",
          height: props.height ? props.height : "70px",
        }}
        width={70}
        height={70}
      />
    )
  );
}

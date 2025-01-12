"use client";
import { ModalContext } from "@/providers/modal/ModalProvider";
import { ReactNode, useContext } from "react";
import Button from "../../button/Button";

export type AskQuestionModalProps = {
  question: string;
  onYes?: () => void;
  onNo?: () => void;
};

export default function AskQuestionModal(props: AskQuestionModalProps) {
  return (
    <div className="flex flex-col gap-3 items-center mt-2">
      <p className="text-lg">{props.question}</p>
      <div className="flex gap-4">
        <Button variant={"destructive"} onClick={props.onNo}>
          Hayır
        </Button>
        <Button variant={"successfully"} onClick={props.onYes}>
          Evet
        </Button>
      </div>
    </div>
  );
}

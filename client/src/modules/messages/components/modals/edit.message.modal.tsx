import React from "react";
import Modal, { ModalProps } from "../../../common/ui/modal.component";
import { Button, TextField } from "../../../common/ui";
import { Message } from "../../api/dto/get.messages.dto";
import { useEditMessageMutation } from "../../api/messages.api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const editMessageSchema = z.object({
  content: z.string().min(1, "Text is required"),
});

type EditMessageFormFields = z.infer<typeof editMessageSchema>;

type EditMessageModalProps = ModalProps & {
  message: Message;
  afterEdit: () => void;
};

const EditMessageModal = ({
  message,
  afterEdit,
  ...modalProps
}: EditMessageModalProps) => {
  const [triggerEditMessage, { isLoading }] = useEditMessageMutation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EditMessageFormFields>({
    resolver: zodResolver(editMessageSchema),
    values: {
      content: message.content,
    },
  });

  const submitHandler = (data: EditMessageFormFields) => {
    triggerEditMessage({
      chatId: message.chat,
      messageId: message._id,
      ...data,
    })
      .unwrap()
      .then(() => afterEdit());
  };

  return (
    <Modal title="Editing message" {...modalProps}>
      <form className="w-[540px]" onSubmit={handleSubmit(submitHandler)}>
        <TextField
          {...register("content")}
          className="mb-5"
          error={errors.content?.message}
        />
        <div className="flex justify-end">
          <Button type="submit" variant="primary">
            Edit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditMessageModal;

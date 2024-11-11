import { useEditMessageMutation } from "../../api/messages.api";
import { useForm } from "react-hook-form";
import { useAlerts } from "../../../common/hooks/useAlerts";
import Modal, { ModalProps } from "../../../common/ui/modal.component";
import { Button, Loader, TextField } from "../../../common/ui";
import { Message } from "../../api/dto/get.messages.dto";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";

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
  const alerts = useAlerts();
  const [triggerEditMessage, { isLoading }] = useEditMessageMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditMessageFormFields>({
    resolver: zodResolver(editMessageSchema),
    values: {
      content: message.content,
    },
  });
  const { t } = useTranslation();

  const submitHandler = (data: EditMessageFormFields) => {
    triggerEditMessage({
      chatId: message.chat,
      messageId: message._id,
      ...data,
    })
      .unwrap()
      .then(() => afterEdit())
      .catch((err) => alerts.error(err.data.message));
  };

  return (
    <Modal title={t("messages.editModal.title")} {...modalProps}>
      <form
        className="w-[540px] max-md:w-full"
        onSubmit={handleSubmit(submitHandler)}
      >
        <TextField
          {...register("content")}
          className="mb-5 max-md:mb-7"
          error={errors.content?.message}
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            className="max-md:w-full"
          >
            {isLoading ? (
              <Loader variant="secondary" size="small" />
            ) : (
              t("messages.editModal.btn")
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditMessageModal;

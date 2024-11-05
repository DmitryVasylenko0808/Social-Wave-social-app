import { useSendMessageMutation } from "../api/messages.api";
import { useForm } from "react-hook-form";
import { useAlerts } from "../../common/hooks/useAlerts";
import { TextField, Button, Loader } from "../../common/ui";
import { SendHorizontal } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const sendMessageSchema = z.object({
  content: z.string().min(1, "Text is required"),
});

type MessageFormFields = z.infer<typeof sendMessageSchema>;

type MessageFormProps = {
  chatId: string;
};

const MessageForm = ({ chatId }: MessageFormProps) => {
  const alerts = useAlerts();
  const [triggerSendMessage, { isLoading: isSending }] =
    useSendMessageMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageFormFields>({
    resolver: zodResolver(sendMessageSchema),
  });

  const submitHandler = (data: MessageFormFields) => {
    triggerSendMessage({ chatId, ...data })
      .unwrap()
      .then(() => {
        reset();
      })
      .catch((err) => alerts.error(err.data.message));
  };

  return (
    <div className="px-4 pt-4 pb-5 shadow-sm border-t border-secondary-50 dark:border-dark-200">
      <form
        className="flex items-center gap-4"
        onSubmit={handleSubmit(submitHandler)}
      >
        <TextField
          {...register("content")}
          className="flex-auto"
          placeholder="Type a message"
          error={errors.content?.message}
        />
        <Button
          type="submit"
          variant="primary"
          className="min-w-max"
          disabled={isSending}
        >
          {isSending ? (
            <Loader variant="secondary" size="small" />
          ) : (
            <SendHorizontal />
          )}
        </Button>
      </form>
    </div>
  );
};

export default MessageForm;

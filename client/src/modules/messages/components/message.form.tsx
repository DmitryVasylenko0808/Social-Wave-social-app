import { SendHorizontal } from "lucide-react";
import { TextField, Button } from "../../common/ui";
import { z } from "zod";
import { useSendMessageMutation } from "../api/messages.api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../auth/hooks/useAuth";

const sendMessageSchema = z.object({
  content: z.string().min(1, "Text is required"),
});

type MessageFormFields = z.infer<typeof sendMessageSchema>;

type MessageFormProps = {
  chatId: string;
};

const MessageForm = ({ chatId }: MessageFormProps) => {
  const { user } = useAuth();
  const [triggerSendMessage, { isLoading }] = useSendMessageMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageFormFields>({
    resolver: zodResolver(sendMessageSchema),
  });

  const submitHandler = (data: MessageFormFields) => {
    console.log(data);
    triggerSendMessage({ userId: user.userId as string, chatId, ...data })
      .unwrap()
      .then(() => {
        console.log("yes");
        reset();
      });
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
        <Button type="submit" variant="primary" className="min-w-max">
          <SendHorizontal />
        </Button>
      </form>
    </div>
  );
};

export default MessageForm;

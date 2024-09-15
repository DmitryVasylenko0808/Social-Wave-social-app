import { ArrowLeft } from "lucide-react";
import {
  Button,
  TextField,
  ImageFileSelect,
  TextArea,
  Loader,
} from "../common/ui";
import { useNavigate, useParams } from "react-router";
import {
  useEditUserMutation,
  useGetOneUserQuery,
} from "../api/users/users.api";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { userAvatarsUrl } from "../api/constants";

const editUserSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  secondName: z.string().min(1, "Second Name is required"),
  bio: z.string().optional(),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  coverImage: z
    .any()
    .refine(
      (files: FileList) => {
        return (
          !files[0] ||
          files[0].type === "image/jpeg" ||
          files[0].type === "image/jpg"
        );
      },
      {
        message: "Only .jpeg format is supported",
      }
    )
    .optional(),
  avatar: z
    .any()
    .refine(
      (files: FileList) => {
        return (
          !files[0] ||
          files[0].type === "image/jpeg" ||
          files[0].type === "image/jpg"
        );
      },
      {
        message: "Only .jpeg format is supported",
      }
    )
    .optional(),
});

type EditProfileFormFields = z.infer<typeof editUserSchema>;

const EditProfileForm = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useGetOneUserQuery(userId as string);
  const [triggerEditUser, { isLoading }] = useEditUserMutation();
  const {
    control,
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormFields>({
    values: {
      firstName: user?.firstName || "",
      secondName: user?.secondName || "",
      bio: user?.bio,
      email: user?.email || "",
    },
  });

  const handleClickBack = () => navigate(-1);

  const submitHandler = (data: EditProfileFormFields) => {
    const editData = { _id: user?._id as string, ...data };

    if (data.avatar) {
      editData.avatar = data.avatar[0] as File;
    }

    if (data.coverImage) {
      editData.coverImage = data.coverImage[0] as File;
    }

    triggerEditUser(editData)
      .unwrap()
      .then(() => navigate("/"))
      .catch((error) =>
        setError("root", { type: "server", message: error.data.message })
      );
  };

  if (isErrorUser) {
    alert("Oops... something went wrong :(");
  }

  return (
    <div className="px-6 py-2">
      <div className="mb-10 flex items-center gap-3.5">
        <Button variant="terciary" onClick={handleClickBack}>
          <ArrowLeft />
        </Button>
        <h2 className="text-xl text-primary-200 font-bold">Edit Profile</h2>
      </div>

      <form
        className="border-[1px] border-textFieldBorder"
        onSubmit={handleSubmit(submitHandler)}
      >
        <Controller
          name="coverImage"
          control={control}
          render={({ field }) => (
            <ImageFileSelect
              {...register("coverImage")}
              className="w-full h-[152px] rounded-none border-0"
              label="Cover Image"
              defaultImageUrl={
                user?.coverImage && `${userAvatarsUrl}/${user?.coverImage}`
              }
              onFileChange={field.onChange}
            />
          )}
        />
        <div className="px-7 py-9 flex gap-8">
          <div className="">
            <Controller
              name="avatar"
              control={control}
              render={({ field }) => (
                <ImageFileSelect
                  {...register("avatar")}
                  className="border-[1px] border-textFieldBorder"
                  label="Profile Photo"
                  defaultImageUrl={
                    user?.avatar && `${userAvatarsUrl}/${user?.avatar}`
                  }
                  onFileChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="w-full">
            <div className="mb-3 py-3 flex flex-col gap-8">
              <TextField
                {...register("firstName")}
                label="First Name"
                error={errors.firstName?.message}
              />
              <TextField
                {...register("secondName")}
                label="Second Name"
                error={errors.secondName?.message}
              />
              <TextArea
                {...register("bio")}
                label="Bio/About"
                rows={3}
                error={errors.bio?.message}
              />
              <TextField
                {...register("email")}
                label="Email"
                type="email"
                error={errors.email?.message}
              />
            </div>
            <p className="mb-2.5 text-center text-red-700 text-sm">
              {errors.root?.message}
            </p>
            <div className="flex justify-end">
              <Button
                variant="secondary"
                type="submit"
                disabled={isLoadingUser || isLoading}
              >
                {isLoading ? (
                  <Loader size="small" variant="secondary" />
                ) : (
                  "Edit"
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;

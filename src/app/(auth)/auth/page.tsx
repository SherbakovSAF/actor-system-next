"use client";

import LabelUI from "@/components/ui/label.ui";
import ButtonUI from "@/components/ui/button.ui";
// import Icon from "@/components/ui/icon";
import InputUI from "@/components/ui/input.ui";
import { NickNameSchema, PasswordSchema } from "@/lib/yup-schemas.lib";
import { signInService, signUpService } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import LoadingUi from "@/components/ui/loading.ui";

type FormData = yup.InferType<typeof schema>;
const schema = yup.object({
  nickname: NickNameSchema,
  password: PasswordSchema,
});

const AuthPage: React.FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      nickname: "",
      password: "",
    },
  });

  const [isLoadingRequest, setLoadingRequest] = useState<boolean>(false);

  const handleSignIn = async (event: FormData) => {
    setLoadingRequest(true);

    const finedUser = await signInService({
      nickName: event.nickname,
      password: event.password,
    }).catch(() => null);
    if (finedUser) router.push("/");

    setLoadingRequest(false);
  };

  const handleSignUp = async (event: FormData) => {
    setLoadingRequest(true);
    const finedUser = await signUpService({
      nickName: event.nickname,
      password: event.password,
      mail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.nickname ?? "")
        ? event.nickname
        : "",
    }).catch(() => null);

    if (finedUser) router.push("/");
    setLoadingRequest(false);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <LabelUI id="nickname" value="Логин/почта" error={errors.nickname}>
        <InputUI
          {...register("nickname")}
          className={errors.nickname && "border-2 border-error"}
          type="mail"
          id="login"
          placeholder="Vagulick Janyan"
          value={watch("nickname")}
        />
      </LabelUI>
      <LabelUI id="password" value="Пароль">
        <InputUI
          {...register("password")}
          className={errors.password && "border-2 border-error"}
          type="text"
          id="password"
          placeholder="qwe123"
          value={watch("password")}
        />
        {errors.password && (
          <small className="text-error">{errors.password.message}</small>
        )}
      </LabelUI>
      {isLoadingRequest && <LoadingUi className="absolute right-2 top-2" />}
      <div className="flex items-center justify-center gap-4">
        <ButtonUI
          onClick={handleSubmit(handleSignUp)}
          disabled={isLoadingRequest}
        >
          Создать
        </ButtonUI>
        <ButtonUI
          onClick={handleSubmit(handleSignIn)}
          disabled={isLoadingRequest}
        >
          Войти
        </ButtonUI>
      </div>
    </div>
  );
};

export default AuthPage;

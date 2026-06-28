import { NextResponse } from "next/server";

type ApiErrorBody = {
  ok: false;
  error: string;
  message: string;
};

export function apiError<ResponseBody extends ApiErrorBody>(
  body: Omit<ResponseBody, "ok">,
  status: number,
) {
  return NextResponse.json<ResponseBody>(
    {
      ok: false,
      ...body,
    } as ResponseBody,
    { status },
  );
}

import type { ChangeEvent } from "react";

import type { BirdObservationFormState } from "@/lib/assistant-types";

export function BirdPhotoUploader({
  form,
  onImageChange,
}: {
  form: BirdObservationFormState;
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="rounded-[30px] border border-moss-100 bg-moss-50/60 p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss-500">照片輸入</p>
          <h3 className="mt-2 text-2xl font-black text-pine">先放一張主體清楚的鳥照</h3>
          <p className="mt-2 max-w-xl text-sm leading-7 text-moss-600">
            先讓系統看照片，再根據鳥體主色、大小與輪廓做第一輪判斷。照片越清楚，後面要手動修正的地方越少。
          </p>
        </div>
        <div className="rounded-[22px] border border-moss-100 bg-white px-4 py-3 text-sm font-semibold leading-7 text-moss-700">
          建議：全身照、側面照、不要太遠
        </div>
      </div>

      <label className="flex min-h-[340px] cursor-pointer flex-col items-center justify-center rounded-[28px] border border-dashed border-moss-300 bg-white p-5 text-center transition hover:border-moss-400 hover:bg-moss-50/30">
        {form.imagePreview ? (
          <div className="w-full space-y-4">
            <img
              src={form.imagePreview}
              alt="上傳的鳥類預覽"
              className="h-[280px] w-full rounded-[24px] bg-moss-50 object-contain"
            />
            <div className="grid gap-3 text-left sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <p className="text-sm font-bold text-pine">{form.imageName}</p>
                <p className="mt-1 text-xs leading-6 text-moss-500">
                  已完成照片預覽。系統會先分析照片主色並自動勾選建議色塊，你仍可以手動修改。
                </p>
              </div>
              <span className="rounded-full bg-pine px-4 py-2 text-sm font-bold text-white">
                重新選一張照片
              </span>
            </div>
          </div>
        ) : (
          <div className="max-w-md">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-sky text-3xl">
              🪶
            </div>
            <p className="mt-4 text-xl font-bold text-pine">上傳一張鳥類照片</p>
            <p className="mt-3 text-sm leading-7 text-moss-600">
              先讓系統看照片本身，再自動抓鳥體主色做預設色塊；若照片模糊、背光或主體太小，系統會保守建議。
            </p>
            <div className="mt-5 inline-flex rounded-full bg-pine px-5 py-3 text-sm font-black text-white shadow-sm">
              選擇照片開始
            </div>
            <div className="mt-5 grid gap-2 text-left">
              {["優先放單一鳥體", "盡量避開背光和模糊", "全身與站姿越完整越好"].map((item) => (
                <p key={item} className="rounded-2xl bg-moss-50 px-4 py-3 text-sm leading-6 text-moss-700">
                  {item}
                </p>
              ))}
            </div>
          </div>
        )}
        <input type="file" accept="image/*" className="sr-only" onChange={onImageChange} />
      </label>
    </div>
  );
}

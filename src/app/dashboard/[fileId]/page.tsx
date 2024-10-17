import { ChatWrapper } from "@/components/chat/chat-wrapper";
import { MaxWithWrapper } from "@/components/max-with-wrapper";
import { PdfRenderer } from "@/components/pdf-renderer";
import { db } from "@/db";
import { getUser } from "@/http/getUser";
import { notFound, redirect } from "next/navigation";

type DashboardParamProps = {
  params: { fileId: string };
};

export default async function DashboardParam({ params }: DashboardParamProps) {
  const { fileId } = params;
  const { user } = await getUser();

  if (!user || !user.id) redirect(`/auth-callback?origin=dashboard/${fileId}`);

  const file = await db.file.findFirst({
    where: {
      id: fileId,
      userId: user.id,
    },
  });

  if (!file) notFound();

  return (
    <MaxWithWrapper>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6">
        <div className="py-6 w-full lg:col-span-2">
          <PdfRenderer url={file.url} />
        </div>

        <div className="shrink-0 py-6 w-full ">
          <ChatWrapper fileId={file.id} />
        </div>
      </div>
    </MaxWithWrapper>
  );
}

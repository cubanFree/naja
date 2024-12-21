import HeaderPublic from "@/components/publicUi/headerPublic";
import FooterPublic from "@/components/footerPublic";
import LoadingContent from "@/components/loadingContent";

export default function PublicLayout({ children }) {
  return (
    <LoadingContent>
      <HeaderPublic />
      {children}
      <FooterPublic />
    </LoadingContent>
  );
}

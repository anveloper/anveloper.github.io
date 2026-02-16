import { PageContainer } from "@/components/page-container";

const contactLinks = [
  {
    title: "Email",
    href: "mailto:hello@anveloper.dev",
    value: "hello@anveloper.dev",
    external: false,
  },
  {
    title: "GitHub",
    href: "https://github.com/anveloper",
    value: "anveloper",
    external: true,
  },
  {
    title: "Resume",
    href: "https://anveloper-dev.notion.site/ca13ffc984be4ce399d73659aebbe303",
    value: "Notion",
    external: true,
  },
];

const ContactPage = () => {
  return (
    <PageContainer>
      <header className="mb-10">
        <h1 className="text-xl font-semibold text-foreground tracking-tight">Contact</h1>
        <p className="text-sm text-muted-foreground mt-1">프로젝트 협업, 채용 문의, 기술적인 질문 등 편하게 연락주세요</p>
      </header>

      <div className="space-y-3">
        {contactLinks.map((link) => (
          <div key={link.title} className="flex items-center gap-4">
            <span className="text-sm font-medium text-foreground w-16">{link.title}</span>
            <a
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
            >
              {link.value}
            </a>
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

export default ContactPage;

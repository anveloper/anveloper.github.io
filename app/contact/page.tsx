"use client";

import { PageContainer } from "@/components/page-container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, FileText, Github, Mail } from "lucide-react";
import { motion } from "motion/react";

type ContactLink = {
  title: string;
  href: string;
  icon: React.ReactNode;
  description: string;
  value?: string;
};

const contactLinks: ContactLink[] = [
  {
    title: "Email",
    href: "mailto:hello@anveloper.dev",
    icon: <Mail className="w-5 h-5" />,
    description: "이메일로 연락하기",
    value: "hello@anveloper.dev",
  },
  {
    title: "GitHub",
    href: "https://github.com/anveloper",
    icon: <Github className="w-5 h-5" />,
    description: "GitHub 프로필 방문",
    value: "anveloper",
  },
  {
    title: "Notion Resume",
    href: "https://anveloper-dev.notion.site/ca13ffc984be4ce399d73659aebbe303",
    icon: <FileText className="w-5 h-5" />,
    description: "상세 이력서 보기",
    value: "Notion",
  },
];

const ContactPage = () => {
  return (
    <PageContainer>
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-foreground mb-2">Contact</h1>
        <p className="text-muted-foreground text-lg">연락처 및 소셜 링크</p>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="mb-8">
          <CardContent className="pt-6">
            <p className="text-lg text-center text-muted-foreground">
              프로젝트 협업, 채용 문의, 또는 기술적인 질문이 있으시면
              <br />
              아래 채널을 통해 연락해 주세요.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-3">
        {contactLinks.map((link, index) => (
          <motion.div
            key={link.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 + 0.1 * index }}
          >
            <Card className="h-full hover:border-primary-sky/50 transition-colors">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="p-3 bg-primary-sky/10 rounded-full text-primary-sky mb-4">{link.icon}</div>
                <h3 className="text-lg font-semibold mb-1">{link.title}</h3>
                {link.value && <p className="text-sm text-primary-sky mb-2">{link.value}</p>}
                <p className="text-sm text-muted-foreground mb-4">{link.description}</p>
                <Button variant="outline" asChild className="w-full">
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    <span>방문하기</span>
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </PageContainer>
  );
};

export default ContactPage;

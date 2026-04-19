import { sanityFetch } from "@workspace/sanity/live";
import { queryFooterData } from "@workspace/sanity/query";
import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Input } from "@workspace/ui/components/input";
import Link from "next/link";
import FooterSkeleton from "./footer-skeleton";


export async function Footer() {
  const { data: footerData } = await sanityFetch({
    query: queryFooterData,
  });

  if (!footerData) {
    return <FooterSkeleton />;
  }

  return (
    <footer className="mt-56 bg-muted">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 pb-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-1 font-medium text-accent text-base leading-[25px]">
            <p>Tel: {footerData.contactInfo?.phone}</p>
            <p>{footerData.contactInfo?.addressLine1}</p>
            <p>{footerData.contactInfo?.addressLine2}</p>
          </div>

          <div className="font-medium text-accent text-base leading-[25px]">
            <p>{footerData.contactInfo?.email}</p>
          </div>

          <div className="lg:col-span-1">
            <h3 className="mb-4 text-accent text-sm">
              {footerData.newsletter?.title}
            </h3>
            <div className="flex gap-2">
              <Input
                className="border-accent bg-background placeholder:text-accent"
                placeholder={
                  footerData?.newsletter?.inputPlaceholder ??
                  "Enter your email address"
                }
                type="email"
              />
              <Button
                className="whitespace-nowrap border-accent bg-transparent text-accent hover:bg-foreground/5 hover:text-foreground"
                variant="outline"
              >
                {footerData?.newsletter?.buttonText ?? "Subscribe"}
              </Button>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Checkbox className="border-accent" id="privacy" />
              <label
                className="cursor-pointer text-accent text-xs"
                htmlFor="privacy"
              >
                {footerData?.newsletter?.privacyText ?? "I agree"}
              </label>
            </div>
          </div>
        </div>

        <div className="grid gap-8 pt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {footerData?.columns?.map((column) => (
            <div key={column._key}>
              {column?.sections?.map((section, sectionIndex) => (
                <div
                  className={sectionIndex > 0 ? "mt-8" : ""}
                  key={section._key}
                >
                  <h3 className="mb-4 break-words border-t border-t-accent pt-4 font-medium text-base text-foreground leading-[31px]">
                    {section.title}
                  </h3>
                  {!section.isStandalone &&
                    section.links &&
                    section.links.length > 0 && (
                      <ul className="space-y-2">
                        {section.links.map((link) => (
                          <li key={link._key}>
                            <Link
                              className="link-effect relative inline-block break-words text-accent text-base leading-[31px] transition-colors after:bottom-0 hover:after:origin-left hover:after:scale-x-100"
                              href={link?.href ?? ""}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

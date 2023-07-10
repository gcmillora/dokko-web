import { MainNavLP } from "@/components/landing-page/main-nav";
import { SiteFooter } from "@/components/landing-page/site-footer";
import { buttonVariants } from "@/components/ui/button";
import { landingPageConfig } from "@/config/landing-page";
import { cn } from "@/lib/utils";
import { Briefcase, Database, Globe, Users2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="flex min-h-screen flex-col">
        <header className="container z-40 bg-background">
          <div className="flex h-20 items-center justify-between py-6">
            <MainNavLP items={landingPageConfig.mainNav} />
            <nav>
              <Link
                href="/auth/login"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  "px-4"
                )}
              >
                Login
              </Link>
            </nav>
          </div>
        </header>
        <>
          <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
            <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
              <Link
                href={""}
                className="rounded-2xl bg-logo px-4 py-1.5 text-sm font-medium text-white"
                target="_blank"
              >
                Follow along on our Journey
              </Link>
              <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                A system for all your clinic and medical services.
              </h1>
              <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                Medical practice management system for primary and specialized
                clinics to improve patient care and clinic efficiency.
              </p>
              <div className="space-x-4">
                <Link
                  href="/auth/register"
                  className={cn(
                    buttonVariants({ size: "lg", variant: "logo" })
                  )}
                >
                  Get Started
                </Link>
                <Link
                  href={""}
                  target="_features"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" })
                  )}
                >
                  Know More
                </Link>
              </div>
            </div>
          </section>
          <section
            id="features"
            className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
          >
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
                Features
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Dokko is built to assist clinics in their services. Specifically
                for appointment management, patient management, and prescription
                management.
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
              <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <Briefcase className="h-12 w-12 " />
                  <div className="space-y-2">
                    <h3 className="font-bold">Appointments</h3>
                    <p className="text-sm text-muted-foreground">
                      Create and manage appointments for your patients, and
                      doctors.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <Users2Icon className="h-12 w-12 " />
                  <div className="space-y-2">
                    <h3 className="font-bold">Management</h3>
                    <p className="text-sm">
                      Manage patient information, medical records, and
                      prescriptions.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <Database className="h-12 w-12 " />
                  <div className="space-y-2">
                    <h3 className="font-bold">Database</h3>
                    <p className="text-sm text-muted-foreground">
                      Online database for all your patient and clinic
                      information.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
                    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
                  </svg>
                  <div className="space-y-2">
                    <h3 className="font-bold">Modern interface</h3>
                    <p className="text-sm text-muted-foreground">
                      Modern interface for improved user experience.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="h-12 w-12 fill-current"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  <div className="space-y-2">
                    <h3 className="font-bold">Authentication</h3>
                    <p className="text-sm text-muted-foreground">
                      Secure authentication for all your services and users.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <Globe className="h-12 w-12 " />
                  <div className="space-y-2">
                    <h3 className="font-bold">Ease of access</h3>
                    <p className="text-sm text-muted-foreground">
                      Easy to use and access from anywhere, anytime.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto text-center md:max-w-[58rem]">
              <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Dokko uses Strapi CRM for super-admin users to manage the
                overall clinic.
              </p>
            </div>
          </section>
          <section id="team" className="container py-8 md:py-12 lg:py-24">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center gap-4 text-center">
              <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
                Our Doctors{" "}
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Meet the team behind Dokko.
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 mt-4">
              <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[340px] flex-col justify-between rounded-md p-6">
                  <Image
                    src="https://res.cloudinary.com/dvou5ye9x/image/upload/v1686104745/freestock_41742406_mojedp.jpg"
                    alt="Doctor"
                    width={162}
                    height={162}
                    className="rounded-full object-cover object-center mx-auto mb-4 "
                  />
                  <div className="">
                    <h3 className="font-bold">Dr. Kristine Keith Napolitano</h3>
                    <p className="text-sm text-muted-foreground">
                      General Practitioner
                    </p>
                    <p className="text-sm text-muted-foreground">
                      University of the Philippines Mindanao
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Siliman University Medical School{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[340] flex-col justify-between rounded-md p-6">
                  <Image
                    src="https://res.cloudinary.com/dvou5ye9x/image/upload/v1686105410/depositphotos_48146239-stock-photo-southeast-asian-doctor_vztajh.webp"
                    alt="Doctor"
                    width={162}
                    height={162}
                    className="rounded-full object-cover object-center mx-auto mb-4"
                  />
                  <div className="mt-7">
                    <h3 className="font-bold">Ron Bryan Vertudes</h3>
                    <p className="text-sm text-muted-foreground">
                      Pediatrician{" "}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      University of the Philippines Mindanao
                    </p>
                    <p className="text-sm text-muted-foreground">
                      U.P. College of Medicine{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[340px] flex-col justify-between rounded-md p-6">
                  <Image
                    src="https://res.cloudinary.com/dvou5ye9x/image/upload/v1686105933/portrait-happy-arabic-doctor-male-blue-background-square-smiling-to-camera-wearing-white-uniform-posing-headshot-cheerful-233544543_x5cppw.webp"
                    alt="Doctor"
                    width={162}
                    height={162}
                    className="rounded-full object-cover object-center mx-auto mb-4 "
                  />
                  <div className="mt-6">
                    <h3 className="font-bold">Ferdinand Gador</h3>
                    <p className="text-sm text-muted-foreground">
                      Psychiatrist{" "}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      University of the Philippines Mindanao
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ADMU Medical School{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            id="open-source"
            className="container py-8 md:py-12 lg:py-24"
          >
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
                Proudly built by an Isko.
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Dokko was developed by a university student of U.P. Mindanao.{" "}
                <br /> Contact us anytime.{" "}
                <Link
                  href={""}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4"
                >
                  Hello
                </Link>
                .{" "}
              </p>
            </div>
          </section>
        </>
        <SiteFooter className="mt-auto" />
      </div>
    </main>
  );
}

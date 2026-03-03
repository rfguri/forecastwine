"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LocaleProvider, useLocale } from "@/lib/locale-context";

const content = {
  en: {
    title: "Terms of Service",
    updated: "February 2026",
    sections: [
      {
        heading: "Acceptance of terms",
        body: "By accessing or using Forecast Wine, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the app.",
      },
      {
        heading: "Description of service",
        body: "Forecast Wine is a biodynamic wine calendar application that provides daily wine quality forecasts based on the moon's position in the zodiac constellations. The forecasts are based on biodynamic tradition and are provided for informational and entertainment purposes only.",
      },
      {
        heading: "No guarantee of accuracy",
        body: "The biodynamic calendar forecasts are based on traditional observation and are not scientifically proven. Forecast Wine makes no guarantees or warranties regarding the accuracy, reliability, or completeness of any forecast information. Your wine experience may vary regardless of the calendar day type.",
      },
      {
        heading: "User accounts and subscriptions",
        body: "Forecast Wine offers a free tier with limited forecast days and a premium subscription with extended forecasts. Subscriptions are billed monthly through Stripe. You may cancel your subscription at any time, and access will continue until the end of your current billing period. No refunds are provided for partial billing periods.",
      },
      {
        heading: "Pricing",
        body: "Subscription prices are displayed in the app at the time of purchase. We reserve the right to change pricing with reasonable notice. Price changes will not affect active subscription periods already paid for.",
      },
      {
        heading: "Acceptable use",
        body: "You agree to use Forecast Wine only for its intended purpose. You may not attempt to reverse-engineer, decompile, or disassemble the app. You may not use automated systems to scrape or extract data from the service. You may not use the service for any unlawful purpose.",
      },
      {
        heading: "Intellectual property",
        body: "All content, design, code, and branding of Forecast Wine are the property of Forecast Wine and are protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.",
      },
      {
        heading: "Limitation of liability",
        body: "Forecast Wine is provided \"as is\" without warranties of any kind. To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service, including but not limited to decisions made based on forecast information.",
      },
      {
        heading: "Availability",
        body: "We strive to keep Forecast Wine available at all times, but we do not guarantee uninterrupted access. The service may be temporarily unavailable due to maintenance, updates, or circumstances beyond our control.",
      },
      {
        heading: "Termination",
        body: "We reserve the right to suspend or terminate your access to the service at our discretion if you violate these terms. You may stop using the service at any time.",
      },
      {
        heading: "Governing law",
        body: "These terms shall be governed by and construed in accordance with the laws of the European Union. Any disputes arising from these terms shall be resolved in the competent courts of the jurisdiction where the service operator is established.",
      },
      {
        heading: "Changes to these terms",
        body: "We may update these Terms of Service from time to time. Changes will be posted on this page with an updated date. Continued use of the app after changes constitutes acceptance of the revised terms.",
      },
      {
        heading: "Contact",
        body: "If you have any questions about these terms, please contact us at hello@forecastwine.com.",
      },
    ],
  },
  es: {
    title: "Términos de servicio",
    updated: "Febrero 2026",
    sections: [
      {
        heading: "Aceptación de los términos",
        body: "Al acceder o utilizar Forecast Wine, aceptas quedar vinculado por estos Términos de servicio. Si no estás de acuerdo con estos términos, por favor, no utilices la aplicación.",
      },
      {
        heading: "Descripción del servicio",
        body: "Forecast Wine es una aplicación de calendario biodinámico para vino que ofrece pronósticos diarios sobre la calidad del vino según la posición de la luna en las constelaciones del zodíaco. Los pronósticos se basan en la tradición biodinámica y se proporcionan con fines informativos y de entretenimiento.",
      },
      {
        heading: "Sin garantía de exactitud",
        body: "Los pronósticos del calendario biodinámico se basan en la observación tradicional y no están demostrados científicamente. Forecast Wine no ofrece garantías sobre la exactitud, fiabilidad o integridad de la información de los pronósticos. Tu experiencia con el vino puede variar independientemente del tipo de día del calendario.",
      },
      {
        heading: "Cuentas de usuario y suscripciones",
        body: "Forecast Wine ofrece un nivel gratuito con días de pronóstico limitados y una suscripción premium con pronósticos ampliados. Las suscripciones se facturan mensualmente a través de Stripe. Puedes cancelar tu suscripción en cualquier momento y el acceso continuará hasta el final de tu período de facturación actual. No se realizan reembolsos por períodos de facturación parciales.",
      },
      {
        heading: "Precios",
        body: "Los precios de suscripción se muestran en la aplicación en el momento de la compra. Nos reservamos el derecho a modificar los precios con un preaviso razonable. Los cambios de precio no afectarán a los períodos de suscripción activos ya abonados.",
      },
      {
        heading: "Uso aceptable",
        body: "Te comprometes a utilizar Forecast Wine únicamente para su finalidad prevista. No podrás intentar realizar ingeniería inversa, descompilar o desensamblar la aplicación. No podrás utilizar sistemas automatizados para extraer datos del servicio. No podrás utilizar el servicio con fines ilícitos.",
      },
      {
        heading: "Propiedad intelectual",
        body: "Todo el contenido, diseño, código y marca de Forecast Wine son propiedad de Forecast Wine y están protegidos por las leyes de propiedad intelectual aplicables. No podrás reproducir, distribuir ni crear obras derivadas sin nuestro permiso por escrito.",
      },
      {
        heading: "Limitación de responsabilidad",
        body: "Forecast Wine se proporciona \"tal cual\" sin garantías de ningún tipo. En la máxima medida permitida por la ley, no seremos responsables de ningún daño indirecto, incidental, especial, consecuente o punitivo derivado del uso del servicio, incluidas las decisiones tomadas basándose en la información de los pronósticos.",
      },
      {
        heading: "Disponibilidad",
        body: "Nos esforzamos por mantener Forecast Wine disponible en todo momento, pero no garantizamos un acceso ininterrumpido. El servicio puede no estar disponible temporalmente debido a mantenimiento, actualizaciones o circunstancias fuera de nuestro control.",
      },
      {
        heading: "Terminación",
        body: "Nos reservamos el derecho a suspender o cancelar tu acceso al servicio a nuestra discreción si incumples estos términos. Puedes dejar de utilizar el servicio en cualquier momento.",
      },
      {
        heading: "Legislación aplicable",
        body: "Estos términos se regirán e interpretarán de conformidad con las leyes de la Unión Europea. Cualquier disputa derivada de estos términos se resolverá ante los tribunales competentes de la jurisdicción donde esté establecido el operador del servicio.",
      },
      {
        heading: "Cambios en estos términos",
        body: "Podemos actualizar estos Términos de servicio de vez en cuando. Los cambios se publicarán en esta página con una fecha actualizada. El uso continuado de la aplicación tras los cambios constituye la aceptación de los términos revisados.",
      },
      {
        heading: "Contacto",
        body: "Si tienes alguna pregunta sobre estos términos, escríbenos a hello@forecastwine.com.",
      },
    ],
  },
} as const;

function TermsContent() {
  const { locale, dict } = useLocale();
  const page = content[locale];

  return (
    <main className="mx-auto min-h-svh max-w-lg px-5 pb-16 pt-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground animate-fade-up"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {dict.backToForecast}
      </Link>

      <h1 className="mt-8 text-xl font-bold tracking-tight font-display animate-fade-up stagger-2">
        {page.title}
      </h1>
      <p className="mt-1.5 text-[11px] text-muted-foreground/60 animate-fade-up stagger-3">
        {dict.lastUpdated}: {page.updated}
      </p>

      <div className="mt-8 flex flex-col gap-6 animate-fade-up stagger-4">
        {page.sections.map((section) => (
          <div key={section.heading}>
            <h2 className="text-xs font-semibold tracking-tight">
              {section.heading}
            </h2>
            <p className="mt-1.5 text-[11px] font-light leading-relaxed text-muted-foreground">
              {section.body}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default function TermsPage() {
  return (
    <LocaleProvider>
      <TermsContent />
    </LocaleProvider>
  );
}

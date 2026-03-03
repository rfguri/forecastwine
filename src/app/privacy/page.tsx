"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LocaleProvider, useLocale } from "@/lib/locale-context";

const content = {
  en: {
    title: "Privacy Policy",
    updated: "February 2026",
    sections: [
      {
        heading: "Overview",
        body: "Forecast Wine is a biodynamic wine calendar app. We are committed to protecting your privacy. This policy explains what data we collect, how we use it, and your rights.",
      },
      {
        heading: "Data we collect",
        body: "We collect minimal data to provide the service. This includes your language preference (stored locally on your device), and basic anonymous usage analytics (page views, feature usage) to improve the app. We do not collect your name, email, or any personally identifiable information unless you explicitly provide it when subscribing.",
      },
      {
        heading: "Local storage",
        body: "Your language preference and app settings are stored locally on your device using browser local storage. This data never leaves your device and is not transmitted to our servers.",
      },
      {
        heading: "Payments",
        body: "If you subscribe to our premium plan, payment processing is handled entirely by Stripe. We do not store or have access to your full payment card details. Stripe may collect information necessary to process your payment in accordance with their own privacy policy.",
      },
      {
        heading: "Cookies",
        body: "Forecast Wine does not use tracking cookies. We may use essential cookies required for the app to function properly, such as session management.",
      },
      {
        heading: "Third-party services",
        body: "We may use anonymous analytics services to understand how the app is used. These services do not collect personally identifiable information. We do not sell, trade, or share your data with any third party for advertising purposes.",
      },
      {
        heading: "Data retention",
        body: "Local data is retained on your device until you clear your browser data or uninstall the app. If you subscribe, Stripe retains payment information according to their retention policy. We retain subscription status data only as long as necessary to provide the service.",
      },
      {
        heading: "Your rights",
        body: "You have the right to access, correct, or delete your personal data at any time. Since we store minimal data, most of it is under your direct control via your device settings. For subscription-related data, you can contact us to request deletion.",
      },
      {
        heading: "Children",
        body: "Forecast Wine is not intended for use by anyone under the age of 16. We do not knowingly collect personal data from children.",
      },
      {
        heading: "Changes to this policy",
        body: "We may update this privacy policy from time to time. Any changes will be reflected on this page with an updated date. Continued use of the app after changes constitutes acceptance of the revised policy.",
      },
      {
        heading: "Contact",
        body: "If you have any questions about this privacy policy, please contact us at hello@forecastwine.com.",
      },
    ],
  },
  es: {
    title: "Política de privacidad",
    updated: "Febrero 2026",
    sections: [
      {
        heading: "Resumen",
        body: "Forecast Wine es una aplicación de calendario biodinámico para vino. Nos comprometemos a proteger tu privacidad. Esta política explica qué datos recogemos, cómo los utilizamos y cuáles son tus derechos.",
      },
      {
        heading: "Datos que recogemos",
        body: "Recogemos la mínima cantidad de datos necesaria para ofrecer el servicio. Esto incluye tu preferencia de idioma (almacenada localmente en tu dispositivo) y analíticas anónimas de uso básico (visitas a páginas, uso de funciones) para mejorar la aplicación. No recogemos tu nombre, correo electrónico ni ninguna información de identificación personal, salvo que la proporciones expresamente al suscribirte.",
      },
      {
        heading: "Almacenamiento local",
        body: "Tu preferencia de idioma y los ajustes de la aplicación se almacenan localmente en tu dispositivo mediante el almacenamiento local del navegador. Estos datos no salen de tu dispositivo ni se transmiten a nuestros servidores.",
      },
      {
        heading: "Pagos",
        body: "Si te suscribes a nuestro plan premium, el procesamiento de pagos lo gestiona íntegramente Stripe. No almacenamos ni tenemos acceso a los datos completos de tu tarjeta de pago. Stripe puede recoger información necesaria para procesar tu pago conforme a su propia política de privacidad.",
      },
      {
        heading: "Cookies",
        body: "Forecast Wine no utiliza cookies de seguimiento. Podemos utilizar cookies esenciales necesarias para el correcto funcionamiento de la aplicación, como la gestión de sesiones.",
      },
      {
        heading: "Servicios de terceros",
        body: "Podemos utilizar servicios de analítica anónima para comprender cómo se usa la aplicación. Estos servicios no recogen información de identificación personal. No vendemos, comercializamos ni compartimos tus datos con terceros con fines publicitarios.",
      },
      {
        heading: "Conservación de datos",
        body: "Los datos locales se conservan en tu dispositivo hasta que borres los datos del navegador o desinstales la aplicación. Si te suscribes, Stripe conserva la información de pago conforme a su política de conservación. Nosotros conservamos los datos del estado de suscripción únicamente mientras sea necesario para prestar el servicio.",
      },
      {
        heading: "Tus derechos",
        body: "Tienes derecho a acceder, corregir o eliminar tus datos personales en cualquier momento. Dado que almacenamos datos mínimos, la mayoría están bajo tu control directo a través de los ajustes de tu dispositivo. Para datos relacionados con la suscripción, puedes ponerte en contacto con nosotros para solicitar su eliminación.",
      },
      {
        heading: "Menores",
        body: "Forecast Wine no está destinado a menores de 16 años. No recogemos de forma consciente datos personales de menores.",
      },
      {
        heading: "Cambios en esta política",
        body: "Podemos actualizar esta política de privacidad de vez en cuando. Cualquier cambio se reflejará en esta página con una fecha actualizada. El uso continuado de la aplicación tras los cambios constituye la aceptación de la política revisada.",
      },
      {
        heading: "Contacto",
        body: "Si tienes alguna pregunta sobre esta política de privacidad, escríbenos a hello@forecastwine.com.",
      },
    ],
  },
} as const;

function PrivacyContent() {
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

export default function PrivacyPage() {
  return (
    <LocaleProvider>
      <PrivacyContent />
    </LocaleProvider>
  );
}
